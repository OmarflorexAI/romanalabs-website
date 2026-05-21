# Backend & Hardening Notes

> Reference doc for ROMANALABS lead-capture pipeline.
> Created 2026-05-20. Not committed by default — feel free to keep this local.

---

## TL;DR

**You do NOT need a traditional backend (Node/Python server) for the lead-capture site.**
The static-site + Make.com architecture is correctly matched to your scale and use case.

However, there are **3 quick-win hardenings** worth doing in priority order, plus **one real compliance gap** (privacy policy) that's not optional.

---

## What you DON'T need

| Common "you need a backend" reason | Your situation |
|---|---|
| Server-side database | Airtable handles this |
| API authentication | Make webhook works without keys (the unique token in the URL acts as one) |
| Business logic processing | Gemini + Make scenario IS your logic layer |
| Email sending | Make + Gmail module |
| File uploads | You don't have any |
| User accounts / login | You don't have any |

A Node/Python backend would be over-engineering. Skip it.

---

## What you SHOULD think about (priority order)

### 1. Bot spam protection (priority: MEDIUM — do within 30 days, or sooner if you see spam)

Your webhook URL is visible in the page source. Anyone who views-source can hammer it.

Current state:
- ✅ Honeypot (`botcheck` checkbox) — catches dumb form-fill bots
- ❌ No CAPTCHA — sophisticated bots bypass honeypots
- ❌ No rate limiting — one attacker could blow your Make free-tier ops quota (1000/mo)

**Best fix:** Add **Cloudflare Turnstile** (free, invisible, drop-in CAPTCHA).
- ~5-line change to the form HTML
- ~10-line change to the form JS to include the Turnstile token in the webhook payload
- Make scenario validates the token via Cloudflare's siteverify endpoint as the first step
- No backend needed
- Free, unlimited
- Defer until you see actual spam.

### 2. Hide the webhook URL behind your Cloudflare Worker (priority: LOW — do when convenient)

Right now `https://hook.us2.make.com/0q6okwf87as8axjjnidu67m87w9roul5` is exposed in client JS.
If it leaks, an attacker can flood your Make scenario directly, bypassing your site entirely.

**Fix:** Point the form at `romanalabs.com/api/lead` (a Worker route). The Worker validates + forwards to Make.
- You already have the Cloudflare Worker deployed
- Adding a route is ~30 lines of TypeScript
- Lets you also add: rate limiting per IP, basic logging, and request signing

Not urgent. Do this only if you see real abuse.

### 3. Privacy policy (priority: HIGH — do this month)

This is a real compliance gap, not theoretical.

You're collecting:
- Name, email, phone (PII)
- Business info
- IP address (via Cloudflare logs)
- User agent (via Make)
- Goals + bottleneck descriptions (sensitive business info)

If anyone from the EU, UK, or California submits the form, you're subject to GDPR / CCPA.

What you need:
- A **privacy policy page** at `romanalabs.com/privacy`
- A sentence on the contact form: *"By submitting, you agree to our privacy policy"* with a link
- Clarity on:
  - What data you collect
  - How long you keep it
  - Who you share it with (sub-processors): **Make.com, Airtable, Cal.com, Google (Gemini + Gmail)**
  - How users can request deletion

Even a small fine for missing a privacy policy is ~$5K. The fix is a static page + one sentence on the form. ~1–2 hours of work.

*(Note: Session 5 of the build removed the dead `/privacy` link from the footer because it pointed to nothing. We should put it back — with a real policy behind it.)*

---

## Bonus: Unique submission ID per form submission

**Necessary?** No. Make.com assigns an execution ID, Airtable assigns a record ID.

**Worth doing?** Yes — it costs 3 lines of code and gives you:

1. **End-to-end traceability** — same ID lives in the webhook payload, Airtable row, AI qualification log, notification email subject, and any follow-up to the lead. One ID, one lookup, every system.
2. **Deduplication** — double-click submit during a network hiccup → both land. Your Make scenario can spot duplicates by ID.
3. **Support / audit** — lead says *"I submitted twice and never heard back"* → find both rows instantly.
4. **GDPR deletion requests** — search Airtable + Make logs by ID, done.

### Implementation (when you decide to ship it)

**1. Contact form JS** — add to the payload definition:
```js
var payload = {
  submission_id: crypto.randomUUID(),  // ← add this line, first field
  name: trim(fd.get('name')),
  email: trim(fd.get('email')),
  // ... rest unchanged
};
```

**2. Airtable** — add a field:
- Field name: `Submission ID`
- Type: Single line text

**3. Make scenario** — in the Airtable "Create a Record" module, map `submission_id` from the webhook to the `Submission ID` field.

**Optional**: Add `[{{submission_id}}]` to the notification email subject line for easy reference.

**Do NOT** show the ID to the lead in the success view — clutter for them, no value.

---

## Recommended sequence

1. **Week 1**: Ship privacy policy. Add the link + consent line to the contact form. **(High priority — compliance.)**
2. **Week 2 (or when convenient)**: Add the unique submission ID. **(Cheap, useful.)**
3. **Month 1+**: Wait for actual spam. If/when it arrives, add Cloudflare Turnstile.
4. **Later (or never)**: Move the webhook behind a Cloudflare Worker route. Only if you see direct webhook abuse.

That's the entire backend story for this site at its current scale.

---

## Current architecture (for reference)

```
Browser (static HTML/JS)
   │
   │ POST JSON to webhook
   ▼
Make.com webhook
   │
   ├──► Gemini (qualification)
   ├──► Airtable (storage)
   └──► Gmail (notification)
```

No backend. No server to maintain. No infrastructure to scale.
This is the right shape for a lead-capture marketing site.
