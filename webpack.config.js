var path = require('path');
module.exports = {
    entry: './index.js',
    devtool: 'source-map',
    output: {
        path: __dirname,
        filename: 'bundle.js',
        sourceMapFilename: "bundle.js.map"
    },
    module: {
        loaders: [{
            test: path.join(__dirname),
            loader: 'babel-loader'
        }]
    },
    resolve: {
        root: [
            path.resolve(__dirname)
        ],
        extensions: ['', '.js'],
        alias: {
            'lodash.curry': 'ramda/src/curry'
        }
    }
};
