# Next Steps (Go Live Checklist)

1. `npm ci`
2. Replace cover images in `public/assets/covers/` with optimized AVIF/WebP files:
   - `migliore-starter.avif`
   - `migliore-pro.avif`
   - `migliore-premium.avif`
3. Create `.env.local`:
   - `STRIPE_SECRET_KEY=...`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...`
   - `STRIPE_WEBHOOK_SECRET=...`
   - `SITE_URL=http://localhost:3000`
   - `JWT_DOWNLOAD_SECRET=...`
4. `npm run generate:products && npm run generate:tokens`
5. `npm run dev`
6. In another terminal: `stripe login`
7. `stripe listen --forward-to http://localhost:3000/api/stripe/webhook`
8. Test with card `4242 4242 4242 4242`
9. Deploy to Vercel and set env vars in dashboard.
