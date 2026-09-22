// Puts Basic Auth in front of the dashboard so farm records are not public.
//
// The username is fixed; the password comes from a Cloudflare secret:
//   npx wrangler secret put DASHBOARD_PASSWORD
//
// There is no fallback password on purpose. If the secret is not set, nothing
// gets in — better than a default that everyone who reads this file knows.
export default {
  async fetch(request, env) {
    const USER = "farm";
    const PASS = env.DASHBOARD_PASSWORD;

    if (!PASS) {
      return new Response(
        "DASHBOARD_PASSWORD is not set. Run: npx wrangler secret put DASHBOARD_PASSWORD",
        { status: 500 },
      );
    }

    const auth = request.headers.get("Authorization") ?? "";
    if (auth.startsWith("Basic ")) {
      const decoded = atob(auth.slice(6));
      const colon = decoded.indexOf(":");
      if (decoded.slice(0, colon) === USER && decoded.slice(colon + 1) === PASS) {
        return env.ASSETS.fetch(request);
      }
    }

    return new Response("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="piggylog"' },
    });
  },
};
