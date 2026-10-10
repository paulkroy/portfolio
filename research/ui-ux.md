# Developer Portfolio: UI/UX and Technical Quality

Scope: frontend/web and full-stack roles. The site is plain HTML/CSS on Cloudflare Workers, so the site itself is a work sample.

Evidence note: I found no hiring study specific to frontend portfolios in 2025-26. Most "what reviewers want" material is practitioner blog advice. It is tagged below as **[consensus]** (several sources agree, or primary standards/research) or **[opinion]** (single source). Reddit and Hacker News searches returned no usable threads, so none are cited. My searches did not turn up evidence that reviewers routinely run Lighthouse or view source; that is a gap, not proof they don't.

## Key takeaways

1. Put the strongest project and a visible contact route within the first screen or two. Reviewers skim for seconds, and burying work behind a long bio or a slow, playful interface is a repeated complaint.
2. Show 3 polished projects rather than 10. Each should have a live link, a source link, and a short write-up covering the problem, your decisions and the outcome.
3. Treat mobile as the primary view. Recruiters open links on phones, and a broken small-screen layout is called a basic failure.
4. Keep navigation visible. NN/G testing found hidden menus cut discoverability. On a one-page or few-page site, use 3-4 visible links.
5. Use a plain `mailto:` link in the hero and footer, plus GitHub, LinkedIn and a downloadable résumé. A form is optional.
6. Skip scroll-jacking, splash loaders and custom cursors. These are the best-documented annoyances. If you add motion, respect `prefers-reduced-motion`.
7. Plain HTML/CSS is an advantage here. Fast loads, semantic markup and clean view-source cost almost nothing, so get them right.
8. Polish the details: custom domain, favicon, a unique `<title>`, Open Graph tags, no console errors, no dead links.
9. Link the site's own repo in the footer. It turns the site into evidence of skill.
10. Test the live URL on a real phone and keyboard-only before sending it anywhere.

## 1. Navigation and information architecture

**[consensus]** The first-minute flow reviewers describe: skim the homepage for what you do and your stack, open one featured project, check the live demo, then the code and README (devplaybook checklist; search summary). So the structure should be:

- Hero: name, specific title and stack ("Frontend developer, HTML/CSS/JS", not "I love building things"), one-line value statement, contact link.
- Projects immediately after. Scrimba suggests at most five pages (home with highlights, project case studies, about, contact) and warns that large About sections push projects below the fold.
- A short About, then contact in the footer.

NN/G's study of 179 participants found hidden navigation was used 27% of the time on desktop versus 48% for visible, and tasks took at least 39% longer with it. On mobile, hidden navigation was less damaging, but NN/G recommends showing up to 4 top-level links and adding in-page links to key content. For a small portfolio, that means no hamburger menu: use 3-4 anchor links (Projects, About, Contact, Résumé). A sticky header helps recovery on long pages (NN/G scrolljacking study).

**[opinion]** MentorCruise says hard-to-find links and slow, playful interfaces are friction. A default subdomain "reads as less intentional" than a custom domain. Both are one author's view, though the custom-domain point is cheap to act on.

## 2. Mobile and responsive behaviour

**[consensus-ish, practitioner sources]** Scrimba: "Hiring managers check portfolios on their phones." devplaybook: test on iOS Safari and Android Chrome, since broken layouts at mobile widths hurt credibility.

NN/G mobile guidance: downplay chrome to make room for content, make touch targets large, reduce typing, and keep pages lightweight. Practical checks:

- `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Touch targets around 44px or larger, with spacing between links.
- No horizontal scroll at 320px width.
- Readable body text without pinch-zoom.
- Email and résumé reachable in one tap.
- Project links open and work on mobile (no hover-only content).

## 3. Performance

Core Web Vitals thresholds, measured at the 75th percentile of page views (web.dev): LCP at most 2.5 s (poor above 4 s), INP at most 200 ms (poor above 500 ms), CLS at most 0.1 (poor above 0.25).

How much reviewers notice: **[opinion]** Scrimba suggests 90+ Lighthouse scores, and devplaybook says "page loads in under 2 seconds". A freeCodeCamp reviewer flagged slow load as a portfolio problem. I found no evidence that most reviewers run audits, but a slow page is felt directly, and frontend candidates are judged on it more than others. Note Core Web Vitals field data needs real traffic; Lighthouse is a lab test, so a personal site mainly gets lab scores.

Practical, per web.dev's lazy-loading guidance:

- Set `width` and `height` on every `<img>` to prevent layout shift.
- Use `loading="lazy"` only for below-the-fold images. Never lazy-load the LCP/hero image.
- Use modern formats (WebP/AVIF), sized to the display size, with `srcset` if you have large screenshots. Project screenshots are the usual page-weight offender.
- Few or no JS dependencies and no web-font blocking. Use `font-display: swap` and at most 1-2 font files.
- Cloudflare gives you HTTP/2/3 and caching; set long cache headers for hashed or static assets.

## 4. Accessibility

Whether reviewers check it: **I did not find evidence that hiring managers routinely audit accessibility.** The argument for doing it is signalling: a frontend candidate whose site works by keyboard, with real headings and landmarks, shows craft that screenshots do not, and agencies in particular care. This is my inference, not a sourced hiring claim.

The W3C quick checks (W3C WAI preliminary review) map neatly to a static site:

- A unique, descriptive `<title>` per page.
- Meaningful `alt` text for images; `alt=""` for decorative ones.
- Real headings in a logical hierarchy starting with one `<h1>`; use `<header>`, `<nav>`, `<main>`, `<footer>`.
- Text contrast of at least 4.5:1.
- Text enlarged to 200% without clipping or overlap.
- Keyboard-only operation with clearly visible focus, logical tab order, and no traps. Add a skip link.
- Labelled form fields if you have a form.
- Auto-moving content that lasts over 5 s must be pausable; nothing flashes more than 3 times a second.

Reduced motion (web.dev): some users get dizziness, nausea or migraines from parallax and zoom effects. Wrap decorative animation in `@media (prefers-reduced-motion: no-preference)` or disable it under `reduce`. Add `lang="en"` on `<html>`.

## 5. What technical reviewers inspect

**[opinion / unverified how often]** The following are cheap to make clean because anyone who opens devtools can see them:

- **View-source:** readable, indented, semantic HTML; no leftover template comments or lorem ipsum.
- **Console:** zero errors or warnings, no 404s in the Network tab (favicon included).
- **Lighthouse:** aim for green across Performance, Accessibility, Best Practices, SEO.
- **Source link:** each project needs a live demo and a repo link; "If a reviewer can't see it running or read the code, it does not exist" (Scrimba). Add the portfolio's own repo too. READMEs matter: "No README = reviewer closes the tab" (devplaybook).
- **Meta and sharing:** Open Graph requires `og:title`, `og:type`, `og:image`, `og:url` (ogp.me). Add `og:description`, `twitter:card`, a `meta description`, and an absolute-URL image (~1200x630). Test the link by pasting it into LinkedIn, Slack and a messaging app, since that is where recruiters first see it.
- **Favicon:** SVG or PNG plus `apple-touch-icon`.
- **Domain:** custom domain (yourname.com or .dev) over a `*.workers.dev` URL, per MentorCruise (opinion). Ensure HTTPS and that the www/non-www variants redirect.
- **404 page:** a small thing that shows care.

## 6. Calls to action and contact

- Contact must be "trivially easy to find": email in both the hero and footer (devplaybook). Scrimba lists GitHub, LinkedIn and email as the minimum, with a form or Calendly link as a bonus.
- devplaybook says to skip generic contact forms. A static Worker site would need a form backend anyway, and a plain `mailto:` has zero failure modes. If you add a form, add real labels, a spam guard and a visible success message. Also show the email address as text so it can be copied.
- Provide the résumé as a PDF link (Scrimba praises a one-click CV download). Keep it current, and give the link a descriptive name and file size.
- One primary CTA ("Get in touch" or "View projects") rather than five competing ones.

## 7. UX mistakes to avoid

- **Scroll-jacking [consensus, primary research]:** NN/G found most participants at least mildly disoriented, task-oriented users were the most frustrated, and it is worse on mobile. Only tolerated when it adds real value, and even then it is risky.
- **Custom cursors [opinion]:** a freeCodeCamp reviewer says cursor changes "are generally annoying to most people"; a portfolio interactivity guide rates them high-risk.
- **Splash screens, loaders and repeated animations [opinion/consensus-ish]:** a freeCodeCamp reviewer says repeated animations are annoying and slow loads hurt. MentorCruise warns that slow, playful interfaces delay key information.
- **Hiding content behind interaction:** hover-only reveals fail on touch; hidden menus lose discoverability (NN/G). Put project names, stack and links in plain sight.
- **Broken links and demos:** "A broken deployment is worse than no portfolio" (Scrimba); devplaybook suggests a screen recording as a fallback.
- **Stale content, skill progress bars, tutorial-clone projects, unfinished projects** (Scrimba, devplaybook).
- **Tool lists with no outcomes:** MentorCruise says outcomes beat tool lists. Describe what you built, a decision you made, and a result.

A survey cited in search summaries claims 93% of hiring managers would look at a portfolio site if provided, though a missing one rarely hurts much. I could not verify the original, so treat it as unconfirmed.

## Pre-launch checklist

Content
- [ ] Hero states role and stack specifically; projects visible within the first scroll or two.
- [ ] 3 strong projects, each with live link, repo link, problem/role/stack/outcome.
- [ ] Email (text and `mailto:`), GitHub, LinkedIn, current résumé PDF all work.
- [ ] No lorem ipsum, template comments, typos or stale dates.

Navigation and mobile
- [ ] 3-4 visible nav links; skip link; sticky or easy return to top.
- [ ] Tested on real iOS Safari and Android Chrome; no horizontal scroll at 320px; tap targets large.

Performance
- [ ] LCP image not lazy-loaded; other images lazy, with width/height, WebP/AVIF, sized properly.
- [ ] Lighthouse 90+ on mobile profile; CLS under 0.1; minimal JS and fonts.

Accessibility
- [ ] One h1, ordered headings, landmarks, `lang`, unique titles.
- [ ] Keyboard-only walkthrough with visible focus; contrast 4.5:1+; 200% text resize OK.
- [ ] `prefers-reduced-motion` honoured; alt text meaningful.

Technical polish
- [ ] Console and Network tabs clean; link checker run on every link.
- [ ] Favicon, apple-touch-icon, meta description, canonical, OG and Twitter tags; preview checked in LinkedIn/Slack.
- [ ] Custom domain with HTTPS and redirects; 404 page.
- [ ] Footer link to the site's own repo; clean README and commit history.
- [ ] No splash screen, scroll-jacking or custom cursor.

## Sources (all pages actually read)

- web.dev, Core Web Vitals thresholds: https://web.dev/articles/defining-core-web-vitals-thresholds
- web.dev, prefers-reduced-motion: https://web.dev/articles/prefers-reduced-motion
- web.dev, browser-level image lazy-loading: https://web.dev/articles/browser-level-image-lazy-loading
- NN/G, Scrolljacking 101: https://www.nngroup.com/articles/scrolljacking-101/
- NN/G, Hamburger menus and hidden navigation: https://www.nngroup.com/articles/hamburger-menus/
- NN/G, Mobile UX: https://www.nngroup.com/articles/mobile-ux/
- W3C WAI, Preliminary accessibility review: https://www.w3.org/WAI/test-evaluate/preliminary/
- Open Graph protocol: https://ogp.me/
- Scrimba, How to build a web developer portfolio: https://scrimba.com/articles/how-to-build-a-web-developer-portfolio-that-gets-you-hired
- devplaybook, Developer portfolio checklist: https://devplaybook.cc/blog/developer-portfolio-checklist-20-things-hiring-managers
- MentorCruise, Portfolio that gets hiring managers to care: https://mentorcruise.com/blog/how-to-build-a-portfolio-that-gets-hiring-managers-to-care/

Read only as search-result summaries, not fetched directly (used for the freeCodeCamp custom cursor and slow-load comments and the interactivity-guide claim): https://forum.freecodecamp.org/t/wanting-to-get-my-first-dev-job-portfolio-review/171313 and https://tessl.io/registry/skills/github/popey/claude-code-skills/interactive-portfolio
