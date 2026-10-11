import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { useTypeScriptCli: false },
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath:
    process.env.NODE_ENV === "production" ? "/retail-pricing-workbench" : "",
};

export default nextConfig;
