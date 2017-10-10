## 说明

项目适用于多页面服务端渲染站点，使用 ```pug``` 作为模板引擎，使用 ```webpack``` 进行静态资源打包。

## 环境

```
node v8.5.0
npm v5.3.0
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