const {
    ProvidePlugin,
    HotModuleReplacementPlugin,
    SourceMapDevToolPlugin,
    LoaderOptionsPlugin
} = require('webpack');


const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');

// const ManifestPlugin = require('webpack-manifest-plugin');

const hmrConfig = isProd => {
    if (!isProd) return new HotModuleReplacementPlugin();
    else return null
};


// PROVIDE JQUERY OR LODASH AS DEFAULTS 
const provideLibsExtending = new ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    _: 'lodash',
});

// FINAL BUNDLE ANALAYZER
const bundleAnalyzer = new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    analyzerHost: '127.0.0.1',
    analyzerPort: 9000,
    openAnalyzer: false
});


// SOURCE-MAP FOR MAIN FILES ONLY NOT VENDORS OR COMMONS
const sourceMap = new SourceMapDevToolPlugin({
    test: /\.min\.js$/,
    filename: '[name].js.map',
    exclude: ['vendors.min.js', 'commons.min.js']
});


const loadersDebugger = isProd => {
    return new LoaderOptionsPlugin({
        debug: isProd ? false : true,
    });
};

module.exports = {
    hmrConfig,
    provideLibsExtending,
    bundleAnalyzer,
    sourceMap,
    loadersDebugger,
};
