const PrettierPlugin = require("prettier-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, argv) => ({
    module: {
        rules: [{
            test: /\.elm$/,
            exclude: [/elm-stuff/, /node_modules/],
            use: {
                loader: 'elm-webpack-loader',
                options: {
                    optimize: argv.mode === 'production'
                }
            }
        }, {
            test:  /\.css$/i,
            use: ['style-loader', 'css-loader'],
        }]
    },

    devServer: {
        inline: true,
        stats: 'errors-only'
    },

    plugins: [
        new PrettierPlugin(),
        new webpack.EnvironmentPlugin({
            BASE_URL: 'http://localhost:8000',
            VERSION: 'dev',
            ADSENSE: null,
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
        }), 
        new CopyWebpackPlugin([
            { from: 'public' }
        ])
    ]
});
