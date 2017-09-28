function myHtmlWebpackPlugin() {}

/**
 * todo
 * 正则匹配规则 属性匹配 换行匹配
 */

myHtmlWebpackPlugin.prototype.apply = (compiler) => {
  const regJS = /script\(.+\)/img;
  const regCSS = /link\(.+\)/img;

  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-before-html-processing', (htmlData, cb) => {
      htmlData.html = htmlData.html.replace(regJS, '');
      htmlData.html = htmlData.html.replace(regCSS, '');
      console.log(htmlData.html);
      cb(null, htmlData);
    });
  });
};

module.exports = myHtmlWebpackPlugin;

