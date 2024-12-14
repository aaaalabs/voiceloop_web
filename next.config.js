/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'media.licdn.com',
      'tile.openstreetmap.org',
      'tabler.io',
      'ik.imagekit.io',
      'cdn.sanity.io',
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
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig