/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/chatbot/:path*',
        destination: '/api/chatbot/:path*',
      },
    ]
  },
}

module.exports = nextConfig
