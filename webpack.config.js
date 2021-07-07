const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        index: __dirname + '/src/index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env']]
                    }
                }
            }
        ]
    },
    mode: 'development',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Development',
          template: './index.html'
        }),
    ],
    devtool: 'inline-source-map',
}