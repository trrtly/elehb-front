const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
// const { SkeletonPlugin } = require('page-skeleton-webpack-plugin');
// const path = require('path');

module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: 'http://qq2jabjph5t8drkl.quanduogo.com'
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/scss/bemMixins.scss";`
            }
        }
    },
    configureWebpack: () => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new WebpackDeepScopeAnalysisPlugin(), // deep tree shaking
                    new ImageminWebpWebpackPlugin({
                        config: [
                            {
                                test: /\.(jpe?g|png)$/,
                                options: {
                                    // quality: 85
                                    lossless: true,
                                    method: 6
                                    // nearLossless: 0
                                }
                            }
                        ],
                        overrideExtension: false,
                        detailedLogs: true,
                        strict: false
                    })
                    // new SkeletonPlugin({
                    //     pathname: path.resolve(__dirname, './shell'), // 用来存储 shell 文件的地址
                    //     staticDir: path.resolve(__dirname, './dist'), // 最好和 `output.path` 相同
                    //     routes: ['/'], // 将需要生成骨架屏的路由添加到数组中
                    //     defer: 10000,
                    //     device: 'iPhone 6',
                    //     cssUnit: 'rem',
                    //     decimal: 4,
                    //     loading: 'chiaroscuro'
                    // })
                ]
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
                        speed: 3
                    },
                    gifsicle: {
                        interlaced: false
                    }
                    // the webp option will enable WEBP
                    // webp: {
                    //     quality: 75,
                    //     enabled: true
                    // }
                };
            });

        // config.plugin('html').tap((opts) => {
        //     opts[0].minify.removeComments = false;
        //     return opts;
        // });
    },

    productionSourceMap: false
};
