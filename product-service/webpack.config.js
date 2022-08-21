const path = require('path');
const slsw = require('serverless-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    context: __dirname,
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    entry: slsw.lib.entries,
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()]
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: path.resolve(__dirname, 'src'),
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, '.serverless'),
                    path.resolve(__dirname, '.webpack'),
                  ],        
            },
        ],
    },
};