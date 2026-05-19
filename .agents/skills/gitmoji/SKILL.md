---
name: gitmoji
description: Write a commit message using gitmoji. Use when writing a git commit, suggesting a commit message, or when asked to gitmoji a message.
---

# Gitmoji Commit Messages

Always generate **exactly one** commit message — never a list, never one per file.

Summarize all changes together in one subject line. Prefix it with the most SPECIFIC emoji that represents the overall change.

Format: `<emoji> <imperative summary>` (≤72 chars). Only write a body if deemed absolutely necessary. Use the emoji character, not the `:code:`.

Emoji definitions: [./references/gitmojis.md](./references/gitmojis.md)

Output the commit message in markdown format inside a code block.

## Shortcommands

When the skill is invoked with one of the shortcommands below, follow the instructions for that command.

- `/gitmoji` or `/gitmoji staged`: write a commit message for all staged changes.
- `/gitmoji chat`: write a commit message for changes from this chat session.
- `/gitmoji all`: suggest a commit message for all staged and unstaged changes.
- `/gitmoji split`: help the user split all the current changes into multiple distinct commits.
