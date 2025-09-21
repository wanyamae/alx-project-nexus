import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "https://localhost:3000",
    "http://localhost:3000",
    "https://my-production-url.com",
  ],
};

export default nextConfig;
