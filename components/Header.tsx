import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold">migliore-offer</Link>
        <nav aria-label="Primary" className="flex items-center gap-5 text-sm">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact" className="rounded-full bg-brand-500 px-4 py-2 text-white btn-hover">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
