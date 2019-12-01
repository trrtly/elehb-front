const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;

// vue.config.js
module.exports = {
    configureWebpack: () => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [new WebpackDeepScopeAnalysisPlugin()] // deep tree shaking
            };
        }
    },
    chainWebpack: (config) => {
        // minify images
        config.module
            .rule('imageMinify')
            .test(/\.(gif|png|jpe?g|svg)$/i)
            .use('file-loader')
            .loader('image-webpack-loader')
            .tap(() => {
                // 修改它的选项...
                return {
                    mozjpeg: {
                        progressive: true,
                        quality: 65
                    },
                    // optipng.enabled: false will disable optipng
                    optipng: {
                        enabled: false
                    },
                    pngquant: {
                        quality: [0.65, 0.9],
                        speed: 4
                    },
                    gifsicle: {
                        interlaced: false
                    },
                    // the webp option will enable WEBP
                    webp: {
                        quality: 75,
                        enabled: true
                    }
                };
            });
    }
};
