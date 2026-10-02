# Mratunjay Pandey — Premium Portfolio (Vercel Ready)

A static, premium dark portfolio rebuilt from scratch. The dark-mode toggle has been removed; the site uses one consistent premium theme.

## Included

- Custom MP monogram logo and wordmark
- Responsive glass header + mobile navigation
- Smooth reveal animations
- Fast RAF-based cursor on pointer devices
- Magnetic buttons and subtle 3D tilt cards
- Scroll progress bar
- Animated counters
- Project filter tabs
- Skills, projects, achievements, certifications and coding profiles
- Resume download
- Mailto contact form (no backend required)
- SEO metadata, manifest, robots and sitemap
- Vercel-ready `vercel.json`

## Resume

The supplied updated resume is included at:

`assets/Mratunjay_Pandey_Resume.pdf`

## Main profile links

- LinkedIn: https://www.linkedin.com/in/mratunjay-pandey/
- GitHub: https://github.com/mratunjaypandey
- Codolio: https://codolio.com/ (replace with your exact personal Codolio profile URL when available)
- Existing portfolio: https://mratunjaypandey.rf.gd

## Project demo links

The site uses the live URLs available from the project information already provided:

- STG.FORENSICS: https://steganalysis.vercel.app/
- Portfolio: https://mratunjaypandey.rf.gd

Digital Saathi is configured to use `https://digital-saathi.vercel.app/` as its live-demo target; update it in `index.html` and `project-details.js` if your final deployment URL differs. RecoverAI uses its case-study page because no personal live-demo URL was supplied.

## Run locally

1. Open the folder in VS Code.
2. Use the VS Code Live Server extension, or run:

```bash
python -m http.server 5500
```

3. Open http://localhost:5500

## Deploy on Vercel

### GitHub

```bash
git init
git add .
git commit -m "Premium portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Import the repository into Vercel. No build command is needed.

### Vercel CLI

```bash
npm i -g vercel
vercel
```

Then use `vercel --prod` for production.