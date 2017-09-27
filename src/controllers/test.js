export async function getCurrentTime(ctx, next) {
  ctx.body = Date.now()
}