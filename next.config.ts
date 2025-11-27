import type { NextConfig } from "next";
import { i18n } from './next-i18next.config';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
  // 添加 next-i18next 配置
  ...i18n,
};

export default nextConfig;
