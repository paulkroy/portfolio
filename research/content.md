# Developer Portfolio Content Research (frontend / full-stack roles)

Scope: what goes on the site and how it is written. Caveat up front: nearly every source below is a career blog, bootcamp/vendor article, or one reviewer's opinion. I found no rigorous hiring data, and I could not retrieve actual Reddit or Hacker News threads. Where several independent sources agree I call it "consensus"; otherwise it is "opinion".

## Key takeaways

1. Lead with work, not biography. Homepage = one-line identity (role + stack + what you build) + contact + your best 2-4 projects. Long bios and skill lists push projects below the fold.
2. Show 3-4 finished projects (max 5), each demonstrating something different. "3 polished projects beat 10 incomplete ones."
3. Write a real case study for your top 2-3: problem, your role, decisions and trade-offs, result, live link + repo. Screenshots show what it looks like; case studies show how you think.
4. Skip tutorial clones (to-do, weather, calculator, Netflix/Spotify clones) unless heavily extended. Prefer a real problem you felt, a deployed end-to-end product, client work, or a merged open-source contribution.
5. Drop skill bars and percentage charts. List technologies with context ("React, 3 projects") and let projects prove the level.
6. Make the hero concrete. "Frontend engineer focused on React, TypeScript and accessible UI" beats "I create beautiful digital experiences."
7. Keep About to 2-3 specific sentences, with one real detail or story rather than filler.
8. Put your email in the hero and footer; add GitHub, LinkedIn and a PDF résumé. A contact form is optional.
9. Basics are a hiring signal in themselves for a frontend candidate: keyboard navigation, contrast, responsive layout, fast load, no broken links, custom domain.
10. Never invent metrics or claim team results as personal ones. If you have no numbers, describe the shape of the work and your contribution.

## 1. Sections: what to include

**Consensus (multiple sources):** projects are the core; contact is mandatory; about is short.
- Scrimba suggests about 5 pages (home, project pages, about, contact), with core sections of projects, case studies for top work, tech stack, about/contact/social, and a downloadable résumé [1].
- DevPlaybook describes a 60-second review: homepage, one featured project, a code scan, then GitHub. It says to state title and primary stack above the fold, with location and availability, and to put projects in the first two sections before any long bio [6]. (Vendor blog; the 60-second figure has no stated data.)
- GreatFrontend proposes six parts: Home, Selected work, Technical notes, Code samples, Experience, Contact. Home should state your frontend lane, seniority, strongest work and contact links [7].

**Suggested structure for this site:** Hero -> Selected work (3-4 cards) -> Case study pages -> Short About -> Experience (if any; roles, scope, stack) -> Contact + résumé PDF. Writing and testimonials are optional extras.

**Noise / optional:** a standalone skills section, long timelines, generic freelancer-style "services" cards when applying for jobs (Lynch [3]), and showing the portfolio site itself as a project [3].

**Audience split (opinion, one design-studio reviewer):** mixing job-application and freelance pitches weakens both; targeting a specific role beats generic breadth [2]. Since the targets are agencies and product companies, keep one voice ("frontend/full-stack engineer") and tag projects by type.

## 2. Projects: how many and which

- **Count:** 3-5 (Scrimba [1]); 3-4 (DevPlaybook [6]); 2-3 well-documented is the "sweet spot" (Levelop [5]). Consensus: fewer and finished. Each should show a different skill [1].
- **Kinds that impress:** a real problem you felt yourself (good interview material), an end-to-end deployed product with sensible error and empty states, a merged open-source contribution (shows you can work in an unfamiliar codebase and take review), and for backend-leaning roles a deep technical build such as a rate limiter or job queue [5]. Scrimba adds API dashboards, full-stack CRUD with auth and deployment, and AI apps that go beyond a thin API wrapper [1]. Wave lists work for well-known clients, technically difficult projects, and projects you led [8].
- **GreatFrontend's frontend-specific ideas:** a data-heavy dashboard with loading/empty/error states and keyboard-accessible actions, a design-system slice explaining API decisions, and a performance case study (what was slow, how measured, the trade-off) [7].
- **Red flags:** tutorial clones (calculator, weather, tic-tac-toe, movie finder, site clones) signal copying rather than building [3][5]; unrelated projects [3]; dead demos, no README, abandoned repos, non-responsive layouts, stale content [1][6]; passing off course projects as your own [4]. Reviewers check Git history, so exaggerating your contribution to group work backfires [2].
- **Nuance:** clones are acceptable if substantially extended with original features [1][4]. Lynch suggests original data sources (a surf-report app rather than a stock weather app) [3]. Levelop adds that as AI makes boilerplate cheap, judgment about what to build and cut matters more [5] (opinion).

## 3. Case studies

Sources converge on the same skeleton (consensus on shape, differing on order):
- Scrimba: problem -> approach and technical decisions -> challenges -> result with live link or metrics -> what you'd do differently [1].
- GreatFrontend: Problem, Context, My role, Frontend decisions, Tradeoffs, Quality, Result, Next. It favors precision, for example "Split table state from server state so filters could be shared through links and restored after refresh"; and "Do not invent impact" [7].
- Levelop: put design notes in the form "I chose X over Y because Z, and this is the tradeoff I accepted"; in READMEs answer what/why/what was hard on the first screen, setup lower down [5].
- Lynch: give each project a story: why you built it, what challenged you and how you got unstuck, what you learned, your process [3].
- Practical: project cards show name, one-line description, stack, and both live demo and GitHub links [6]. No live demo? A short unlisted video walkthrough substitutes [6].

### Reusable case-study template

```
# [Project name] - [one-line outcome, e.g. "Booking app that cut checkout from 5 steps to 2"]

Role: [what YOU did; solo/team] | Timeline: [dates] | Stack: [tech]
Links: Live demo | Source code | (optional) 2-min video

## Problem
Who has what problem? Why does it matter? (2-4 sentences)

## Context / constraints
Deadline, team size, existing codebase, device targets, accessibility needs.

## My role
Exactly which parts you designed/built. Be honest about what the team did.

## Decisions and trade-offs
- I chose X over Y because Z; the cost I accepted was ___.   (repeat 2-4 times)
- Include one code snippet, diagram, or before/after screenshot.

## The hard part
The bug / performance issue / design problem; how you diagnosed and fixed it.

## Quality
Accessibility, performance (measured), tests, responsiveness, error states.

## Result
Real numbers (users, load time, conversion, hours saved) or an honest qualitative result.
No production metrics? Say so and give what you measured locally.

## What I'd do differently / next
```

## 4. Hero headline and About

- **Hero:** state what you do concretely. GreatFrontend's good example: "focused on React, TypeScript, design systems, and data-heavy product UI"; bad example: "I create beautiful digital experiences that delight users," which could describe anyone [7]. DevPlaybook: add location and availability, and put your email in hero and footer [6].
- **About length:** Scrimba: 2-3 sentences covering who you are, your focus, what you're looking for [1]. Avoid massive about sections that push projects below the fold [1].
- **Tone (opinion):** Lynch wants it engaging and story-driven, tested by whether an interviewer would bring up something from it [3]. Scrimba warns against boastfulness and recommends humility [4]. I found no fetched source that explicitly names "passionate developer" as a cliché; the underlying principle (generic copy that fits anyone) is supported by [3] and [7].
- **Formula:** "[Role] who builds [kind of thing] with [2-3 core techs]. Based in [Y], available for [X]." Then 2-3 sentences: one concrete detail or origin, what you care about in the work (accessibility, performance), what you want next.

## 5. Skills

**Strong consensus: no skill bars or percentages.** Scrimba calls them "meaningless" [1] and says they can hurt your reputation [4]; Lynch says remove them first [3]; the 50-portfolio reviewer says they are hard to interpret and reviewers mainly want to know what you're learning and confident with [2]. If you show logos, label them, since non-technical viewers may not recognize icons [4]. Better: a short grouped list with context ("React - 3 shipped projects") [1], or skills tied to projects. A reviewer also noted that reliance on Bootstrap/jQuery makes people doubt your plain CSS/JS [2].

## 6. Blog, testimonials, GitHub, résumé

- **Blog (weak signal, opinion):** not a required section. GreatFrontend: technical writing is proof "if it shows practical judgment" (e.g. short notes on server vs client state) [7]. Levelop suggests one post on a hard decision, doubling as interview rehearsal [5]. A stale blog hurts; publish 1-3 good posts or none (my judgment).
- **Testimonials (optional):** Wave lists awards and testimonials as social proof [8]. Most useful for client/agency work; one genuine, named testimonial beats several anonymous ones (my judgment).
- **GitHub:** DevPlaybook: profile README, recent activity, manually pinned 6 best repos; each repo needs a README, readable code, tests, meaningful commit messages [6]. Levelop: pin 2-3 best; abandoned repos signal poor follow-through [5].
- **Résumé:** include a PDF download and LinkedIn [1]. Hover survey (121 professionals, reported via Wave): 86% will look at a portfolio if offered, only 38% say it's important, 71% say quality influences hiring [8]. Reading: portfolios are rarely required, but when seen they can sway the decision. Small sample, secondary source.

## 7. Content mistakes that lose readers

1. Generic hero/About that fits anyone [3][7].
2. Projects buried under bio, skills or animations [1][7].
3. Screenshots without explaining decisions [7].
4. Tutorial clones or unrelated projects [3][5].
5. Dead demos, missing README, missing repo/live links [1][2][6].
6. Skill bars, unlabeled logo walls [1][4].
7. Overclaiming team work or inventing metrics [2][7].
8. Hard-to-find contact info; contact-form-only [6][7].
9. Careless details: typos, broken links, low contrast, no keyboard navigation, poor mobile layout; reviewers scan, so they notice instantly [2]. Accessibility was the biggest issue in that 50-portfolio review [2].
10. Stale content; no custom domain [1][3][8].
11. Polishing extras (animations, dark mode) before the basics are solid [3].

## Consensus vs opinion

- **Well supported (3+ sources):** few finished projects; no tutorial clones; explain decisions, not just visuals; no skill bars; concrete hero; easy contact; working live demos and READMEs.
- **Single-source opinion:** unconventional nav helps you stand out [2]; blogging as interview prep [5]; start from a template if weak at design [4]; story-driven About [3].
- **Weak data:** all percentages and "60 seconds" claims come from vendor blogs.

## Sources (pages actually fetched and read)

1. Scrimba, How to Build a Web Developer Portfolio That Gets You Hired - https://scrimba.com/articles/how-to-build-a-web-developer-portfolio-that-gets-you-hired
2. James Y Rauhut, I reviewed fifty portfolios on Reddit (freeCodeCamp) - https://www.freecodecamp.org/news/i-reviewed-fifty-portfolios-on-reddit-and-this-is-what-i-learned-e5d2b43150bc/
3. Peter Lynch, How to level up your developer portfolio (freeCodeCamp) - https://www.freecodecamp.org/news/level-up-developer-portfolio/
4. Scrimba, Common web developer portfolio mistakes - https://scrimba.com/articles/web-developer-portfolio-mistakes/
5. Levelop, The developer portfolio that lands interviews (beyond the to-do app) - https://levelop.dev/blog/the-developer-portfolio-that-lands-interviews-beyond-the-to-do-app
6. DevPlaybook, Developer Portfolio Checklist: 20 Things Hiring Managers Look For - https://devplaybook.cc/blog/developer-portfolio-checklist-20-things-hiring-managers
7. GreatFrontend, Frontend Developer Portfolio: What to Build and How to Stand Out in 2026 - https://www.greatfrontend.com/blog/frontend-developer-portfolio
8. Wave, How to build the perfect front end developer portfolio (cites Hover survey) - https://www.waveapps.com/freelancing/front-end-developer-portfolio

Seen only in search snippets, not fetched (not relied on for specifics): Codecademy and AlgoCademy results on résumé/testimonials.
