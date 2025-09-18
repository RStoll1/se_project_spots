const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/pages/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 8080,
        open: true,
        hot: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV === 'production'
                        ? MiniCssExtractPlugin.loader
                        : 'style-loader', // 'style-loader' for dev
                    'css-loader',
                    'postcss-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
};
