import axios from 'axios';

const urls = {
    getBanners: '/api/v1/banners',
    getRedPacks: '/api/v1/redpacks'
};

export default {
    // 获取轮播图
    getBanners() {
        return axios.get(urls.getBanners);
    },
    // 获取红包列表
    getRedPacks() {
        return axios.get(urls.getRedPacks);
    }
};
