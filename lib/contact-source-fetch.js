const fs = require('fs');
const path = require('path');

const SOURCE_URL = 'https://scelta-infinity-git-codex-build-prof-c4108a-doghubnets-projects.vercel.app/';
const dataDir = path.join(process.cwd(), 'data');
const fallbackPath = path.join(dataDir, 'contact-fallback.json');
const outputPath = path.join(dataDir, 'contact.json');

const fallback = {
  name: 'Your Name',
  email: 'you@example.com',
  phone: '+1-234-567-890',
  address: 'Your address line',
  social: { twitter: '', linkedin: '', instagram: '' }
};

function ensureFallbackFile() {
  if (!fs.existsSync(fallbackPath)) {
    fs.writeFileSync(fallbackPath, JSON.stringify(fallback, null, 2) + '\n');
  }
}

function sanitizeHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '');
}

function extractFooter(html) {
  const match = html.match(/<footer[\s\S]*?<\/footer>/i)
    || html.match(/<div[^>]+(?:id|class)=["'][^"']*(?:footer|site-footer)[^"']*["'][\s\S]*?<\/div>/i);
  return match ? sanitizeHtml(match[0]) : '';
}

function extractContact(html) {
  const email = (html.match(/mailto:([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/i) || [])[1]
    || (html.match(/([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/i) || [])[1]
    || fallback.email;

  const phone = (html.match(/tel:([^"'>\s]+)/i) || [])[1]
    || (html.match(/(\+?\d[\d\s().-]{7,}\d)/) || [])[1]
    || fallback.phone;

  const addressTag = html.match(/<address[^>]*>([\s\S]*?)<\/address>/i);
  const address = addressTag ? addressTag[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : fallback.address;

  return {
    name: 'Author Name',
    email,
    phone,
    address,
    social: { twitter: '', linkedin: '', instagram: '' }
  };
}

async function main() {
  ensureFallbackFile();
  let payload = JSON.parse(fs.readFileSync(fallbackPath, 'utf-8'));

  try {
    const res = await fetch(SOURCE_URL, { redirect: 'follow' });
    if (res.ok) {
      const html = await res.text();
      const contact = extractContact(html);
      const footerHtml = extractFooter(html);
      payload = { ...contact, sourceStatus: res.status, extractedFooterHtml: footerHtml };
    } else {
      payload = { ...payload, sourceStatus: res.status, note: 'TODO: replace with real contact details' };
    }
  } catch (e) {
    payload = { ...payload, sourceStatus: 'unreachable', note: 'TODO: replace with real contact details' };
  }

  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2) + '\n');
  console.log(`Wrote ${outputPath}`);
}

main();
