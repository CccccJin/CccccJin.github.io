# CccccJin.github.io

A static personal website for Changjin He, focused on robotics, AI, computer vision, software engineering, and practical mechatronics experience. The site is built as a lightweight single-page React application and is ready for GitHub Pages deployment.

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

This project uses `base: './'` in `vite.config.ts`, so it works for the user site repository:

```text
https://CccccJin.github.io/
```

## Editing Content

Most personal content is centralized in these files:

- `src/data/profile.ts` - name, intro, contact links, education
- `src/data/projects.ts` - project descriptions, tech stacks, links
- `src/data/experience.ts` - work experience entries
- `src/data/skills.ts` - skills grouped by category

Replace the placeholder links before publishing:

- Email: `mailto:TODO-email@example.com`
- GitHub: `https://github.com/CccccJin`
- LinkedIn: `https://www.linkedin.com/in/TODO-linkedin-profile`
- CV: `./cv-placeholder.pdf`

If you add a CV PDF, place it in the `public/` directory and update the `CV` link in `src/data/profile.ts`.
