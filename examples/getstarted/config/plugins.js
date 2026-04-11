'use strict';

module.exports = () => ({
  graphql: {
    enabled: true,
    config: {
      endpoint: '/graphql',
      defaultLimit: 25,
      maxLimit: 100,
      apolloServer: {
        tracing: true,
      },
      v4CompatibilityMode: true,
    },
  },

  documentation: {
    config: {
      info: {
        version: '1.0.0',
      },
    },
  },
});
