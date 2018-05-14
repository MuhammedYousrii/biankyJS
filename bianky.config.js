module.exports = {
    styleC: {
        preProcessor: true,
        type: 'scss',
    },

    templateC: {
        preProcessor: true,
        type: 'pug'
    },

    appName: 'Delta',


    commonsC: {
        header: {
            name: 'header-common-component',
        },
        footer: {
            name: 'header-common-component'
        }
    },


    app: {
        rootElement: '#root',
    },

    loggerC: {
        classNameCase: String.prototype.toUpperCase,
    },


    componentC: {
        tempEngine: 'pug',
        cssPreprocessor: 'scss',
        breakPoints: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 991,
            xl: 1440
        }
    },

    jqueryExtensions: [
        'hasAttr'
    ]

};
