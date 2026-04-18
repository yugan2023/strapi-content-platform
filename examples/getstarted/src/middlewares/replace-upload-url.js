'use strict';

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    const endpoint = process.env.AWS_ENDPOINT;
    const cdn = process.env.CDN_URL;

    if (!endpoint || !cdn) return;

    const replaceUrl = (data) => {
      if (!data) return data;

      if (typeof data === 'string') {
        return data.replace(endpoint, cdn);
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
