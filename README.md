# migliore-offer

Production-ready Next.js 14 storefront scaffold for ebooks and digital products with Stripe Payment Element + Checkout Sessions fallback, webhook fulfillment, and single-use download tokens.

## Quick start

1. Clone/open this generated project.
2. Install dependencies:
   ```bash
   npm ci
   ```
3. Create `.env.local`:
   ```bash
   STRIPE_SECRET_KEY=sk_test_xxx
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   SITE_URL=http://localhost:3000
   JWT_DOWNLOAD_SECRET=your_jwt_secret_here
   ```
4. Start dev server:
   ```bash
   npm run dev
   ```
5. Login and forward Stripe webhooks:
   ```bash
   stripe login
   stripe listen --forward-to http://localhost:3000/api/stripe/webhook
   ```
   Copy `whsec_...` to `.env.local`.
6. Test payments:
   - Embedded Payment Element flow
   - Hosted Checkout flow
   - Card: `4242 4242 4242 4242`
7. Deploy to Vercel and set the same environment variables in Project Settings.

## Content source behavior

- If source URL fetch succeeds, parse products/header/footer/contact details.
- If fetch fails, use `data/source-site.html` if provided.
- Otherwise fallback to placeholder/canonical `data/products-source.json` (already scaffolded).

## Commands

- `npm run dev`
- `npm run build`
- `npm run test`
- `npm run stripe:listen`
- `npm run generate:products`
- `npm run generate:tokens`

## Notes

- `lib/downloads.ts` uses in-memory token consumption for demo; replace with DB/redis in production.
- Webhook route verifies signatures using `STRIPE_WEBHOOK_SECRET`.
- CSP and security headers are configured in `vercel.json`.
