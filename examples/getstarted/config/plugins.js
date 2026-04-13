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
      provider: 'aws-s3',

      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_ACCESS_SECRET'),

        endpoint: env('AWS_ENDPOINT'),
        region: 'auto',

        params: {
          Bucket: env('AWS_BUCKET'),
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
