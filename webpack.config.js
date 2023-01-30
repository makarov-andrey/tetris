const path = require('path');

module.exports = {
    entry: {
        index: './src/index.ts',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    experiments: {
        topLevelAwait: true
    },
    output: {
        publicPath: '',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/web'),
    },
};
