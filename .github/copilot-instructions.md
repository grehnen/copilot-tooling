# {{PROJECT_NAME}} — Project Guidelines

{{One-sentence description of what the project does, who uses it, and how.}}

## General Principles

- Always prefer asking the user for input and clarification over making assumptions.
- ALWAYS use the question-tool (vscode/askQuestions) when asking the user questions, and always provide your recommended answer.
- Always select the appropriate skill for a specific task. Be sure to ALWAYS explicitly write in the chat when a skill is currently being used.
- Follow best practices for code quality, readability, and maintainability. Use descriptive variable and function names, write modular code, and use comments only when necessary, such as when explaining complex logic or decisions.
- Avoid writing duplicated code and instead create reusable functions or components. If you find yourself writing the same code more than once, consider refactoring it into a shared utility or component.

## Tech Stack

<!-- List the key technologies, frameworks, and libraries used in the project. -->
<!-- Example: -->
<!-- - **Frontend**: React + TypeScript, Vite, Bun -->
<!-- - **Styling**: styled-components -->
<!-- - **Backend**: Express, PostgreSQL -->
<!-- - **APIs & Libraries**: ... -->

## Structure

<!-- Describe the project's directory layout so the agent understands where things live. -->
<!-- Example: -->
<!-- - `src/` — App source code -->
<!--   - `src/components/` — React components -->
<!--   - `src/hooks/` — Custom React hooks -->
<!--   - `src/services/` — API clients and business logic -->
<!--   - `src/types/` — TypeScript type definitions -->
<!--   - `src/utils/` — Pure utility functions -->
<!-- - `public/` — Static assets -->

## Key Workflows

<!-- Describe the main user-facing or developer-facing workflows the agent should understand. -->
<!-- Number them and use arrows (→) to show the flow of data/actions. -->
<!-- Example: -->
<!-- 1. **Auth**: User signs in → OAuth redirect → token exchange → session created. -->
<!-- 2. **Core Feature**: User does X → app fetches Y → processes Z → outputs result. -->

## Build & Dev Commands

```bash
# Fill in the commands relevant to your project and package manager.
# Example:
# bun install           # Install dependencies
# bun run dev           # Start dev server
# bun run build         # Production build
# bun run test          # Run tests
# bun run lint --fix    # Lint and auto-fix
```
