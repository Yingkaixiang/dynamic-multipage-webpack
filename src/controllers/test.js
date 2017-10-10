export async function getCurrentTime(ctx) {
  // const source = ctx.state.webpackStats.toJson().assetsByChunkName;
  await ctx.render('test.pug');
}

export async function demo(ctx) {
  await ctx.render('mobile/demo.pug', ctx.renderData);
}
