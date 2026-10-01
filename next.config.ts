import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shop.twolionsinternational.com",
      },
    ],
    ...(isStaticExport ? { unoptimized: true } : {}),
  },
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
