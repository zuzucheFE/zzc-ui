var path = require('path');

module.exports = {
    entry: {
        Alert: "./src/Alert/js/index.jsx",
        Card: "./src/Card/js/index.jsx",
        Dialog: "./src/Dialog/js/index.jsx",
        Loading: "./src/Loading/js/index.jsx",
        Modal: "./src/Modal/js/index.jsx",
        Section: "./src/Section/js/index.jsx",
        Tabs: "./src/Tabs/js/index.jsx",
        Toast: "./src/Toast/js/index.jsx",
        Picker: "./src/Picker/js/index.jsx",
        Switch: "./src/Switch/js/index.jsx",
        ImageViewer: "./src/ImageViewer/js/index.jsx"
    },
    output: {
        publicPath: '../',
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.(jsx|js)$/,
    //             loader: "babel-loader",
    //
    //             options: {
    //                 presets: ["es2015","react","stage-2"]
    //             },
    //         },
    //     ]
    // },
    //控制使用demo的node_modules的包还是开发中的包
    resolve: {
        alias: {
            "zzc-ui": path.resolve(
                __dirname,
                "../lib/index.js"
            )
        }
    },
};
