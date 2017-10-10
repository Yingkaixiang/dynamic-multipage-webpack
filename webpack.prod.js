const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new UglifyjsWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
});
