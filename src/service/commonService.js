import store from '../store';
import axios from 'axios';
import { Toast } from 'vant';

const urls = {
    userSignin: '/api/v1/user/signin',
    getPlatformInfo: '/api/v1/platform',
    getToken: '/api/v1/token',
    getUserInfo: '/api/v1/user'
};

const service = {
    // 获取并设置平台相关信息
    async fetchSetPlatformInfo() {
        const platformInfo = store.state.platformInfo;
        return Object.keys(platformInfo).length > 0 ? platformInfo : await store.dispatch('fetchSetPlatformInfo');
    },
    // 获取平台相关信息
    getPlatformInfo() {
        return axios.get(urls.getPlatformInfo).catch(() => {
            Toast('获取平台信息失败');
        });
    },
    // 获取token
    getToken(userCode) {
        return axios
            .post(urls.getToken, {
                code: userCode
            })
            .catch(() => {
                // Toast('获取token失败');
            });
    },
    // 用户签到
    userSignin() {
        return axios.post(urls.userSignin, {}, { showError: false });
    },
    // 获取用户微信信息
    getUserInfo() {
        return axios.get(urls.getUserInfo).catch(() => {
            Toast('获取用户信息失败');
        });
    },
    // 获取设置用户信息
    async fetchSetUserInfo() {
        const userInfo = store.state.userInfo;
        return Object.keys(userInfo).length > 0 ? userInfo : await store.dispatch('fetchSetUserInfo');
    },
    // 获取拼接授权页面链接
    async validateHref(
        params = {
            app_id: store.state?.platformInfo?.appid
        }
    ) {
        return new Promise(async (rs) => {
            let { app_id, redirect_uri = location.href.split('#')[0], response_type = 'scope', scope = 'snsapi_userinfo', state = '' } = params;

            if (!app_id) {
                let platformInfo = await this.fetchSetPlatformInfo();
                app_id = platformInfo.appid;
            }
            rs(
                `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${app_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}&connect_redirect=1#wechat_redirect`
            );
        });
    },
    async toValidateHref() {
        window.location.href = await this.validateHref();
    },
    // 每日签到
    sign: (function() {
        let signed = false;
        return async () => {
            if (signed) {
                Toast('您今天已经签到过了，明天再来哦~');
                return signed;
            }

            return service
                .userSignin()
                .then((res) => {
                    store.commit('addUserScore', res.score);
                    Toast(`签到成功，获得${res.score}积分`);
                    signed = true;
                    return signed;
                })
                .catch((error) => {
                    if (+error.code === 1017) {
                        Toast('您今天已经签到过了，明天再来哦~');
                        signed = true;
                    }
                    return signed;
                });
        };
    })()
};

export default service;
