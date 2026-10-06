# Portfolio

Static bilingual data portfolio for GitHub Pages. Plain HTML, CSS, JavaScript and JSON; no database or build step.

## Content

Edit `content.json`. `projects`, `writing` and `books` are arrays. Titles can be strings or bilingual objects: `{"fa":"عنوان", "en":"Title"}`. Entries support `url`; projects also support `category` (`engineering`, `analytics`, `football`), `tags` and an optional local `image`. Writing supports `date`; books support `author` and `status`, both optionally bilingual.

Example project (replace with a real project before publishing):

```json
{"title":{"fa":"عنوان پروژه","en":"Project title"},"category":"engineering","tags":["Python","SQL"],"url":"https://github.com/owner/repository"}
```

Language and theme preferences are saved locally. The default is Persian and dark. The animated role and decorative canvas respect reduced-motion preferences and can be paused. Toolkit entries and translations are in `app.js`. No proficiency or credential levels are claimed.

Serve the repository root through GitHub Pages. All fonts and icons are local; see `assets/README.md` for attribution.
