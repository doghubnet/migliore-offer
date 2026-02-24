import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/components/CartProvider';
import AOSInit from '@/components/AOSInit';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://migliore-offer-jtlap0rt6-doghubnets-projects.vercel.app'),
  title: 'migliore-offer',
  description: 'Sell ebooks and digital products with secure checkout.',
  openGraph: {
    title: 'BOOK_TITLE — migliore-offer',
    images: ['/assets/book-cover.svg']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preload" as="image" href="/assets/book-cover.svg" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <CartProvider>
          <AOSInit />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </CartProvider>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
