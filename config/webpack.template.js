const htmlGenrator = require('html-webpack-plugin');
const path = require('path');

const TemplateController = isProd => {
  return new htmlGenrator({
    filename: 'index.html',
    title: 'Delta Nile',
    minify: {
      collapseWhitespace: isProd,
      collapseBooleanAttributes: isProd
    },
    cache: true,
    publicPath: !isProd ? './': '',
    hash: !isProd,
    favicon: path.resolve(__dirname, '../favicon.ico'),
    template: path.resolve(__dirname, '../src/index.html'),
  });
};


module.exports = {
  TemplateController
};
