import PricingGrid from '@/components/PricingGrid';
import products from '@/data/products.json';

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-16" id="about">
        <p className="mb-3 text-xs uppercase tracking-[0.08em] text-slate-600">migliore-offer</p>
        <h1>Publish without limits. Sell your knowledge globally.</h1>
        <p className="lead mt-4 max-w-3xl">Practical ebooks, templates, and masterclasses—designed to convert readers into customers. Instant download, secure checkout, lifetime access.</p>
        <div className="mt-8 flex gap-3">
          <a href="#shop" className="btn-hover rounded-full bg-brand-500 px-6 py-3 text-white">Browse Offers</a>
          <a href="#contact" className="rounded-full border px-6 py-3">Contact the Author</a>
        </div>
      </section>
      <PricingGrid products={products} />
    </>
  );
}
