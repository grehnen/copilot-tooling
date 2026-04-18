# HTML Output Reference

## Default file placement

- Save generated HTML files in `.agents/output/`
- Prefer a descriptive filename such as `feature-slide-deck.html`
- Keep the deck self-contained unless the user explicitly asks for extra assets

## Minimal template

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Slide Deck</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
    />
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
