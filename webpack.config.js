
const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    CssMinimizerPlugin = require("css-minimizer-webpack-plugin");;

module.exports = {
    mode: process.env.WEBPACK_MODE,
    entry: ['./src/entries/index.js', './src/sass/main.scss'],
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 9000
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin()],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
          }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'docs/index.pug'
        })
    ],
    module: {
        rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                'css-loader',
                'sass-loader',
              ],
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            }
          ]
    },
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'dist')
    }
};