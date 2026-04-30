'use strict';

module.exports = ({ env }) => ({
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

  // 新增：R2 / S3 上传配置
upload: {
    config: {
        provider: 'strapi-provider-cloudflare-r2',
        providerOptions: {
            accessKeyId: env('CF_ACCESS_KEY_ID'),
            secretAccessKey: env('CF_ACCESS_SECRET'),
            endpoint: env('CF_ENDPOINT'),
            params: {
                Bucket: env('CF_BUCKET'),
            },
            cloudflarePublicAccessUrl: env('CF_PUBLIC_ACCESS_URL'),
        },
        actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
        },
    },
},
});
