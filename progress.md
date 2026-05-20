# Progress Checkpoint
> Last updated: 2026-05-20 (seventh update — post-Session-6.5: copy rewrite pass with simpler-cleverer positioning voice) by context-checkpoint skill
> Context usage at time of checkpoint: ~85%

## Project Overview
ROMANALABS marketing site — static two-page site (`/` and `/contact`) at `c:\Users\admin\website-romanalabs\`. Pure HTML/CSS/JS, no backend, no database. Domain `romanalabs.com`. **Dual-deployed:** GitHub Pages (primary, serving `romanalabs.com`) AND Cloudflare Workers (`romanalabs-website.samirflores13.workers.dev` — preview only until apex domain is flipped). Lead form ingests to **Make.com webhook**. The site keeps the pre-overhaul setup: Tailwind via CDN runtime + all CSS/JS inline + a single shared `assets/site.css` for brand tokens and footer styles.

**ARCHITECTURE LESSON (don't repeat):** The architecture overhaul (`ea9e2ac`) that externalized inline CSS/JS and pre-built Tailwind broke the production visual because the static build was missing utilities the JIT generated at runtime. Reverted in `bc23e51`. The Tailwind CDN console warning is accepted as the cost of keeping the design working.

## What Has Been Accomplished

### Session 1 (2026-05-18) — Copy + UX shipped in `70745a7`, `bffda7c`
1. Hero, problem, scoreboard, process, security, final CTA copy + stat fixes.
2. Process scroll fix — continuous rAF `paint()`, runway tightened.
3. Git hygiene — stripped `tailwind.exe.exe` (122MB) via `git filter-branch`; added `*.exe` to .gitignore.

### Session 2 (2026-05-19) — Lead-capture system
4. Modal built then dormant. Web3Forms-wired. Editorial design.
5. Switched to dedicated `/contact` page (`47269e0`). All 5 CTAs route there.
6. /contact form expanded to 6 fields + redesigned (`58c8448`).
7. /contact layout stripped to single-column focus (`7e835f2`).
8. Sticky navbar re-added to /contact (`1df39e3`).
9. /contact numbered-field cleanup, textarea fixes, checkbox SVG rework (`3cf05c0`, `e354293`, `6fcedab`, `765f21a`).
10. Logo hover refined site-wide (`765f21a`, `a963403`).
11. Process section recentered + cursor removed (`ea323ec`, `318711b`).
12. /contact footer matches main site (`14e9b13`).
13. Extracted shared `assets/site.css` (`a6ee392`).

### Session 3 (2026-05-19) — Security audit + remediation (mostly reverted in Session 4)
14. Architecture overhaul shipped (`ea9e2ac`) — pre-built Tailwind, externalized CSS/JS. **LATER REVERTED.**
15. Full security audit performed — 4 ❌ FAIL, 10 ⚠️ PARTIAL.
16. Security fixes (`8b77559`, `e4de102`) — CSP fix (later dead code on GH Pages), lockfile commit (kept), PAT removed from local remote URL.

### Session 4 (2026-05-19) — Reverts and lessons learned
17. Process section was redesigned twice unilaterally — both reverted (`66d6e71`, `1365ff4`, reverted in `209250c`).
18. Cache trap fixed (`912007f`) — bumped `?v=N` cache-bust query strings.
19. **HOSTING PLATFORM MIX-UP DISCOVERED** — site was hosted on GitHub Pages, not Cloudflare Pages. (Status changed in Session 6 — now dual-deployed via Wrangler.)
20. Architecture overhaul REVERTED (`bc23e51`) — restored inline CSS/JS, Tailwind CDN runtime.
21. Final-CTA button fix (folded into `209250c`).

### Session 5 (2026-05-19) — Full review + cleanup pass
22. Code review pass — 10 categories of cleanup identified, user said "let's do it, begin."
23. Honeypot a11y fix (`f50a365`) — `aria-hidden="true"` + `pointer-events:none` on `botcheck`.
24. Orphan files deleted (`f50a365`) — `nul`, old `README.md`, `_headers`, `netlify.toml`, 4 unused brand_assets PNGs.
25. Stale docs refreshed (`f50a365`) — `CLAUDE.md` rewritten, `.claude/rules/brand-identity.md` refreshed.
26. Footer dead legal links removed (`8400c2c`).
27. Dormant lead-capture modal DELETED (`8400c2c`) — 21,392 chars removed from index.html.

### Session 6 (2026-05-19 → 2026-05-20) — UX polish, real case studies, Make webhook, Cloudflare dual-deploy, Clairvo-style copy v1

28. **`npm audit fix`** — 0 vulns remaining, removed 26 unused packages.

29. **Rectangular CTAs + scroll-center fix + process panel collision fix** (`6ff984b`):
    - All buttons: `rounded-full`/`rounded-lg` → `rounded-md` (6px). `.btn-secondary` border-radius `9999px` → `6px`.
    - "View case studies" anchor targets a `data-scroll-center` wrapper around section header + bento grid.
    - Process scroll: tightened crossfade window.

30. **Real case studies + nav trim + process scroll rework + Make webhook** (`7ded3d3`):
    - Case study cards replaced with real clients: **BANEGAS Real Estate** (lead qualification, 600+ leads/mo, <2 min response), **XIOS** ($180K recovered, 3wk deploy, 38% less cart abandonment), **3P Jewelry** (80+ creative assets, 2.4x ROAS lift).
    - Industry badge removed. Business name centered white at top of each card.
    - Navbar trim: removed `About` + `Results` links (desktop + mobile).
    - Entire Scoreboard section deleted (`id="results"` block).
    - "PROCESS" eyebrow above "How we work." removed.
    - Process & Security tabs center-scroll on their headings.
    - Process sticky-scroll runway extended for deliberate per-step dwell. Final: 420vh.
    - Process panels: smoothstep-eased opacity + continuous gentle slide.
    - **Form → Make.com webhook:** contact form POSTs JSON to `https://hook.us2.make.com/0q6okwf87as8axjjnidu67m87w9roul5`. Web3Forms references fully removed.

31. **Clean /contact URL + Cloudflare Workers config** (`f882b4b`):
    - All CTA links: `contact/index.html` → `contact/`. Browser URL bar shows clean `/contact/`.
    - Added `wrangler.jsonc` — Cloudflare Workers static-assets deploy.
    - Added `.assetsignore` excluding node_modules, .git, .claude, screenshots, dev configs. Fixed **85 MiB `workerd.exe` upload error**.
    - **First Cloudflare deploy** to `https://romanalabs-website.samirflores13.workers.dev`.

32. **"Get in Touch" CTAs + fix process panel blur at rest + first-pass copy refinements** (`7154f1d`):
    - **Blur fix on process scroll:** when a panel is the active one (`dist ≤ 0.02`), JS sets `transform: none` + `will-change: auto`, dropping the GPU compositor layer. Otherwise `translateY` rounded to integer px. Fixes "blurry text at rest" artifact on final step.
    - All 5 CTAs unified to **"Get in Touch"** — nav desktop, mobile, hero, case-studies, final CTA.
    - First-pass copy refinements (later sharpened then rewritten).

33. **Clairvo-style copy rewrite v1 — named villain, founder-anchored pain** (`f0b0130`):
    - User answered 4 clarifying questions: buyer = **$1–10M founder/CEO**, pain anchor = **dollars lost to slow response / leakage**, villain = **'AI agencies' wrapping ChatGPT and charging $20K/mo**, tone = **Clairvo-direct: blunt but professional**.
    - Hero H1 unlocked. New H1: "AI agencies sell prompts. We ship systems."
    - Hero subhead led with leakage anchor (every hour a lead waits, abandoned carts).
    - Problem H2: "Your AI agency is selling you ChatGPT in a trench coat."
    - Final CTA H2: "Your competitors are shipping AI. You're still paying for prompts."
    - User direction: minimize em dashes.

### Session 6.5 (2026-05-20) — Copy rewrite pass: simpler-cleverer positioning voice

34. **Hero/problem/security/CTA copy rewrite** (`aadf2ad`):
    - User feedback: too much lead/cart language (we do all AI automation, not just CRM/checkout); problem and security headers felt "cringe"; wanted copy "so simple and at the same time so clever that anyone can understand and say 'hmm — I'm interested in this'"; positioning over villain-attack.
    - **Hero H1:** "AI agencies sell prompts. We ship systems." → **"Scale the business. Not the headcount."** User offered two options; I picked option A ("scale without headcount") over option B ("Your definitive AI Partner for the next 10 years") because A names the founder's silent goal in 6 words, B reads as LinkedIn-fluff. Sharpened A from 8 words → 6 words with parallel structure matching site rhetoric.
    - **Hero sub:** broadened from leads/carts → "bottlenecks / systems." Used user's draft as base: "We turn your everyday bottlenecks into AI systems that ship, run, and pay for themselves. Live in 4 weeks. No tech team required." (AIDA: attention via "bottleneck" relatability, interest via "AI systems," desire via "ship/run/pay for themselves" triplet, curiosity via "no tech team required.")
    - **Problem H2:** "ChatGPT in a trench coat" → **"AI is easy to demo. Hard to ship."** Universal truth every founder has lived. Sets up the 4 stat cards (kept intact — real cited %s).
    - **Problem sub:** dropped Zapier/Notion/$20K-invoice trench-coat continuation. New: "85% of AI projects never make it to production. They look great in a demo and break the moment real data and real users show up. Here's where the money leaks." Kept the 85% anchor.
    - **Security H2:** "Your data never trains anyone's model. Not even ours." → **"Your data is yours. Built that way from day one."** Positive frame instead of defensive. "Built that way" implies architecture, not policy.
    - **Security sub:** folded "no training" line in as a detail, not a headline. New: "Zero retention by default. Private cloud deploy. Audit-ready by design. Nothing you build with us ever trains anyone else's model."
    - **Final CTA H2:** "Your competitors are shipping AI. You're still paying for prompts." → **"Find the three places AI pays you back fastest."** Forward-looking, curiosity-driven instead of antagonistic.
    - **Final CTA sub:** "30 minutes" → "A 30-minute strategy session." Reads more credible. "Highest-ROI" → "highest-leverage" (less corporate).
    - **Footer taglines** (both pages) updated: "Scale the business. Not the headcount. AI systems your team owns, live in 4 weeks."
    - **Meta description:** "We build the AI systems that help you scale without hiring. Live in 4 weeks. Owned by your team."

## Current State

- **Branch:** `main`, fully pushed to `origin/main` (clean working tree after Session 6.5 commit).
- **Latest commit:** `aadf2ad` — Hero/problem/security/CTA copy: simpler, cleverer, founder-positioned
- **Session 6.x commit chain:** `6ff984b` → `7ded3d3` → `f882b4b` → `7154f1d` → `f0b0130` → `aadf2ad`
- **Hosting:**
  - **Primary live:** GitHub Pages → `romanalabs.com` (Cloudflare DNS/proxy in front)
  - **Worker preview:** `https://romanalabs-website.samirflores13.workers.dev` (Cloudflare Workers static-assets deploy via wrangler)
  - Worker **not yet bound** to the apex domain. To flip: Cloudflare dashboard → Workers & Pages → `romanalabs-website` → Settings → Domains & Routes → Add Custom Domain → `romanalabs.com`.
- **Architecture (post-Session-6.5):**
  - `index.html`: ~2370 lines. All CSS/JS inline + Tailwind CDN runtime.
  - `contact/index.html`: ~720 lines. Form POSTs JSON to Make.com webhook.
  - `assets/site.css`: 133 lines (shared `:root` brand tokens + footer styles).
  - `wrangler.jsonc` + `.assetsignore` — Cloudflare Workers deploy config.
- **Form is LIVE** — POSTs JSON to `https://hook.us2.make.com/0q6okwf87as8axjjnidu67m87w9roul5`.
- **Cache-bust query strings (`?v=4`)** still on asset URLs. No bump needed in Session 6.5 (only inline HTML edits).

### Current copy (the unifying story top-to-bottom)
- **H1:** "Scale the business. *Not the headcount.*"
- **Hero sub:** "We turn your everyday bottlenecks into AI systems that ship, run, and pay for themselves. Live in 4 weeks. No tech team required."
- **Problem H2:** "AI is easy to demo. *Hard to ship.*"
- **Problem sub:** "85% of AI projects never make it to production. They look great in a demo and break the moment real data and real users show up. Here's where the money leaks."
- **Use cases H2:** "Shipped. Live. *Paying back.*" (untouched)
- **Process H2:** "How we *work.*" (untouched)
- **Security H2:** "Your data is yours. *Built that way from day one.*"
- **Final CTA H2:** "Find the three places AI *pays you back fastest.*"
- **Final CTA sub:** "A 30-minute strategy session. Free. We map the three highest-leverage AI systems in your business and build the first one in 4 weeks. No deck. No retainer."
- **Footer tagline:** "Scale the business. Not the headcount. AI systems your team owns, live in 4 weeks."

## What Comes Next

### High priority

1. **Flip apex domain to the Cloudflare Worker.** Currently `romanalabs.com` is served by GitHub Pages. Worker is deployed and tested at `*.workers.dev`. To flip: Cloudflare dashboard → Workers & Pages → `romanalabs-website` → Settings → Domains & Routes → Add Custom Domain `romanalabs.com` (and `www.romanalabs.com`).
2. **Verify the Make.com scenario is wired up.** Open Make scenario, click "Run once" to put in listening mode, submit test from `romanalabs.com/contact/`. Locks data structure. After that the scenario runs normally.

### Lower priority / when user provides input

3. **X/Twitter footer URL** — still `href="#"` on both pages. Waiting on real handle.
4. **Self-host fonts** (Audit Finding #9.5) — replace Google Fonts CDN with locally-hosted `.woff2` files. ~30 min, eliminates last 3rd-party CSS request.
5. **Compliance badge verification** (SOC 2 / ISO 27001 / GDPR / Zero-Knowledge Infra in security section). User to confirm which are actually held.
6. **Case study metric confirmation** — current numbers (BANEGAS 600+ leads/mo, XIOS $180K, 3P 80+ assets) need user verification they're accurate to delivered work.

### Bigger optional moves

7. **Decide on retiring GitHub Pages** once Cloudflare apex flip is verified. Both deploys currently stay in sync = wasted work.

## Active Decisions & Context

### Behavioral rules (HARD CONSTRAINTS — quoted from user)

- **"I DID NOT TELL YOU TO DO THIS."** — user pushed back against unauthorized big changes. **Do only what the user asks, in the scope they ask.** Check before any change touching more than the specific element/file they mentioned.
- **"I want the site to look good. this is trash. avoid keeping it the same."** — visual-quality complaints get targeted fixes, not architectural ones.
- **"a few [em dashes] are good, not too many"** (Session 6) — default to splitting em-dash sentences into 2 declaratives.
- **"the copy [should be] so simple and at the same time so clever that anyone can understand and say: 'hmm — i'm interested in this'. positioning is everything. we don't want to be like everybody else."** (Session 6.5) — this is the voice north star. Simple words, clever framing, distinctive positioning. Not LinkedIn-fluff. Not contrarian for its own sake. The new H1 "Scale the business. Not the headcount." passes this test.

### Buyer / villain / tone (CONFIRMED in Session 6, evolved in 6.5)

- **Buyer:** $1–10M founder/CEO.
- **Pain frame (BROADENED in Session 6.5):** was "leads going cold / carts abandoned" → now **"everyday bottlenecks" / "AI systems"** (we do all AI automation, not just CRM/checkout). The leads/carts narrative is fine for case studies but NOT for the hero/problem framing. Use "bottlenecks", "systems", "operations" instead.
- **Villain (DE-EMPHASIZED in Session 6.5):** the "$20K/mo ChatGPT-wrapper AI agency" villain is still real but we no longer lead headlines with it. The new H1, problem H2, and final CTA are positioning-led, not attack-led. The 85% pilot-death stat is the only remaining villain anchor in the copy.
- **Tone (CONFIRMED):** simple, clever, declarative. Match the parallel-structure rhythm of "Scale the business. Not the headcount." / "AI is easy to demo. Hard to ship." / "Your data is yours. Built that way from day one."
- **Hero H1 is unlocked.** Current: "Scale the business. *Not the headcount.*" (brand-serif span on the second half).

### Architectural decisions

- **DO NOT externalize inline CSS or JS again** without testing in production first. Pre-built Tailwind misses utilities the CDN's JIT generates from the live DOM → silent visual breakage. Tried (`ea9e2ac`), broke, reverted (`bc23e51`).
- **Tailwind CDN runtime warning is acceptable.** User explicitly chose this trade-off.
- **Hosting is dual-deployed.** GitHub Pages serves the live `romanalabs.com`; Cloudflare Worker is a preview. After apex flip, GH Pages can be retired.
- **`.assetsignore` is REQUIRED for any `npx wrangler deploy`** — without it, node_modules gets included and the 85 MiB `workerd.exe` blows the 25 MiB asset size limit.
- **Cache-bust query strings (`?v=N`) are still the working cache-invalidation mechanism on GH Pages.** Bump `?v=N` to `?v=N+1` whenever `assets/site.css` changes.

### Make.com webhook integration (Session 6)

- **Endpoint:** `https://hook.us2.make.com/0q6okwf87as8axjjnidu67m87w9roul5`
- **Method:** POST with `Content-Type: application/json`
- **Payload shape:**
  ```json
  {
    "name": "...",
    "email": "...",
    "company_role": "...",
    "bottleneck": "...",
    "goals": ["array of selected checkbox values"],
    "additional_context": "...",
    "submitted_at": "ISO-8601 timestamp",
    "source": "romanalabs.com/contact",
    "page_url": "full URL",
    "referrer": "document.referrer",
    "user_agent": "navigator.userAgent"
  }
  ```
- `goals` is a true array (not comma-joined string) so the Make scenario can iterate without re-parsing.
- Make webhooks return HTTP 200 with body "Accepted" on success. Code checks `r.ok` (not `.json()`).
- On success: form view hidden, success view shown, Cal.com (`https://cal.com/omar-flores/discovery`) opens in a new tab after 900ms.

### Workflow gotchas

- **Push:** `git -c http.version=HTTP/1.1 push origin main` (HTTP/2 stall workaround on this Windows machine).
- **Wrangler deploy:** `npx wrangler deploy` from project root. `.assetsignore` filters node_modules etc. Worker URL: `romanalabs-website.samirflores13.workers.dev`.
- **Local preview:** opening `index.html` via `file://` — server-absolute paths don't resolve. Asset paths are relative for this reason.
- **Screenshot script** (`npm run screenshot`) only does `index.html` (not `/contact`). Mobile (423px) + desktop (1440px).

## Key Files

- [index.html](index.html) — main page (~2370 lines): full inline `<style>` + `<script>`. Loads Tailwind via CDN runtime. Sections: hero, logo marquee, problem cards (4 stat cards intact), case studies (real: BANEGAS / XIOS / 3P Jewelry), process (sticky-scroll, 420vh runway), security, final CTA, footer.
- [contact/index.html](contact/index.html) — `/contact` page (~720 lines): 6-field lead form POSTing JSON to Make.com webhook.
- [assets/site.css](assets/site.css) — only external CSS file (~133 lines). Shared `:root` brand tokens + footer styles.
- [wrangler.jsonc](wrangler.jsonc) — Cloudflare Workers deploy config. `name: "romanalabs-website"`, `assets.directory: "."`.
- [.assetsignore](.assetsignore) — wrangler-only ignore file. Excludes node_modules, .git, screenshots, dev configs. REQUIRED.
- [package.json](package.json) — devDeps: puppeteer (screenshot script). No build scripts.
- [screenshot.js](screenshot.js) — Puppeteer dual-viewport (423px / 1440px) full-page screenshot tool.
- [CNAME](CNAME) — `romanalabs.com` (GitHub Pages custom domain marker).
- [CLAUDE.md](CLAUDE.md) — current-architecture docs + HARD CONSTRAINTS. Refreshed in Session 5. **Stale on Session 6/6.5 changes** (new H1, villain de-emphasis, dual-deploy).
- [.claude/CLAUDE.md](.claude/CLAUDE.md) + [.claude/rules/*.md](.claude/rules/) — session rules. `.claude/rules/brand-identity.md` refreshed in Session 5.
- [progress.md](progress.md) — this file.

**Deleted in Session 5 (don't re-create):** `_headers`, `netlify.toml`, old `README.md`, `nul`, 4 unreferenced brand_assets PNGs.

**Removed in Session 6/6.5:** Web3Forms references, "About" + "Results" nav links, entire Scoreboard section, "PROCESS" eyebrow, dormant lead-capture modal (Session 5).

## How to Resume

**First thing:** read this whole file end-to-end. The hardest-won lessons are in "Active Decisions & Context" — specifically the **HARD CONSTRAINTS** and the **buyer/villain/tone evolution** (the Session 6.5 broadening from leads/carts → "bottlenecks/systems" is critical for any future copy work).

Verify current live state:
- https://romanalabs.com → main site (open in **incognito** to bypass browser cache). New H1: "Scale the business. *Not the headcount.*"
- https://romanalabs.com/contact/ → 6-field lead form. Submissions POST to Make.com webhook.
- https://romanalabs-website.samirflores13.workers.dev → Cloudflare Worker preview (mirror).

If picking up new work, the priority queue is in "What Comes Next":
1. Flip apex domain to Cloudflare Worker (dashboard-only, user action)
2. Verify Make.com scenario is wired up + test submission
3. X/Twitter footer URL when user provides
4. Optional self-hosted fonts
5. Compliance badge verification

Editing rules (DO NOT BREAK):
- **All site edits land in [index.html](index.html) or [contact/index.html](contact/index.html).** Both files have inline `<style>` + `<script>` blocks. Use Ctrl+F to navigate; **do not externalize content**.
- **Bump cache-bust `?v=N`** in `<link>` / `<script>` references **whenever `assets/site.css` changes.** Currently `?v=4`. For inline HTML/CSS/JS edits, no bump needed.
- **Push:** `git -c http.version=HTTP/1.1 push origin main`.
- **Deploy to Cloudflare:** `npx wrangler deploy` from project root (after push).
- **Brand tokens:** `--accent #D4AF37` gold, `--emerald #1B4332`, `--bg-primary #F9F9F7` alabaster, `--bg-card #0A0D0B` obsidian. Display font Space Grotesk, body Inter.
- **Copy voice (Session 6.5 NORTH STAR):** simple words, clever framing, distinctive positioning. Parallel-structure declaratives ("X. Not Y." or "X is easy. Y is hard."). NOT lead/cart-specific in hero or problem framing — use "bottlenecks / systems / workflows" instead. Em dashes minimal. Don't lead with villain-attack; lead with positioning.
- **Cal.com link** always secondary, never competing primary button.
- **Don't fabricate** testimonials, named clients (real ones in cards), or compliance claims. Flag and ask.
- **No architectural changes without asking.** No externalization, no pre-built Tailwind, no sweeping refactors.
