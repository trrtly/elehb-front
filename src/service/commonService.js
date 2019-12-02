// import Vue from 'vue';
import store from '../store';

// const urls = {
//     getCode: `/wechat/connect/oauth2/authorize`
// };

export default {
    async validateLogin() {},
    validateHref(params = {}) {
        const {
            app_id = store.state.app_id,
            redirect_uri = location.href.split('#')[0],
            response_type = 'scope',
            scope = 'snsapi_userinfo',
            state = ''
        } = params;
        return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${app_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}&connect_redirect=1#wechat_redirect`;
    }
};
