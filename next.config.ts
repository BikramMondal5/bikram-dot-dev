import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/rapier",
    "meshline",
  ],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
