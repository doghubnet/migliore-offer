# migliore-offer

## Book + footer migration notes

- Contact info is loaded from `data/contact.json` and rendered in `components/Footer.tsx`.
- To re-fetch contact/footer source details run:
  ```bash
  node lib/contact-source-fetch.js
  ```
- If source access fails, fallback values are used from `data/contact-fallback.json`. Replace those with real values.
- Replace `public/assets/book-cover.svg` with your real cover image and update metadata placeholders in `components/BookSection.tsx`.
- AOS is loaded by CDN in `app/layout.tsx`, with IntersectionObserver fallback in `components/AOSInit.tsx`.

## Deploy

1. Commit changes.
2. Push branch `feature/book-footer-animations`.
3. Open PR and verify Vercel preview build.
