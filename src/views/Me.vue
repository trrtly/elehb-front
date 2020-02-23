<template>
    <div class="me-wrapper">
        <header class="header">
            <div class="header-upper">
                <div class="avatar-wrapper">
                    <img class="user-avatar" :src="userInfo.headimgurl" />
                    <span class="user-name fz-32">{{ userInfo.nickname }}</span>
                </div>

                <span class="user-id fz-24">
                    账户ID：{{ userInfo.id }}
                    <span class="user-id-copy-btn" @click="copyText(userInfo.id)">复制</span>
                </span>
            </div>
            <div class="header-bottom flex">
                <div class="credit-wrapper">
                    <div class="user-credit">
                        <span class="credit-num din-font">{{ userInfo.score }}</span>
                        <!-- <span class="my-credit flex fz-28" v-route-jump="'/credit'">我的积分 <van-icon name="arrow"/></span> -->
                        <span class="my-credit flex fz-28">我的积分</span>
                        <!-- <van-button
                            class="me-recharge-btn fz-28 font-bold"
                            size="small"
                            color="linear-gradient(to right, #ffe28a, #ffcf51)"
                            round
                            to="/recharge"
                            >充值</van-button
                        > -->
                        <van-button class="me-recharge-btn fz-28 font-bold" size="small" round to="/credit">查看</van-button>
                    </div>
                    <div class="user-money">
                        <span class="din-font">{{ userInfo.cms }} <span class="fz-28">元</span></span>
                        <!-- <span class="my-money flex fz-28" v-route-jump="'/brokerage'">我的佣金 <van-icon name="arrow"/></span> -->
                        <span class="my-money flex fz-28">我的佣金</span>
                        <van-button class="me-get-money-btn fz-28 font-bold" size="small" hairline round to="/brokerage">提现</van-button>
                    </div>
                </div>
            </div>
        </header>
        <section class="invite-wrapper">
            <div class="invite-inner">
                <div class="invite-left">
                    <div class="invite-text fz-28">
                        <p style="color: #545454;">每邀请一位好友的奖励：</p>
                        <p>
                            ◆ 立即获得<span class="din-font font-bold" style="color: #2f5ee3;">{{ platformInfo.inviteScore }}</span
                            >积分奖励
                        </p>
                        <!-- <p>◆ 好友每笔充值金额的<span class="din-font font-bold" style="color: #2f5ee3;">20%</span>佣金</p> -->
                    </div>
                    <!-- <van-button class="invite-link-btn fz-24" color="#2f5ee3" round plain @click="copyText(inviteLink)">复制邀请链接</van-button> -->
                </div>
                <div class="invite-right">
                    <span class="flex fz-28" style="color: #2f5ee3; align-self: flex-end;" v-route-jump="'/friends'">
                        好友列表
                        <van-icon name="arrow" />
                    </span>
                    <van-button class="invite-btn fz-24" color="linear-gradient(to right, #ff8b56, #fb5d37)" round @click="showQRDialog"
                        >邀请好友</van-button
                    >
                </div>
            </div>
        </section>
        <section class="common-wrapper">
            <h5 class="fz-28 font-bold">常用功能</h5>
            <ul class="common-btn-list fz-28">
                <li class="new">
                    <img class="common-btn-icon" src="../assets/me/icon_new@2x.png" alt="new" />
                    <span class="common-btn-text">新手指引</span>
                </li>
                <li class="faq">
                    <img class="common-btn-icon" src="../assets/me/icon_faq@2x.png" alt="faq" />
                    <span class="common-btn-text">常见问题</span>
                </li>
                <li class="kefu" @click="kefuShow = !kefuShow">
                    <img class="common-btn-icon" src="../assets/me/icon_kefu@2x.png" alt="kefu" />
                    <span class="common-btn-text">联系客服</span>
                </li>
                <li class="setting" v-route-jump="'/setting'">
                    <img class="common-btn-icon" src="../assets/me/icon_setting@2x.png" alt="setting" />
                    <span class="common-btn-text">系统设置</span>
                </li>
            </ul>
        </section>
        <footer class="me-footer">
            <redeem-btn />
        </footer>

        <!-- 客服弹层 -->
        <hb-modal class="kefu-modal" v-model="kefuShow" title="请长按识别二维码">
            <van-image :src="platformInfo.kfImg" style="width: 3.1rem; height: 3.1rem;" />
        </hb-modal>

        <!-- 我的邀请码弹窗 -->
        <van-overlay :show="myQRShow" @click="myQRShow = false">
            <van-image class="my-qr-code" :src="myQRCode" @click.stop />
        </van-overlay>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import RedeemBtn from '../components/RedeemBtn/RedeemBtn';
import meService from '../service/meService';
import WmqModal from '../components/WmqModal/WmqModal.vue';

export default {
    name: 'me',
    created() {
        // 更新用户信息
        this.$store.dispatch('fetchSetUserInfo');
        // 预先加载接口
        this.myQRPromise = meService.getMyQRCode();
    },
    data() {
        return {
            myQRPromise: null,
            inviteLink: 'www.baidu.com',
            myQRCode: '',

            kefuShow: false,
            myQRShow: false
        };
    },
    methods: {
        async showQRDialog() {
            this.myQRShow = true;

            if (!this.myQRCode) {
                let res = await this.myQRPromise;
                this.myQRCode = res.url;
            }
        }
    },
    computed: {
        ...mapState(['userInfo', 'platformInfo', 'shareQRCode'])
    },
    components: {
        RedeemBtn,
        HbModal: WmqModal
    }
};
</script>

<style lang="scss" scoped>
.me-wrapper {
    display: flex;
    flex-direction: column;
    background: #fff;
    overflow: hidden;

    // header
    .header {
        margin: 0.4rem 0.28rem 0;
        width: 6.96rem;

        // header upper
        .header-upper {
            display: flex;
            justify-content: space-between;

            .avatar-wrapper {
                display: flex;
            }

            .user-name {
                padding-top: 0.15rem;
                margin-left: 0.2rem;
                font-weight: bold;
                color: #212121;
            }

            .user-id {
                padding-top: 0.18rem;
                color: #707070;
            }

            .user-id-copy-btn {
                color: #2f5ee3;
            }
        }

        // header bottom
        .header-bottom {
            margin-top: -0.4rem;
            width: 100%;
            height: 2.94rem;
            background: #eee url('../assets/me/bg_my@2x.png') no-repeat;
            background-size: cover;
            overflow: hidden;
            box-shadow: 0.01rem 0.01rem 0.2rem 0.02rem #ccc;
            border-radius: 0.12rem 0.12rem 0 0;

            .credit-wrapper {
                display: flex;
                justify-content: space-between;
                width: 100%;
                margin: 0.68rem 0 0.4rem;
                padding: 0 0.64rem 0 1.06rem;
                text-align: center;

                @at-root .user-credit,
                    .user-money {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    & .my-credit,
                    & .my-money {
                        align-items: center;
                        color: #dadaff;
                    }

                    .credit-num,
                    &.user-money {
                        text-align: left;
                        font-size: 0.6rem;
                        color: #fefefe;
                    }

                    .me-recharge-btn,
                    .me-get-money-btn {
                        width: 1.48rem;
                        height: 0.56rem;
                        line-height: 0.56rem;
                        background: transparent;
                        color: #fff;

                        // &.me-get-money-btn {
                        //     color: #fff;
                        // }

                        // &.me-recharge-btn {
                        //     color: #b37013 !important;
                        // }
                    }
                }
            }
        }

        .user-avatar {
            margin-left: 0.42rem;
            width: 0.98rem;
            height: 0.98rem;
            border-radius: 50%;
        }
    }

    // invite
    .invite-wrapper {
        margin: 0.3rem 0.28rem 0;
        background: #fff;
        // overflow: hidden;

        .invite-inner {
            display: flex;
            justify-content: space-between;
            padding: 0.52rem 0.06rem 0.5rem 0.42rem;
            border-radius: 0.15rem;
            background: #f7f7f9;
        }

        .invite-right {
            display: flex;
            flex-direction: column;
        }

        .invite-text p:not(:first-child) {
            margin-top: 0.4rem;
            // margin-top: 0.28rem;
            color: #707070;
        }

        .invite-link-btn {
            margin-top: 0.44rem;
            width: 2.4rem;
            height: 0.56rem;
            line-height: 0.56rem;
        }

        .invite-btn {
            margin-top: 0.25rem;
            // margin-top: 0.6rem;
            /* width: 1.58rem; */
            height: 0.56rem;
            line-height: 0.56rem;
        }
    }

    // common
    .common-wrapper {
        margin: 0.3rem 0.28rem 0;

        .common-btn-list {
            display: flex;
            justify-content: space-between;
            // margin-top: 0.26rem;
            margin-top: 0.4rem;

            // .new {
            //     background: #fefaf2;
            // }

            // .faq {
            //     background: #eff9f7;
            // }

            // .kefu {
            //     background: #f2f6fe;
            // }
        }

        .common-btn-list li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            // width: 2.06rem;
            width: 1.3rem;
            // height: 2.06rem;
            border-radius: 0.04rem;

            .common-btn-icon {
                // width: 0.58rem;
                // height: 0.58rem;
                width: 0.52rem;
                height: 0.52rem;
            }

            &:active {
                opacity: 0.8;
            }
        }

        .common-btn-text {
            margin-top: 0.3rem;
            font-size: 0.24rem;
        }
    }

    // footer
    .me-footer {
        display: flex;
        flex-grow: 1;
        margin: 0.74rem 0.28rem 0.2rem;

        .hb-redeem-btn {
            align-self: flex-end;
        }
    }

    .my-qr-code {
        position: absolute;
        width: 80%;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
    }

    .kefu-modal {
        width: unset;

        /deep/ .hb-modal__body {
            padding: 0.4rem 0.9rem 0.6rem;
        }
    }
}
</style>
