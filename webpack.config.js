/**
 * Created by ljy on 16/9/7.
 */

var webpack = require('webpack');
//从webpack参数 判断是否是生产打包(是否含有-p 参数)
const prod = process.argv.indexOf('-p') !== -1;
console.log(prod);

module.exports = {
    entry: prod?
        [
            './src/index.jsx'
        ]
        :
        [
            'webpack-dev-server/client?http://localhost:8081',
            'webpack/hot/only-dev-server',
            './src/index.jsx'
        ]
    ,
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel'
        },{
            test: /\.css$/,
            loader: 'style-loader!css-loader?modules'
        },{
            test: /\.(jpg|png)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [
            'node_modules'
        ]
    },
    output: {
        path: prod? __dirname + '/proddist': __dirname + '/dist',
        publicPath: '/',
        filename: prod? 'bundle.min.js':'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: prod?
        [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.optimize.OccurenceOrderPlugin(),
            // new webpack.HotModuleReplacementPlugin(),
        ]
        :
        [
            new webpack.HotModuleReplacementPlugin(),
        ]
};
