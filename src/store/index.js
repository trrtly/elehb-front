import Vue from 'vue';
import Vuex from 'vuex';
import commonService from '@/service/commonService';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {
        setPlatformInfo(state, platformInfo) {
            state.platformInfo = platformInfo;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        async fetchSetPlatformInfo({ commit }) {
            let platformInfo = await commonService.getPlatformInfo();
            platformInfo && commit('setPlatformInfo', platformInfo);
            return Promise.resolve(platformInfo);
        },
        async fetchSetUserInfo({ commit }) {
            let userInfo = await commonService.getUserInfo();
            userInfo && commit('setUserInfo', userInfo);
            return Promise.resolve(userInfo);
        }
    },
    modules: {}
});
