import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  env: {
    NEXT_PUBLIC_ROOM_ID: process.env.NEXT_PUBLIC_ROOM_ID,
    NEXT_PUBLIC_HMS_ACCESS_KEY: process.env.NEXT_PUBLIC_HMS_ACCESS_KEY,
  },
};

export default nextConfig;
