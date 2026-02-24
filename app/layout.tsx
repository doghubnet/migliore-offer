import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/components/CartProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'migliore-offer',
  description: 'Sell ebooks and digital products with secure checkout.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preload" as="image" href="/assets/covers/migliore-premium.avif" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <CartProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
