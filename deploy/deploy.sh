#!/usr/bin/env bash
# Refresh the injected values in index.html, then publish it.
#
# Run this ON PURPOSE, once, at the end of a session — never after every edit,
# and never from a hook. A hook publishes half-finished records.
set -uo pipefail
cd "$(dirname "$0")/.."

LOG="deploy/deploy.log"
ts() { date '+%Y-%m-%d %H:%M:%S'; }

if [ ! -f wrangler.jsonc ]; then
  echo "No wrangler.jsonc at the repo root. See deploy/README.md — this step is optional." >&2
  exit 1
fi

# Keep the log readable; wrangler is verbose.
if [ -f "$LOG" ] && [ "$(wc -l <"$LOG")" -gt 500 ]; then
  tail -n 500 "$LOG" >"$LOG.tmp" && mv "$LOG.tmp" "$LOG"
  echo "[$(ts)] (log rotated)" >>"$LOG"
fi

if ! node scripts/build-dashboard.js; then
  {
    echo "[$(ts)] BUILD FAILED — nothing published, the live page is unchanged."
    echo "         Check node is installed, and that index.html still has its"
    echo "         DATA:LOG and DATA:FEEDCOST markers."
  } | tee -a "$LOG" >&2
  exit 1
fi

echo "[$(ts)] publishing …" >>"$LOG"
if npx --yes wrangler deploy >>"$LOG" 2>&1; then
  echo "[$(ts)] DEPLOY OK" | tee -a "$LOG"
else
  code=$?
  {
    echo "[$(ts)] DEPLOY FAILED (exit $code) — THE LIVE PAGE WAS NOT UPDATED."
    echo "         See $LOG. Usually one of:"
    echo "           - not logged in   -> npx --yes wrangler login"
    echo "           - no internet at the moment"
  } | tee -a "$LOG" >&2
  exit "$code"
fi
