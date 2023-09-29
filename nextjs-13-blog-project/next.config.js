/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'josuarezcam',
        mongodb_password: 'uPA2BQQAaxfNKUjg',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'nextJSBlog'
      },
    };
  }

  return {
    env: {
      mongodb_username: 'josuarezcam',
      mongodb_password: 'uPA2BQQAaxfNKUjg',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'nextJSBlogProd'
    },
  }
};

module.exports = nextConfig
