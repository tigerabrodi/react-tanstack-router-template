# Agents

## Testing

Only write unit tests (Vitest) for pure functions that do calculation or parsing — where input transforms into output and tests add real value. No unit tests for UI components or side-effectful code.

## Convex folder structure

Convex functions are organized by domain in folders under `convex/`:

```
convex/
├── users/
│   ├── queries.ts
│   └── mutations.ts
├── admin/
│   └── queries.ts
├── shared/
│   └── errors.ts
└── ...
```

Each domain folder contains `queries.ts`, `mutations.ts`, and `actions.ts` as needed. On the client, consumers call these via the nested API: `api.users.queries.{queryName}`, `api.users.mutations.{mutationName}`, etc.

## After completing work

Run all three checks after each plan is implemented:

```bash
bun tsc
bun lint
bun run format
```

## Function signatures

Every function must take a single object parameter, even if it only needs one value. This is more type-safe when passing arguments:

```ts
// Good
function getUser({ id }: { id: string }) { ... }

// Bad
function getUser(id: string) { ... }
```

## Async patterns

- Use `Promise.all` when all promises must succeed, `Promise.allSettled` when partial failure is acceptable — always prefer parallel execution over sequential `await`s when the calls are independent.
- Use `p-retry` (3–5 retries) for external/network calls that could transiently fail. This makes actions more robust without manual retry loops.

## Convex actions

Actions are for external/third-party calls (APIs, Stripe, etc.). Key rules:

- **Default runtime** is Convex's JS environment (faster, no cold starts). Use `fetch` freely here.
- **`"use node"`** directive at top of file only when you need unsupported NPM packages or Node.js APIs. No other Convex functions (queries/mutations) can live in a `"use node"` file.
- **Prefer mutation + scheduler over calling actions directly from clients.** The mutation captures user intent in the DB, then schedules the action via `ctx.scheduler.runAfter(0, ...)`. This prevents duplicate execution.
- **Batch DB access:** Avoid multiple `ctx.runQuery`/`ctx.runMutation` calls — they run in separate transactions and aren't consistent. Combine into a single internal query/mutation instead.
- **`ctx.runAction`** should only be used to cross runtimes (Convex env → Node.js). For same-runtime reuse, extract a helper function instead.
- **Actions can't be auto-retried by Convex** (unlike queries/mutations) because of side effects. Use `p-retry` on the caller side when appropriate.
- **Always `await` all promises** — dangling promises may not complete and can cause errors in subsequent calls.
- Actions time out after 10 minutes. Max 1000 concurrent operations per action.

## Convex full reference

For comprehensive Convex docs, fetch: https://docs.convex.dev/llms.txt

## Convex validation and schema types

- Use `v` from `"convex/values"` for argument validation, return value validation, and table schemas — all share the same type system.
- Always add `args` validation to public functions (security). Use `returns` for return value validation.
- Common validators: `v.string()`, `v.number()`, `v.boolean()`, `v.null()`, `v.id(tableName)`, `v.int64()`, `v.bytes()`, `v.array(v)`, `v.object({...})`, `v.record(k, v)`.
- `v.optional(...)` for optional fields, `v.union(...)` for unions, `v.literal(...)` for constants, `v.nullable(foo)` shorthand for `v.union(foo, v.null())`.
- Use `Infer<typeof validator>` to extract TypeScript types from validators — avoids duplicating types.
- Reuse validators across functions and schemas. Object validators support `.pick()`, `.omit()`, `.extend()`, and `.partial()` for composition.

## Convex internal functions

Use `internalMutation`, `internalQuery`, and `internalAction` for logic that should never be called directly from a client. Use them when called from actions via `ctx.runQuery`/`ctx.runMutation`, scheduled via `ctx.scheduler`, cron jobs, or HTTP actions. Public and internal functions can live in the same file.

## Optimistic updates

Use `.withOptimisticUpdate` on mutations to make the UI feel instant for actions like deleting, renaming, or adding items. The update function receives `(localStore, args)` — use `localStore.getQuery()` to read current cached data and `localStore.setQuery()` to write the optimistic result. Update all queries that could include the affected item. Always create new objects/arrays — never mutate existing ones. Updates auto-rollback when the real mutation result arrives.

```ts
const deleteItem = useMutation(api.items.remove).withOptimisticUpdate(
  (localStore, { id }) => {
    const items = localStore.getQuery(api.items.list, {})
    if (items !== undefined) {
      localStore.setQuery(api.items.list, {}, items.filter((i) => i._id !== id))
    }
  },
)
```

## Prefetching

Use `usePrefetchQuery` from `src/hooks/use-prefetch-query.ts` to warm Convex query caches on hover/focus so navigation feels instant. It subscribes for 20s then auto-cleans up. Pass `'skip'` to conditionally skip.

## Error handling with Convex

Errors follow the pattern in `convex/shared/errors.ts` and `src/lib/convex-error.ts`:

- **Server side**: Use `appError({ code, message })` from `convex/shared/errors.ts` to throw typed `ConvexError`s. Error codes are defined as `AppErrorCode` — extend this union when adding new error types.
- **Client side**: Use `getConvexErrorMessage(error)` from `src/lib/convex-error.ts` to extract the user-facing message, falling back to a generic message for unexpected errors.
- **Toast messages**: When a toast library is configured, use `toastConvexError` (see the commented example in `src/lib/convex-error.ts`) to show error toasts.
