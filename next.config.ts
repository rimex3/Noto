import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    useCache: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com"
      }
    ]
  },
  reactStrictMode: false
};

export default nextConfig;
