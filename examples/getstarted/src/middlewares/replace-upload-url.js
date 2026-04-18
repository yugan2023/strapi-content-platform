'use strict';

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    const endpoint = process.env.AWS_ENDPOINT;
    const cdn = process.env.CDN_URL;

    if (!endpoint || !cdn) return;

    const replaceUrl = (str) => {
      if (typeof str !== 'string') return str;

      return str
        .replace(
        process.env.AWS_ENDPOINT,
        process.env.CDN_URL
        )
        .replace(
          /\.r2\.cloudflarestorage\.com/,
          '.r2.dev'
        );
      };

    if (ctx.body) {
      ctx.body = replaceUrl(ctx.body);
    }
  };
};
