# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A single-page marketing website for ROMANLABS (AI consulting agency), built as a single `index.html` with Tailwind CSS via CDN. No build step, no framework — just HTML/CSS/JS.

## Commands

```bash
# Take mobile (423px) + desktop (1440px) screenshots
node screenshot.js

# Install dependencies (only puppeteer)
npm install

# Open in browser (Windows)
start index.html
```

## Architecture

- `index.html` — The entire site. Tailwind CSS via CDN, custom CSS in `<style>`, all JS in a `<script>` block at the bottom. Sections: Header, Hero, Logo Marquee, About, Case Studies, Services, Stats/Results, Process, Testimonials (slider), CTA, Footer.
- `screenshot.js` — Puppeteer script that captures full-page screenshots at two viewports. Has a `revealAll()` helper that force-triggers scroll animations and count-up values before capture (IntersectionObserver doesn't fire in static full-page screenshots).
- `brand_assets/` — Logo PNG and brand guidelines image.
- `.claude/rules/` — Detailed rules split by concern (see below).

**Gotcha:** The project directory has a space in its name. `screenshot.js` uses URL-encoded `file:///` paths (`%20`) for Puppeteer navigation but literal paths for file output.

## Rules

Detailed rules live in `.claude/rules/`:

| File | Purpose |
|---|---|
| `screenshot-workflow.md` | The generate → screenshot → compare → fix → repeat loop. Always do 2+ comparison rounds. |
| `technical-defaults.md` | Tailwind CDN, `placehold.co` for missing images, mobile-first, single file |
| `design-fidelity.md` | Match references exactly, don't add features, be specific about pixel mismatches |
| `puppeteer-screenshots.md` | How `screenshot.js` works — `revealAll()`, viewport sizes, file path encoding |
| `brand-identity.md` | ROMANLABS tokens: accent `#4A9FE5`, fonts Outfit/DM Sans, logo path, Cal.com link |
