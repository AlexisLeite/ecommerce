import type { NextConfig } from "../../../node_modules/next/index.js";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ["./src/styles"],
  },
};

export default nextConfig;
