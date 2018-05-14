
// Karma configuration
module.exports = function (config) {
  config.set({
    basePath: 'test/',
    // LIBS THAT USE INTO TEST FUNCTIONALITY
    frameworks: ['mocha', 'chai'],

    // STAY WATCHING EVERY TIME FILE HAS BEEN CHANGED
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,
    // PORT FOR VIEWING
    port: 5000,
    // BROWSER TO OPEN IN
    browsers: ['Chrome'],
    // HOSTNAME TO OPEN ON 
    hostName: 'localhost',
    client: {
      mocha: {
        reporter: 'html',
        expose: ['body']
      }
    },

    // WHERE SHOULD KARMA LOOK 
    files: [{
      pattern: '**/*_spec.js',
      watched: true
    }],

    // WHERE SHOULDN'T KARMA LOOK
    exclude: [
      'src/'
    ],

    // WHERE SHOULD PREPROCESSOR WATCH 
    preprocessors: {
      // add webpack as preprocessor
      '**/*_spec.js': ['webpack']
    },

    // WEBPACK CONFIG
    webpack: require('./webpack.config'),

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      stats: 'errors-only'
    }
  });
};

