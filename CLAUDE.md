# piggylog — agent instructions

This is an **empty starter**. A pig farmer has pointed you at it and wants records
for their farm. Your job is to set it up with them, then keep it every day.

Read this file, then [`RECORDKEEPING.md`](RECORDKEEPING.md) before writing anything.

---

## The pattern — this is the whole system

Two kinds of record, and the distinction is the point:

1. **`index.html` — the single farm record.** Everything about *now and forward*:
   how many pigs, what they weigh, what they eat, what is planned, what it costs.
   One self-contained HTML file. You edit it in place. It is also a dashboard the
   farmer can open on a phone with no internet.
2. **Append-only markdown — the time-series.** What *happened*: daily logs, money
   spent, shots given, compost piles. Never rewritten, only added to.

State goes in the HTML. History goes in the markdown. If you find yourself copying
forward state into a markdown file, or rewriting a past log to fix a number, you
have broken the pattern.

**No database. No spreadsheet. No build step needed to get value.** A farmer with a
dead laptop can read every record on a phone, and a farmer with no agent can write
one by hand. That is a requirement, not an accident.

---

## First run — set it up with the farmer

If `index.html` still says `SETUP NEEDED`, this repo has never been used. Do not
guess and fill it in. **Ask, in plain language, a few questions at a time.** Many
farmers will be doing this on a phone, in a second language, standing in a pen.

Ask these. Stop when you have enough to start — the rest can come later.

**About the pigs**
- How many pigs do you have right now?
- Are they one group bought together, or separate groups? (Each group is a *batch*.)
- Roughly how old are they, or when did you get them?
- How many are male and how many female?
- Are any of them for breeding, or are they all for selling as meat?

**About feeding**
- What feed do you use? What is it called?
- How much does one sack cost, and how many kilos is a sack?
- How many times a day do you feed?
- Do you measure the feed, or fill until they stop eating?

**About money**
- Do you want to track what you spend and what you earn? (Almost always yes — this
  is usually the part that pays for the effort.)
- What did you pay for the pigs?

**About the place**
- How many pens, and roughly how big?
- Do you compost the manure, or is it removed?

**About them**
- What do you want to look at first when you open this? Weights? Feed cost? Sale date?

Then:

1. Fill in `index.html` — replace every `SETUP NEEDED` and `<!-- PLACEHOLDER -->`.
2. Create the first batch record inside `index.html` under `#batch`.
3. Write today's daily log from [`templates/daily-log.md`](templates/daily-log.md).
4. Add the pig purchase to [`finance/purchases.md`](finance/purchases.md) if known.
5. Delete [`examples/`](examples/) — it exists only to show you the shape.
6. Tell the farmer, in one short message, what you set up and what to say tomorrow.

**Do not invent numbers.** If the farmer does not know a figure, write `TBD` and ask
again later. A `TBD` is honest; a made-up weight becomes a made-up sale price.

---

## Repo map

| Path | What | Edit rule |
|---|---|---|
| `index.html` | The farm record + dashboard. Forward state, roster, feed, housing, money. | **Edit in place** |
| `logs/YYYY/MM/YYYY-MM-DD.md` | One file per day. What happened. | Append-only |
| `finance/feed-costs.md` | Feed sack purchases | Append-only |
| `finance/purchases.md` | Animal purchases | Append-only |
| `finance/supplies.md` | Everything else bought | Append-only |
| `finance/sales.md` | Pigs sold | Append-only |
| `health/protocols.md` | The playbook — what you do routinely | Edit in place |
| `health/interventions.md` | Shots, treatments, vet visits — what you actually did | Append-only |
| `compost/pile-NN.md` | One file per compost pile | Append-only; `status:` edited in place |
| `templates/` | Copy these to start a new record | Reference |
| `RECORDKEEPING.md` | Event → action table, record formats, forecast rules | Reference |
| `scripts/build-dashboard.js` | Refreshes two values in `index.html`. Optional. | Reference |
| `deploy/` | Optional: put the dashboard on the web, password-protected | Optional |
| `examples/` | Synthetic worked example. **Delete on first real use.** | Delete |

Directories created on demand, when the farm first needs them: `batches/<slug>/pigs/`
(per-pig files, only when one pig diverges from the group), `breeding/` (first heat),
`slaughter/` (first slaughter).

---

## Cardinal rules

- **Append-only means append-only.** Never delete or rewrite a past entry in `logs/`,
  `finance/`, `health/`, `compost/`. If a past entry is wrong, append a correction and
  strike the wrong part with `~~old value~~`. The record of the mistake is part of the
  record. This is what makes the file trustworthy a year later.
- **`index.html` is edited in place** — it holds current state, so it changes. But any
  *log* inside it (a refinement log, a change history) is append-only: add a row, never
  rewrite one.
- **Dates are `YYYY-MM-DD`. Times are 24-hour `HH:MM`.** No other format, anywhere.
- **Money is pesos**, written as a plain number (`1900`) in tables, `₱1,900` in prose.
  One decimal place at most.
- **IDs are padded and predictable.** Pigs are `pig-01`, `pig-02`. Batches are
  `YYYY-MM-DD-batch-NN` — the date the batch arrived. Compost piles are `pile-01`,
  numbered forever upward, never reused.
- **One daily log per calendar day**, at `logs/YYYY/MM/YYYY-MM-DD.md`. Create the year
  and month directory if missing. If the farmer reports something from three days ago,
  it goes in *that day's* file, with a note saying when it was written down.
- **Never hand-edit between the injector markers** in `index.html`:
  `<!-- DATA:LOG -->`, `<!-- DATA:FEEDCOST -->`, and the `var stamp` line. A script owns
  them and will overwrite your edit. Never rename a section `id=` anchor — in-page links
  break silently.

---

## How a day gets logged

The farmer talks. You write. That is the loop.

They will not say "please append a row to the feeding table". They will say *"binigyan
ko sila ng dalawang timba kanina"* or *"the small one isn't eating"*. Your job is to
turn that into records without making them learn a format.

1. Open or create `logs/YYYY/MM/YYYY-MM-DD.md` from `templates/daily-log.md`.
2. Write what happened under the right heading.
3. If money moved → also append to the matching `finance/` file.
4. If something was administered → also append to `health/interventions.md`, and
   cross-link it from the day's `## Health`.
5. If a *forward* fact changed — a weight, a price, a planned date, a headcount →
   also update `index.html`.
6. Say back, in one or two lines, what you recorded. The farmer should be able to catch
   a mistake without opening a file.

The full event → action table is in [`RECORDKEEPING.md`](RECORDKEEPING.md). Load it for
any logging work.

---

## The dashboard

`index.html` is hand-edited and self-contained — no framework, no CDN, no build
required. Open it in a browser and it works, including offline.

Two values are worth computing instead of maintaining, so an optional script injects
them between the markers:

```bash
node scripts/build-dashboard.js
```

It refreshes the latest-log summary, the running feed-cost total, and the timestamp.
It changes nothing else. It is safe to run twice. **It is optional** — the repo is fully
usable without ever running it, which matters when the farm has no Node installed.

To put the dashboard online, password-protected, see [`deploy/README.md`](deploy/README.md).
That is also optional and most farms will not need it.

---

## Talking to the farmer

The audience is a Philippine smallholder with 5–50 head, often on a phone, often on
bad signal, sometimes in Tagalog or Bisaya or Ilocano. Match the language they use.

- **Short messages.** Two or three lines. They are reading this one-handed.
- **Plain words.** "How much did the feed cost?" not "what was the unit acquisition cost".
- **Numbers they gave you, repeated back.** That is how they check your work.
- **Never lecture about farming.** They know pigs. You know filing. Stay in your lane —
  and when you do flag something (a weight that dropped, a cost that jumped), show the
  numbers and let them draw the conclusion.
- **Ask before assuming.** A missing weigh-in is a question, not a gap to fill with math.

---

## Don'ts

- Don't invent data, ever — not weights, not prices, not dates. `TBD` is a valid value.
- Don't rewrite history to make a table tidy.
- Don't add a database, a CSV export, a second build script, or a JavaScript framework.
  The value of this repo is that it stays readable with no tools.
- Don't move forward state out of `index.html` into scattered markdown files.
- Don't restructure the directories without asking. An agent six months from now is
  relying on this layout, and so is the farmer.
- Don't commit anything the farmer would not want public if they later push this repo:
  buyer names, exact farm location, phone numbers. Ask before recording those.
