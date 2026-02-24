import ProductCard from './ProductCard';

export default function PricingGrid({ products }: { products: any[] }) {
  return (
    <section id="shop" className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="relative">
            {product.id === 'offer-pro' && <span className="absolute right-3 top-3 rounded-full bg-accent-500 px-3 py-1 text-xs text-white">Special offer</span>}
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
