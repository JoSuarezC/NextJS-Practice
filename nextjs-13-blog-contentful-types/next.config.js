/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'josuarezcam',
        mongodb_password: 'uPA2BQQAaxfNKUjg',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'nextJSBlog',
        contentful_space: 'behdmwic2bpv',
        contentful_environment: 'master',
        contentful_accessToken: 'lcNLb8_KXkOiiya5LckoPhE8TFI2A9_tM__yxv0V0N0',
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.ctfassets.net'
          },
        ],
      },
    };
  }

  return {
    env: {
      mongodb_username: 'josuarezcam',
      mongodb_password: 'uPA2BQQAaxfNKUjg',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'nextJSBlogProd',
      contentful_space: 'behdmwic2bpv',
      contentful_environment: 'master',
      contentful_accessToken: 'lcNLb8_KXkOiiya5LckoPhE8TFI2A9_tM__yxv0V0N0',
    },
  }
};

module.exports = nextConfig
