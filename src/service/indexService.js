import store from '@/store';
import axios from 'axios';

const urls = {
    getBanners: '/api/v1/banners',
    getRedPacks: '/api/v1/redpacks'
};

export default {
    async fetchSetPlatformInfo() {
        return store.state.platformInfo || store.dispatch('fetchSetPlatformInfo');
    },
    // 获取轮播图
    async getBanners() {
        return axios.get(urls.getBanners);
    },
    // 获取红包列表
    async getRedPacks() {
        return axios.get(urls.getRedPacks);
    }
};
