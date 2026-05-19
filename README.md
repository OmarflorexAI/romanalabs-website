# ROMANALABS Website

Single-page marketing site + `/contact` form, hosted on Cloudflare Pages from this GitHub repo. Custom domain `romanalabs.com`.

## File layout

```
.
├── index.html                # Main marketing page (markup only)
├── contact/
│   └── index.html            # Lead-capture page (markup only)
├── assets/
│   ├── tailwind.css          # Built Tailwind utilities (DO NOT edit by hand)
│   ├── site.css              # Shared: brand tokens + footer styles
│   ├── main.css              # Main page styles (was inline)
│   ├── main.js               # Main page scripts (was inline)
│   ├── contact.css           # Contact page styles (was inline)
│   └── contact.js            # Contact page scripts (was inline)
├── src/
│   └── tailwind.in.css       # Tailwind input — edit to add theme tokens
├── brand_assets/             # Logo, brand guidelines image, SVG icons
├── package.json
└── screenshot.js             # Puppeteer dual-viewport screenshot tool
```

## Daily workflow

**Editing content / styles / scripts:** edit the file → `git push`. Cloudflare redeploys automatically. No build step needed.

**Adding a new Tailwind utility class to HTML** (e.g. you write `class="text-xl"` somewhere new): you have two options.

| Option | Setup | Workflow |
| --- | --- | --- |
| **A. Build locally before push** (default) | nothing | `npm run build:css` → `git add assets/tailwind.css` → `git push` |
| **B. Build on Cloudflare** (zero local steps) | Configure once in Cloudflare Pages dashboard (see below) | `git push` — Cloudflare runs the build |

Option B is recommended once you've gone through the rest of the dashboard setup. Until then, Option A works — the pre-built `assets/tailwind.css` is committed, so the site always renders correctly even without a fresh build.

### Cloudflare Pages auto-build setup (one time)

1. Cloudflare dashboard → Pages → `romanalabs-website` project → Settings → Builds & deployments.
2. Build command: `npm run build`
3. Build output directory: leave blank (or `.`)
4. Node version: 20 or later.
5. Save.

That's it. After this, every `git push` triggers Cloudflare to run `npm run build` (which runs `npm run build:css` → regenerates `assets/tailwind.css`) before publishing. You can stop committing `assets/tailwind.css` if you want — it'll be generated on the server. (Easier to just keep committing it; it's tiny and zero-trust.)

## Available scripts

```bash
npm run build:css     # One-shot regenerate assets/tailwind.css
npm run build         # Alias for build:css (called by Cloudflare)
npm run watch:css     # Rebuild on file changes (use during local dev)
npm run screenshot    # Puppeteer screenshot test → screenshot-{mobile,desktop}.png
```

## Editing the design

| Task | File |
| --- | --- |
| Change brand colors (gold, emerald, alabaster) | `src/tailwind.in.css` (under `@theme`) → then `npm run build:css`, AND `assets/site.css` (`:root` block). Keep them in sync. |
| Edit the footer | `assets/site.css` (`.footer-*` rules) + footer markup in both `index.html` and `contact/index.html`. |
| Add/edit a section on the main page | `index.html` markup + `assets/main.css` for styles |
| Edit the lead-capture form | `contact/index.html` markup + `assets/contact.css` + `assets/contact.js` |
| Anything you can't find | every file is short now (HTML ~750 lines, each CSS file ~400-1700 lines). `Ctrl+F` is your friend. |

## Form backend

The `/contact` form posts to Web3Forms. Access key lives in:
- `contact/index.html` (line ~46, hidden input `name="access_key"`)

To rotate: get a new key at https://web3forms.com, replace the value, push.

## Git / deploy gotchas

- **Push command:** HTTP/2 sometimes stalls on this Windows machine. Use `git -c http.version=HTTP/1.1 push origin main` if a plain push hangs.
- **Token in remote URL:** the GitHub PAT is currently embedded in the `origin` URL. Long-term, move it to Git Credential Manager: `git config --global credential.helper manager` and `git remote set-url origin https://github.com/OmarflorexAI/romanalabs-website.git` (no token).
- **Cloudflare CDN cache:** edits propagate in 1–3 minutes. Hard-refresh (`Ctrl+Shift+R`) if you don't see an update.
