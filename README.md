# Portfolio

🌐 **[مشاهدهٔ سایت پرتفولیو](https://theboiamirman.github.io/Portfolio/)**

Static bilingual data portfolio for GitHub Pages. Plain HTML, CSS, JavaScript and JSON; no database or build step.

## Content

Each project links to its own HTML page under `projects/`, identified by `slug`. Edit the page's `project-prose` article to add project explanations and actual experience as paragraphs and section headings. Text uses `data-fa` and `data-en` for both languages. Project cards have no images or illustrations.

Books support `notes` for your personal writing and `notePreview` for a short excerpt next to the cover. The full note is shown under “یادداشت من” in the reader. These fields are intentionally empty until real personal notes are supplied.

Edit `content.json`. `projects`, `writing` and `books` are arrays. Titles can be strings or bilingual objects: `{"fa":"عنوان", "en":"Title"}`. Entries support `url`; projects also support `category` (`engineering`, `analytics`, `football`), `tags` and an optional local `image`. Writing supports `date`; books support `author` and `status`, both optionally bilingual.

Example project (replace with a real project before publishing):

```json
{"title":{"fa":"عنوان پروژه","en":"Project title"},"category":"engineering","tags":["Python","SQL"],"url":"https://github.com/owner/repository"}
```

Writing and books support `image` (or `cover`), `imageAlt`, `summary`, and `body`. These text fields accept bilingual objects. `body` accepts a string with blank lines between paragraphs, or an array of bilingual paragraphs. Clicking a title or reading link opens the complete text in an accessible reading dialog; Escape closes it. Optional `url` appears as an original-source link. No HTML is injected from content.

Example book schema (illustrative; not published content):

```json
{"title":{"fa":"عنوان کتاب","en":"Book title"},"author":{"fa":"نویسنده","en":"Author"},"cover":"assets/books/cover.jpg","summary":{"fa":"خلاصهٔ کوتاه","en":"Short summary"},"body":[{"fa":"توضیحات کتاب","en":"Book description"},{"fa":"یادداشت من","en":"My notes"}]}
```

Language and theme preferences are saved locally. The default is Persian and dark. There are no decorative animations. Toolkit entries and translations are in `app.js`. No proficiency or credential levels are claimed.

Serve the repository root through GitHub Pages. All fonts and icons are local; see `assets/README.md` for attribution.
