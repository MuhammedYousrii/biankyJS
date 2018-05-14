const path = require('path');

const resolve = {
    alias: {
        libs: path.resolve(__dirname, '../src/libs/'),
        utils: path.resolve(__dirname, '../src/utils/'),
        cores: path.resolve(__dirname, '../src/cores/'),
        vendors: path.resolve(__dirname, '../src/vendors/'),
    },
    extensions: ['.js', '.jsx', 'png', '.scss', '.pug', 'gif', '.bianky'],
    modules: [
        path.resolve(__dirname, '../node_modules'),
        path.resolve(__dirname, '../bower_components/')
    ],
    descriptionFiles: ['package.json', 'bower.json'],
};

module.exports = {
    resolve,
};
