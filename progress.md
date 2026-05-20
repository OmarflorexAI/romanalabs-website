# Progress Checkpoint
> Last updated: 2026-05-20 (sixth update — post-Session-6: UX polish, real case studies, Make webhook, Cloudflare dual-deploy, Clairvo-style copy) by context-checkpoint skill
> Context usage at time of checkpoint: ~80%

## Project Overview
ROMANALABS marketing site — static two-page site (`/` and `/contact`) at `c:\Users\admin\website-romanalabs\`. Pure HTML/CSS/JS, no backend, no database. Domain `romanalabs.com`. **Now dual-deployed:** GitHub Pages (primary, serving `romanalabs.com`) AND Cloudflare Workers (`romanalabs-website.samirflores13.workers.dev` — preview only until apex domain is flipped). Lead form ingests to **Make.com webhook**. The site keeps the pre-overhaul setup: Tailwind via CDN runtime + all CSS/JS inline + a single shared `assets/site.css` for brand tokens and footer styles.

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
19. **HOSTING PLATFORM MIX-UP DISCOVERED** — site was hosted on GitHub Pages, not Cloudflare Pages. CSP fix was dead code. `_headers` / `netlify.toml` were dead code. (Status changed in Session 6 — now dual-deployed via Wrangler.)
20. Architecture overhaul REVERTED (`bc23e51`) — restored inline CSS/JS, Tailwind CDN runtime.
21. Final-CTA button fix (folded into `209250c`).

### Session 5 (2026-05-19) — Full review + cleanup pass
22. Code review pass — 10 categories of cleanup identified, user said "let's do it, begin."
23. Honeypot a11y fix (`f50a365`) — `aria-hidden="true"` + `pointer-events:none` on `botcheck`.
24. Orphan files deleted (`f50a365`) — `nul`, old `README.md`, `_headers`, `netlify.toml`, 4 unused brand_assets PNGs.
25. Stale docs refreshed (`f50a365`) — `CLAUDE.md` rewritten, `.claude/rules/brand-identity.md` refreshed.
26. Footer dead legal links removed (`8400c2c`) — Privacy/Terms/Cookies placeholders gone.
27. Dormant lead-capture modal DELETED (`8400c2c`) — 21,392 chars removed from index.html. Verified no visual regression.

### Session 6 (2026-05-19 → 2026-05-20) — UX polish, real case studies, Make webhook, Cloudflare dual-deploy, Clairvo-style copy

28. **`npm audit fix`** — 3 puppeteer transitive vulns cleared, removed 26 unused packages, 0 remaining.

29. **Rectangular CTAs + scroll-center fix + process panel collision fix** (`6ff984b`):
    - All hero/CTA buttons: `rounded-full`/`rounded-lg` → `rounded-md` (6px). `.btn-secondary` border-radius `9999px` → `6px`.
    - "View case studies" anchor targets a `data-scroll-center` wrapper around the section header + bento grid, so heading + subtext + all 3 cards land centered in viewport.
    - Process scroll: tightened crossfade window so panels stop bleeding into each other.

30. **Real case studies + nav trim + process scroll rework + Make webhook** (`7ded3d3`):
    - **Case study cards replaced with real clients:**
      - Card 1: **BANEGAS Real Estate** — "AI Lead Qualification & Follow-up" (600+ leads/mo, <2 min response, 42 showings/mo, 25 hrs saved/week)
      - Card 2: **XIOS** — "AI-Powered Checkout Recovery" ($180K recovered, 3 wks deploy, 38% less cart abandonment, 47% faster checkout)
      - Card 3: **3P Jewelry** — "Creative Ad Production Engine" (80+ creative assets, 2 wks deploy, 2.4x ROAS lift, 70% less production time)
    - Industry badge removed from each card. Business name centered white at the top.
    - **Navbar trim:** removed `About` + `Results` links (desktop + mobile). Now just Process / Security / Get in Touch.
    - **Entire Scoreboard section deleted** (`id="results"` block — "Numbers don't negotiate." with 4 count-up stats + value props).
    - "PROCESS" eyebrow above "How we work." removed.
    - Process & Security tabs now center-scroll on their headings (scroll handler enhanced to find a nested `[data-scroll-center]` element inside any anchor target).
    - Process sticky-scroll runway extended for deliberate per-step dwell, with smoothstep-eased opacity + continuous gentle slide. Final value: 420vh.
    - Final CTA card rewritten with AIDA framing.
    - **Form → Make.com webhook:** contact form POSTs JSON to `https://hook.us2.make.com/0q6okwf87as8axjjnidu67m87w9roul5`. Web3Forms references fully removed (action URL, `access_key`, `subject`, `from_name` hidden fields all gone).

31. **Clean /contact URL + Cloudflare Workers config** (`f882b4b`):
    - All "Book a Systems Audit" / "Book a Call" links: `contact/index.html` → `contact/`. Browser URL bar now shows `romanalabs.com/contact/` cleanly.
    - Added `wrangler.jsonc` — Cloudflare Workers static-assets deploy config. Worker name `romanalabs-website`, `assets.directory: "."`, compat date `2026-05-19`.
    - Added `.assetsignore` excluding `node_modules`, `.git`, `.github`, `.claude`, `.wrangler`, `src`, screenshots, dev configs. This fixed the **85 MiB `workerd.exe` upload error** that blocked the first `npx wrangler deploy` attempt.
    - **First successful Cloudflare deploy** to `https://romanalabs-website.samirflores13.workers.dev`.

32. **Get in Touch CTAs + fix process panel blur at rest + first-pass copy refinements** (`7154f1d`):
    - **Blur fix on process scroll** — when a panel is the active one (`dist ≤ 0.02`), JS sets `transform: none` and `will-change: auto`, dropping the GPU compositor layer entirely. Otherwise `translateY` is rounded to integer pixels. Fixes the "text gets blurry after scroll completes" artifact on the final step.
    - **All 5 CTAs unified to "Get in Touch"** — nav desktop, mobile, hero, case-studies, final CTA. "View case studies" secondary link kept (it's a scroll anchor, not a CTA).
    - First-pass copy refinements (later sharpened in `f0b0130`).

33. **Clairvo-style copy rewrite — named villain, founder-anchored pain** (`f0b0130`):
    - User answered 4 clarifying questions:
      - Buyer = **$1–10M founder/CEO**
      - Pain anchor = **dollars lost to slow response / leakage**
      - Villain = **generic 'AI agencies' wrapping ChatGPT and charging $20K/mo**
      - Tone = **Clairvo-direct: blunt but professional**
    - **Hero H1 (was locked, user explicitly unlocked):** "We don't pitch AI. We ship it." → **"AI agencies sell prompts. We ship systems."** — names the villain category directly, preserves the parallel rhythm.
    - **Hero subhead:** loss-aversion anchor — "Every hour a lead waits, it's worth less. Every abandoned cart never comes back. We build the AI systems that catch them before they slip. Live in 4 weeks. Owned by your team."
    - **Problem H2:** "85% of AI projects die..." → **"Your AI agency is selling you ChatGPT in a trench coat."** (85% stat moved into the subhead).
    - **Problem sub:** "A Zapier flow, a Notion dashboard, a $20K monthly invoice. 85% of those 'AI projects' die before they ever reach production. Your leads still go cold. Your carts still get abandoned. Your team still wastes the same hours. Here's where the money actually leaks."
    - **Security H2:** "Your data never trains anyone's model — including ours." → "Your data never trains anyone's model. Not even ours."
    - **Security sub:** em dashes removed, split into declaratives.
    - **Final CTA H2:** "...You're still in pilots." → "...You're still paying for prompts." (sharper villain echo).
    - **Final CTA sub:** "30 minutes. We find the three highest-ROI plays inside your business and hand you a 4-week build plan for the first one. Free. No deck. No retainer." (em dashes dropped, staccato).
    - **Footer taglines** on both `index.html` and `contact/index.html` updated to match new H1.
    - **Meta description** aligned.
    - User direction: minimize em dashes — "a few are good, not too many."

34. **Cloudflare redeploy** after `f0b0130` — uploaded the 2 changed HTMLs to the Worker. Worker preview now matches GH Pages.

## Current State

- **Branch:** `main`, fully pushed to `origin/main` (clean working tree).
- **Latest commit:** `f0b0130` — Clairvo-style copy rewrite: named villain, founder-anchored pain
- **Session 6 commits (chronological):** `6ff984b` → `7ded3d3` → `f882b4b` → `7154f1d` → `f0b0130`
- **Hosting:**
  - **Primary live:** GitHub Pages → `romanalabs.com` (Cloudflare DNS/proxy in front)
  - **Worker preview:** `https://romanalabs-website.samirflores13.workers.dev` (Cloudflare Workers static-assets deploy via wrangler)
  - Worker is **not yet bound** to the apex domain. To flip: Cloudflare dashboard → Workers & Pages → `romanalabs-website` → Settings → Domains & Routes → Add Custom Domain → `romanalabs.com`.
- **Architecture (post-Session-6):**
  - `index.html`: ~2370 lines after scoreboard deletion. All CSS/JS inline + Tailwind CDN runtime.
  - `contact/index.html`: ~720 lines, inline CSS/JS. Form POSTs JSON to Make.com webhook.
  - `assets/site.css`: 133 lines (shared `:root` brand tokens + footer styles).
  - `wrangler.jsonc` + `.assetsignore` — Cloudflare Workers deploy config.
  - `package.json`: only puppeteer devDep (for `npm run screenshot`). No build step.
- **Form is LIVE** on `romanalabs.com/contact/` — POSTs JSON to `https://hook.us2.make.com/0q6okwf87as8axjjnidu67m87w9roul5`.
- **Cache-bust query strings (`?v=4`)** still on asset URLs. No bump needed in Session 6 (only inline HTML/CSS/JS edited, not `assets/site.css`).
- **Local working tree:** clean.

## What Comes Next

### High priority

1. **Flip apex domain to the Cloudflare Worker.** Currently `romanalabs.com` is served by GitHub Pages. The Worker is deployed and tested at `*.workers.dev`. To flip: Cloudflare dashboard → Workers & Pages → `romanalabs-website` → Settings → Domains & Routes → Add Custom Domain `romanalabs.com` (and `www.romanalabs.com`). After successful flip, headers via Worker config become possible.
2. **Verify the Make.com scenario is wired up.** Before relying on the form for real leads, open the Make scenario, click "Run once" to put it in listening mode, then submit a test from `romanalabs.com/contact/`. This locks in the data structure in Make. After that the scenario can run normally.
3. **Web3Forms hardening** is now MOOT — Web3Forms unplugged in Session 6 commit `7ded3d3`. Skip Audit Finding #2 from earlier sessions.

### Lower priority / when user provides input

4. **X/Twitter footer URL** — still `href="#"` on both pages. Waiting on real handle from user.
5. **Self-host fonts** (Audit Finding #9.5) — replace Google Fonts CDN with locally-hosted `.woff2` files in `/brand_assets/fonts/`. ~30 min, eliminates last 3rd-party CSS request.
6. **Compliance badge verification** (SOC 2 / ISO 27001 / GDPR / Zero-Knowledge Infra in security section). User to confirm which are actually held. Don't fabricate.
7. **Case study metric confirmation** — current numbers (BANEGAS 600+ leads/mo, XIOS $180K, 3P 80+ assets, etc.) need user verification that they're accurate to what was actually delivered. Site is live with them.

### Bigger optional moves

8. **Decide on retiring GitHub Pages** once Cloudflare apex flip is verified. Both deploys currently stay in sync, which is wasted work.

## Active Decisions & Context

### Behavioral rules (HARD CONSTRAINTS — quoted from user)

- **"I DID NOT TELL YOU TO DO THIS."** — user pushed back against unauthorized big changes. Going forward: **do only what the user asks, in the scope they ask. Check with the user before any change that touches more than the specific element/file they mentioned.** No proactive architecture overhauls or sweeping refactors.
- **"I want the site to look good. this is trash. avoid keeping it the same."** — visual-quality complaints get targeted fixes, not architectural ones.
- **"a few [em dashes] are good, not too many"** (Session 6) — default to splitting em-dash sentences into 2 declaratives.

### Session 6 NEW context (CRITICAL — preserve in future sessions)

- **Buyer profile (CONFIRMED in Session 6):** $1–10M founder/CEO. Site copy speaks to them, not enterprise ops leads.
- **Pain anchor (CONFIRMED):** dollars lost to slow lead response / abandoned carts / leakage. The hero subhead now leads with this.
- **Villain (CONFIRMED):** generic "AI agencies" wrapping ChatGPT and charging $20K/mo. The H1, problem H2, and final CTA all echo this villain — keep that thread consistent in future copy.
- **Tone (CONFIRMED):** Clairvo-level direct. Blunt but professional. No insults, but unflinching about the buyer's situation. Reference: clairvo.io copy patterns (loss aversion anchored to $ amount, named villain in headline, staccato declaratives, competitive contrast clauses, "built for [year]" category-pioneer framing).
- **Hero H1 is no longer locked.** New H1: "AI agencies sell prompts. *We ship systems.*" (brand-serif span on "We ship systems."). The old "We don't pitch AI. We ship it." is retired.

### Architectural decisions

- **DO NOT externalize inline CSS or JS again** without testing in production first. Pre-built Tailwind misses utilities the CDN's JIT generates from the live DOM → silent visual breakage. Tried it (`ea9e2ac`), broke the site, reverted (`bc23e51`).
- **Tailwind CDN runtime warning is acceptable.** User explicitly chose this trade-off.
- **Hosting is now dual-deployed.** GitHub Pages serves the live `romanalabs.com`; Cloudflare Worker is a preview. After apex flip, GH Pages can be retired.
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

- **Push command:** `git -c http.version=HTTP/1.1 push origin main` (HTTP/2 stall workaround on this Windows machine).
- **Wrangler deploy command:** `npx wrangler deploy` from project root. The `.assetsignore` filters out node_modules etc. Worker URL: `romanalabs-website.samirflores13.workers.dev`.
- **Local preview gotcha:** opening `index.html` via `file://` — server-absolute paths don't resolve. Asset paths are relative.
- **Screenshot script** (`npm run screenshot`) only does `index.html` (not `/contact`). Mobile (423px) + desktop (1440px) viewports.

## Key Files

- [index.html](index.html) — main page (~2370 lines): full inline `<style>` + `<script>`. Loads Tailwind via CDN runtime. Sections: hero, logo marquee, problem cards, case studies (real clients now: BANEGAS / XIOS / 3P Jewelry), process (sticky-scroll, 420vh runway), security, final CTA, footer.
- [contact/index.html](contact/index.html) — `/contact` page (~720 lines): 6-field lead form POSTing JSON to Make.com webhook.
- [assets/site.css](assets/site.css) — only external CSS file (~133 lines). Shared `:root` brand tokens + footer styles.
- [wrangler.jsonc](wrangler.jsonc) — Cloudflare Workers deploy config. `name: "romanalabs-website"`, `assets.directory: "."`.
- [.assetsignore](.assetsignore) — wrangler-only ignore file. Excludes node_modules, .git, screenshots, dev configs. REQUIRED for deploy to work.
- [package.json](package.json) — devDeps: puppeteer (screenshot script). No build scripts.
- [screenshot.js](screenshot.js) — Puppeteer dual-viewport (423px / 1440px) full-page screenshot tool.
- [CNAME](CNAME) — `romanalabs.com` (GitHub Pages custom domain marker).
- [CLAUDE.md](CLAUDE.md) — current-architecture docs + HARD CONSTRAINTS. Refreshed in Session 5. **May need refresh** for Session 6 changes (new H1, villain context, dual-deploy).
- [.claude/CLAUDE.md](.claude/CLAUDE.md) + [.claude/rules/*.md](.claude/rules/) — session rules. `.claude/rules/brand-identity.md` refreshed in Session 5.
- [progress.md](progress.md) — this file.

**Deleted in Session 5 (don't re-create):** `_headers`, `netlify.toml`, old `README.md`, `nul`, 4 unreferenced brand_assets PNGs.

**Removed in Session 6:** Web3Forms references (action URL + 3 hidden inputs), "About" + "Results" nav links, entire Scoreboard section (`id="results"` block), "PROCESS" eyebrow above "How we work."

## How to Resume

**First thing:** read this whole file end-to-end. The hardest-won lessons are in "Active Decisions & Context" — specifically the "Behavioral rules (HARD CONSTRAINTS)" section and the **Session 6 NEW context** (buyer profile, villain, tone — these now drive all copy decisions).

Verify current live state:
- https://romanalabs.com → main site (open in **incognito** to bypass browser cache). New H1 reads "AI agencies sell prompts. *We ship systems.*"
- https://romanalabs.com/contact/ → 6-field lead form. Submissions POST to Make.com webhook.
- https://romanalabs-website.samirflores13.workers.dev → Cloudflare Worker preview (mirror of above).

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
- **Copy voice (Session 6 confirmed):** Clairvo-direct. Founder/CEO buyer. Villain = $20K/mo ChatGPT-wrapper AI agencies. Pain anchor = leakage ($/hour/lead/cart). Em dashes minimal — prefer split declaratives.
- **Cal.com link** always secondary, never competing primary button.
- **Don't fabricate** testimonials, named clients (real ones now in cards), or compliance claims. Flag and ask.
- **No architectural changes without asking.** No externalization, no pre-built Tailwind, no sweeping refactors.
