/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
  // Disable file tracing for export mode
  outputFileTracingIncludes: {},
  outputFileTracingExcludes: {},
  // Webpack optimizations for better code splitting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Better minification
      config.optimization.minimize = true;
    }
    return config;
  },
  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["@/components", "@/lib"],
  },
};

module.exports = nextConfig;
