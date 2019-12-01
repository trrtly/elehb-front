module.exports = {
    plugins: {
        autoprefixer: {
            overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
        },
        'postcss-pxtorem': {
            rootValue: 50,
            propList: ['*'],
            replace: true
        }
    }
};
