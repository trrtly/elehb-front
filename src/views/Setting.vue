<template>
    <div class="setting-wrapper">
        <van-cell-group>
            <van-cell title="授权免登录" center>
                <van-switch :value="autoLogin" @input="loginOnChange" :loading="autoLoginLoading" active-color="#09BB07" />
            </van-cell>
            <!-- <van-cell title="每日提醒" center>
                <van-switch :value="remind" @input="remindOnChange" :loading="remindLoading" active-color="#09BB07" />
            </van-cell> -->
        </van-cell-group>
        <van-cell-group>
            <van-cell title="用户服务协议" is-link url="//r.xiumi.us/board/v5/2XWpR/190715124" />
            <van-cell title="隐私条款" is-link url="//v.xiumi.us/board/v5/2XWpR/190719124" />
            <van-cell title="清空缓存" @click="clearStorage" />
        </van-cell-group>
    </div>
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
            remind: false,

            autoLoginLoading: false,
            remindLoading: false
        };
    },
    methods: {
        async loginOnChange(autoLoginStatus) {
            this.autoLoginLoading = true;
            settingService
                .setUserSetting({
                    agreePrivacy: autoLoginStatus === true ? 1 : 0
                })
                .then(() => {
                    this.autoLoginLoading = false;
                    this.autoLogin = autoLoginStatus;
                });
        },
        remindOnChange() {},
        clearStorage() {
            localStorage.removeItem('firstLogin');
            localStorage.removeItem('phone');
            this.$toast('清除缓存成功');
        }
    }
};
</script>

<style lang="scss" scoped>
.setting-wrapper {
    background-color: #f7f7f7;
    padding: 0.3rem;
    height: 100%;

    .van-switch {
        font-size: 0.42rem;
    }

    .van-cell-group {
        border-radius: 4px;

        &:not(:last-child) {
            margin-bottom: 0.3rem;
        }

        .van-cell {
            padding-left: 0.2rem;
            padding-right: 0.2rem;

            &:not(:last-child)::after {
                left: 0.2rem;
            }
        }
    }

    .van-cell {
        border-radius: 8px;
    }
}
</style>
