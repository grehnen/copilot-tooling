---
name: html-output
description: Presents results as a single-file HTML slide deck styled with Pico CSS. Use when the user tells the agent to use HTML as the output format, asks for HTML output.
---

# HTML Output

Format the deliverable as one self-contained HTML file that renders as a slide deck. Do not return Markdown, PDF, or split assets unless the user explicitly asks for them.

## Quick start

When this skill applies, create a complete HTML document that:

- Uses this exact stylesheet in the `<head>`:
  `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">`
- Presents the content as slides, not a long scrolling page
- Keeps everything in a single file unless the user asks for extra assets
- Adds only minimal inline CSS or JavaScript for layout, navigation, or print behavior

## Workflow

### 1. Shape the content into slides

- Start with a title slide
- Keep each slide focused on one idea
- Split dense content across multiple slides instead of overflowing one slide
- Add a closing or summary slide when it helps the presentation

### 2. Build the HTML deck

- Return a full `<!doctype html>` document
- Use semantic HTML with clear headings for each slide
- Represent each slide with a sectioning element such as `<section>` or `<article>`
- Layer only lightweight custom styles on top of Pico CSS

### 3. Keep the deck portable

- Do not require a build step
- Do not introduce extra dependencies beyond Pico CSS unless the user explicitly asks
- Prefer embedded content over separate files

## Output rules

- Deliver exactly one HTML file unless the user asks for more
- Use Pico CSS via:
  `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">`
- Treat the response as a slide deck, not a generic HTML page
- Include navigation, speaker notes, or print styling only when useful or requested

## Minimal template

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Slide Deck</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" />
  </head>
  <body>
    <main class="container">
      <section>
        <h1>Title</h1>
        <p>Subtitle or summary</p>
      </section>
    </main>
  </body>
</html>
```
