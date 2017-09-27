function myHtmlWebpackPlugin() {}

myHtmlWebpackPlugin.prototype.apply = (compiler) => {
  const reg = /script\(.+\)/img;

  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-before-html-processing', (htmlData, cb) => {
      htmlData.html = htmlData.html.replace(reg, '');
      cb(null, htmlData);
    });
  });
};

module.exports = myHtmlWebpackPlugin;

