const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const glob = require("glob");

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const pagesDir = path.resolve(__dirname, 'src', 'pages');
const files = glob.sync(path.resolve(pagesDir, "**/*.pug"));


module.exports = {
    entry: path.resolve(__dirname, 'src', 'app.js'),
    mode: (IS_PRODUCTION) ? 'production' : 'development',
    devtool: (IS_PRODUCTION) ? undefined : "source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: ['pug-loader']
            }
        ]
    },
    plugins: [
        ...files.map(file => {
            const options = {
                alwaysWriteToDisk: true,
                template: file,
                filename: file
                    .replace(pagesDir + '/', '')
                    .replace('pug', 'html')
            };

            return new HtmlWebpackPlugin(options);
        }),
        new HtmlWebpackHarddiskPlugin()
    ]
}
