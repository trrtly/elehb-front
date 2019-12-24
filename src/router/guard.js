import commonService from '../service/commonService';

export default async function(to, from, next) {
    // 判断一下有没有微信授权
    let query = to.query;

    let token = localStorage.getItem('token');

    if (query.code) {
        // code存在
        let userToken = await commonService.getToken(query.code);
        userToken && localStorage.setItem('token', userToken?.data?.data?.token);
        !this.app.$store.state.userInfo && (await this.app.$store.dispatch('fetchSetUserInfo'));
        next(to.path);
    } else {
        if (token) {
            // 拉取用户信息
            !this.app.$store.state.userInfo && (await this.app.$store.dispatch('fetchSetUserInfo'));
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
