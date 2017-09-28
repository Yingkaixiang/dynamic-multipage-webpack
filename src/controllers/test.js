export async function getCurrentTime(ctx) {
  const source = ctx.state.webpackStats.toJson().assetsByChunkName;
  await ctx.render('test.pug', source);
}

export async function demo(ctx) {
  const { demo } = ctx.state.webpackStats.toJson().assetsByChunkName;
  console.dir(demo);
  await ctx.render('mobile/demo.pug', { source: demo });
}
