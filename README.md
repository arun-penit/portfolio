# Arun Rawat — Portfolio

Personal portfolio of Arun Rawat, Applied AI & Full-Stack Engineer.

**Stack:** Next.js 16 (App Router, static generation) · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lenis

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Edit content

All content lives in one file: `src/lib/data.ts` — profile, metrics, case studies, experience, skills,
education and leadership. Add a case study to the `caseStudies` array and it automatically gets a card,
its own page at `/work/<slug>`, a command-palette entry and a sitemap entry.

- Photo: `public/arun.png`
- Résumé: `public/resume.pdf` (replace the file to update the download)

## Deploy (Vercel — free)

1. Push this folder to a new GitHub repo.
2. Import it at https://vercel.com/new (framework is auto-detected).
3. Add the env var `NEXT_PUBLIC_SITE_URL` = your final URL (e.g. `https://arunrawat.dev`) —
   used for SEO canonical URLs, sitemap and social preview images.
4. Deploy. Optionally attach a custom domain under Project → Settings → Domains.

Also works on Netlify, Cloudflare Pages or any Node host (`npm run build && npm start`).
