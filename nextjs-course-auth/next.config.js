const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'josuarezcam',
        mongodb_password: 'uPA2BQQAaxfNKUjg',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'nextJSAuth'
      },
    };
  }

  return {
    env: {
      mongodb_username: 'josuarezcam',
      mongodb_password: 'uPA2BQQAaxfNKUjg',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'nextJSAuthProd'
    },
  }
};

module.exports = nextConfig
