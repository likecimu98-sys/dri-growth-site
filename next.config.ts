import type { NextConfig } from "next";

const isGitHubPages =
  process.env.GITHUB_ACTIONS === "true" ||
  process.env.BUILD_TARGET === "pages";
const basePath = isGitHubPages ? "/dri-growth-site" : "";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
};

export default nextConfig;
