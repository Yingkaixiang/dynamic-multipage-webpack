import i18n from '../i18n/share/';

export async function getMomentTheme(ctx) {
  const data = ctx.renderData;
  const { language } = data;
  data.data = Object.assign({}, i18n(language));
  await ctx.render('mobile/moment', data);
}
