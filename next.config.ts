import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets you open the dev server from other devices on your Wi-Fi (e.g. your phone).
  allowedDevOrigins: ["192.168.110.202", "192.168.*.*"],
};

export default nextConfig;
