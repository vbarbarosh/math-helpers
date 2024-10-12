module.exports = {
    mode: 'none',
    entry: './src/browser.js',
    output: {
        filename: 'browser.js',
        library: 'vb_math_helpers',
        // libraryExport: 'default',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
};
