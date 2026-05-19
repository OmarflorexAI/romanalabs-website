# CLAUDE.md

Guidance for Claude Code when working in this repo.

## What This Is

ROMANALABS marketing site (AI consulting agency) — two static pages (`/` and `/contact`) served by Cloudflare Pages from this GitHub repo. Domain: `romanalabs.com`.

For deployment, workflow, and Cloudflare auto-build setup, see [README.md](README.md). Read it first if you're touching the build pipeline.

## Architecture (current, post-refactor)

```
.
├── index.html             # ~750 lines of pure markup
├── contact/index.html     # ~200 lines of pure markup
├── assets/
│   ├── tailwind.css       # PRE-BUILT Tailwind utilities (only what's used). Commit it.
│   ├── site.css           # Shared: brand tokens (:root) + footer styles. Loaded by BOTH pages.
│   ├── main.css           # Main page styles (was inline)
│   ├── main.js            # Main page scripts (was inline; loaded with defer)
│   ├── contact.css        # Contact page styles
│   └── contact.js         # Contact page scripts (loaded with defer)
├── src/tailwind.in.css    # Tailwind input — @import "tailwindcss" + @theme tokens + @source globs
├── package.json           # Build scripts (build:css, watch:css, screenshot)
└── brand_assets/          # Logos, brand images
```

**No CDN dependencies at runtime.** Tailwind is pre-built locally and committed. Open the live site → DevTools → Console → there should be ZERO warnings.

## Commands

```bash
npm run build:css     # Regenerate assets/tailwind.css (run after adding new Tailwind classes to HTML)
npm run watch:css     # Same, auto-rerun on file change
npm run screenshot    # Puppeteer dual-viewport screenshot → screenshot-{mobile,desktop}.png
```

## When you must rebuild

Run `npm run build:css` and commit the updated `assets/tailwind.css` whenever you:
- Add a new Tailwind utility class to any HTML file (e.g. `text-xl`, `gap-8`, anything that didn't exist before)
- Edit `src/tailwind.in.css` (theme tokens, @source globs)

You do NOT need to rebuild when you:
- Edit content/copy
- Edit `assets/main.css`, `assets/contact.css`, `assets/site.css`
- Edit JS files
- Edit existing Tailwind classes that are already in the HTML (already in the pre-built CSS)

If Cloudflare Pages auto-build is configured (see README), you never need to rebuild locally — Cloudflare does it on every deploy.

## Brand tokens

Source of truth: `assets/site.css` (`:root` block) + `src/tailwind.in.css` (`@theme` block). **Keep them in sync.** Changing a color in one place without the other will produce visual drift.

| Token | Value | Use |
| --- | --- | --- |
| `--accent` | `#D4AF37` | Muted gold — CTAs, key metrics, italic emphasis |
| `--accent-hover` | `#C49B2E` | Hover state for gold elements |
| `--emerald` | `#1B4332` | British Racing Green — labels, borders, secondary actions |
| `--bg-primary` | `#F9F9F7` | Soft alabaster — page background |
| `--bg-card` | `#0A0D0B` | Deep obsidian — footer, dark cards |
| Heading font | Space Grotesk | Geometric sans, all headings + UI labels |
| Body font | Inter | Refined sans, all body text |

## Push / deploy gotcha

`git push` over HTTPS sometimes stalls silently on this Windows machine (HTTP/2 multiplexing bug). Workaround: `git -c http.version=HTTP/1.1 push origin main`.

## Rules

Detailed rules live in `.claude/rules/`. Most are still relevant; one is now outdated:

| File | Status |
|---|---|
| `screenshot-workflow.md` | Active — use the generate→screenshot→compare→fix loop |
| `design-fidelity.md` | Active — match references exactly, don't add features |
| `puppeteer-screenshots.md` | Active — explains `revealAll()` and viewport sizes |
| `brand-identity.md` | **STALE** — references old palette `#4A9FE5`. Current palette is in this file + `assets/site.css`. |
| `technical-defaults.md` | **STALE** — says "Tailwind via CDN, single file." Current: pre-built Tailwind + externalized assets. |

**Gotcha (still relevant):** project directory contains a space. `screenshot.js` uses URL-encoded `file:///` paths (`%20`) for Puppeteer navigation but literal paths for file output.
