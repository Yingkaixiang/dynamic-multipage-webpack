export async function getCurrentTime(ctx, next) {
  const source = ctx.state.webpackStats.toJson().assetsByChunkName
  await ctx.render('test.pug', source)
}