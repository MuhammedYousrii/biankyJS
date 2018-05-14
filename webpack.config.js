const path = require('path');
const Dircleaner = require('clean-webpack-plugin');
const webpack = require('webpack');
const {
  TemplateController,
} = require('./config/webpack.template');
const {
  provideLibsExtending,
  bundleAnalyzer,
  hmrConfig,
  sourceMap,
  loadersDebugger,
} = require('./config/webpack.plugins.js');

const {
  devServer
} = require('./config/webpack.devserver.js');
const {
  resolve
} = require('./config/webpack.resolver.js');
const {
  node
} = require('./config/webpack.node.js');
const {
  assets,
  sass,
  css
} = require('./config/webpack.loader.js');

module.exports = function (env) {
  const isProd = env.NODE_ENV === 'production';
  const targetPlatform = env.platform;
  const libraryName = 'biankyLibaray';

  return {
    // Sources Context
    context: path.resolve(__dirname, 'src'),
    recordsPath: path.resolve(__dirname, 'dist/', 'records.json'),
    cache: true,
    profile: true,
    target: targetPlatform,


    entry: {
      vendors: path.resolve(__dirname, 'src/vendors/vendors.js'),
      // --- SPA ENTRY
      index: path.resolve(__dirname, 'src/index.js'),

      // --- AS APP
      app: path.resolve(__dirname, 'src/app.js')
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: '[name].js',
      filename: '[name].js',
      publicPath: isProd ? 'http://localhost:8080/' : '/',
      library: libraryName,
      libraryTarget: 'umd',
      umdNamedDefine: true
    },

    module: {
      rules: [


        //Js Loader 
        {
          test: /.js?$/,
          exclude: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'bower_components')
          ],
          
          use: {
            loader: 'babel-loader',
          }

        },

        //pug loader
        {
          test: /\.pug$/,
          exclude: path.resolve(__dirname, 'node_modules/'),
          use: [{
            loader: 'pug-loader'
          }]
        },


        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        
        //css loader 
        {
          test: /\.css$/,
          exclude: path.resolve(__dirname, 'node_modules'),
          use: css(isProd)
        },

        //Sass Loader
        {
          test: /\.scss$/,
          exclude: path.resolve(__dirname, 'node_modules'),
          use: sass(isProd)
        },
        //media Loader
        {
          test: /\.(jpe?g|png|gif|Gif|svg|mp4)$/i,
          exclude: path.resolve(__dirname, 'node_modules/'),
          use: assets(isProd)
        },


        //fonts Loader
        {
          test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
          use: [{
            loader: 'file-loader',
            query: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }]
        }

      ]
    },


    resolve,
    node,
    devServer,


    plugins: [
      // cssExtracting(isProd),

      provideLibsExtending,
      hmrConfig(isProd),
      bundleAnalyzer,
      loadersDebugger(isProd),
      TemplateController(isProd),
      new Dircleaner(['dist'])
    ]

  };
};
