/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
