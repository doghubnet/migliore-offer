import contact from '@/data/contact.json';

type SocialKey = 'twitter' | 'linkedin' | 'instagram';

const icons: Record<SocialKey, JSX.Element> = {
  twitter: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.9 2H22l-6.77 7.73L23 22h-6.22l-4.87-6.37L6.36 22H3.24l7.24-8.27L1 2h6.38l4.4 5.81z"/></svg>,
  linkedin: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.94 8.5H3.56V20h3.38zM5.25 3A1.97 1.97 0 103 4.97 1.98 1.98 0 005.25 3zM20.44 13.22c0-3.28-1.75-4.8-4.09-4.8a3.55 3.55 0 00-3.21 1.77h-.05V8.5H9.72V20h3.37v-5.7c0-1.5.29-2.95 2.15-2.95 1.83 0 1.86 1.71 1.86 3.05V20h3.34z"/></svg>,
  instagram: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7.8 2h8.4A5.8 5.8 0 0122 7.8v8.4A5.8 5.8 0 0116.2 22H7.8A5.8 5.8 0 012 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8A3.6 3.6 0 007.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6A3.6 3.6 0 0016.4 4zM17 5.5A1.5 1.5 0 1018.5 7 1.5 1.5 0 0017 5.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z"/></svg>
};

export default function Footer() {
  const socialEntries = Object.entries(contact.social || {}) as [SocialKey, string][];

  return (
    <footer id="contact" className="site-footer" data-aos="fade-up">
      {/* TODO: replace with real contact details if source site required authentication */}
      <div className="footer-inner">
        <div>
          <h3>migliore-offer</h3>
          <p>Digital storefront for ebooks and premium resources.</p>
        </div>
        <address>
          <p><strong>{contact.name}</strong></p>
          <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
          <p><a href={`tel:${contact.phone}`}>{contact.phone}</a></p>
          <p>{contact.address}</p>
          <div className="social-links" aria-label="Social links">
            {socialEntries.map(([key, href]) => href ? (
              <a key={key} href={href} target="_blank" rel="noreferrer" aria-label={key}>
                {icons[key]}
              </a>
            ) : null)}
          </div>
        </address>
      </div>
    </footer>
  );
}
