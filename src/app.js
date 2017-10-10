import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaLogger from 'koa-logger';
import KoaPug from 'koa-pug';
import KoaStatic from 'koa-static';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-koa2-middleware';

import path from 'path';
import _ from 'lodash';

import routes from './routes';
import webpackDevConfig from '../webpack.dev';

global.ENV = process.env.NODE_ENV || 'development';
const isDev = ENV === 'development';

const app = new Koa();
const router = new KoaRouter();
routes(router);

/**
 * 模板引擎初始化
 * locals：
 * @param {string} ENV 项目环境
 * @param {number} timestamp 项目初始化时间戳，可用于处理静态文件缓存问题
 */
const pug = new KoaPug({
  viewPath: path.resolve(__dirname, './views'),
  debug: isDev,
  pretty: isDev,
  compileDebug: isDev,
  locals: { ENV, timestamp: Date.now() },
  noCache: isDev,
  helperPath: [{ _ }],
});
pug.use(app);

app.use(KoaLogger());
/**
 * 开发环境调用内存中静态资源
 * 生产环境调用打包后的文件
 */
if (isDev) {
  /**
   * 中间件说明：
   * 每当页面发起请求后中间件就会根据配置文件进行打包
   * 打包的文件会被存入内存中等待使用
   */
  app.use(webpackMiddleware(
    webpack(webpackDevConfig),
    {
      serverSideRender: true, // 开启服务端渲染模式
      lazy: true, // 发起请求则进行打包
      publicPath: '/', // 静态资源请求路径
    },
  ));

  app.use(async (ctx, next) => {
    ctx.renderData = {};
    if (ENV === 'development') {
      ctx.renderData.assets = ctx.state.webpackStats.toJson().assetsByChunkName;
    } else {
      ctx.renderData.assets = {};
    }
    await next();
  });
} else {
  app.use(KoaStatic(path.resolve(__dirname, './'), {
    maxage: (isDev ? 0 : 1000 * 60 * 60),
  }));
}
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.NODE_PORT || '3000');
