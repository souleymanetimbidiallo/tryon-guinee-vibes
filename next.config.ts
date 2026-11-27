import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Les photos de référence sont lues par la route API : on les embarque dans la fonction.
  outputFileTracingIncludes: {
    "/api/tryon": ["./public/styles/**/*", "./public/tissus/**/*"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
