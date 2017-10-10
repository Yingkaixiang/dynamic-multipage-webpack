export async function getCurrentTime(ctx) {
  // const source = ctx.state.webpackStats.toJson().assetsByChunkName;
  await ctx.render('test.pug');
}

export async function demo(ctx) {
  if (ENV !== 'production') {
    const { demo } = ctx.state.webpackStats.toJson().assetsByChunkName;
    await ctx.render('mobile/demo.pug', { source: demo });
  } else {
    await ctx.render('mobile/demo.pug');
  }
}
