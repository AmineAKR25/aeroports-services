import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The review server is intentionally pinned to the IPv4 loopback origin.
  // Café Lounge may use localhost/IPv6:3000, so this keeps the projects isolated
  // while allowing Next's development chunks to load from the review URL.
  allowedDevOrigins: ['127.0.0.1'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
