export default function Footer() {
  return (
    <footer id="contact" className="mt-20 border-t bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold">migliore-offer</h3>
          <p className="mt-2 text-sm text-slate-600">Digital storefront for ebooks and premium resources.</p>
        </div>
        <address className="not-italic text-sm text-slate-700">
          <p><strong>Author:</strong> Author Name</p>
          <p><a href="mailto:author@example.com">author@example.com</a></p>
          <p>+1 (000) 000-0000</p>
          <p><a href="https://linkedin.com" target="_blank">LinkedIn</a> · <a href="https://x.com" target="_blank">X</a></p>
        </address>
      </div>
    </footer>
  );
}
