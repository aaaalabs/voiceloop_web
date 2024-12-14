/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'media.licdn.com',
      'tile.openstreetmap.org',
      'tabler.io',
      'ik.imagekit.io',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tile.openstreetmap.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tabler.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig