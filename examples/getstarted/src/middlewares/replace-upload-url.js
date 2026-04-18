'use strict';

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    const endpoint = process.env.AWS_ENDPOINT;
    const cdn = process.env.CDN_URL;
    const bucket = process.env.AWS_BUCKET;

    if (!endpoint || !cdn) return;

    const replaceUrl = (data) => {
      if (!data) return data;

      if (typeof data === 'string') {
        return data.replace(endpoint, cdn + '/' + bucket);
      }

      if (Array.isArray(data)) {
        return data.map(replaceUrl);
      }

      if (typeof data === 'object') {
        for (const key in data) {
          data[key] = replaceUrl(data[key]);
        }
      }

      return data;
    };

    if (ctx.body) {
      ctx.body = replaceUrl(ctx.body);
    }
  };
};
