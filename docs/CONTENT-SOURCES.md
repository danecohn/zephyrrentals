# Content sources and editorial decisions

The user supplied the original Zephyr website archives for Old Town Lofts, booking, local restaurants, fun/leisure and guest instructions, plus a new 154-photo property shoot. Only Old Town Lofts is marketed here; other former properties are excluded.

The iCloud archive was used as a visual reference: restrained system typography, blue accents, frosted controls, generous space and rounded photography. The implementation is original HTML, CSS and JavaScript. Archived proprietary scripts, accounts, tracking code and credentials are not reused.

## Property photography

All 154 supplied JPGs have matching numeric WebP exports in `public/assets/photos`. `data/photos.json` preserves the original basenames to support maintenance. Unit attribution follows the supplied filenames: Loft One 46, Loft Two 32, Loft Three 45, shared/exterior/neighborhood 31. New property photographs replace the old unit imagery. Descriptions avoid unverified pool access, travel times and invented ratings.

## Original local guide

All 33 recommended restaurant/nightlife names and their corresponding preserved photo URLs are recorded in `data/archive-images.json`. Because many archive entries lacked binary image bodies, their original Squarespace image URLs were retrieved and converted to local WebP files. The leisure and public TV-instruction images were also recovered. `data/restaurants.json` contains the editorial directory. Businesses change; guests are directed to official venue pages for current hours, menus, locations and reservations. Photos retain their original guide context and are not presented as newly commissioned venue photography.

## Bookings and contact

Public source: https://zephyrstr.guestybookings.com/en and its three property pages, contact and terms pages. Each current listing was visually matched to its numbered loft. Contact: customerservice@zephyrproperty.com, +1 719 439 8504. Check-in 4pm; checkout 10am. Guest suitability, pets, occupancy, fees, cancellation and house rules must be checked in the current Guesty listing. Spiral stairs are disclosed. No access codes or Wi-Fi passwords are published.

Dates and guests are passed through a validated same-provider redirect. No prices, live availability, booking confirmations or payments are simulated. Original Guesty widget query names (`checkIn`, `checkOut`, `minOccupancy`) are retained, with `adults` matching the provider's live search.

The website's canonical URL is configured for the intended domain https://zephyr.rentals. Connect it on Railway before announcing that domain.
