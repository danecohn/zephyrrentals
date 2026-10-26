# Zephyr Rentals

A photography-led website for Old Town Lofts, Scottsdale. Built for zephyr.rentals and deployed on Railway. Website by Artemis Softworks LLC.

## Run locally

Requires Node.js 24 or newer. No production dependencies or API keys.

```sh
npm run build
npm test
PORT=4348 npm start
```

Visit http://localhost:4348. Build output is in `dist/`; keep this generated folder out of version control. The Dockerfile builds the same pages and listens on Railway's `PORT`.

## Content and functionality

- Three individually presented lofts, with all 154 supplied property photographs, responsive WebP exports and accessible gallery dialogs.
- 33 restaurant/nightlife recommendations with original guide photography, category filters, search, saved favorites and Markdown export.
- Local experiences, public arrival/stay information and direct host contact links.
- Validated booking handoff to the existing Zephyr Guesty listings. Availability, rates, payments, guest eligibility and booking terms remain in Guesty. This site does not take reservations or collect payment information.
- Browser-local saved places, no account, advertising scripts or analytics added.
- Prerendered HTML, metadata, social image, sitemap, mobile layouts and keyboard-accessible controls.

Edit `data/site.mjs`, `data/restaurants.json`, `data/photos.json` and `scripts/render.mjs`; styles and client interactions live in `public/`. Rebuild after editing. Run `npm test` after building.

## Railway

Connect `danecohn/zephyrrentals`, branch `main`. Railway detects `Dockerfile`; health check `/api/health` is configured in `railway.json`. No secrets or database are required. Attach zephyr.rentals after checking the generated Railway URL, then configure the DNS records Railway returns. Preserve existing email DNS records.

## Media and licensing

See [content sources](docs/CONTENT-SOURCES.md) and [brand provenance](docs/BRAND.md). Source code retains this repository's GPL-3.0 license. Property and third-party venue photography are supplied business content, not a general-purpose stock-photo library; the code license does not represent a new grant of third-party image rights. Original archives, full-resolution private photo folders and booking-system credentials are not included.

Optional image preparation scripts require the `sharp` package installed separately. They are not part of the deployment build. See their command-line arguments; published WebP and PNG assets are already included.
