/**
 * Created by Robin Hsu on 16/4/20.
 */
"use strict";
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var IconsPlugin = require('icons-loader/IconsPlugin');

const RUN_TIMESTAMP = Math.round(Date.now() / 1000);

let config = {
    devtool: 'source-map',
    context: __dirname,
    entry: {
        Alert: "./test/Alert/src/",
        Card: "./test/Card/src/",
        Loading: "./test/Loading/src/",
        Toast: "./test/Toast/src/",
        Modal: "./test/Modal/src/",
        Section: "./test/Section/src/",
        Tabs: "./test/Tabs/src/",
    },
    output: {
        path: __dirname + '/test',
        filename: '[name]/dist/[name].all.js'
    },
    externals: {
        "react": "window.React",
        "react-dom": "window.ReactDOM"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['transform-decorators-legacy']
                }
            },
            {
                test: /\.handlebars$/,
                loader: "handlebars-loader"
            },
            {
                test: /\.css$/,
                loader: "style!css!px2rem?remUnit=50&remPrecision=8"
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!px2rem?remUnit=100&remPrecision=8!sass?outputStyle=expanded')
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader?limit=1000&name=img/[name]-[hash:8].[ext]"
            },
            {
                test: /\.svg$/,
                loader: 'icons-loader',
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name]/dist/[name].css', {//抽出css
            disable: false,
            allChunks: true
        }),
        new IconsPlugin({
            fontName: 'zzc-icons',
            timestamp: RUN_TIMESTAMP,
            filenameTemplate: {
                name: './icon/[name]-[hash].[ext]'
            },
            normalize: true,
            formats: ['ttf', 'eot', 'woff', 'svg']
        }),
        // new webpack.DefinePlugin({
        //     "process.env": {
        //         NODE_ENV: JSON.stringify("production")
        //     }
        // })

    ]
};

module.exports = config;