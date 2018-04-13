const path = require("path");
module.exports = {
    mode:"development",
    entry: path.resolve(__dirname, "index.jsx"),
    output: {
        path: path.resolve(__dirname,"../"),
        filename: 'index.js',
        libraryTarget: 'umd'
    },
    devtool:"source-map",
    module:{
        rules:[{
            test:/\.jsx$/,
            use:[{
                loader:"babel-loader"
            }],
            include:[path.resolve(__dirname)]
        }]
    },
    resolve:{
        extensions:['.js','.jsx']
    }
}