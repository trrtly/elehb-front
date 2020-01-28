import commonService from '../service/commonService';

export async function beforeEnter(to, from, next) {
    // 判断一下有没有微信授权
    let query = to.query;

    let token = localStorage.getItem('token');

    if (query.code) {
        // code存在
        let res = await commonService.getToken(query.code);
        res && localStorage.setItem('token', res?.token);
        await commonService.fetchSetUserInfo();
        next({
            path: to.path,
            replace: true
        });
    } else {
        if (token) {
            // 拉取用户信息
            await commonService.fetchSetUserInfo();
            next();
        } else {
            // 无code 无token
            // this.app.$toast('登录失效');
            setTimeout(() => {
                commonService.toValidateHref();
            }, 1000);
        }
    }
}
