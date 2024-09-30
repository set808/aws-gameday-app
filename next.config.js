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
};

module.exports = nextConfig;
