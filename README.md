# CccccJin.github.io

A static personal website for Changjin He, focused on robotics, embodied AI, computer vision, software engineering, and practical mechatronics experience. The site is built as a lightweight single-page React application and is ready for GitHub Pages deployment.

Target website URL:

```text
https://CccccJin.github.io/
```

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production output is generated in `dist/`.

## GitHub Pages Deployment

1. Create a GitHub repository named `CccccJin.github.io`.
2. Push this project to the repository's `main` branch.
3. In GitHub, open Repository Settings -> Pages.
4. Set Source to GitHub Actions.
5. Push to `main` or run the workflow manually from the Actions tab.
6. Check Actions for the deployment result.

This project uses `base: './'` in `vite.config.ts`. For a user-site repository such as `CccccJin.github.io`, either `/` or `./` works; `./` is kept because it also remains robust if the site is previewed from a subdirectory or reused as a project site.

```text
https://CccccJin.github.io/
```

## Editing Content

Most personal content is centralized in these files:

- `src/data/profile.ts` - name, intro, contact links, and education
- `src/data/projects.ts` - project descriptions, technical focus, tech stacks, and links
- `src/data/experience.ts` - work experience entries
- `src/data/skills.ts` - skills grouped by category

Current public links:

- Email: `mailto:che917@aucklanduni.ac.nz`
- GitHub: `https://github.com/CccccJin`
- LinkedIn: `https://www.linkedin.com/in/changjin-he-908a2531a/`
- CV: `./cv-placeholder.pdf`

The current CV link points to a placeholder PDF in `public/`. Replace `public/cv-placeholder.pdf` with the final resume PDF when ready, or update the `CV` link in `src/data/profile.ts`.

Check visitor stats:
```bash
npm run stats
```
