import fs from 'node:fs';
import path from 'node:path';

const sourcePath = path.join(process.cwd(), 'data/products-source.json');
const targetPath = path.join(process.cwd(), 'data/products.json');

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const source = JSON.parse(fs.readFileSync(sourcePath, 'utf-8')) as Array<Record<string, unknown>>;
const normalized = source.map((product) => ({
  id: product.id,
  title: product.title,
  slug: slugify(String(product.slug || product.title)),
  price_cents: product.price_cents,
  price_display: product.price_display,
  currency: product.currency,
  short: product.short,
  description: product.description,
  bullets: product.bullets ?? [],
  cover: product.cover,
  download_url: product.download_url ?? ''
}));

fs.writeFileSync(targetPath, `${JSON.stringify(normalized, null, 2)}\n`);
console.log(`Generated ${normalized.length} products in data/products.json`);
