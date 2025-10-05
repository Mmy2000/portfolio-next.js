import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
       {
        protocol: "https",
        hostname: "eshoppers.pythonanywhere.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
