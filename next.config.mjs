/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8090/:path*", // Backend API URL
      },
    ];
  },
};

export default nextConfig;
