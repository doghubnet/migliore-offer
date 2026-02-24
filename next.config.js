/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // appDir is the default behavior in Next 14; avoid setting experimental.appDir
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
    formats: ["image/avif", "image/webp"],
  },
  // Optional headers or rewrites can go here
};

export default nextConfig;
