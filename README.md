# koa-web-template

项目适用于多页面服务端渲染站点，使用 ```pug``` 作为模板引擎，使用 ```webpack``` 进行静态资源打包。

## 说明

因为使用 ```webpack``` 进行打包工作所以静态资源必须进行编译后才能使用。所以在测试环境中调试就会变的很麻烦，不可能在每次保存修改的时候都进行一次打包工作，这样会浪费很多时间。所以使用了 ```webpack-koa2-middleware``` 这个包。它是对 ```webpack-dev-middleware``` 进行了简单的封装以便提供给 ```koa``` 框架使用。当我们保存修改时，他会根据 ```webpack``` 的配置文件将静态资源打包在内存中使用。

项目初始化时会将内存中的路径写入一个对象中

```js
app.use(async (ctx, next) => {
  ctx.renderData = {};
  if (ENV === 'development') {
    ctx.renderData.assets = ctx.state.webpackStats.toJson().assetsByChunkName;
  } else {
    ctx.renderData.assets = {};
  }
  await next();
});
```

将路径信息传入模板引擎

```js
await ctx.render('mobile/demo.pug', ctx.renderData);
```

在模板引擎中引入静态资源

```js
script(src= assets.demo[0])
link(href= assets.demo[1], rel="stylesheet")
```

正式环境代码打包时会自动删除测试环境的引用。

目前这种调试模式还不是很方便，如果有更好的解决方案的话欢迎交流 ```rubykaikai@gmail.com```

## 环境

```
node v8.5.0
npm v5.3.0
```

```
koa v2.3.0
webpack v3.6.0
```

## 如何使用

```
cd koa-web-template && npm i

// 本地测试
npm run dev

// 打包
npm run build

// 本地启动线上环境代码
npm run start
```

## 线上部署

```dist``` 目录下的代码为打包后的生产代码，部署至服务器即可使用

```
NODE_ENV=production NODE_PORT=<port> node app.js
```

## 如何创建一个页面

1. 在 ```/src/views/``` 目录下创建一个模板 ```demo.pug```。

```html
<!-- demo.pug -->

doctype html
html
  head
    title 测试页面
  body
    h1 测试页面
```

2. 在 ```/src/publics/js/``` 和 ```/src/publics/css/``` 下创建 ```demo.js``` 和 ```demo.scss```。

```js
// demo.js

// 必须在js中引入当前页面所需要的样式
import '../sass/demo.scss';

alert('This is demo.js');
```

```css
/* demo.scss */

h1{
  color: red;
}
```

3. 在 ```webpack.commom.js``` 中配置页面的 ```js``` 文件。

```js
entry: {
  demo: [
    './src/publics/js/demo.js',
  ],
}
```

4. 在 ```demo.pug``` 中引入测试用的静态文件路径，并在添加相关路由即可调试

```html
doctype html
html
  head
    title 测试页面
    link(rel="stylesheet", href= `/${assets.demo[1]}`)
  body
    h1 测试页面
    script(src= `/${assets.demo[0]}`)
    script(src= `/${assets.layout[0]}`)
```

```js
// routes/demo.js
export default ({ router, controllers }) => {
  const { demo } = controllers;
  router.get('/demo', demo.demo);
};
```

```js
// controllers/demo.js
export async function demo(ctx) {
  await ctx.render('demo', ctx.renderData);
};
```

