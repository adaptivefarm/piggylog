# Agents

Any agent working in this repo — Claude Code, Codex, Cursor, a chat app with file
access — reads the same two files:

1. **[`CLAUDE.md`](CLAUDE.md)** — what this repo is, the record pattern, the setup
   interview for a new farm, and the cardinal rules. Read it first, all of it.
2. **[`RECORDKEEPING.md`](RECORDKEEPING.md)** — the event → action table, record
   formats, and when to redo the forecasts. Read it before writing any record.

Claude Code will also auto-load the `piggylog-recordkeeping` skill in
`.claude/skills/`. That skill is a thin pointer to the same two files — there is no
third source of truth, and nothing in it that other agents are missing.

If the farmer is talking to you through a chat app with no file access, you can still
help: walk them through the setup questions in `CLAUDE.md`, then give them finished
file contents to paste in. The formats are plain markdown for exactly this reason.

**Working alongside other agents:** check `git status` before assuming a change in the
tree is yours. Never revert an edit you did not make.
