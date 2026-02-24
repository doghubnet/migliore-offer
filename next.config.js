/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    appDir: true
  }
};

module.exports = nextConfig;
