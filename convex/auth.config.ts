export default {
  providers: [
    {
      domain: (process as { env: Record<string, string | undefined> }).env.CONVEX_SITE_URL,
      applicationID: "convex",
    },
  ],
};
