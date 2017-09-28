import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaLogger from 'koa-logger';
import KoaPug from 'koa-pug';
import KoaStatic from 'koa-static';
import path from 'path';
import _ from 'lodash';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-koa2-middleware';

import routes from './routes';
import webpackConfig from '../webpack.config';

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

app.use(webpackMiddleware(
  webpack(webpackConfig),
  {
    serverSideRender: true,
    lazy: true,
    publicPath: '/',
  },
));
app.use(KoaLogger());
app.use(KoaStatic(path.resolve(__dirname, './publics'), {
  maxage: (isDev ? 0 : 1000 * 60 * 60),
}));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.NODE_PORT || '3000');
