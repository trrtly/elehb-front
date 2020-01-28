import store from '../store';
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
        return axios
            .post(urls.getToken, {
                code: userCode
            })
            .catch(() => {
                Toast('获取token失败');
            });
    },
    // 获取用户微信信息
    async getUserInfo() {
        return axios.get(urls.getUserInfo).catch(() => {
            Toast('获取用户信息失败');
        });
    },
    // 获取设置用户信息
    async fetchSetUserInfo() {
        return store.state.userInfo || (await store.dispatch('fetchSetUserInfo'));
    },
    // 获取拼接授权页面链接
    async validateHref(
        params = {
            app_id: store.state?.platformInfo?.data.appid
        }
    ) {
        return new Promise(async (rs) => {
            let { app_id, redirect_uri = location.href.split('#')[0], response_type = 'scope', scope = 'snsapi_userinfo', state = '' } = params;

            if (!app_id) {
                let platformInfo = await this.getPlatformInfo();
                app_id = platformInfo.data.appid;
            }
            rs(
                `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${app_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}&connect_redirect=1#wechat_redirect`
            );
        });
    },
    async toValidateHref() {
        window.location.href = await this.validateHref();
    }
};
