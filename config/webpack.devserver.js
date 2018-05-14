const path = require('path');

const devServer = {
    // Serve Content From Dist Folder
    contentBase: path.join(__dirname, '../src/'),
    // Compress With Gzip
    compress: true,
    port: 8080,
    //Open when Ready
    // open :true ,
    //Enable HMR Feature 
    hot: true,
    //Watch Files And update Yourself
    watchContentBase: true,
    historyApiFallback: true,
    

    // WATCHING CONFIG
    watchOptions: {
        aggregateTimeout: 500,
        ignored: './node_modules/',
        poll: 1000,
    },

    /* DEVELOPMENT-SERVER STATE */
    stats: {
        colors: true,
        providedExports: true,
        depth: true

    }
};


module.exports = {
    devServer
};
