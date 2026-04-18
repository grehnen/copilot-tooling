# HTML Output Reference

## Default file placement

- Save generated HTML files in `.agents/output/`
- Prefer a descriptive filename such as `feature-slide-deck.html`
- Keep the deck self-contained unless the user explicitly asks for extra assets

## Layout defaults

- Default the document to dark mode with `data-theme="dark"` on `<html>`
- Add a sidebar with `id="page-index"`
- Populate the page-index with the title of each slide
- Link each page-index entry to the matching slide section

## Minimal template

```html
<!doctype html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Slide Deck</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
    />
    <style>
      body {
        margin: 0;
      }

      .deck-layout {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: 18rem minmax(0, 1fr);
        min-height: 100vh;
        padding: 1.5rem;
      }

      #page-index {
        position: sticky;
        top: 1.5rem;
        align-self: start;
        max-height: calc(100vh - 3rem);
        overflow: auto;
      }

      .slides {
        display: grid;
        gap: 1.5rem;
      }

      .slide {
        min-height: 85vh;
      }

      @media (max-width: 960px) {
        .deck-layout {
          grid-template-columns: 1fr;
        }

        #page-index {
          position: static;
          max-height: none;
        }
      }
    </style>
  </head>
  <body>
    <main class="deck-layout">
      <aside id="page-index">
        <nav>
          <ul>
            <li><a href="#slide-1">Introduction</a></li>
            <li><a href="#slide-2">Plan</a></li>
            <li><a href="#slide-3">Summary</a></li>
          </ul>
        </nav>
      </aside>

      <div class="slides">
        <section class="slide" id="slide-1">
          <h1>Introduction</h1>
          <p>Subtitle or summary</p>
        </section>

        <section class="slide" id="slide-2">
          <h2>Plan</h2>
          <p>Key points for this slide.</p>
        </section>

        <section class="slide" id="slide-3">
          <h2>Summary</h2>
          <p>Closing content.</p>
        </section>
      </div>
    </main>
  </body>
</html>
```
