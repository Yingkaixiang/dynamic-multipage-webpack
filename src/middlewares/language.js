/**
 * 获取当前请求路径页面所使用的语言
 */

const getAcceptsLanguages = ctx => ctx.acceptsLanguages()[0];

export default async (ctx, next) => {
  let { language } = ctx.query;
  if (!language) {
    language = getAcceptsLanguages(ctx);
  }
  switch (language.toLowerCase()) {
    case 'zh':
      language = 'cn';
      break;
    case 'zh-tw':
      language = 'tw';
      break;
    default:
      language = 'en';
      break;
  }
  ctx.renderData.language = language || 'en';
  await next();
};

