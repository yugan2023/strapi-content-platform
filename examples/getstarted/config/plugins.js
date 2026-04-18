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
      secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
      endpoint: env('AWS_ENDPOINT'), // ⭐ 只能用 cloudflarestorage
      region: 'auto',
      s3ForcePathStyle: false,

      params: {
        Bucket: env('AWS_BUCKET'),
      },
    },

    // ⭐ 用来改访问URL
    baseUrl: env('CDN_URL'),
  },
},
});
