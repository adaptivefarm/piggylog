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

Everything is plain text. The records themselves need no app, no account and no
subscription — the assistant that writes them does, and that is covered below. If you
stop using the assistant tomorrow, every record is still readable and still yours.

---

## What you need

**A computer, an AI assistant that can open folders, and a paid plan for it.** Those
last two matter more than they sound.

The chat apps on your phone — ChatGPT, Claude, Gemini — cannot save files. They can
answer a question about your pigs, but they cannot write today's log and still have it
tomorrow. That is the whole point of this repo, so a phone chat app is not enough.

What you need is a *coding* assistant — one that opens a folder and writes files:

| Tool | Where it runs |
|---|---|
| **Claude Code** | A computer, or a browser at `claude.ai/code` |
| **Codex** | A computer, or connected to a GitHub repo |
| **Cursor**, or another coding assistant that can read and write files | A computer |

**A free account will not be enough.** Keeping records means many small edits over
months, and free allowances run out long before that. Budget for a paid subscription to
one of these before you start, or you will stop halfway through a season — which is
worse than never starting, because half a season of records tells you nothing.

**This repo is free, and it works without any of them.** Every record is plain text you
can write by hand. The assistant saves you the typing, not the records.

Git is optional. It gives you an undo button and a history, which is worth having, but
the repo is just a folder and works as one.

---

## Getting started

**1. Get the files.** Download this repository, or if you use git:

```bash
git clone https://github.com/adaptivefarm/piggylog.git my-farm
cd my-farm
```

**2. Open the folder with a coding assistant.** Claude Code, Codex or Cursor — see
the table above. It has to be one that can read and write files.

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

## Tell me how it goes

This is new, and it was built around one farm's way of working. Yours will be
different, and that is the useful part.

Email **hello@adaptive.farm**. What helps most:

- What you had to do by hand because the assistant did not understand you
- What you stopped using after a week, and why
- Anything it got wrong about pigs, feed, or money
- What you wanted it to do and it could not

Telling me it did not work is more useful than telling me it did. Write in whatever
language you prefer.

**You do not need to send your records.** Just say what happened. Your logs, prices and
buyers are yours, and nothing here uploads them anywhere.

If you would rather report a problem in public, open an issue on GitHub instead. Email
is fine, and usually faster.

## Where this came from

Extracted from a working system of record used on a family farm in Nueva Ecija,
Philippines, running since 2026. The pattern is real and in daily use; the data here is
not — every number in this starter is invented.

Built by [Adaptive Farm](https://adaptive.farm). Questions: `hello@adaptive.farm`.

Use it, change it, sell the pigs. MIT licensed.
