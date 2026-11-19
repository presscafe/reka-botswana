# Decisions — Reka Botswana build

Date: 2026-11-11. Branch: `arena/2d5609fd-reka-botswana`. See
`docs/research-botswana-made-portfolio.md` for the market evidence behind
content decisions.

## Architecture

- **Gatsby 4 + React 18, static, no server.** The upstream template (Matter
  Design gatsby-ecommerce-theme) was already on Gatsby 4; Gatsby 5 was rejected
  because `gatsby-plugin-utils@4/5` hard-depends on `gatsby-sharp`, which needs
  native libvips unavailable in this build environment. Static output suits a
  WhatsApp-first ordering model and Botswana bandwidth.
- **`gatsby-sharp` 0.19.0 stub** (`vendor/gatsby-sharp-stub/`) replaces the
  native image pipeline. Required for every build; remove only if the target
  CI has libvips. Lockfile references the stub — do not revert `package-lock.json`.
- **`gatsby-ssr.js` mirrors `gatsby-browser.js`** (CartProvider +
  NotificationProvider). Without it, build-time HTML rendering throws
  `useCart must be used within <CartProvider>` on PDPs. Keep the two files in sync.

## PWA / offline

- **Hand-written service worker** (`static/sw.js`) instead of
  `gatsby-plugin-offline`. Reasons: plugin 5.x peer-deps React 16/17 vs our
  React 18 (peer conflict + `--legacy-peer-deps` risk on a fragile lockfile);
  we want an auditable, minimal cache policy. SW is registered in production
  only; precaches `/`, `/shop`, `/cart`; content-hashed `/static/*` is
  cache-first; navigations network-first with cache fallback; other same-origin
  GET is stale-while-revalidate. Bump `SW_VERSION` on releases.
- **Self-hosted fonts** via `@fontsource/*` (~0.4 MB woff2 total). Gatsby 4's
  enhanced-resolve 5.9 cannot resolve @fontsource v5 pattern subpath exports,
  so `Globals.css` imports them by relative path. Google Fonts removed — no
  third-party requests at runtime at all.
- `netlify.toml` sets security headers + immutable `/static/*`, no-cache `sw.js`;
  `static/_headers` mirrors for non-Netlify static hosts; `static/_redirects`
  maps retired routes (`/blog/*` → `/journal/*`, `/orderConfirm` →
  `/order-confirmation`).

## Ordering model (the important one)

- **No online payment.** Checkout collects name/phone/fulfilment/payment
  preference, then opens WhatsApp (`wa.me`) or `mailto:` with the order
  pre-filled. The maker confirms availability before any money moves.
  Rationale: (a) zero licence/integration risk at launch; (b) price/lead-time
  negotiation is normal for bespoke + workshop goods; (c) keeps the project
  honest while the founding maker network is being signed; (d) works on any
  network, no payment gateway uptime dependency.
- **When we do add payments**: via a licensed Botswana provider (e.g. Orange
  Money / MyZaka merchant APIs) server-side; never card data in this static
  app. Policy/FAQ pages already set that expectation.

## Data & honesty

- Catalogue is **illustrative but research-aligned**: every SKU was checked
  against the real Botswana-made landscape (see research doc §4); plausible
  pricing/geography was applied (basket P950→P1,850; Etsha, not Tsodilo;
  “Mutodi” renamed to avoid pseudo-Setswana). Makers are fictional until
  contracted.
- **No superlatives, no therapy claims** in copy; moringa/honey/marula are
  food language only.
- **Consumer Protection Act** cited without a year — sources conflict (1998
  vs 2018); confirm against statute book pre-launch.
- **Kalahari Honey**: real company, founder deceased 2021; supply status
  UNVERIFIED — our catalogue uses a fictional equivalent.
- **Morama Crunch Bars**: no verified Botswana producer — concept SKU.
- Contact details (`+267 7200 0000`, `hello@rekabotswana.co.bw`) are
  placeholders.

## Content surface

- `blog` → **`journal`** (routes, files, copy). Old routes redirect via
  `_redirects`.
- Auth, account, cypress, till, hifi, style-guide pages **deleted** — the
  catalogue needed no login; "till"/"hifi" were template cruft.
- Shared policy copy is centralised in `components/Policy` (variants:
  shipping/returns/payments/terms/privacy) — support page renders variants,
  so there is one source of truth for policy text.
- Order confirmation route: **`/order-confirmation`** (file
  `order-confirmation.js`); `OrderSummary` component (hardcoded P440) deleted.
- Images: AI-generated illustrative photography for all 17 SKUs + hero;
  generic banners retained only where they were usable.

## Round 2 — catalogue expansion (2026-11-11)

Five researched-aligned illustrative SKUs added (phane bites, morula milk
chocolate, sorghum choc-chip cookies, sliced biltong, handwoven wool cushion
cover) — full analysis and real price/maker anchors in
`docs/research-product-pipeline.md`. All remain illustrative; biltong and
chocolate anchors are verified retail observations (Earth Vitamins ~P22/50 g;
Sweet Sensations Kgeru P33/80 g; Kalahari Chocolates giftables P142–217).
Alcohol (KBL/St Louis) and therapeutic-claim lanes deliberately excluded.

## Phase 1 — SEO / verification hardening (2026-11-15, PR #2)

- Sitemap: `gatsby-plugin-sitemap@5.25.0` emits `/sitemap/sitemap-index.xml`
  (+ `sitemap-0.xml`); `static/robots.txt` points crawlers at it.
- Head tags actually render now: `gatsby-plugin-react-helmet@5.25.0` was a
  missing peer of react-helmet in this Gatsby 4 setup — before it, built HTML
  contained zero `<title>`/meta/JSON-LD (the template had them; the plugin
  never flushed them). Site-wide `Organization`/`WebSite` JSON-LD and
  per-PDP `Product` JSON-LD (with BWP offer) now ship; 79 JSON-LD blocks
  parse cleanly.
- Absolute `og:image` (domain-anchored), `twitter:card`, og:type=product with
  price meta, single source of truth in `src/helpers/seo.js`.
- a11y: skip-to-content link, `<main id="main">`, `:focus-visible` gold ring,
  `prefers-reduced-motion` support; below-fold images lazy+async; PDP gallery
  eager with `fetchpriority=high`.
- WhatsApp deep links centralised: `whatsAppLink()` in `src/helpers/seo.js`
  strips non-digits (wa.me requirement); all call sites rewired.
- `scripts/verify-build.js` (`npm run verify`): post-build contract —
  asset refs, expected routes, PWA files, sitemap, forbidden strings,
  JSON-LD parse. Netlify runs `gatsby build && npm run verify`; GitHub
  Actions CI mirrors the same.

## Phase 2 — production SEO hygiene (2026-11-15, PR #2)

- Every content page now emits its own `<title>`, description, absolute
  `og:url`, and `canonical`; cart/search/order-confirmation/404 are
  `noindex,nofollow`; Layout provides the site-wide canonical/og:url
  fallback (home).
- journal/product templates: absolute `og:image`, `og:url`, canonical.
- Footer carries a BWP/VAT invoice note (VAT reflected on maker invoice
  where applicable — no inclusion/exclusion claim made).
- `static/sw.js` bumped to `reka-v2`; unreferenced `static/support.png`
  removed (was 504K).
- `verify-build.js` now also enforces exactly one `<title>` per built
  page and forbids literal "undefined" in rendered markup — the build
  fails if either regresses.
- Home canonical = site root; subpages get page-level canonicals
  (react-helmet nesting: inner wins) — verified in built output.

## Verification status (as of commit)

- `npm run build` passes (Gatsby 4, 32 HTML pages / 31 routes).
- `npm run verify` passes: assets, routes (incl. all 17 PDPs + journal),
  sw.js/manifest/icons/_headers/netlify.toml, sitemap, 79 JSON-LD blocks.
- Serve smoke: `/`, `/shop/`, `/sitemap/sitemap-index.xml`, `/robots.txt`,
  PDP routes — all 200.
- Not yet verified: offline behaviour in a real browser profile, service
  worker install/activation lifecycle, checkout WhatsApp deep-link on
  iOS/Android, screen-reader pass. PWABuilder/Lighthouse audit pending.
- Not done (out of scope, needs real world): payment integration, maker
  contracts, Pride Mark applications, real product photography, analytics.
