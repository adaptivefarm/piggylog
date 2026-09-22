# Recordkeeping reference

The deep reference for keeping records in this repo. [`CLAUDE.md`](CLAUDE.md) has the
pattern and the setup interview; this file has the detail. Load it for any logging work.

---

## Where each fact lives

| File / path | Role | Edit rule |
|---|---|---|
| `index.html` | Forward state: roster, weights, feed plan, housing, money, what is coming | Edit in place, targeted replacement on the section's `id=` anchor |
| `logs/YYYY/MM/YYYY-MM-DD.md` | What happened on one day | Append-only |
| `finance/feed-costs.md` | Feed sack purchases | Append-only |
| `finance/purchases.md` | Animal purchases | Append-only |
| `finance/supplies.md` | Everything else bought | Append-only |
| `finance/sales.md` | Pigs sold | Append-only |
| `health/protocols.md` | Routine playbook — what you do and when | Edit in place |
| `health/interventions.md` | Shots, vaccines, treatments actually given | Append-only |
| `compost/pile-NN.md` | One compost pile, start to finish | Append-only; `status:` in place |
| `batches/<slug>/pigs/pig-NN.md` | One pig, only when it diverges from the group | Append-only |
| `breeding/heat-log.md`, `breeding/service-log.md` | Breeding time-series | Append-only |
| `slaughter/slaughter-NN-YYYY-MM-DD.md` | One slaughter | Append-only |

**Injector-owned — never hand-edit:**

```
<!-- DATA:LOG -->…<!-- /DATA:LOG -->
<!-- DATA:FEEDCOST -->…<!-- /DATA:FEEDCOST -->
var stamp = "…"
```

`scripts/build-dashboard.js` overwrites these in place. Editing them by hand is wasted
work — the script clobbers it on the next run.

---

## Event → action

The farmer reports something. Find the row. Do every action in it.

| The farmer says… | Do this |
|---|---|
| **Fed the pigs** | Append a row to today's log `## Feeding`. If intake has moved a long way from normal for several days running, say so and offer to redo the feed forecast in `index.html`. |
| **Gave them greens / kangkong / kamote tops / banana** | Append a line to today's `## Supplements`. No finance row — it came off the farm. |
| **Bought feed** | Append a row to `finance/feed-costs.md`. If the price changed, update the feed's price in `index.html`. If the price moved more than ~10%, redo the cost figures. |
| **Bought anything else** (meds, bedding, charcoal, a waterer, rope) | Append a row to `finance/supplies.md` with a category. |
| **Bought pigs** | Append a row to `finance/purchases.md`. Add the new batch to `index.html` `#batch`. |
| **Gave a shot / vaccine / dewormer / treatment** | Append a dated entry to `health/interventions.md` **and** a one-line cross-reference in today's log `## Health`. Both, every time. |
| **A pig is sick / off feed / limping** | Today's log `## Health`. If it becomes an individual story, start `batches/<slug>/pigs/pig-NN.md`. |
| **A pig died** | Today's log `## Health` with what was observed. Update the roster and headcount in `index.html`. Recheck any forward number that depends on head count — feed quantities, expected income. |
| **Weighed the pigs** | Append to today's log `## Weights`, one row per pig. Update weights in `index.html`. **Always** redo the growth and sale-date estimates — a weigh-in is the one event that must trigger a recompute. |
| **Moved pigs / changed the pen** | Today's log `## Housing`. Update housing in `index.html`. Check the space per pig still works. |
| **Cleaned the pen / added carbon / hauled manure** | Today's log `## Waste management`. Name the compost pile if it went to one. |
| **Started a new compost pile** | Create `compost/pile-NN.md` from the template, `status: active`. Cross-link from the log. |
| **Closed / finished a pile** | Set `closed:` and `status: curing` or `finished`. Note it in the log. Start the next pile the same day if collection continues. |
| **Changed the water** | One line in today's log `## Water`. |
| **Sold a pig** | Append to `finance/sales.md`. Update roster and headcount in `index.html`. Redo the money figures. |
| **Slaughtered a pig** | Create `slaughter/slaughter-NN-YYYY-MM-DD.md` (live weight, dressed weight, cuts). Row in today's log. Update the roster in `index.html`. |
| **A female is in heat** | Append to `breeding/heat-log.md` (create on first detection). Cross-link from the log. |
| **Bred / serviced a female** | Append to `breeding/service-log.md` (which sow, when, which boar or AI). Cross-link from the log. |
| **A sow farrowed** | New batch for the litter under `batches/<farrow-date>-batch-NN/`. Record litter size, live births, stillborns. Add the batch to `index.html`. |
| **A price changed / a quote came in** | Update the figure in `index.html` and recompute anything downstream of it. Add a line to the refinement log saying what changed and why. |
| **Anything above that changes a forward fact** | Also update the matching summary card in `index.html`, so the top of the dashboard is never stale. |

---

## Record formats

| Record | Path | Format |
|---|---|---|
| Daily log | `logs/YYYY/MM/YYYY-MM-DD.md` | Frontmatter `date:` and `batches:`; headings from the template |
| Feed cost | `finance/feed-costs.md` | `Date \| Feed \| Sacks \| Unit price \| Total \| Supplier` |
| Animal purchase | `finance/purchases.md` | `Date \| Batch \| Qty \| Unit price \| Total \| Supplier \| Notes` |
| Supply | `finance/supplies.md` | `Date \| Item \| Qty \| Unit \| Unit price \| Total \| Category \| Batch/Pen \| Notes` |
| Sale | `finance/sales.md` | `Date \| Batch \| Pig \| Live weight kg \| Price/kg \| Total \| Buyer` |
| Health | `health/interventions.md` | Dated `##` section: what, dose, route, which animals, who gave it, cross-link |
| Compost | `compost/pile-NN.md` | Frontmatter `pile_id`, `started`, `closed`, `status`, `source_batches` |
| Batch slug | — | `YYYY-MM-DD-batch-NN` |
| Pig ID | — | `pig-NN`, zero-padded |
| Dates | everywhere | `YYYY-MM-DD` |
| Times | everywhere | 24-hour `HH:MM` |
| Money | everywhere | Pesos, plain number in tables, one decimal at most |

Supply categories, extend as needed: `feed-additive`, `bedding`, `vet-consumables`,
`equipment`, `housing`, `other`.

---

## Feed containers — optional, and worth it

Farms that pre-portion feed into containers or buckets get a free, accurate intake
record: count the containers, not the kilos. If the farmer works this way, set it up.

- Number the physical containers `01`, `02`, … up to however many they own. **The number
  never exceeds the number of containers that physically exist.**
- Prefix says what is in it *now*: `PS-` pre-starter, `S-` starter, `G-` grower,
  `D-` developer, `F-` finisher, `MIX-` a transition blend.
- A daily-log feeding row records the full ID: `G-07`.
- Fill weight comes from arithmetic, not a guess: sacks bought × kg per sack ÷ containers
  filled. Write it down in `index.html` — when it changes, the whole intake history
  changes meaning, so record the date it changed.

Not every farm portions this way. If they scoop from the sack, record kilos or scoops and
say which. **Record what they actually do**, not what a textbook would prefer.

---

## When to redo the forecasts

`index.html` carries forward estimates: when feed runs out, when pigs hit market weight,
what the batch will earn. They go stale. Redo them, without being asked, when:

1. **Any weigh-in happens.** Non-negotiable — every estimate hangs off weight.
2. **Head count changes** — a death, a sale, a slaughter, new pigs.
3. **Feed intake runs more than ~15% off the expected rate for five days or more.**
   One hungry day is not a trend. Five is.
4. **Any cost moves more than ~10%** — feed price, vet fee, expected sale price.

Then add one line to the refinement log in `index.html` saying what fired and what moved:

> 2026-06-13: intake +22% over 7 days — next feed purchase moved 06-16 → 06-13.

And tell the farmer in one line. A silently changed forecast is worse than a stale one.

**Do not redo forecasts** for a single unusual day, a typo fix, or a wording change.

---

## Editing index.html safely

- Find the section by its `id=` anchor, then replace the specific cell or line. Do not
  regenerate the whole file.
- Match the markup already around you — copy the shape of the neighbouring row.
- Correcting something visible: wrap the old value in `<del>` rather than deleting it.
- Never touch the `DATA:LOG` / `DATA:FEEDCOST` markers or the `var stamp` line.
- Never rename an `id=`. Adding new sections and rows is free; renaming breaks links.

Anchors the starter ships with: `#dashboard` `#roster` `#feed` `#health` `#money`
`#coming` `#log` (summary cards), and `#batch` `#feeds` `#housing` `#schedule`
`#money-detail` (detail sections). There is also `#first-run`, the start-here notice —
delete that whole section once the farm is set up. Add more anchors as the farm grows.

---

## Checks to run before you finish a session

Machine-checkable. Run them; do not eyeball it.

```bash
# 1 — Append-only respected: no removed lines in the time-series records.
#     Strikethrough corrections are the one allowed exception.
git diff logs/ finance/ health/ compost/ | grep '^-[^-]' | grep -v '~~' \
  && echo "FAIL: lines removed without strikethrough" || echo "PASS: append-only"
```

```bash
# 2 — The injector still runs clean (only if you use it).
node scripts/build-dashboard.js
```

```bash
# 3 — Injector markers intact. Expected: 3 or more.
grep -c 'DATA:LOG\|DATA:FEEDCOST\|var stamp' index.html
```

```bash
# 4 — Setup placeholders still showing on the page.
#     Strip comments first: index.html's header comment explains the
#     "SETUP NEEDED" convention in prose, so a plain count can never reach 0
#     and the gate can never pass.
perl -0pe 's/<!--.*?-->//gs' index.html | grep -c 'SETUP NEEDED'
```

An untouched starter reports 38. A farm that is set up reports 0. Anything in between
means setup stopped partway — find what is still missing and ask the farmer for it.
If a value is genuinely unknown rather than not yet asked about, replace the
placeholder with `TBD`, so the gate can reach 0 while the gap stays visible on the page.

```bash
# 5 — Every daily log is where its name says it is.
#     `find`, not a glob — a glob with no matches is an error in zsh, and a farm
#     on its first day has no logs at all.
find logs -name '*.md' 2>/dev/null | while read -r f; do
  d=$(basename "$f" .md)
  [ "logs/${d:0:4}/${d:5:2}/$d.md" = "$f" ] || echo "MISPLACED: $f"
done
echo "checked"
```
