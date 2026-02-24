import dynamic from 'next/dynamic';
import BuyButton from '@/components/BuyButton';
import products from '@/data/products.json';
import { notFound } from 'next/navigation';

const PaymentForm = dynamic(() => import('@/components/PaymentForm'), { ssr: false });

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = (products as any[]).find((item) => item.slug === params.slug);
  if (!product) return notFound();

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1>{product.title}</h1>
      <p className="mt-2 text-4xl font-bold">{product.price_display}</p>
      <p className="mt-6 text-slate-700">{product.description}</p>
      <div className="mt-8 space-y-4 rounded-lg border p-6">
        <PaymentForm amount={product.price_cents} currency={product.currency} description={product.title} />
        <BuyButton amount={product.price_cents} currency={product.currency} description={product.title} metadata={{ productId: product.id }} />
      </div>
    </section>
  );
}
