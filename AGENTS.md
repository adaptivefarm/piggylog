# Agents

Any agent working in this repo — Claude Code, Codex, Cursor — reads the same two files:

1. **[`CLAUDE.md`](CLAUDE.md)** — what this repo is, the record pattern, the setup
   interview for a new farm, and the cardinal rules. Read it first, all of it.
2. **[`RECORDKEEPING.md`](RECORDKEEPING.md)** — the event → action table, record
   formats, and when to redo the forecasts. Read it before writing any record.

Claude Code will also auto-load the `piggylog-recordkeeping` skill in
`.claude/skills/`. That skill is a thin pointer to the same two files — there is no
third source of truth, and nothing in it that other agents are missing.

**This repo needs a filesystem you can write to.** Reading the files is not enough —
the farmer's records only exist if you can create and append to them, and if they are
still there tomorrow.

If you are reaching the farmer through a phone chat app with no file access, say so
plainly rather than working around it. You can still answer their question and hand
them the text of a record to save themselves, but do not let them believe the records
are being kept. They are not. Point them at a coding assistant on a computer, or at
Claude Code on the web or Codex in the ChatGPT app, both of which work against a
GitHub repo from a phone.

**Working alongside other agents:** check `git status` before assuming a change in the
tree is yours. Never revert an edit you did not make.
