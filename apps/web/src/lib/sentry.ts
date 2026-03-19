/**
 * Sentry initialization. Set NEXT_PUBLIC_SENTRY_DSN and install @sentry/nextjs to enable.
 * See docs/ops/staging-environment.md
 */
export function initSentry() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return;
  // When @sentry/nextjs is installed, add:
  // if (typeof window !== "undefined") {
  //   import("@sentry/nextjs").then((S) => S.init({ dsn, tracesSampleRate: 0.1 }));
  // }
}
