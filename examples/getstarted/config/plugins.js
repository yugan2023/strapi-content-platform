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
            provider: 'strapi-provider-upload-cloudflare-r2',
            providerOptions: {
                accessKeyId: env('R2_ACCESS_KEY_ID'),
                secretAccessKey: env('R2_ACCESS_SECRET'),
                region: env('R2_REGION'),
                params: {
                    Bucket: env('R2_BUCKET'),
                    accountId: env('R2_ACCOUNT_ID'),
                    publicUrl: env('R2_PUBLIC_URL'),
                },
            },
            actionOptions: {
                upload: {},
                uploadStream: {},
                delete: {},
            },
        },
    },
});
