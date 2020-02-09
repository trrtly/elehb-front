import axios from 'axios';

const urls = {
    getBanners: '/api/v1/banners',
    getRedPacks: '/api/v1/redpacks',
    getRedPack: '/api/v1/redpacks',
    getCaptcha: '/api/v1/redpacks/captcha',
    sendMsg: '/api/v1/redpacks/sendSms',
    eleIsLogin: '/api/v1/user/current',
    eleLogin: '/api/v1/redpacks/loginBySms'
};

export default {
    // 获取轮播图
    getBanners() {
        return axios.get(urls.getBanners);
    },
    // 获取红包列表
    getRedPacks() {
        return axios.get(urls.getRedPacks);
    },
    // 领取红包
    getRedPack(data) {
        return axios.post(urls.getRedPack, data);
    },
    // 获取图形验证码
    getCaptcha(data) {
        return axios.get(urls.getCaptcha, {
            params: data
        });
    },
    sendMsg(data) {
        return axios.post(urls.sendMsg, data);
    },
    eleIsLogin(data) {
        return axios
            .get(urls.eleIsLogin, {
                params: data
            })
            .then((res) => {
                return res.isLogin;
            });
    },
    eleLogin(data) {
        return axios.post(urls.eleLogin, data);
    }
};
