---
name: html-output
description: Presents results as a single-file HTML slide deck styled with Pico CSS. Use when the user tells the agent to use HTML as the output format, asks for HTML output.
---

# HTML Output

Produce a single self-contained HTML slide deck in `.agents/output/`. Default to one HTML file with no build step or extra assets unless the user explicitly asks for them.

## Requirements

- Return a full `<!doctype html>` document
- Use this exact Pico CSS stylesheet in the `<head>`:
  `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">`
- Default to dark mode with `data-theme="dark"` on `<html>`
- Treat the document as a slide deck, not a generic long page
- Use semantic slide sections and a sidebar `#page-index` with one link per slide
- Keep the current slide highlighted in the sidebar
- Support keyboard navigation: Up/Right goes to the next slide, Down/Left goes to the previous slide
- Keep inline CSS and JavaScript minimal and limited to layout, navigation, or print behavior

## Workflow

1. Shape the content into focused slides: start with a title slide, keep one idea per slide, split dense material across slides, and add a closing slide when it helps.
2. Start from [TEMPLATE.html](TEMPLATE.html) and replace the placeholder content instead of rebuilding the shell from scratch.
3. Save the final deck in `.agents/output/` with a descriptive filename such as `feature-slide-deck.html`.
