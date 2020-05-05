module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/prettier'],
    globals: {"WeixinJSBridge" : false},
    rules: {
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'no-floating-decimal': 'off',
        'prettier/prettier': [
            'error',
            {
                tabWidth: 4, // 缩进4个空格
                useTabs: false, // 不使用tab缩进
                semi: true, // 行末加分号
                singleQuote: true,
                trailingComma: 'none',
                bracketSpacing: true, // 括号空格
                jsxBracketSameLine: true,
                arrowParens: 'always',
                printWidth: 150
            }
        ]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
