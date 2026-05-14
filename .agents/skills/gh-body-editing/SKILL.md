---
name: gh-body-editing
description: Instruction for editing multi-line GitHub issue or PR.
---

When editing a multi-line GitHub issue or PR body follow these steps:
1. Fetch the current body to /tmp (`gh (issue|pr) view <n> --json body --jq '.body' > /tmp/issue_<n>_body.md`)
2. Edit the body file as needed
3. Update the GitHub issue or PR with the edited content using `--body-file`
