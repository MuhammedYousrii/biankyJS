const ExtractTextPlugin = require('extract-text-webpack-plugin');


/**  
 * @author Muhammed Yousrii
 * @type {function} assets
 * @version 0.0.1
 * @param {Boolean} prod
 * @return {Object} config
 */
const assets = function (env) {
  let config;
  if (env) {
    config = [{
        loader: 'file-loader',
        query: {
          name: '[name].[ext]',
          outputPath: 'images/',
        }
      },

      {
        loader: 'image-webpack-loader',
        query: {
          mozjpeg: {
            quality: '80'
          },
          pngquant: {
            quality: '85-95',
            speed: 4
          },
          gifsicle: {
            optimizationLevel: 4,
          },
          svgo: {
            cleanupAttrs: true,
            removeDoctype: true,
            removeEmptyAttrs: true,
            removeComments: true,
            minfiyStyles: true,
          }
        }
      }
    ];

    return config;
  }

  config = [{
    loader: 'file-loader',
    query: {
      name: '[name].[ext]',
      outputPath: 'images/',
    }
  }];
  return config;
};

/**
 * return config depend on environment
 * @author Muhammed Yousrii
 * @version 0.0.1
 * @param {Boolean} env
 * @return {Object} config
 */
const sass = function (env) {
  let config;
  //If Production mode
  if (env) {
    //Extract all Css Into single file
    config = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      publicPath: '../',
      disable: !env,
      allChunks: true,
      filename: 'css/[name].min.css',

      use: [{
          loader: 'css-loader',
          options: {
            minimize: true,
            sourceMap: true,
          }
        }, 
        {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              return [
                // require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, 
        {
          loader: 'resolve-url-loader'
        }, {
          loader: 'sass-loader'
        }
      ]
    });

    return config;
  }
  // if Development Mode
  config = ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader'];
  return config;
};


const css = function (env) {
  let config;
  //If Production mode
  if (env) {
    //Extract all Css Into single file
    config = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      publicPath: '../',
      use: [{
          loader: 'css-loader',
          options: {
            minimize: true,
            sourceMap: true,
          }
        }
      ]
    });

    return config;
  }
  // if Development Mode
  config = ['style-loader', 'css-loader'];
  return config;
};

module.exports = {
  assets,
  sass,
  css
};
