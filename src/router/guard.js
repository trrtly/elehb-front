import commonService from '../service/commonService';

export async function beforeEnter(to, from, next) {
    // 判断一下有没有微信授权
    let query = to.query;
    // query.code = '021FmURg0wcGit1rE3Rg0lh1Sg0FmUR0';
    let token = localStorage.getItem('token');

    if (query.code) {
        // code存在
        let res = await commonService.getToken(query.code);
        res && localStorage.setItem('token', res?.token);

        // 后续需要优化
        await commonService.fetchSetUserInfo();

        next({
            path: to.path,
            replace: true
        });
    } else {
        if (token) {
            // 拉取用户信息
            // 后续需要优化
            await commonService.fetchSetUserInfo();

            next();
        } else {
            // 无code 无token
            setTimeout(() => {
                commonService.toValidateHref();
            }, 1000);
        }
    }
}
