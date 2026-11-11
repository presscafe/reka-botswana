# Reka Botswana

The home of verified Made-in-Botswana quality. Browse clothing, pantry, beauty
and craft from Botswana workshops, order on WhatsApp or email, and pay only
after the maker confirms availability — Orange Money, MyZaka, Smega, bank
transfer or cash on collection.

**Status: founding build (demo catalogue).** Catalogue makers, prices, lead
times and imagery are illustrative and researched against the real
Made-in-Botswana landscape (see
[`docs/research-botswana-made-portfolio.md`](docs/research-botswana-made-portfolio.md)).
Nothing named on a product page is a contracted supplier yet.

## Quick start

```bash
npm install          # node >= 18
npm run develop      # http://localhost:8000
npm run build        # production build → public/
npm run serve        # serve the production build on :5000
```

## What this is

A static Progressive Web App (Gatsby 4, React 18) for the Reka Botswana
marketplace:

- **Catalogue** — 12 products across Apparel & Corporate Wear, Pantry & Natural
  Food, Beauty & Wellness, Home & Craft, Accessories and Gifts, with per-maker
  origin, lead time and pricing in Botswana Pula.
- **Ordering** — no online payment by design. Checkout builds an order enquiry
  that opens on WhatsApp or email; the maker confirms availability and the
  final total before any money moves.
- **PWA** — installable (`static/site.webmanifest`), offline-capable
  (`static/sw.js`, registered in production only), security headers via
  `netlify.toml` / `static/_headers`, `static/_redirects` for retired routes.
- **Self-hosted fonts** (@fontsource) — zero third-party runtime requests.

## Project layout

| Path | Purpose |
|---|---|
| `src/pages/` | Routes (home, shop, search, cart, order-confirmation, faq, support, about, journal/, 404) |
| `src/templates/` | `product.js` (PDP) and `journalArticle.js` — built per item at build time |
| `src/components/` | Reusable UI (Header/Footer/Hero/Button/…) |
| `src/helpers/product.json` | The catalogue (12 SKUs) — **illustrative, researched** |
| `src/helpers/blog.json` | Journal articles (4, dated) |
| `src/helpers/catalog.js` | Access layer (getProducts, getProductBySlug, searchProducts, …) |
| `src/context/CartContext.js` | Cart state (localStorage), `useCart()` |
| `src/config.json` | Brand, contact, ordering fees/labels, payment methods, nav, filters |
| `docs/` | Research, decisions, this README's supporting material |
| `vendor/gatsby-sharp-stub/` | Native libvips replacement required for this build environment (exact 0.19.0) |

## Honest limitations (read before claiming this is finished)

1. **Illustrative catalogue.** Makers shown (e.g. “Reka Apparel Studio”,
   “Etsha Weavers Cooperative”) are fictional stand-ins — priced and
   located against the real market (see research doc §4) but not contracted.
   Before launch: sign supply MOUs, replace imagery with partner photography,
   enable real photo review.
2. **Contact details are placeholders** — `+267 7200 0000` /
   `hello@rekabotswana.co.bw` in `src/config.json`. Update before any public
   announcement.
3. **No real payments yet** — by design; see `docs/decisions.md`.
4. **Consumer Protection Act** is cited without a year (sources conflict:
   1998 vs 2018). Confirm against the statute book before legal sign-off.
5. **Morama Crunch Bars** — no verified Botswana producer found; concept SKU
   pending feasibility study. **Kalahari Honey** — real brand exists but
   ownership/supply status post-2021 (founder deceased) is UNVERIFIED; our
   listing deliberately avoids the brand name.
6. **Delivery fees & lead times** in `config.json` are working estimates, not
   carrier quotes.
7. **Imagery** — AI-generated illustrative photography for the 12 SKUs; no
   rights issues, but it is not photography of real products.
8. **VAT** — BWP prices; VAT handling stated generically; confirm VAT
   registration and invoice wording with an accountant.
9. Build uses the pinned `gatsby-sharp` stub (no native libvips); if your
   environment can run sharp/libvips normally, remove the stub and the lockfile
   entries per `docs/decisions.md`.

## Docs

- [`docs/research-botswana-made-portfolio.md`](docs/research-botswana-made-portfolio.md) —
  the deep research: real Botswana-made landscape, named producers, sources,
  and the alignment table for every SKU.
- [`docs/decisions.md`](docs/decisions.md) — why the architecture, ordering
  model, offline strategy and data choices are what they are.

## Verification commands

```bash
npm run build                 # must succeed; ~40 routes incl. 12 PDPs
npm run serve                 # then open http://localhost:5000
```
