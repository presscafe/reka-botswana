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
- Images: AI-generated illustrative photography for all 12 SKUs + hero;
  generic banners retained only where they were usable.

## Verification status (as of commit)

- `npm run build` passes (Gatsby 4, ~40 routes).
- Serve smoke: `/`, `/shop`, `/cart`, `/about`, `/faq`, `/support`, `/journal`,
  `/search`, `/order-confirmation`, all 12 PDPs, journal articles, `/404.html`,
  `sw.js`, `site.webmanifest`, icons — all 200/301 as expected.
- Not yet verified: offline behaviour in a real browser profile, service
  worker install/activation lifecycle, checkout WhatsApp deep-link on
  iOS/Android, screen-reader pass. PWABuilder/Lighthouse audit pending.
- Not done (out of scope, needs real world): payment integration, maker
  contracts, Pride Mark applications, real product photography, analytics.
