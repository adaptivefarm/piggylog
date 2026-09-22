#!/usr/bin/env node
"use strict";

// ─────────────────────────────────────────────────────────────────────────────
// Optional in-place injector for index.html.
//
// index.html is hand-edited and IS the source of truth. This script does not
// generate it and does not parse it into anything. It refreshes exactly three
// values that are cheaper to compute than to maintain by hand:
//
//   • DATA:LOG       ← a one-line summary of the most recent daily log
//   • DATA:FEEDCOST  ← the running total of finance/feed-costs.md
//   • var stamp      ← when this last ran ("Last updated" in the page)
//
// Everything between the matching <!-- DATA:X --> … <!-- /DATA:X --> markers is
// overwritten; everything else is left exactly as it was. Running it twice gives
// the same file.
//
// THE REPO WORKS WITHOUT THIS. If the farm has no Node installed, skip it — the
// dashboard is still correct, it just shows whatever was typed in by hand.
//
//   node scripts/build-dashboard.js
// ─────────────────────────────────────────────────────────────────────────────

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const INDEX = path.join(ROOT, "index.html");

function read(rel) {
  try {
    return fs.readFileSync(path.join(ROOT, rel), "utf8");
  } catch {
    return null; // null = could not read. "" = read but empty. The difference matters.
  }
}

// Strip <!-- … --> before parsing ANYTHING out of a markdown file.
//
// This is not cosmetic. The starter ledgers carry a commented-out example row so
// a farmer can see the shape of a row before they have one — and a commented row
// still begins with "|", so a naive table parser counts it. That put ₱3,600 of
// invented feed spend on the money card of a farm that had bought nothing.
// A missing number is recoverable; a confident wrong one is not.
function stripComments(md) {
  return String(md ?? "").replace(/<!--[\s\S]*?-->/g, "");
}

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Markdown links in a log line are relative paths that mean nothing to someone
// reading the rendered page — keep the label, drop the target.
const inline = (s) =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");

function fmtDate(iso) {
  const d = new Date(iso + "T12:00:00Z");
  const mon = d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
  return `${d.getUTCDate()} ${mon} ${String(d.getUTCFullYear()).slice(-2)}`;
}

// Replace what is between a pair of marker comments, keeping the markers.
function injectSlot(html, name, replacement) {
  const re = new RegExp(`(<!--\\s*${name}\\s*-->)[\\s\\S]*?(<!--\\s*/${name}\\s*-->)`);
  if (!re.test(html)) {
    // Hard stop, not a warning. Returning the html unchanged would exit 0 and
    // quietly publish a stale slot.
    console.error(
      `FAIL: marker ${name} not found in index.html — refusing to write.\n` +
        `  Someone deleted or renamed it. Restore the pair:\n` +
        `    <!-- ${name} -->…<!-- /${name} -->`,
    );
    process.exit(1);
  }
  // Function replacer, so a $& or $1 in the replacement is not treated as a
  // capture-group reference.
  return html.replace(re, (_m, open, close) => open + replacement + close);
}

// ── most recent daily log ────────────────────────────────────────────────────

function latestLog() {
  const base = path.join(ROOT, "logs");
  try {
    for (const y of fs.readdirSync(base).filter((f) => /^\d{4}$/.test(f)).sort().reverse()) {
      for (const m of fs.readdirSync(path.join(base, y)).filter((f) => /^\d{2}$/.test(f)).sort().reverse()) {
        const files = fs
          .readdirSync(path.join(base, y, m))
          .filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
          .sort()
          .reverse();
        if (files.length)
          return { date: files[0].replace(".md", ""), content: read(`logs/${y}/${m}/${files[0]}`) };
      }
    }
  } catch {}
  return null; // No logs yet. That is a normal state for a new farm, not an error.
}

function section(md, heading) {
  md = stripComments(md);
  const re = new RegExp(`^#{1,3}\\s+${heading}\\s*$`, "im");
  const i = md.search(re);
  if (i < 0) return "";
  const after = md.slice(i).replace(re, "");
  const next = after.search(/^#{1,3}\s/m);
  return (next < 0 ? after : after.slice(0, next)).trim();
}

// First line of real content — not a table, not a comment, not a heading.
function firstLine(block) {
  return (block || "")
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l && !l.startsWith("|") && !l.startsWith("#") && !l.startsWith("<!--"));
}

function buildLog() {
  const log = latestLog();
  if (!log || log.content == null) {
    return '\n        <span class="when">—</span><div class="body">No daily log yet.</div>\n        ';
  }

  const d = new Date(log.date + "T12:00:00Z");
  const mon = d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });

  // Prefer health news, then weights, then whatever the notes say. A pig that is
  // off feed matters more on a dashboard than a routine feeding row.
  const pick =
    firstLine(section(log.content, "Health"))?.replace(/^-\s*/, "") ||
    firstLine(section(log.content, "Weights"))?.replace(/^-\s*/, "") ||
    firstLine(section(log.content, "Notes"))?.replace(/^-\s*/, "") ||
    "Day logged.";

  return `\n        <span class="when">${esc(mon)}<br><b>${d.getUTCDate()}</b></span>
        <div class="body">
          ${inline(pick)}
          <div class="meta">Logged ${esc(fmtDate(log.date))}</div>
        </div>
        `;
}

// ── feed-cost total ──────────────────────────────────────────────────────────

function buildFeedCost() {
  const md = read("finance/feed-costs.md");
  if (md == null) {
    console.error("FAIL: finance/feed-costs.md is missing — refusing to write a total.");
    process.exit(1);
  }

  const lines = stripComments(md).split("\n").filter((l) => l.trim().startsWith("|"));
  const headers = lines.length
    ? lines[0].split("|").slice(1, -1).map((h) => h.trim().toLowerCase())
    : [];
  const col = headers.findIndex((h) => h.startsWith("total"));

  if (col < 0) {
    // The column was renamed. Guessing a total from the wrong column would put a
    // real-looking wrong number on a money card, and exit 0 while doing it.
    console.error(
      "FAIL: no 'Total (PHP)' column in finance/feed-costs.md — refusing to write.\n" +
        "  Restore the column heading, or update this script to match it.",
    );
    process.exit(1);
  }

  // slice(2) drops the header row and the |---|---| separator.
  const total = lines.slice(2).reduce((sum, line) => {
    const n = parseFloat(String(line.split("|").slice(1, -1)[col] ?? "").replace(/[^0-9.]/g, ""));
    return isNaN(n) ? sum : sum + n;
  }, 0);

  // Zero is a legitimate answer for a farm that has not bought feed yet — unlike a
  // missing file or a renamed column, it is not a sign that something is broken.
  // Explicit en-US locale: another locale would render a peso figure as 10.134.
  return total.toLocaleString("en-US");
}

// ── main ─────────────────────────────────────────────────────────────────────

if (!fs.existsSync(INDEX)) {
  console.error("FAIL: index.html not found at", INDEX);
  process.exit(1);
}

let html = fs.readFileSync(INDEX, "utf8");
html = injectSlot(html, "DATA:LOG", buildLog());
html = injectSlot(html, "DATA:FEEDCOST", buildFeedCost());
html = html.replace(/var stamp = "[^"]*";/, `var stamp = "${new Date().toISOString()}";`);
fs.writeFileSync(INDEX, html, "utf8");

console.log("Refreshed index.html — latest log, feed-cost total, timestamp.");
