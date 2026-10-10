# What hiring audiences look for in a developer portfolio

Research date: October 2026. Targets: frontend/web and full-stack/software engineer roles.

**Evidence quality warning.** Hard data on how people review developer portfolios is thin. Most numbers online come from vendor blogs, and several repeat unsourced statistics. Claims below are labelled **data** (a named study), **consensus** (many independent sources agree) or **anecdote** (individual accounts). I found no survey that measures developer-portfolio review time specifically.

## Key takeaways

1. **Build for a 10-30 second skim first.** Put a one-line role headline ("Frontend / full-stack developer, React + TypeScript"), 2-3 best projects and a visible contact link above the fold. The only hard number is for resumes (about 7.4 s, a first-pass triage). Portfolio figures of "15-30 s" are unsourced; the consensus is only that the look is brief.
2. **Treat the portfolio as a supplement to the résumé, not a replacement.** Recruiters often never open it. Hiring managers and panelists open it briefly, often hunting for red flags. Make the résumé and LinkedIn link to it and repeat the same facts.
3. **Every project needs a working live link plus a public repo with a real README.** Broken demos, localhost URLs, screenshots-only and missing code are the most repeated red flags.
4. **Write 2-3 short case studies, not a gallery.** Problem, your role, decisions and trade-offs, how you verified quality, result. State clearly what you did versus the team.
5. **Make craft verifiable.** Keyboard navigation, color contrast, mobile-first CSS, fast load, no typos or dead links. For a frontend candidate the site itself is a work sample.
6. **Show evidence AI cannot fake in an afternoon.** Real users, months of commit history, iteration after launch, and the ability to explain why. Polished projects are now cheap, so process matters more.
7. **Tailor to the role.** Do not mix freelance-client and job-seeker messaging, and do not pad with unrelated work.
8. **Add one differentiator for agencies.** A distinctive layout or interaction, and range across project types, shown as live work rather than video only.
9. **Skip skill bars, template copy and invented impact numbers.** They read as generic and are easy to challenge.
10. **Give interviewers things to ask about.** A decision log, a bug story, a trade-off you would revisit.

## Comparison of the three audiences

| | Recruiters / TA | Web agencies | Developers / eng managers |
|---|---|---|---|
| Time spent | Seconds to about a minute, if they open it at all (resume skim ~7.4 s, Ladders 2018; no portfolio figure) | Portfolio is the first step; if visuals pass, seniors review code (anecdote, one agency owner) | "A couple of minutes at most," mainly looking for what is wrong (anecdote); deeper later |
| Looks at first | Headline, role fit, keywords, live link, contact | Visual quality, live sites, finish, responsiveness | Live demo, repo structure, README, commit history, your stated role |
| Shortlist signals | Clear role match, recognizable stack, working and polished, easy contact | Pixel-level care, design sense, range, shipped work, performance | Code quality, original (non-tutorial) problems, trade-off reasoning, honest scope |
| Red flags | Unclear role, broken site, nothing relevant, hidden contact | Template look, mockups only, no live links, janky or slow | Tutorial clones, no README, copy-paste code, exaggerated contribution, inaccessible UI |
| Weight of portfolio | Low (checks it exists and works) | High for frontend roles | Medium: spot-check, then interview probes it |
| Wants most | Skimmability and relevance | Polish and breadth | Depth and reasoning |

## Detailed sections

### 1. How long, and what first

**Data.** The Ladders eye-tracking study (2018) found recruiters spent about 7.4 seconds on the initial résumé screen, up from about 6 in 2012. Simple layouts with clear headings did best; cluttered multi-column layouts did worst ([HR Dive](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582)). This is about résumés, not portfolios, and it is contested: an industry critic says sample and method details are missing and that the number measures a keep-or-discard decision, not reading ([ERE](https://www.ere.net/is-the-6-second-resume-scan-a-myth/)). Use it as a design principle (clear hierarchy), not a benchmark.

**Portfolio-specific figures are weak.** One guide claims about 15 seconds ([Hakia](https://www.hakia.com/skills/building-portfolio/)) with no source. GreatFrontEnd says only that a reviewer "may only spend a few minutes" before deciding whether to talk to you, and advises putting the best case study first ([GreatFrontEnd](https://www.greatfrontend.com/zh-CN/blog/frontend-developer-portfolio)). A DEV Community thread (anecdote) splits the audiences: recruiters "don't look at your portfolio site," while hiring managers and panelists usually do, for a couple of minutes at most, mostly checking whether anything looks wrong ([DEV](https://www.dev.to/jmfayard/show-your-work-3hpg)).

**What they see first (consensus, thin sourcing):** the headline and what you do, relevant live work, and how to reach you.

### 2. Shortlist vs. move on

**Recruiters.** Little first-hand recruiter material surfaced. The DEV thread says recruiters skim for disqualifiers and listed skills, and that agencies doing first-pass selection benefit from a short summary and easy contact ([DEV](https://www.dev.to/jmfayard/show-your-work-3hpg)). Treat this as anecdote.

**Agencies.** Anecdote: one agency owner says the portfolio is their first step, and if the sites look good, senior developers review the code (a Clarity.fm answer, seen only as a search-result summary). A creative-developer hiring guide, written by someone selling services and so biased, values live sites over showreels, Lighthouse/Core Web Vitals evidence, range across project types and juried awards. It flags no live links, "NDA" excuses and template-like work ([hontran.dev](https://www.hontran.dev/blog/how-to-hire-a-creative-developer)). I did not find first-hand agency-owner threads on r/agency.

**Developers and managers.** Best first-hand source: a front-end developer who reviewed 50 portfolios for a design studio ([freeCodeCamp](https://www.freecodecamp.org/news/i-reviewed-fifty-portfolios-on-reddit-and-this-is-what-i-learned-e5d2b43150bc/)). Red flags: no keyboard navigation, poor contrast, skill-percentage bars, desktop-first CSS, no live site or repo, unclear or exaggerated contributions (reviewers check Git history), Bootstrap/jQuery hiding real CSS/JS skill, mixed freelance and job messaging, off-target work, typos and broken links. Green flags: a non-standard layout, tailoring to the job, side projects in the studio's technologies, and a constructive attitude to feedback. Hakia ranks code quality and working demos as most important and visual polish as least, and suggests 3-5 projects, but its statistics are unsourced ([Hakia](https://www.hakia.com/skills/building-portfolio/)).

### 3. Portfolio vs. résumé, GitHub, LinkedIn, referrals

- **Anecdote, mixed.** On Hacker News one commenter says portfolios get a quick glance and that employer research and business-focused questions matter more; tutorial projects like to-do apps will not impress. Another values a months-long project with refactors, a real release and meaningful commit messages ([HN thread](https://hn.svelte.dev/item/43134745)).
- A Reddit thread (Dec 2025, third-party snapshot, unverified) has a hiring manager claiming they stopped reviewing GitHub for junior roles. The top reply says "No one looked at your GitHub even before AI"; others say a large Canadian telecom uses GitHub as a first screen. Experience is mixed ([Reddit snapshot](https://reddit.sentinel-team.org/posts/1ps4yet/snapshots/2025-12-26T18%3A31%3A31.46825Z)).
- **Do not trust some statistics.** "73% of hiring managers value a portfolio over a perfect resume (Stack Overflow 2024)" appears on several sites, but The Interview Guys itself notes the link goes elsewhere, so it is unverified ([The Interview Guys](https://blog.theinterviewguys.com/?p=10630)). The same page cites "71% say portfolio quality influences hiring" from a survey of 121 hiring professionals (Hover), not developer-specific. HackerRank's 2025 report page frames friction as resume filters and tests unlike real work; I saw it only through a search summary ([HackerRank](https://www.hackerrank.com/reports/developer-skills-report-2025)).
- **Junior vs. experienced.** No source gave rigorous data. Inference from the anecdotes: juniors lack work history, so projects carry more weight (and more suspicion); for experienced candidates résumé, referrals and past employers dominate and the portfolio is a credibility layer. Hakia says documentation separates junior from senior portfolios (low confidence).

### 4. What a portfolio shows that a résumé cannot

Real work with real users, problem-solving and communication through write-ups, live behavior (speed, responsiveness, accessibility), taste and attention to detail, your own voice, and a documented decision trail ([DEV](https://www.dev.to/jmfayard/show-your-work-3hpg), [GreatFrontEnd](https://www.greatfrontend.com/zh-CN/blog/frontend-developer-portfolio)). GreatFrontEnd also flags red flags specific to this: screenshots without decisions, inflated impact, team work claimed as personal, generic copy, animations that delay content, and hard-to-find contact links.

### 5. The current market

- **Consensus (blogs, not data):** AI makes polished output cheap, so polish no longer separates candidates; the test is whether you can explain and defend decisions. Hard-to-fake evidence includes months of commits, post-launch bug fixes, incident write-ups and real users. Unreviewed AI-written READMEs read as generic ([Simeon on Security](https://simeononsecurity.com/software-development-career-playbook/getting-started-in-software-development/building-a-developer-portfolio/)).
- **Anecdote:** the Toronto hiring manager above estimates about 90% of junior personal projects look AI-built and now screens with whiteboard coding and stack deep-dives. Replies note that non-technical managers were still impressed by AI-assisted apps that looked good ([Reddit snapshot](https://reddit.sentinel-team.org/posts/1ps4yet/snapshots/2025-12-26T18%3A31%3A31.46825Z)).
- I found no survey quantifying AI-portfolio prevalence or applicants per role, so I state no such figures.
- **Implication:** expect to explain your code live. Build projects you can walk through.

### 6. Where audiences disagree

- **Visual polish.** Agencies want pixel-level design and distinctive work; engineer-oriented guides rank visuals lowest and warn against over-designed UI. Resolve by making polish functional (accessible, fast, responsive).
- **Breadth vs. depth.** Agencies value range; engineers prefer a few deep projects.
- **Does anyone look?** Recruiters mostly do not; hiring managers do briefly; some commenters say interviewers never asked. Assume a short, possibly late look.
- **Originality vs. convention.** The 50-portfolio reviewer rewarded unusual layouts; recruiter-skim research favors simple, clear structure. Be original in visuals, conventional in navigation and labels.

### 7. One site for all three

1. **Skim layer (recruiters):** headline, availability, 2-3 featured projects with thumbnail, stack tags and a one-line outcome, contact and résumé links.
2. **Craft layer (agencies):** the site's own polish, responsive and fast, one memorable interaction, live demos.
3. **Depth layer (engineers):** per-project case study (problem, role, decisions, trade-offs, testing, results), repo and README, a "what I would change" note.
4. **Credibility layer:** accurate scope statements, real usage, and performance/accessibility results you measured yourself.

## Sources

Fetched and read:
- https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582
- https://www.ere.net/is-the-6-second-resume-scan-a-myth/
- https://www.freecodecamp.org/news/i-reviewed-fifty-portfolios-on-reddit-and-this-is-what-i-learned-e5d2b43150bc/
- https://www.hakia.com/skills/building-portfolio/ (statistics unsourced)
- https://www.greatfrontend.com/zh-CN/blog/frontend-developer-portfolio
- https://simeononsecurity.com/software-development-career-playbook/getting-started-in-software-development/building-a-developer-portfolio/
- https://hn.svelte.dev/item/43134745
- https://www.dev.to/jmfayard/show-your-work-3hpg
- https://reddit.sentinel-team.org/posts/1ps4yet/snapshots/2025-12-26T18%3A31%3A31.46825Z
- https://blog.theinterviewguys.com/?p=10630
- https://www.hontran.dev/blog/how-to-hire-a-creative-developer

Search-summary only, not fetched (low confidence):
- https://www.hackerrank.com/reports/developer-skills-report-2025
- https://clarity.fm/questions/3820/how-to-get-a-job-as-a-junior-front-end-web-developer-with-no-experience

Gaps: no first-hand recruiter interviews, no r/agency threads, no Stack Overflow/HackerRank data on portfolio use; some pages (UX Collective, a Medium-hosted article) returned 403.
