# febwebdev.github.io

Personal portfolio for **Febe — Front-End WordPress Developer**.

## Before publishing

There is one required edit:

1. Open `index.html`.
2. Find `ADD-YOUR-EMAIL-HERE`.
3. Replace it with the email address you want employers/clients to use.

Example:

```html
data-email="hello@example.com"
```

## Optional edits

### Change your displayed name
Search for `Febe` in `index.html`.

### Add a resume button
A good place is inside `.hero-actions` near the "View selected work" button.

Example:

```html
<a class="button button-secondary" href="assets/Febe-Resume.pdf" target="_blank">
  View resume
</a>
```

Then place your PDF inside the `assets` folder.

### Replace project mockups with screenshots later
The current portfolio intentionally uses CSS-built project mockups, so it works without any image files.
When you have NDA-safe screenshots, you can replace each `.project-preview` block with an `<img>`.

### Update the project copy
All project descriptions are in `index.html`. Keep them short and outcome-focused:
- what the problem was
- what you built/fixed
- technologies used
- result or benefit

## Local preview

You can double-click `index.html`, but for the most accurate local behavior it is better to use a tiny local server.

If you have Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Publish to GitHub Pages

For the repository:

```text
febwebdev.github.io
```

Upload/push the contents of this folder to the **main** branch.

Your site should then be available at:

```text
https://febwebdev.github.io/
```

## File structure

```text
febwebdev-portfolio/
├── index.html
├── README.md
├── .nojekyll
└── assets/
    ├── favicon.svg
    ├── og-image.svg
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

## Notes

- No framework or build step is required.
- No third-party JavaScript dependencies.
- Responsive navigation is included.
- Reduced-motion accessibility is supported.
- The design uses system fonts, so there is no external font dependency.
- GitHub Pages can serve this site directly.
