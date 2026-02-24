import Script from 'next/script';
import DeviceMockup from './DeviceMockup';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://migliore-offer-jtlap0rt6-doghubnets-projects.vercel.app';

const book = {
  title: 'BOOK_TITLE',
  author: 'AUTHOR_NAME',
  publishDate: '2024-06-01',
  isbn: '978-1-23456-789-0',
  pages: '240',
  image: '/assets/book-cover.svg',
  buy: 'https://example.com/buy',
  excerpt: '#'
};

export default function BookSection() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: { '@type': 'Person', name: book.author },
    datePublished: book.publishDate,
    isbn: book.isbn,
    numberOfPages: book.pages,
    image: `${siteUrl}${book.image}`,
    url: `${siteUrl}/#my-book`
  };

  return (
    <section id="my-book" className="book-section mx-auto mt-8 max-w-6xl px-6 py-14" data-aos="fade-up">
      <Script id="book-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-slate-600">My Book</p>
          <h2 className="mt-2">{book.title}</h2>
          <p className="mt-4 text-slate-700">A practical guide for turning expertise into repeatable digital revenue with clear systems, templates, and launch tactics.</p>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div><dt className="font-semibold">Author</dt><dd>{book.author}</dd></div>
            <div><dt className="font-semibold">Published</dt><dd>{book.publishDate}</dd></div>
            <div><dt className="font-semibold">Pages</dt><dd>{book.pages}</dd></div>
            <div><dt className="font-semibold">ISBN</dt><dd>{book.isbn}</dd></div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn-hover rounded-full bg-brand-500 px-6 py-3 text-white" href={book.buy} target="_blank" rel="noreferrer noopener">Buy the book</a>
            <a className="rounded-full border px-6 py-3" href={book.excerpt}>Read excerpt</a>
          </div>
        </div>
        <DeviceMockup src={book.image} alt={`${book.title} cover`} />
      </div>
    </section>
  );
}
