import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // One canonical host for Google: www.tovyphotography.com permanently redirects to the apex.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.tovyphotography.com" }],
        destination: "https://tovyphotography.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
