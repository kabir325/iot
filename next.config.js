/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['github.com'], // Add any other domains you use for images
  },
  experimental: {
    serverActions: true,
  },
  output: 'standalone', // Recommended for Vercel
};

module.exports = nextConfig 