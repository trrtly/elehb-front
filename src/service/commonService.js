// import store from '../store';
import axios from 'axios';
import { Toast } from 'vant';

const urls = {
    getPlatformInfo: '/api/v1/platform',
    getToken: '/api/v1/token',
    getUserInfo: '/api/v1/user'
};

export default {
    // 获取平台相关信息
    async getPlatformInfo() {
        return axios.get(urls.getPlatformInfo).catch(() => {
            Toast('获取平台信息失败');
        });
    },
    // 获取token
    async getToken(userCode) {
        return axios.post(urls.getToken, {
            code: userCode
        });
    },
    // 获取用户微信信息
    async getUserInfo() {
        return axios.get(urls.getUserInfo);
    },
    // 拼接授权页面链接
    validateHref(params = {}) {
        const { app_id, redirect_uri = location.href.split('#')[0], response_type = 'scope', scope = 'snsapi_userinfo', state = '' } = params;
        return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${app_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}&connect_redirect=1#wechat_redirect`;
    }
};
