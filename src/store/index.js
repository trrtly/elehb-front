import Vue from 'vue';
import Vuex from 'vuex';
import commonService from '@/service/commonService';
import meService from '@/service/meService';
import { Toast } from 'vant';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: {},
        platformInfo: {},

        myQRShow: false,
        myQRCode: '',

        kefuShow: false
    },
    getters: {
        randomCps(state) {
            const cps = state.platformInfo.cps;
            const randomIndex = Math.floor(Math.random() * cps.length);
            return cps[randomIndex];
        }
    },
    mutations: {
        setPlatformInfo(state, platformInfo) {
            state.platformInfo = platformInfo;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        addUserScore(state, score) {
            const newScore = state.userInfo.score + score;
            state.userInfo = Object.assign({}, { ...state.userInfo }, { score: newScore });
        },
        changeMyQR(state, flag) {
            state.myQRShow = flag;
        },
        setMyQRCode(state, url) {
            state.myQRCode = url;
        },
        changeKefuShow(state, flag) {
            state.kefuShow = flag;
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
        },
        async fetchSetMyQR({ commit, state }, force = false) {
            if (!state.myQRCode || force) {
                let { url } = await meService.getMyQRCode();
                url && commit('setMyQRCode', url);
                return Promise.resolve(url);
            }
            return Promise.resolve(state.myQRCode);
        },
        openMyQRCode() {
            return Toast('邀请功能维护中~');
            // this.dispatch('fetchSetMyQR');
            // this.commit('changeMyQR', true);
        }
    },
    modules: {}
});
