<template>
    <div class="credit-modal-wrapper">
        <van-overlay :show="show">
            <div class="credit-container">
                <div class="credit-head">
                    <p class="head-text font-bold">您的积分不足</p>
                    <p class="head-desc">可以尝试以下方式获取积分</p>
                </div>
                <ul class="credit-body">
                    <li class="credit-item">
                        <div>
                            <img src="./assets/icon-sign@2x.png" />
                            <div class="item-body">
                                <p class="item-body-title">每日签到</p>
                                <p class="item-body-desc">可随机获得<span style="color: #2F5EE3;">1~3</span>积分</p>
                            </div>
                        </div>
                        <van-button round color="linear-gradient(to right, #ff8b56, #fb5d37)" @click="signIn">去签到</van-button>
                    </li>
                    <li class="credit-item">
                        <div>
                            <img src="./assets/icon-invite@2x.png" />
                            <div class="item-body">
                                <p class="item-body-title">邀请小伙伴</p>
                                <p class="item-body-desc">
                                    邀请可成功获得<span style="color: #2F5EE3;">{{ platformInfo.inviteScore }}</span
                                    >积分/人
                                </p>
                            </div>
                        </div>
                        <van-button round color="linear-gradient(to right, #ff8b56, #fb5d37)" @click="openMyQRCode">去邀请</van-button>
                    </li>
                    <li class="credit-item">
                        <div>
                            <img src="./assets/icon-charge@2x.png" />
                            <div class="item-body">
                                <p class="item-body-title">充值换积分</p>
                                <p class="item-body-desc">不定期充值优惠等着你</p>
                            </div>
                        </div>
                        <van-button round color="linear-gradient(to right, #ff8b56, #fb5d37)" v-route-jump="'/recharge'">去充值</van-button>
                    </li>
                </ul>
            </div>
            <div class="credit-footer">
                <van-icon name="close" @click="closeModal" />
            </div>
        </van-overlay>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Overlay, Icon, Button } from 'vant';
import commonService from '../../service/commonService';

export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState(['platformInfo'])
    },
    methods: {
        ...mapActions(['openMyQRCode']),
        closeModal() {
            this.$emit('update:show', false);
        },
        signIn() {
            commonService.sign();
        }
    },
    components: {
        vanOverlay: Overlay,
        vanIcon: Icon,
        vanButton: Button
    }
};
</script>

<style lang="scss" scoped>
/deep/ .van-overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.credit-container {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 6.6rem;
    height: 7.3rem;
    background: url('./assets/bg-1@2x.png') no-repeat;
    background-size: contain;

    @at-root .credit-head {
        margin-left: 2.8rem;
        height: 2.3rem;
        overflow: hidden;
    }

    @at-root .head-text {
        margin-top: 0.48rem;
        margin-bottom: 0.2rem;
        font-size: 0.44rem;
        color: #fff;
    }

    @at-root .head-desc {
        font-size: 0.28rem;
        color: #fff;
    }

    @at-root .credit-body {
        flex: 1;
        // margin-top: 0.44rem;
        padding: 0 0.3rem;
    }

    @at-root .credit-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.35rem 0;

        &:not(:last-child) {
            border-bottom: 1px dashed #e6e6e6;
        }

        /deep/ .van-button {
            height: 0.52rem;
            line-height: 0.52rem;
        }

        img {
            margin-right: 0.3rem;
            width: 0.8rem;
            height: 0.8rem;
        }

        .item-body {
            display: inline-block;

            &-title {
                margin-bottom: 0.18rem;
                color: #3b3b3b;
                font-size: 0.32rem;
                font-weight: bold;
            }

            &-desc {
                color: #999;
                font-size: 0.28rem;
            }
        }
    }
}

.credit-footer {
    margin-top: 0.32rem;
    text-align: center;
    color: #fff;
    font-size: 28px;
}
</style>
