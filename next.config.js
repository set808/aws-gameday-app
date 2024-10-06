"use strict";
/** @type {import('next').NextConfig} */

const nrExternals = require("@newrelic/next/load-externals");

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["newrelic"],
  },
  webpack: (config) => {
    nrExternals(config);
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
