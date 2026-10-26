# Release validation

- Node.js 24: prerender build completes all 12 public pages and the 404 page.
- Six automated tests pass: calendar dates and Arizona timezone boundary; all three verified Guesty listing IDs; open-date browsing and fixed provider origin; rejected invalid dates, guests and units; complete 154-property/33-venue photo files; HTTP routes, health, redirects, errors, HEAD and source-file isolation.
- All internal page and asset links in the generated HTML resolve to build output.
- Browser: gallery opens all 46 Loft One photos, nested photo viewer advances 1/46 to 2/46, and dialogs close correctly.
- Browser: restaurant search narrows results, a saved venue persists across page navigation, saved-list dialog shows the venue, and Markdown export downloads a readable file with venue and map links.
- Browser: Loft Two with 10–14 February 2027 reaches its matching Guesty page; Guesty displays both dates, four nights and its own real price. No reservation or payment was submitted.
- Responsive visual and interaction checks in real 390px and 320px iframe viewports: navigation, hero, guide cards, readable text and controls. Desktop checked at the browser's default 1280px width. Browser viewport override was unavailable, so a local-only same-origin QA proxy supplied the phone-sized frame; no QA route or proxy ships in this repository.
- New logo and actual property photos checked visually. No generated property imagery, guest reviews or invented live availability.

The local previews and live deployment use the same prerendered HTML, CSS, JavaScript and Node server. Booking policies and live inventory remain controlled by Guesty. Canonical URLs target the intended zephyr.rentals domain; DNS connection is a separate launch step.
