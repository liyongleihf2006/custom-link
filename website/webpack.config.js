const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    mode:"production",
    entry: path.resolve(__dirname, "src/index.jsx"),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash:4].bundle.js'
    },
    devtool:"source-map",
    module:{
        rules:[{
            test:/\.jsx$/,
            use:[{
                loader:"babel-loader"
            }],
            include:[path.resolve(__dirname,"src")]
        }]
    },
    plugins:[
        new CleanWebpackPlugin([path.join(__dirname,"dist")]),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html",
        })
    ],
    resolve:{
        extensions:['.js','.jsx']
    }
}