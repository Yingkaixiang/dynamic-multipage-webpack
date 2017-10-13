import i18n from '../i18n/share/';
import services from '../services/';

const { moment } = services;

export async function getMomentTheme(ctx) {
  const { momentId } = ctx.query;
  const data = ctx.renderData;
  const { language } = data;
  const momentData = await moment.getMoment(momentId);
  data.data = Object.assign({
    momentData,
  }, {
    i18n: i18n(language),
  });
  await ctx.render('mobile/moment', data);
}
