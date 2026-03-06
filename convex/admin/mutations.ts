import { getAuthUserId } from '@convex-dev/auth/server'
import { mutation } from '../_generated/server'

export const clearAllUsers = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)

    if (!userId) {
      throw new Error('User not authenticated')
    }

    const user = await ctx.db.get(userId)

    if (!user?.isAdmin) {
      throw new Error('You do not have admin access')
    }

    // CUSTOMIZE: Add deletion of your app-specific tables here

    const sessions = await ctx.db.query('authSessions').collect()
    /* eslint-disable no-await-in-loop -- Convex deletes must stay sequential */
    for (const session of sessions) {
      await ctx.db.delete(session._id)
    }

    const accounts = await ctx.db.query('authAccounts').collect()
    for (const account of accounts) {
      await ctx.db.delete(account._id)
    }

    const refreshTokens = await ctx.db.query('authRefreshTokens').collect()
    for (const refreshToken of refreshTokens) {
      await ctx.db.delete(refreshToken._id)
    }

    const rateLimits = await ctx.db.query('authRateLimits').collect()
    for (const rateLimit of rateLimits) {
      await ctx.db.delete(rateLimit._id)
    }

    const verifiers = await ctx.db.query('authVerifiers').collect()
    for (const verifier of verifiers) {
      await ctx.db.delete(verifier._id)
    }

    const verificationCodes = await ctx.db
      .query('authVerificationCodes')
      .collect()
    for (const verificationCode of verificationCodes) {
      await ctx.db.delete(verificationCode._id)
    }

    const users = await ctx.db.query('users').collect()
    for (const currentUser of users) {
      await ctx.db.delete(currentUser._id)
    }
    /* eslint-enable no-await-in-loop */

    return {
      deletedUsers: users.length,
    }
  },
})
