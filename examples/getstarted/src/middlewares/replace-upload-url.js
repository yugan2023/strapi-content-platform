'use strict';

module.exports = (config, { strapi }) => {
  const CDN = process.env.CDN_URL; // 例如：https://pub-xxx.r2.dev
  if (!CDN) {
    strapi.log.warn('[replace-upload-url] CDN_URL 未配置，跳过替换');
  }

  // 把任意 cloudflarestorage.com 的 URL → CDN_URL
  const replaceString = (str) => {
    if (typeof str !== 'string' || !CDN) return str;

    // 匹配两种常见形式：
    // 1) https://<account>.r2.cloudflarestorage.com/...
    // 2) https://<bucket>.<account>.r2.cloudflarestorage.com/...
    return str.replace(
      /https:\/\/([a-z0-9-]+\.)?r2\.cloudflarestorage\.com/gi,
      CDN
    );
  };

  const deepReplace = (val) => {
    if (!val) return val;

    if (typeof val === 'string') {
      return replaceString(val);
    }

    if (Array.isArray(val)) {
      return val.map(deepReplace);
    }

    if (typeof val === 'object') {
      for (const k of Object.keys(val)) {
        val[k] = deepReplace(val[k]);
      }
      return val;
    }

    return val;
  };

  return async (ctx, next) => {
    await next();

    // 只处理成功响应（避免影响错误结构）
    if (ctx.status >= 200 && ctx.status < 300 && ctx.body) {
      ctx.body = deepReplace(ctx.body);
    }
  };
};
