# Progress Checkpoint
> Last updated: 2026-05-21 (tenth update — post-Session-7.6: CTA card v2 vertical gradient, marquee hover removed, security trimmed to 6 plain-language cards in 3×2 grid) by context-checkpoint skill
> Context usage at time of checkpoint: ~92%

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
29. Rectangular CTAs + scroll-center fix + process panel collision fix (`6ff984b`).
30. **Real case studies + nav trim + process scroll rework + Make webhook** (`7ded3d3`):
    - Case study cards replaced with real clients: **BANEGAS Real Estate**, **XIOS**, **3P Jewelry**.
    - Industry badge removed. Business name centered white at top of each card.
    - Navbar trim: removed `About` + `Results` links.
    - Entire Scoreboard section deleted.
    - Process sticky-scroll runway: 420vh (final).
    - **Form → Make.com webhook:** contact form POSTs JSON to `https://hook.us2.make.com/0q6okwf87as8axjjnidu67m87w9roul5`. Web3Forms fully removed.
31. **Clean /contact URL + Cloudflare Workers config** (`f882b4b`):
    - All CTA links: `contact/index.html` → `contact/`.
    - Added `wrangler.jsonc`. Added `.assetsignore` (fixed the 85 MiB `workerd.exe` upload error).
    - First Cloudflare deploy.
32. **"Get in Touch" CTAs + fix process panel blur at rest** (`7154f1d`):
    - Blur fix: `transform: none` + `will-change: auto` when panel is active.
    - All 5 CTAs unified to **"Get in Touch"**.
33. Clairvo-style copy rewrite v1 (`f0b0130`).

### Session 6.5 (2026-05-20) — Copy rewrite v2: positioning-led voice (`aadf2ad`)

34. User feedback: "simple yet clever, positioning is everything, we don't want to be like everybody else." Broadened pain frame from leads/carts → "bottlenecks / systems" (we do all AI automation).
    - **Hero H1:** "AI agencies sell prompts. We ship systems." → **"Scale the business. Not the headcount."**
    - Hero sub, problem H2, security H2, final CTA H2 all rewritten in parallel-structure declaratives.
    - Footer taglines + meta description aligned.

### Session 7 (2026-05-20 → 2026-05-21) — Make automation plan, navbar polish, Cal.com prefill, backend notes

35. **Make.com lead-capture automation — full plan written** at `C:\Users\admin\.claude\plans\harmonic-shimmying-noodle.md`. **NOT a code change** — designs a 4-module Make scenario (Webhook → Gemini → Router → [Airtable + Gmail]). User answered clarifying questions:
    - Storage: **Airtable** (note: plan originally drafted with Notion when user asked about Notion, then swapped to Airtable when user clarified they wanted Airtable. User said "I already have all my databases ready" → meaning they have their general Notion CRM but want a dedicated Airtable base for the lead pipeline.)
    - Notification: **Email** (Gmail module → `omar@romanalabs.com`)
    - AI qualification: **Yes** — use Gemini to score 1-5, summarize, and draft suggested reply
    - LLM: User chose **Gemini** (originally I recommended Claude Haiku 4.5; user picked Gemini in Make)
    - Plan approved by user. Implementation is in Make.com UI + Airtable UI (no code changes required).

36. **Three prompts delivered to user** (in chat, copyable):
    - **Airtable database scaffolding prompt** — CO-STAR-structured, defines 17 fields + 3 views (Triage / Active Pipeline / Closed). User to paste into Airtable's Cobuilder/Omni or use as manual build spec.
    - **Gemini lead-qualification prompt** — Role + Task + Context + Scoring rubric + Few-shot examples (3 examples covering score 5, 3, 1). Output is strict JSON: `{score, summary, suggested_reply}`. Designed for Gemini's `response_mime_type: application/json` + `response_schema` enforcement.
    - **Email templates** — internal notification HTML email (with AI score in subject) + 3 example reply drafts by score band + future "confirmation to lead" template.

37. **Walked user through Make Gemini module config** in chat (screenshots). Key fixes:
    - Messages → Item 1 → Role: changed from "Model" to **User**
    - Parts → added Item with Type=Text, mapping the 6 input variables (`{{1.name}}`, `{{1.email}}`, etc.) from the webhook
    - Clarified: System Instructions = scaffolding (role, rubric, examples, output format). Messages Parts = the actual lead data per call.

38. **Cal.com double-form friction discussion**. User flagged: their contact form asks for 6 fields, then Cal.com asks for 7+ more fields (incl. monthly rev which is invasive). Recommended:
    - **Strip the Cal.com event** down to Name + Email + Phone + time slot only. Delete Business Website, "What does your business do", "What made you want to contact us", Monthly rev. (User does this in Cal dashboard — not code.)
    - **Prefill name + email in the Cal.com URL** so lead lands with those already filled.

39. **Navbar CTA matches hero btn-shine + Cal.com URL prefill** (`306ef6f`):
    - Navbar "Get in Touch" button: `border-radius: 10px → 6px` (matches hero `rounded-md`), added base outline glow `box-shadow: 0 2px 8px rgba(212,175,55,0.1), 0 0 0 1px rgba(212,175,55,0.1)`, font-size `13 → 14px`, hover `translateY(-1px) → translateY(-2px)`. Same gold/shimmer/lift as hero, at navbar scale.
    - `contact/index.html` form JS: after successful submit, builds `calUrl = CAL_URL + '?name=' + encodeURIComponent(payload.name) + '&email=' + encodeURIComponent(payload.email)` before `window.open(...)`. Lead lands on Cal.com with name + email already populated.

40. **Backend & hardening reference doc** (`e9f8af2`, then `d97cc9a` for leak fix):
    - Created `BACKEND_AND_HARDENING_NOTES.md` at project root — TL;DR (no backend needed at current scale), 3 priority hardenings (Turnstile / Worker proxy / **privacy policy — HIGH**), and the optional `submission_id: crypto.randomUUID()` pattern with exact implementation snippets.
    - **Leak fix**: file was uploaded by `wrangler deploy` to the public Worker (URL: `*.workers.dev/BACKEND_AND_HARDENING_NOTES.md` was fetchable). Updated `.assetsignore`: replaced individual `progress.md` + `CLAUDE.md` entries with `*.md` glob to catch all internal markdown going forward. Redeployed. Verified the file 404s on the Worker.

41. **Submission ID discussion**: user asked if a unique per-submission ID is necessary. Answered: not necessary (Make + Airtable already generate IDs) but worth adding for traceability/dedup/audit/GDPR. Cost is 3 lines of JS + 1 Airtable field. **Not yet implemented** — user has the implementation in `BACKEND_AND_HARDENING_NOTES.md` and can ship when ready.

### Session 7.5 (2026-05-21) — Monk-style final CTA card + large-screen typography (`cef98f5`)

42. **Final CTA card redesigned** to match a reference image user shared (Monk Group's "Start Your Transformation" card). User direction: same shape (chamfered top-right corner, smooth radial gradient, glowing brand mark on the right, more compact), **keep our existing colors** (don't switch to red), shorten card height.
    - New `.cta-card` class with:
      - `clip-path: polygon(0 0, calc(100% - 56px) 0, 100% 56px, 100% 100%, 0 100%)` — cuts the top-right corner at 45°. Mobile drops the chamfer to 36px.
      - Radial gradient (gold glow concentrated at 88% horizontal, 50% vertical) layered over a linear obsidian gradient (`#0F1310 → #0A0D0B → #14110A`).
      - `::before` pseudo-element with inset 1px white-7% box-shadow (clip-path-matched) acts as the border since real borders don't render on clipped shapes.
    - New `.cta-glow-mark` — uses the ROMANALABS SVG logo positioned absolute on the right, recolored to gold via `filter: brightness(0) saturate(100%) invert(75%) sepia(45%) saturate(820%) hue-rotate(2deg) brightness(98%) contrast(92%)` + two drop-shadow gold glow layers. Mirrors the reference's "monk" glow pattern using our actual logo mark.
    - Card padding reduced: was `p-8 sm:p-10 lg:p-14`, now `clamp(28px, 4vw, 48px) clamp(24px, 4vw, 56px)`. Heading max-width capped at 60% of card width via `.cta-card-inner` so headline doesn't stretch into the glow zone.
    - Headline shortened: "Find the three places AI pays you back fastest." → **"Find the places AI pays you back fastest."** (user request: drop "three").
    - Subhead rewritten in positioning voice: "An AI strategy session that uncovers your three highest-leverage opportunities and maps the build plan for the first one. Free. 30 minutes."
    - Button text unchanged ("Get in Touch"), padding tightened (`px-7 py-3.5` → `px-6 py-3`) to match the more compact card.

43. **Large-screen responsive scaling** — user noted content felt small on bigger displays:
    - Bumped `.max-content` max-width `1280px → 1400px` for default desktop.
    - Added media queries:
      - `@media (min-width: 1600px)`: `heading-xl` max bumped to 88px, `heading-lg` to 56px, body text to 17px.
      - `@media (min-width: 2200px)`: `.max-content` max-width to 1600px, `heading-xl` to 104px, `heading-lg` to 64px.
    - Reason: on 1920+ displays, content pinned to 1280px felt centered-with-too-much-whitespace, and clamp() typography hit its 72px max too early. Now scales gracefully through 4K.

### Session 7.6 (2026-05-21) — CTA card v2, marquee hover removal, security simplification

44. **CTA card v2: vertical gradient, drop glow + horizontal sprawl** (`1893f9b`). User feedback after v1: "the gradient should go from top to the bottom of the card like in the image. remove the bright logo on the right and the strong light. this makes the card super large horizontally, I want it much smaller, change this. ensure the gradient looks clean, the color could go from a subtle black to the current green."
    - `.cta-card` background: radial-gold-over-obsidian → **`linear-gradient(180deg, #0A0D0B 0%, #0E1812 55%, #1B4332 100%)`** — vertical, subtle obsidian-at-top into emerald-at-bottom. No glows.
    - Removed `.cta-glow-mark` `<img>` element and its filter/drop-shadow CSS.
    - `.cta-card` got `max-width: 920px; margin: 0 auto` — card now centered and ~⅔ the width of the container instead of full-width. Visually much smaller.
    - Removed `.cta-card-inner max-width:60%` (no glow zone to avoid).
    - Padding tightened slightly to match the narrower shape.
    - Chamfered top-right corner via clip-path preserved.

45. **Marquee hover removed** (`9b3b1d7`). User: "remove the hover effect on the marquee section below the hero, we only want to showcase the icons."
    - Stripped `.marquee-track img:hover { opacity:1; transform: scale(1.1) translateY(-3px); }` from CSS.
    - Also removed the `transition` from base `.marquee-track img` since it has nothing to transition to now.

46. **Security section trimmed 8 → 6 cards + plain-language rewrite** (`9b3b1d7`). User: "I only want 6 cards in the security section, remove 2 that are unnecessary. these cards seem a bit too tech, someone without knowledge won't what these means, I want that even a 10 year old understands, fix the copy of these cards and section. make it simple to understand."
    - **Removed 2 cards:**
      - "Multi-tenant Isolation" — incomprehensible jargon for a $1-10M founder
      - "SOC 2 & GDPR" — redundant with the compliance badges directly above
    - **Rewrote remaining 6 cards in plain language:**
      | Old title | New title |
      |---|---|
      | End-to-End Encryption | Your data is locked |
      | Complete Audit Trail | Every action is logged |
      | Zero Data Retention | We don't keep your data |
      | Private Cloud Deploy | It runs on your side |
      | Role-Based Access | Only the right people see it |
      | 24/7 Incident Response | We're always watching |
    - Descriptions stripped of acronyms (AES-256, TLS 1.3, VPC, RBAC) and rewritten with concrete actions (e.g. "scrambled while it travels", "passes through and disappears", "you decide who can see what").
    - Refreshed section subhead: "We never store your data, never train on it, and never share it. Everything runs locked, logged, and on your side."

47. **Security grid: 4-col → 3-col** (`f07622b`). After trimming to 6 cards, the 4-column desktop grid was leaving cards 5 + 6 alone on the bottom row with empty space to the right. User: "there should 3 cards above and 3 below, fix it."
    - `.feature-grid` desktop `grid-template-columns: 1fr 1fr 1fr 1fr` → `1fr 1fr 1fr`.
    - `:nth-child(4n)` (right-border-none) → `:nth-child(3n)` so the rightmost column has no divider.
    - `:nth-child(n+5)` (bottom-border-none on desktop) → `:nth-child(n+4)` so bottom row (cards 4-6) has no underline.
    - Tablet (2-col) and mobile (1-col) layouts unchanged.

## Current State

- **Branch:** `main`, fully pushed to `origin/main` (clean working tree).
- **Latest commit:** `f07622b` — Security feature grid: 4-col → 3-col layout (3 above, 3 below)
- **Session 7 commit chain:** `306ef6f` → `e9f8af2` → `d97cc9a` → `8a6fa54` (checkpoint) → `cef98f5` → `6c995c2` (checkpoint) → `1893f9b` → `9b3b1d7` → `f07622b`
- **Hosting:**
  - **Primary live:** GitHub Pages → `romanalabs.com` (Cloudflare DNS/proxy in front)
  - **Worker preview:** `https://romanalabs-website.samirflores13.workers.dev`
  - Worker is **not yet bound** to the apex domain. To flip: Cloudflare dashboard → Workers & Pages → `romanalabs-website` → Settings → Domains & Routes → Add Custom Domain → `romanalabs.com`.
- **`.assetsignore`** now uses `*.md` glob — `progress.md`, `CLAUDE.md`, `BACKEND_AND_HARDENING_NOTES.md`, and any future markdown are all blocked from public Worker.
- **Form is LIVE** — POSTs JSON to Make webhook. After successful submit, opens `https://cal.com/omar-flores/discovery?name={name}&email={email}` in a new tab.
- **Cache-bust query strings (`?v=4`)** still on asset URLs. No bump needed in Session 7 (only inline HTML edits + .assetsignore).
- **Make scenario status:** designed and prompts/templates delivered to user. **User is currently building it in Make.com UI.** Last seen mid-config of the Gemini module (Messages → User → Parts → Text mapping).

### Current copy (the unifying story top-to-bottom)
- **H1:** "Scale the business. *Not the headcount.*"
- **Hero sub:** "We turn your everyday bottlenecks into AI systems that ship, run, and pay for themselves. Live in 4 weeks. No tech team required."
- **Problem H2:** "AI is easy to demo. *Hard to ship.*"
- **Problem sub:** "85% of AI projects never make it to production. They look great in a demo and break the moment real data and real users show up. Here's where the money leaks."
- **Use cases H2:** "Shipped. Live. *Paying back.*" (untouched)
- **Process H2:** "How we *work.*" (untouched, runway 420vh)
- **Security H2:** "Your data is yours. *Built that way from day one.*"
- **Security sub:** "We never store your data, never train on it, and never share it. Everything runs locked, logged, and on your side." (Session 7.6)
- **Security cards (6 total, 3×2 grid):** "Your data is locked" / "Every action is logged" / "We don't keep your data" / "It runs on your side" / "Only the right people see it" / "We're always watching" (Session 7.6 — plain-language rewrite)
- **Final CTA H2:** "Find the places AI *pays you back fastest.*" (Session 7.5 — shortened)
- **Final CTA sub:** "An AI strategy session that uncovers your three highest-leverage opportunities and maps the build plan for the first one. Free. 30 minutes." (Session 7.5)
- **Footer tagline:** "Scale the business. Not the headcount. AI systems your team owns, live in 4 weeks."

## What Comes Next

### User actions (Make.com / Airtable / Cal.com — not code)

1. **Finish building the Make.com scenario.** Plan and prompts in `C:\Users\admin\.claude\plans\harmonic-shimmying-noodle.md`. Currently mid-config of the Gemini module — need to complete: Gemini JSON schema, Router, Airtable Create Record, Gmail Send Email. After all modules wired, run "Run once" + submit a test from `romanalabs.com/contact/`.
2. **Build the Airtable base** using the CO-STAR prompt delivered in chat. 17 fields, 3 views. Make module will fail to map until this exists.
3. **Strip the Cal.com event** down to Name + Email + Phone + time slot only. Delete: Business Website, "What does your business do", "What made you want to contact us", Monthly rev. (Cal dashboard → Event Types → Growth Mapping Call → Questions.)
4. **Flip apex domain to the Cloudflare Worker.** Cloudflare dashboard → Workers & Pages → `romanalabs-website` → Settings → Domains & Routes → Add Custom Domain.

### Code changes (priority order)

5. **Privacy policy page** (`/privacy/index.html`) + footer link back + consent line on the contact form. **HIGH PRIORITY — real GDPR/CCPA gap.** Detailed in `BACKEND_AND_HARDENING_NOTES.md`. ~1-2 hours.
6. **Submission ID** (`submission_id: crypto.randomUUID()` in payload + Airtable field + Make mapping). Cheap traceability win. Code snippet ready in `BACKEND_AND_HARDENING_NOTES.md`.
7. **Cloudflare Turnstile** when spam appears (not before).

### Waiting on user input

8. **X/Twitter footer URL** — still `href="#"` on both pages.
9. **Compliance badge verification** (SOC 2 / ISO 27001 / GDPR / Zero-Knowledge Infra in security section). Confirm which are actually held; don't fabricate.
10. **Case study metric confirmation** (BANEGAS 600+ leads/mo, XIOS $180K, 3P 80+ assets). Site is live with these numbers.

### Optional / later

11. **Webhook proxy behind Cloudflare Worker route** — only if direct webhook abuse appears.
12. **Self-host fonts** — replace Google Fonts CDN with `.woff2` files in `/brand_assets/fonts/`.
13. **Decide on retiring GitHub Pages** once Cloudflare apex flip is verified.

## Active Decisions & Context

### Behavioral rules (HARD CONSTRAINTS — quoted from user)

- **"I DID NOT TELL YOU TO DO THIS."** — user pushed back against unauthorized big changes. **Do only what the user asks, in the scope they ask.** Check before any change touching more than the specific element/file they mentioned.
- **"I want the site to look good. this is trash. avoid keeping it the same."** — visual-quality complaints get targeted fixes, not architectural ones.
- **"a few [em dashes] are good, not too many"** (Session 6) — default to splitting em-dash sentences into 2 declaratives.
- **"the copy [should be] so simple and at the same time so clever that anyone can understand and say: 'hmm — i'm interested in this'. positioning is everything. we don't want to be like everybody else."** (Session 6.5) — voice north star. Simple words, clever framing, distinctive positioning. Not LinkedIn-fluff. Not contrarian for its own sake.

### Buyer / villain / tone (CONFIRMED in Session 6, evolved in 6.5)

- **Buyer:** $1–10M founder/CEO.
- **Pain frame (BROADENED in Session 6.5):** "everyday bottlenecks" / "AI systems" — broader than leads/carts. Use these terms in hero/problem framing.
- **Villain (DE-EMPHASIZED in Session 6.5):** the $20K/mo ChatGPT-wrapper agency frame is still real but no longer leads headlines. The 85% pilot-death stat is the remaining villain anchor.
- **Tone:** simple, clever, declarative. Parallel-structure rhythm.
- **Hero H1 is unlocked.** Current: "Scale the business. *Not the headcount.*"

### Session 7.5 / 7.6 NEW context

- **Final CTA card** is now a vertical gradient (obsidian → emerald), max-width 920px, centered. No glow mark, no radial light. User iterated twice on this — v1 had a gold radial + glowing logo on the right, v2 stripped both. Final state is the simpler/cleaner one.
- **CTA card uses a chamfered top-right corner via clip-path.** Real CSS borders DO NOT render on clip-path elements — that's why there's a `::before` pseudo-element with `inset 0 0 0 1px rgba(255,255,255,0.06)` box-shadow and matching clip-path. If a future agent tries to add a normal `border:` to `.cta-card`, it won't show.
- **Card uses our existing palette only.** User explicit: do NOT change colors. Gradient stops are `#0A0D0B → #0E1812 → #1B4332` (all from our obsidian/emerald range).
- **Large-screen typography boost (1600px / 2200px breakpoints).** Don't undo this. Reason: on 1920+ displays the site previously felt small because `.max-content` was pinned to 1280px and typography clamps maxed at 72px. The new breakpoints lift both ceilings.
- **`.max-content` is now 1400px default** (was 1280px).
- **Security feature grid is 3-column on desktop** (`1fr 1fr 1fr`), not 4. If a future agent adds a 7th security card, the bottom row math (`:nth-child(n+4)` border-bottom-none) will break. Either keep it at exactly 6, or update the `:nth-child` numbers to match new card count.
- **Security card copy MUST stay plain-language.** User explicit: "even a 10 year old understands." No acronyms (AES, TLS, VPC, RBAC, SOC, ISO, GDPR — except in the compliance badges section). Use concrete verbs ("scrambled", "passes through", "decide who can see").
- **Marquee logos have no hover effect.** User direction: "we only want to showcase the icons." Don't reintroduce scale/lift on hover.

### Session 7 NEW context

- **Make scenario architecture** (designed, partially built): Webhook → Gemini (JSON output via `response_mime_type` + `response_schema`) → Router → [Airtable Create Record] + [Gmail Send Email]. ~4 operations per lead. Make free tier (1000 ops/mo) covers ~250 leads/mo.
- **Gemini config in Make:** Messages role = `User` (NOT Model). System Instructions = the scaffolding (role/rubric/examples/output). Parts = mapped input variables from webhook. User got tripped up on this — Role defaults to "Model" which is wrong for a single-turn request.
- **Cal.com URL prefill** is now LIVE in the contact form JS. After successful submit, `window.open` constructs `?name=...&email=...` query params from the payload, so the lead lands on Cal with name + email pre-filled.
- **`.md` files must NEVER be uploaded to the Cloudflare Worker.** The `.assetsignore` now uses `*.md` glob. If a future agent adds a new internal markdown file (READMEs, plans, notes), it's automatically excluded. **DO NOT** override this without explicit user permission — `BACKEND_AND_HARDENING_NOTES.md` once leaked publicly because the ignore list was specific-names-only, not a glob.
- **Backend hardening priorities** (in `BACKEND_AND_HARDENING_NOTES.md`): privacy policy (HIGH), submission_id (cheap traceability win), Turnstile (when spam appears), Worker proxy (only if needed).

### Architectural decisions (from prior sessions, still active)

- **DO NOT externalize inline CSS or JS again** without testing in production first. Pre-built Tailwind misses utilities the CDN's JIT generates from the live DOM → silent visual breakage. Tried (`ea9e2ac`), broke, reverted (`bc23e51`).
- **Tailwind CDN runtime warning is acceptable.** User explicitly chose this trade-off.
- **Hosting is dual-deployed.** GitHub Pages serves live; Cloudflare Worker is preview. After apex flip, GH Pages can be retired.
- **`.assetsignore` REQUIRED for `npx wrangler deploy`** — without it, node_modules' 85 MiB `workerd.exe` blows the 25 MiB asset size limit.
- **Cache-bust query strings (`?v=N`) are the working cache-invalidation mechanism on GH Pages.** Bump `?v=N` to `?v=N+1` whenever `assets/site.css` changes.

### Make.com webhook integration

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
- `goals` is a true array.
- Make webhooks return HTTP 200 "Accepted" on success. Code checks `r.ok` (not `.json()`).
- On success: form view hidden, success view shown, **Cal.com with `?name=&email=` prefill** opens in new tab after 900ms.

### Workflow gotchas

- **Push:** `git -c http.version=HTTP/1.1 push origin main` (HTTP/2 stall on Windows).
- **Wrangler deploy:** `npx wrangler deploy` from project root.
- **Local preview:** `file://` doesn't resolve server-absolute paths. Assets use relative paths.
- **Screenshot script** (`npm run screenshot`) — `index.html` only (not `/contact`). Mobile 423px + desktop 1440px.
- **`.assetsignore` is glob-aware.** Use globs (`*.md`) over specific names where possible to avoid future leaks.

## Key Files

- [index.html](index.html) — main page (~2370 lines): full inline `<style>` + `<script>`. Tailwind via CDN. Sections: hero, logo marquee, problem cards, case studies (BANEGAS / XIOS / 3P Jewelry), process (sticky 420vh runway), security, final CTA, footer.
- [contact/index.html](contact/index.html) — `/contact` (~720 lines): 6-field lead form POSTing JSON to Make. Cal.com opens with name/email URL prefill.
- [assets/site.css](assets/site.css) — only external CSS (~133 lines). Shared `:root` tokens + footer styles.
- [wrangler.jsonc](wrangler.jsonc) — Cloudflare Workers deploy config. `name: "romanalabs-website"`, `assets.directory: "."`.
- [.assetsignore](.assetsignore) — wrangler ignore. Uses `*.md` glob for all markdown. REQUIRED for deploy.
- [BACKEND_AND_HARDENING_NOTES.md](BACKEND_AND_HARDENING_NOTES.md) — reference doc on backend question, 3 hardening priorities, and `submission_id` implementation. Internal-only — blocked from Worker by `.assetsignore`.
- [package.json](package.json) — devDeps: puppeteer only. No build scripts.
- [screenshot.js](screenshot.js) — Puppeteer dual-viewport tool.
- [CNAME](CNAME) — `romanalabs.com` (GH Pages custom domain).
- [CLAUDE.md](CLAUDE.md) — current-architecture docs + HARD CONSTRAINTS. **Stale on Session 6/6.5/7 changes** (new H1, voice, dual-deploy, Cal prefill).
- [.claude/CLAUDE.md](.claude/CLAUDE.md) + [.claude/rules/*.md](.claude/rules/) — session rules.
- [progress.md](progress.md) — this file.
- **External:** [C:\Users\admin\.claude\plans\harmonic-shimmying-noodle.md](C:\Users\admin\.claude\plans\harmonic-shimmying-noodle.md) — Make.com automation plan (approved by user).

**Deleted in Session 5 (don't re-create):** `_headers`, `netlify.toml`, old `README.md`, `nul`, 4 unreferenced brand_assets PNGs.

**Removed in Session 6/6.5:** Web3Forms references, "About" + "Results" nav links, Scoreboard section, "PROCESS" eyebrow, dormant lead-capture modal (Session 5).

## How to Resume

**First thing:** read this whole file end-to-end. Critical context lives in "Active Decisions & Context" — HARD CONSTRAINTS, the voice north star, the buyer/villain/tone evolution, and the Session 7 NEW context (`.md` leak lesson, Cal.com prefill, Make architecture).

Verify current live state:
- https://romanalabs.com → main site (open in **incognito** to bypass browser cache). H1: "Scale the business. *Not the headcount.*"
- https://romanalabs.com/contact/ → 6-field lead form. Submits to Make webhook, opens Cal.com with name/email prefill.
- https://romanalabs-website.samirflores13.workers.dev → Cloudflare Worker preview.

If picking up new work, the priority queue is in "What Comes Next":
1. **User actions in Make/Airtable/Cal/Cloudflare** (not your job — but be ready to help debug if user gets stuck)
2. **Privacy policy** (HIGH — real compliance gap; static page + consent line on form)
3. **Submission ID** (cheap traceability win)
4. Then: Turnstile (when spam appears), Worker proxy (later), etc.

Editing rules (DO NOT BREAK):
- **All site edits land in [index.html](index.html) or [contact/index.html](contact/index.html).** Inline `<style>` + `<script>`. Don't externalize.
- **Bump `?v=N`** in `<link>` / `<script>` refs **whenever `assets/site.css` changes.** Currently `?v=4`.
- **Push:** `git -c http.version=HTTP/1.1 push origin main`.
- **Deploy to Cloudflare:** `npx wrangler deploy` from project root after push.
- **`.md` files are blocked from the Worker by `.assetsignore`'s `*.md` glob.** Don't override.
- **Brand tokens:** `--accent #D4AF37` gold, `--emerald #1B4332`, `--bg-primary #F9F9F7` alabaster, `--bg-card #0A0D0B` obsidian. Space Grotesk + Inter.
- **Copy voice:** simple words, clever framing, distinctive positioning. Parallel-structure declaratives. Em dashes minimal. NOT lead/cart-specific in hero/problem — use "bottlenecks / systems / workflows."
- **Cal.com link** always secondary, never competing primary button. Now passes `?name=&email=` as URL params.
- **Don't fabricate** testimonials, named clients, or compliance claims.
- **No architectural changes without asking.**
