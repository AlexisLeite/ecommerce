import type { NextConfig } from "../../../node_modules/next/index.js";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ["./src/styles"],
    quietDeps: true,
    silenceDeprecations: ["import", "legacy-js-api"],
  },
};

export default nextConfig;
