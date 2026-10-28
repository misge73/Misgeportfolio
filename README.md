# Misgana — Professional Web Developer Portfolio

A premium, animated, responsive personal portfolio built with **HTML5, CSS3, and vanilla JavaScript**.
No frameworks or build step required.

## Project structure

```
misgana-portfolio/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── images/        # favicon, og-image, project screenshots (SVG placeholders)
│   └── cv/            # place your resume as cv.pdf
└── README.md
```

## Preview locally

Option 1 — open directly:
- Double-click `index.html` (some features like fonts need internet).

Option 2 — local server (recommended):
```bash
# Python 3
python -m http.server 8080

# Node (npx)
npx serve .
```
Then open http://localhost:8080

## Customize content

- **Name / headline / intro**: edit `index.html` hero section.
- **Contact details**: replace placeholders in `index.html` (about panel, contact cards) and `js/main.js` (mailto link).
- **Projects**: edit the `PROJECTS` array in `js/main.js`. Add screenshots to `assets/images/`.
- **Skills levels**: adjust `--level` in `index.html` skill cards.
- **Education / certificates**: edit the education section in `index.html`.
- **CV**: add your resume as `assets/cv/cv.pdf`.

## Contact form backend

The contact form currently uses a `mailto:` fallback (opens the user's email client).
It does **not** send email from the server. To make it a real form, integrate one of:

- **Formspree** / **Getform** / **FormSubmit** — change form `action` to their endpoint.
- A small PHP handler (`contact.php`) using `mail()` or PHPMailer, deployed on a PHP host.
- A serverless function (Netlify/Vercel) that forwards to your email.

Never put private API keys in frontend files.

## Deploy

- **GitHub Pages**: push to a repo, enable Pages on main branch root.
- **Netlify / Vercel**: drag-and-drop the folder or connect the repo.
- **Any static host**: upload all files keeping the folder structure.

## Accessibility & performance

- Semantic HTML, visible focus indicators, skip link.
- `prefers-reduced-motion` respected (animations disabled).
- Lazy-loaded images, no heavy dependencies.
- Lighthouse-friendly structure.

## Notes

- Personal contact details are configured (misganabekele167@gmail.com, github.com/misge73).
- Project demo/source links are empty placeholders until projects are deployed.
- Unfinished projects (e.g., WCUOCMS) are described honestly as "in development".
