---
name: piggylog-recordkeeping
description: "Keeping pig farm records in a piggylog repository. Use whenever the farmer reports something that happened with the pigs — feeding, supplements, water, a weigh-in, a shot or vaccination or treatment, a purchase, a sale, a death, a housing move, manure or compost, heat, breeding, farrowing, slaughter — or asks to set up a new farm, refresh the dashboard, or redo a forecast. Triggers on: daily log, feed, sack, weigh-in, deworming, vaccination, compost, heat, farrow, slaughter, break-even, pig, baboy, piggylog."
---

# piggylog — recordkeeping

Everything you need is in two files at the repo root. Read both before writing any
record; do not work from memory of this description.

1. **`CLAUDE.md`** — the record pattern (state in `index.html`, history in append-only
   markdown), the setup interview for a farm that has not been set up yet, the cardinal
   rules, and how to talk to the farmer.
2. **`RECORDKEEPING.md`** — the event → action table, the exact format of every record,
   when to redo the forecasts, how to edit `index.html` safely, and the checks to run
   before you finish.

This skill deliberately holds no rules of its own. The same instructions have to work
for agents that never load skills, so they live in plain files that anything can read.

**The three things that matter most, if you read nothing else:**

- **Append-only is real.** Never delete or rewrite a past entry in `logs/`, `finance/`,
  `health/` or `compost/`. Append a correction and strike the wrong part: `~~old~~`.
- **Never invent a number.** Not a weight, not a price, not a date. Write `TBD` and ask.
- **A weigh-in always triggers a forecast recompute** in `index.html`, and you say so.
