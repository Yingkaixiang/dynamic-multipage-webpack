import i18n from '../i18n/share/';

export async function getMomentTheme(ctx) {
  console.log(ctx.path);
  const data = ctx.renderData;
  const { language } = data;
  data.data = Object.assign({
    media: '123',
    content: '123',
  }, i18n(language));
  await ctx.render('mobile/moment', data);
}
