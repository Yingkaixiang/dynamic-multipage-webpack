export async function demo(ctx) {
  await ctx.render('demo', ctx.renderData);
}
