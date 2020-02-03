import axios from 'axios';

const urls = {
    getBanners: '/api/v1/banners',
    getRedPacks: '/api/v1/redpacks',
    getCaptcha: '/api/v1/redpacks/captcha'
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
    // 获取图形验证码
    getCaptcha(phoneNum) {
        return axios.get(urls.getCaptcha, {
            params: phoneNum
        });
    }
};
