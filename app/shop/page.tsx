import PricingGrid from '@/components/PricingGrid';
import products from '@/data/products.json';

export default function ShopPage() {
  return <PricingGrid products={products} />;
}
