const path = require('path');
var prod = process.env.NODE_ENV === 'production';

module.exports = {
    wpyExt: '.wpy',
    eslint: true,
    cliLogs: !prod,
    static: [],
    output:"dist",
    target:"dist",
    build: {
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
            Log: path.join(__dirname, 'src/services/log'),
            Common: path.join(__dirname, 'src/common/common'),
            Appconfig: path.join(__dirname, 'src/common/appConfig'),
            Api: path.join(__dirname, 'src/services/api/index'),
            Mixinsindex: path.join(__dirname, 'src/mixins/index'),
            Mixinsshare: path.join(__dirname, 'src/mixins/share')
        },
        aliasFields: ['wepy', 'weapp'],
        modules: ['node_modules']
    },
    compilers: {
        less: {
            compress: prod
        },
        babel: {
            sourceMap: true,
            presets: [
                '@babel/preset-env'
            ],
            plugins: [
                '@wepy/babel-plugin-import-regenerator'
            ]
        }
    },
    plugins: [],
    appConfig: {
        noPromiseAPI: ['createSelectorQuery']
    }
}

