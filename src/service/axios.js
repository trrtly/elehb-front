import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import commonService from './commonService';

Vue.use(VueAxios, axios);

// 不需要auth头的url
const noAuthUrls = ['/api/v1/platform', '/api/v1/token'];

// request interceptor request拦截器
axios.interceptors.request.use(
    function(config) {
        // 不在noAuthUrl中的都加上jwt token
        if (!noAuthUrls.includes(config.url)) {
            config.headers.Authorization = localStorage.getItem('token');
        }
        return config;
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// response interceptor response拦截器
axios.interceptors.response.use(
    function(response) {
        // 对响应数据做点什么
        return response;
    },
    function(error) {
        // 对响应错误做点什么
        const resp = error.response;

        // 接口401则重新跳转微信授权页面
        if (+resp.status === 401) {
            window.location = commonService.validateHref();
        } else {
            return Promise.reject(error);
        }
    }
);
