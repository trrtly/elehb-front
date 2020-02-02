<template>
    <van-cell-group>
        <van-cell title="授权免登录" center>
            <van-switch :value="autoLogin" @input="onChange" :loading="autoLoginLoading" active-color="#09BB07" />
        </van-cell>
        <van-cell title="用户服务协议" is-link />
        <van-cell title="隐私条款" is-link />
    </van-cell-group>
</template>

<script>
import Vue from 'vue';
import { Cell, CellGroup, Switch } from 'vant';
import settingService from '@/service/settingService';

Vue.use(Cell)
    .use(CellGroup)
    .use(Switch);

export default {
    async created() {
        let res = await settingService.getUserSetting();
        this.autoLogin = !!res?.agreePrivacy;
    },
    data() {
        return {
            autoLogin: false,
            autoLoginLoading: false
        };
    },
    methods: {
        async onChange(autoLoginStatus) {
            this.autoLoginLoading = true;
            settingService
                .setUserSetting({
                    agreePrivacy: autoLoginStatus === true ? 1 : 0
                })
                .then(() => {
                    this.autoLoginLoading = false;
                    this.autoLogin = autoLoginStatus;
                });
        }
    }
};
</script>

<style lang="scss" scoped></style>
