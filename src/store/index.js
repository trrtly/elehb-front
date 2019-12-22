import Vue from 'vue';
import Vuex from 'vuex';
import commonService from '../service/commonService';

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
            let res = await commonService.getPlatformInfo();
            res && commit('setPlatformInfo', res.data.data);
            return Promise.resolve();
        },
        async fetchSetUserInfo({ commit }) {
            let res = await commonService.getUserInfo();
            res && commit('setUserInfo', res.data.data);
            return Promise.resolve();
        }
    },
    modules: {}
});
