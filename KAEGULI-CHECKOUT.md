# Kaeguli Custom Checkout

This fork of BigCommerce's `checkout-js` adds Kaeguli KPOP Shop branding.

## What's customized

- **CheckoutHeader**: "Checkout" / "Payment" heading with frog graphic
- **KaeguliPreorderBanner**: Cart-aware preorder shipping notice (shows only when cart has preorder items)
- **Kaeguli.scss**: Brand colors (peony buttons, spring green focus rings, Montserrat font, rounded buttons)
- **No payment/shipping/billing code touched** — minimizes upstream merge conflicts

## Files modified from upstream

| File | Change |
|------|--------|
| `packages/core/src/app/checkout/components/CheckoutHeader.tsx` | Added Kaeguli header + preorder banner |
| `packages/core/src/scss/App.scss` | Import Kaeguli.scss |

## Files added

| File | Purpose |
|------|--------|
| `packages/core/src/app/checkout/components/KaeguliPreorderBanner.tsx` | Preorder notice component |
| `packages/core/src/scss/kaeguli/Kaeguli.scss` | All Kaeguli brand styles |

## Required assets

Upload these to BigCommerce WebDAV under `/content/kaeguli-checkout/`:

- `CHECKOUT PAGE FROG-01.png`
- `PAYMENT FROG-01.png`

## Development

```bash
nvm use 22
npm ci
npm run dev          # watch build
npm run dev:server   # serve on :8080
```

Then set the sandbox store's Custom Checkout Script URL to:
```
http://127.0.0.1:8080/auto-loader-dev.js
```

## Production build

```bash
npm run build
```

Host `dist/` on a CDN or upload to BC WebDAV.

## Upstream sync

```bash
git fetch upstream
git merge upstream/master
npm ci && npm test && npm run build
```

Only 2 upstream files modified, so merge conflicts should be rare.
