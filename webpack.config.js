var webpack = require('webpack');

module.exports = {
    entry: './app.js',
    output: {
        filename: 'app.build.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }, {
                test: /(\.xml|\.xsl)$/,
                loader: 'raw'
            }
        ],
    },
    plugins: [
        // new webpack.SourceMapDevToolPlugin(),
        // new webpack.optimize.UglifyJsPlugin()
    ],
    externals: {
        'document': 'document'
    }
}
