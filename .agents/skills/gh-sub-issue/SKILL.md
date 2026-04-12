---
name: gh-sub-issue
description: Manage GitHub sub-issues (parent-child issue relationships) using the gh-sub-issue CLI extension. Use when creating, linking, listing, or removing sub-issues, or when building hierarchical task structures in GitHub.
---

# gh-sub-issue

GitHub CLI extension for managing parent-child issue relationships. See [EXAMPLES.md](EXAMPLES.md) for workflows.

## Command reference

| Command | Syntax | Key flags |
|---|---|---|
| add | `gh sub-issue add <parent> <child>` | `--repo` |
| create | `gh sub-issue create --parent <n> --title <t>` | `--body` `--label` `--assignee` `--milestone` `--project` `--repo` |
| list | `gh sub-issue list <parent>` | `--state {open\|closed\|all}` `--limit` `--json <fields>` `--web` `--repo` |
| remove | `gh sub-issue remove <parent> <child> [child...]` | `--force` `--repo` |

`<parent>` and `<child>` accept issue numbers or full GitHub URLs.

### `--json` fields
`number`, `title`, `state`, `assignees`, `labels`, `parent.number`, `parent.title`, `total`, `openCount`

## Troubleshooting

| Error | Fix |
|---|---|
| command not found | `gh extension install yahsan2/gh-sub-issue` |
| authentication required | `gh auth login` |
| permission denied | ensure write access to the repo |

Debug: `GH_DEBUG=1 gh sub-issue list 123`

## Installation

```sh
gh extension install yahsan2/gh-sub-issue
gh extension upgrade sub-issue   # update
```
