// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
    formats: ["image/avif", "image/webp"],
  },
  // Remove experimental.appDir to avoid invalid-next-config warnings.
};

module.exports = nextConfig;
