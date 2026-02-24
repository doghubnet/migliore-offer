import Image from 'next/image';
import Link from 'next/link';
import BuyButton from './BuyButton';

type Product = {
  id: string;
  title: string;
  slug: string;
  short: string;
  price_display: string;
  price_cents: number;
  currency: string;
  cover: string;
  bullets: string[];
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="rounded-[14px] border bg-white p-6 shadow-card">
      <Image src={product.cover} alt={product.title} width={640} height={480} className="h-44 w-full rounded-lg object-cover" />
      <h3 className="mt-4 text-[28px] font-semibold">{product.title}</h3>
      <p className="text-4xl font-bold md:text-[36px]">{product.price_display}</p>
      <ul className="my-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
        {product.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
      </ul>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <Link href={`/product/${product.slug}`} className="rounded-full border px-4 py-2 text-center">View details</Link>
        <BuyButton amount={product.price_cents} currency={product.currency} description={product.title} metadata={{ productId: product.id }} />
      </div>
    </article>
  );
}
