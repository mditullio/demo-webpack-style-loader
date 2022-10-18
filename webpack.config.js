const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const distFolder = 'dist';

module.exports = {

    mode: 'development',

    target: 'web',

    entry: {
        'index': path.resolve(__dirname, './src/index.js')
    },

    output: {
        path: path.resolve(__dirname, distFolder),
        filename: `[name].min.[contenthash:8].js`,
        clean: true
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
    },

    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
        },
    },

    module: {
        rules: [

            // HTML templates for web components
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            // Global SASS/CSS files
            {
                test: /\.(c|sa|sc)ss$/i,
                exclude: /component/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                        },
                    },
                ],
            },
            // Component SASS/CSS files
            {
                test: /component\.(c|sa|sc)ss$/i,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            injectType: "lazyStyleTag",
                            insert: function (element, options) {
                                var parent = options?.target || document.head;
                                parent.appendChild(element);
                            },
                        }
                    },
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                        },
                    },
                ],
            },
            // Images and fonts
            {
                test: /\.(png|svg|eot|ttf|woff)/,
                type: 'asset/resource'
            },
            // Text files
            {
                test: /\.txt/,
                type: 'asset/source'
            },
        ]
    },

    plugins: [new HtmlWebpackPlugin()]
}
