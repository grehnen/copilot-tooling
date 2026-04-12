# gh-sub-issue Examples

## Typical workflow

```sh
# Create parent issue
gh issue create --title "Feature: Auth System"   # → #100

# Create new sub-issues linked to parent
gh sub-issue create --parent 100 --title "Design DB schema" --label "database"
gh sub-issue create --parent 100 --title "Implement JWT tokens" --label "backend" --assignee "@me"

# Link an existing issue
gh sub-issue add 100 95

# Check progress
gh sub-issue list 100 --state all

# Unlink a sub-issue (does not delete it)
gh sub-issue remove 100 95 --force
```

## Cross-repository

```sh
gh sub-issue add 123 456 --repo owner/other-repo
gh sub-issue list 123 --repo owner/other-repo
```

## JSON output (for scripting)

```sh
gh sub-issue list 123 --json number,title,state,assignees
gh sub-issue list 123 --json parent.title,total,openCount
```
