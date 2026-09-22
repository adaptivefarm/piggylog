# Optional — put the dashboard online

**Most farms do not need this.** `index.html` already works by opening it from the
folder, including with no internet. This is only for putting it on the web so it can be
read from a phone that is not the computer holding the files.

It costs nothing on Cloudflare's free tier, but it needs an account, a domain, and a
working internet connection — which is exactly what many farms do not have. Skip it
without losing anything.

---

## What is here

| File | What it does |
|---|---|
| `worker.js` | Puts a password in front of the page, so the farm's records are not public |
| `wrangler.jsonc.example` | Config. Copy to `wrangler.jsonc` and fill in your own values |
| `.assetsignore` | Makes sure **only** `index.html` is uploaded — never the logs or the money files |
| `deploy.sh` | Refresh the injected values, then publish |

---

## Setting it up

1. Make a free [Cloudflare](https://cloudflare.com) account and point a domain at it.
2. Copy the config and fill in your own account ID and domain:

```bash
cp deploy/wrangler.jsonc.example wrangler.jsonc
cp deploy/.assetsignore .assetsignore
```

3. Set a password:

```bash
npx wrangler secret put DASHBOARD_PASSWORD
```

4. Log in once, then publish:

```bash
npx wrangler login
bash deploy/deploy.sh
```

---

## Two things to be careful about

**Only `index.html` goes up.** `.assetsignore` ignores everything and then allows that
one file back in. Your daily logs, prices, buyer names and health records stay on your
computer. If you change that file, check what you are publishing.

**Deploy on purpose, once.** Run `deploy.sh` at the end of a session, not after every
edit — otherwise half-finished records go live. Do not wire it to a hook.

Every attempt writes `DEPLOY OK` or `DEPLOY FAILED` to `deploy/deploy.log`. Read the
last line if the site looks stale. The usual cause is an expired login, which only the
farm's owner can fix by running `npx wrangler login` again — an agent cannot.
