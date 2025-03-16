/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost', 
      'vercel.app',
      'now.sh',
      'vercel-storage.com',
      'potato-tuber-classifiaction.vercel.app', // Your specific Vercel domain once deployed
      'img.youtube.com' // Added YouTube image domain
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Improve production performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error'],
    } : false,
  },
  // Handle environment variables properly
  env: {
    APP_ENV: process.env.NODE_ENV,
  },
  // Next.js 15.2.1 doesn't need these options anymore
};

module.exports = nextConfig;
