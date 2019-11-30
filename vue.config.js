module.exports = {
    chainWebpack: (config) => {
        const imgRule = config.module.rule('images');
        imgRule
            .use('file-loader')
            .loader('image-webpack-loader')
            .tap(() => {
                return {
                    pngquant: {
                        quality: [0.65, 0.9],
                        speed: 4
                    }
                };
            });
    }
};
