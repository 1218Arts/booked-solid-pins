# Booked Solid Studio: weekly Pinterest playbook

This repo (branch `pins`) hosts pin images for the Booked Solid Studio Etsy shop and holds everything the weekly pin run needs. Pins are scheduled through Metricool (brand id in `catalog.json`) and post automatically (Cam approved auto-posting on 2026-10-21).

## Files
- `catalog.json`: live Etsy listings per trade, Pinterest board names/ids, Metricool brand.
- `log.csv`: every pin scheduled so far. Append one row per pin. Read it first so titles, angles and listing/board pairs don't repeat too closely.
- `tools/`: pin templates (1000x1500 HTML), `base.css`, `shot.js`, template preview images in `tools/src/<trade>/`.
- `YYYY-MM/`: published pin images. Never delete or rename these; live pins point at them.

## Setup each run
```
cd tools && npm install --silent      # fonts + playwright; Chromium is at /opt/pw-browsers/chromium, never run playwright install
node shot.js <file>.html ../YYYY-MM/BSS-pin-<slug>.jpg
```

## Pin types (copy a template into `tools/_<slug>.html`, edit text and image paths)
- **Product** (`product-*.html`): a kit or a single listing. Fanned template images, name, chips of what's included.
- **What's inside** (`inside-*.html`): grid of the 5 templates for a trade, links to the kit.
- **Tip** (`tip-*.html`): 5-point list of practical advice for service-business owners plus one template image; links to the matching single. The tip must be genuinely useful on its own.
Brand: navy #20365D / #122647, gold #D2AE66 / #9A7A35, cream #F7F3EC, Fraunces + DM Sans. Keep the footer bar and logo.

## Weekly mix (about 21-25 pins, 3-4 a day, Mon-Sun)
- ~40% tip pins (pricing, contracts, getting paid, onboarding, checklists, starting a business), ~35% product pins (rotate all 12 listings), ~25% what's-inside or kit pins.
- Every live listing gets at least one pin per week. Alternate trades. Use fresh titles; existing images may be reused with a new title/board after 3+ weeks.
- Times (ET), varied: 8:30-10:00, 12:00-13:30, 15:00-16:30, 19:30-21:30.

## Copy rules
- Pin title <= 100 chars, keyword-first ("Cleaning Invoice Template", "Lawn Care Contract Template"). Description 2-4 plain sentences, keywords natural, no hashtags spam (0-3 max), no emojis.
- Never call anything free; never invent features, stats, reviews or prices. Agreement pins must not imply legal advice.
- Link every pin to `https://www.etsy.com/listing/<id>` from the catalog (kit pins to the kit).
- Alt text describes the image.

## Checks before scheduling
1. Look at a contact sheet of the week's renders: no overflow, overlap or wrong trade images.
2. Commit + push images to `pins`, then confirm each raw URL returns 200 (`raw_base` + path).
3. Schedule with Metricool `createScheduledPost`: providers pinterest, draft false, autoPublish true, `pinterestData` {boardId (id or exact board name), pinTitle, pinLink, pinNewFormat true}, media [raw URL], mediaAltText.
4. Append rows to `log.csv`, commit, push.
5. Send Cam a short summary: number of pins, date range, mix, any problems.

If a listing in the catalog is no longer live, or a new trade launches, update `catalog.json` (and add its preview images under `tools/src/<trade>/`).
