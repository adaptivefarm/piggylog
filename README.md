# piggylog

**Keep records for your pigs, with help from an AI assistant.**

This is an empty starter. Point a coding assistant at it, tell it *"help me set up
records for my pig farm"*, and it will ask you about your farm and build you a working
tracker. After that, you tell it what happened each day and it writes everything down.

Made for smallholder farms — roughly 5 to 50 head. Prices are in pesos.

---

## What you get

- **A dashboard** — one file, `index.html`. Open it in any browser, on a phone or a
  laptop, and see how many pigs you have, what they weigh, what you have spent, and
  what is coming up. It works with no internet.
- **A daily log** — one small file per day, in plain text you can read yourself.
- **Money records** — what you paid for feed, pigs, medicine, and what you earned.
- **Health records** — every shot and treatment, with the date and the dose.

Everything is plain text. No app to install, no subscription, no account. If you stop
using the assistant tomorrow, every record is still readable and still yours.

---

## Getting started

**1. Get the files.** Download this repository, or if you use git:

```bash
git clone https://github.com/adaptivefarm/piggylog.git my-farm
cd my-farm
```

**2. Open it with an AI coding assistant.** Claude Code, Codex, Cursor — any of them.

**3. Say this:**

> Help me set up records for my pig farm.

It will ask you about your pigs, your feed, and your costs. Answer in whatever language
you are comfortable with. You do not need to know any of the technical parts.

**4. From then on, just tell it what happened:**

> Fed them twice today, about 12 kilos. The small one still isn't eating well.

> Bought 2 sacks of grower at 1,900 each.

> Weighed everyone this morning — I'll read you the numbers.

It writes the records. You check what it says back.

---

## What is in here

| Folder | What is inside |
|---|---|
| `index.html` | Your farm dashboard. Open this one. |
| `logs/` | One file per day |
| `finance/` | Feed, animals, supplies, sales |
| `health/` | Your routine plan, and every treatment given |
| `compost/` | One file per compost pile |
| `templates/` | Blank forms the assistant copies |
| `examples/` | A made-up example farm, so you can see the shape. **Delete it when you start.** |
| `CLAUDE.md`, `RECORDKEEPING.md` | Instructions for the assistant. You do not need to read these. |
| `deploy/` | Optional — put your dashboard online behind a password |

---

## Why plain text

A spreadsheet needs the app that made it. A farm app needs the company to stay in
business. These are text files. They open on anything, they work offline, and in ten
years they will still open.

They also work without the assistant. If the internet is down and a pig gets sick, you
can open today's log and write a line yourself. The assistant is a convenience, not a
dependency.

---

## A note on your data

Everything stays on your computer unless you choose to put it somewhere else. Nothing
is uploaded anywhere by default.

If you later share this repository publicly, remember that your records are in it —
buyer names, what you paid, where the farm is. Ask the assistant to check before you
share.

---

## Where this came from

Extracted from a working system of record used on a family farm in Nueva Ecija,
Philippines, running since 2026. The pattern is real and in daily use; the data here is
not — every number in this starter is invented.

Built by [Adaptive Farm](https://adaptive.farm). Questions: `hello@adaptive.farm`.

Use it, change it, sell the pigs. MIT licensed.
