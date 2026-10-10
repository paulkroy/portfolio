# Portfolio Research — Summary

Target roles: frontend/web developer and full-stack/software engineer.

Detailed reports (each with inline citations and a sources list):
- [design.md](design.md) — visual design, layout, motion, example portfolios
- [content.md](content.md) — sections, project selection, case-study template, copywriting
- [ui-ux.md](ui-ux.md) — navigation, mobile, performance, accessibility, pre-launch checklist
- [hiring-perspective.md](hiring-perspective.md) — recruiters vs. agencies vs. engineers

## A note on the evidence

There is very little hard data on how people review developer portfolios. Most of what the reports say comes from career blogs, articles by hiring managers, and published portfolio reviews. The agents couldn't reach any usable Reddit or Hacker News threads. Several popular statistics turned out to be unsourced and were left out, for example "73% of hiring managers value a portfolio over a résumé". The one hard number is the Ladders eye-tracking study, which found about 7.4 seconds per résumé, and even that is contested. Each report labels its claims as **data**, **consensus**, or **opinion**. All four reports agree on the points below.

## The core idea: design for a skim, reward a dig

Reviewers skim first. Recruiters often never open the portfolio at all, and hiring managers glance at it to check for red flags. The site should work in layers:

1. **Skim layer (first screen).** Who you are, what you build, your best work, and how to contact you.
2. **Craft layer.** The site itself. For frontend roles, the portfolio is a work sample: it should be fast, accessible, responsive, and free of errors.
3. **Depth layer.** Short case studies, plus live demos and source repos.
4. **Credibility layer.** Résumé PDF, GitHub, LinkedIn, and the source code for this site.

## How the three audiences differ

| | Recruiters | Web agencies | Engineers / EMs |
|---|---|---|---|
| Time spent | Seconds; may skip the site entirely | Short, but they look at the visuals | Short, unless something hooks them |
| Looks for | Role, stack keywords, contact details, résumé | Visual polish, range, client-ready work | Depth, decisions, code quality, honest scope |
| Turned off by | Unclear role, hard-to-find info | Dated or templated look, sloppy details | Tutorial clones, broken demos, inflated claims |

## Priorities, ranked

### Must-do
1. **Make the hero concrete:** your role, your stack, and what you build. Avoid lines like "I build things for the web" or "passionate developer".
2. **Put the work first.** Show 3–4 finished projects, each proving something different, and place them above any long About or skills section.
3. **Give every project a live demo and a source link.** Broken links, localhost demos, and screenshot-only projects are the most frequently cited red flag.
4. **Write case studies for your top 2–3 projects:** the problem, your role, your stack, key decisions and trade-offs, the result, and links. Don't invent metrics. A template is in `content.md`.
5. **Make contact easy:** a `mailto:` link in both the hero and the footer, plus GitHub, LinkedIn, and a résumé PDF.
6. **Design mobile-first.** Recruiters often open links on their phones.
7. **Cover the accessibility basics:** semantic HTML, keyboard navigation, sufficient contrast, and support for `prefers-reduced-motion`.

### Should-do
8. **Keep the design restrained:** one typeface, one accent colour, generous whitespace, and a strong visual hierarchy. Brittany Chiang's site is the most-cited model.
9. **Use visible navigation with 3–4 links.** Avoid a hamburger menu on desktop.
10. **Hit good performance numbers:** Lighthouse 90+, LCP ≤ 2.5s, CLS ≤ 0.1, and explicit dimensions on every image.
11. **Add the polish details:** a custom domain, a favicon, Open Graph tags and image, a unique title and description, a clean console, a custom 404 page, and a link to the site's repo.

### Avoid
- Skill bars, percentages, and unlabelled logo walls
- Tutorial clones such as to-do, weather, or Netflix-clone apps, unless you extended them substantially
- Splash screens and loaders, scroll-jacking, custom cursors, and long intro animations
- Heavy 3D or creative gimmicks, unless that skill is exactly what you're applying for

### Optional (weak signals)
- A blog or other writing, testimonials, and GitHub contribution graphs

### Standing out now that AI makes polish cheap
Reviewers are increasingly drawn to evidence of real work: projects with real users, iteration after launch, meaningful commit history, and write-ups that explain *why* you made your choices.

## Gap analysis: current site (`public/index.html`)

| Area | Current | Needed |
|---|---|---|
| Hero | "I build things for the web. This site is a work in progress." | Concrete role + stack line; drop "work in progress" |
| Projects | 3 placeholder cards with no links | Real projects with live and source links, plus case studies for the top 2–3 |
| Section order | About before Projects | Projects before About (or a short About in the hero) |
| Contact | Email at the bottom only | Email in the hero as well, plus GitHub, LinkedIn, and a résumé PDF |
| Meta | Generic description, no OG tags or favicon | Specific description, OG tags and image, favicon |
| Domain | `*.workers.dev` | Custom domain |
| Source | Not in git | Public repo linked from the footer |
