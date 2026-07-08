// deploy trigger: 1783511848681
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.spootfind.com",
        port: "",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24,
  },
};

// Trigger redeploy: 1783503461250
export default withNextIntl(nextConfig);