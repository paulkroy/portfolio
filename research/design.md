# Developer Portfolio: Visual Design Research

Target: frontend/web and full-stack roles (agencies, product companies). Site: plain HTML/CSS on Cloudflare Workers.

**Evidence caveat.** I did not find primary hiring data. Most sources are blogs, bootcamp articles and vendor roundups; several quote statistics with no traceable origin, and I have left those out. Searches for Reddit/HN threads returned no usable threads, so "community" views below come from a freeCodeCamp write-up of Reddit portfolio reviews and one DEV Community comment. Page fetches returned text only, so I could not see colours, fonts or animation on the example sites; notes on them are limited to what the text showed.

## Key takeaways

1. Reviewers spend "seconds, not minutes". The first screen must say who you are, what you do, and show real work (Scrimba).
2. Lead with 3-5 projects, each with live and source links. Put them above any long about or skills section.
3. Keep the design restrained: one typeface family, a small palette, generous whitespace, strong hierarchy. Let project screenshots supply the colour.
4. Accessibility is a visual-design signal for a frontend candidate: check contrast, keyboard navigation, mobile-first CSS, large tap targets (freeCodeCamp review).
5. Skip skill progress bars, stock hero art, and logo walls. List tech with context.
6. Motion: only subtle, quick and purposeful; respect `prefers-reduced-motion`. No long intro animations or custom cursors.
7. Use "creative" only where it demonstrates a skill you are applying for (Bruno Simon proves WebGL). For general frontend/full-stack roles, one or two well-crafted details beat a gimmick.
8. Make small, deliberate departures from the generic Intro > Skills > Projects > Contact template: your own voice, a distinctive detail, real screenshots.
9. Polish is the signal: no typos, no broken links, a working mobile layout, fast load (Lighthouse 90+), and a proper Open Graph image.
10. Give each top project a short case study: problem, approach, outcome, what you would change.

## 1. Layout and structure

**Consensus (multiple sources agree)**
- Hero with one call to action, then featured projects (2-4), concise skills, brief about, multiple contact options. Projects come before skills (DEV Community guide; Scrimba).
- Keep the site small. Scrimba suggests at most five pages: home with projects, a page per project case study, about, contact. A single page works for a short project list; use subpages for case studies.
- Brittany Chiang's site is one single column with a skip-to-content link, an About / Experience / Projects / Writing order, a numbered experience timeline, project cards with tags and screenshots, and a footer crediting its stack (observed, brittanychiang.com). Constance Souville's three-section site (About, Projects, Contact) is praised for putting what an employer needs above the fold (SiteGround, via search summary).
- Mobile matters: reviewers often check on phones. Scrimba and Lyrid both stress readable text and well-spaced tap targets.

**Single-source opinion**
- Separate portfolios for job hunting and freelance clients (freeCodeCamp author).
- Small navigation departures (e.g. right-side nav) to avoid a template look (same author). Treat as a prompt, not a rule.

## 2. Typography, colour, whitespace, dark/light

- Well-regarded personal sites keep to one family. Brittany Chiang's page is set entirely in Inter (observed). The minimal-site pattern in the DEV Community guide is a dark or neutral background, monospace or sans-serif type, and no stock photos.
- Contrast is the most concrete failure: the freeCodeCamp reviewer cites low contrast as a frequent problem and recommends the WebAIM contrast checker. Test every text/background pair.
- Whitespace: roundups describe the effective minimal portfolio as name, one-line description and a grid of projects, with lots of whitespace (Rockstar Developer University, via search summary).
- Dark/light: Josh Comeau's site has a toggle and separate dark and light portrait images (observed). For plain HTML/CSS, `prefers-color-scheme` plus CSS custom properties gives this cheaply. No source claims dark mode helps hiring; treat it as polish.
- My synthesis: one accent colour, a neutral scale, 2-3 type sizes on a clear scale, body text readable on mobile.

## 3. Personality vs minimalism

- **Consensus:** Substance over style. Real projects, clear communication of why and what impact, and fast loading outweigh flair (MentorCruise, OpenReplay, Scrimba, via search summaries).
- **Personality that works is voice and detail, not spectacle.** Josh Comeau's homepage is playful and informal ("friggin' cool", sparkle emoji, a joke on the bot-check label) over a feed of article cards (observed). Brittany Chiang keeps a clean layout with one playful touch, a clickable spinning TARDIS GIF labelled "Click to time travel" (observed). Cassie Evans's site currently shows a candid, understated "Thanks for reading" page (observed), so personality can be plain text.
- **When creative helps:** when the creative thing is the skill. Bruno Simon's site is a drivable 3D world (Three.js, Rapier, Howler.js) with achievements, a timed circuit and menus (observed). Elementor's roundup says it proves WebGL mastery without a resume line. It suits creative-development targets and is costly to replicate; risky for general frontend/full-stack roles.
- **When it hurts:** when it replaces project quality or slows the page. Scrimba says avoid complex animations. Maze-like navigation and hard-to-find projects drive visitors away (Lyrid).
- My inference: agencies are likelier to reward visible craft (a nice hover state, scroll reveal, view transition); product companies lean toward clarity and engineering judgement, where case-study content carries more weight (DEV Community guide: for mid-to-senior, present "engineering judgment, not aesthetics").

## 4. Motion, 3D and interactive flourishes

- Sources (blogs, no hard data) agree: keep animation subtle, short and non-blocking. A DEV Community commenter who says they reviewed 200+ applicants advised toning animations down and flagged custom cursors as a distraction (single anecdote). OpenReplay argues a long intro animation works against you with short-attention reviewers.
- Template vendors still promote particle backgrounds, typing effects and heavy hover effects; that is marketing, not hiring evidence.
- Practical rules (my synthesis): animate transform/opacity; roughly 150-400ms; never gate content behind an animation; honour `prefers-reduced-motion`; no autoplaying sound (Comeau offers a "Disable sounds" toggle, observed); keep Lighthouse 90+.
- 3D/WebGL only if you want creative-dev roles; otherwise a small contained demo on a project page is safer.

## 5. Common mistakes that look amateur or templated

From freeCodeCamp (Reddit review), Scrimba, Lyrid, DEV Community:
- Low colour contrast; no keyboard navigation.
- Skill progress bars ("85% Angular"); logo walls with no context.
- Desktop-only layouts or `max-width`-only media queries.
- Generic Intro > Skills > Projects > Contact with the same hamburger nav and stock hero art.
- Tutorial clones (to-do, weather, music-streaming copies); too many half-finished projects.
- Long about sections pushing projects below the fold; stale content.
- Broken demo links, typos, missing READMEs and write-ups.
- Mixing job-seeking and freelance audiences; showing work unrelated to the target role.
- Tiny text and tightly packed links on mobile.

## 6. Examples and what to learn

| Site | Learn |
|---|---|
| https://brittanychiang.com | Single column, one typeface, numbered experience timeline, tags, project cards with screenshots, one playful detail, stack credit in the footer. Clarity first. |
| https://www.joshwcomeau.com | Voice and polish: playful copy, dark/light variants, sound toggle, content-rich. Personality through writing and interaction details. |
| https://bruno-simon.com | Creative extreme: the site is the proof of WebGL skill, with usability affordances (map, menu, "I'm stuck!" respawn, keyboard/mobile/gamepad controls). Worth it only if that is your target job. |
| https://cassie.codes | Personality can be quiet and candid. I could only read a minimal text page, so I cannot comment on its visuals. |
| https://leerob.com | Text-first bio/notes/blog lists. A plain, content-led site is acceptable for a well-known engineer. (Fetch returned structure only.) |

I could not verify colours, fonts (beyond Inter) or animation on these from fetched text. Open each in a browser and inspect before copying patterns.

## Suggested direction for a plain HTML/CSS site

Single page plus per-project pages. Hero (name, role, one line, two links). 3-4 projects with real screenshots and short case studies. Brief about in a human voice. Contact (email, GitHub, LinkedIn, CV). One typeface, one accent, `prefers-color-scheme`, subtle CSS-only motion with reduced-motion support, Open Graph image, mobile-first, contrast-checked. Add one distinctive detail that shows CSS craft (scroll-driven animation or view transitions) rather than a heavy library; this suits a static Cloudflare site and avoids load cost.

## Sources

Fetched and read:
- https://brittanychiang.com
- https://www.joshwcomeau.com
- https://bruno-simon.com
- https://cassie.codes
- https://leerob.com
- https://www.freecodecamp.org/news/i-reviewed-fifty-portfolios-on-reddit-and-this-is-what-i-learned-e5d2b43150bc/
- https://scrimba.com/articles/how-to-build-a-web-developer-portfolio-that-gets-you-hired
- https://lyrid.io/post/5-critical-software-engineer-portfolio-mistakes-that-junior-developers-are-making
- https://dev.to/_d7eb1c1703182e3ce1782/best-developer-portfolio-examples-2026-2d8m

Known only from search-result summaries (not opened; weaker support):
- https://elementor.com/blog/best-web-developer-portfolio-examples/
- https://siteground.co.uk/blog/web-developer-portfolio
- https://rockstardeveloperuniversity.com/web-developer-portfolio-examples/
- https://mentorcruise.com/blog/how-to-build-a-portfolio-that-gets-hiring-managers-to-care/
- https://blog.openreplay.com/prepare-for-success--create-a-modern-portfolio/
- https://dev.to/etienne-dev/just-launched-my-personal-portfolio-3gka/comments
