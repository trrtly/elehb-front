<template>
    <div class="recharge-wrapper">
        <header class="recharge-header">
            <div class="my-credit">
                <img class="my-credit-icon" src="../assets/recharge/icon-jifen@2x.png" alt="credit" />
                <span class="my-current-credit fz-28">
                    当前积分:
                    <span class="din-font">{{ userInfo.score | currencyFormat }}</span>
                </span>
            </div>
            <ul class="credit-selection-list">
                <li
                    class="credit-selection"
                    :class="{ active: isCreditSelected(item.id) }"
                    v-for="item in creditSelection"
                    :key="item.id"
                    @click="toRecharge(item.id)"
                >
                    <p class="credit-text fz-28">
                        <span class="din-font fz-36">{{ item.score }}</span>
                        积分
                    </p>
                    <p class="credit-price fz-24">售价: {{ item.amount }}元</p>
                    <div v-if="item.tag" class="credit-recommended">{{ item.tag }}</div>
                </li>
            </ul>
        </header>

        <section class="credit-desc-wrapper">
            <table class="desc-table">
                <thead>
                    <tr>
                        <th></th>
                        <th class="recommend-th" style="color: #2f5ee3;">
                            推荐充值档
                            <img class="recommended-logo" src="../assets/recharge/icon-victory@2x.png" alt="recommendedLogo" />
                        </th>
                        <th style="color: #545454;">饿了么会员</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>价格</td>
                        <td>8元</td>
                        <td>10元</td>
                    </tr>
                    <tr>
                        <td>详情</td>
                        <td>66积分可兑换22次，相当于能领3~5元红包22个</td>
                        <td>可领5元红包8次(免费4次+奖励金兑换4次)</td>
                    </tr>
                    <tr>
                        <td>节省</td>
                        <td>共约节省<span class="din-font font-bold" style="color: #2f5ee3;">66~110</span>元</td>
                        <td>共约节省40元</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section class="extra-desc-wrapper">
            <p>充值说明</p>
            <p>
                1、为避免公众号失联，请加客服微信：<a class="wechat-link" @click.prevent="$store.commit('changeKefuShow', true)">外卖券小姐姐</a
                >，以防失联
            </p>
            <p>2、积分可用于本平台现有和未来的各种服务，充值金额不可退款</p>
        </section>

        <div class="recharge-footer">
            <redeem-btn />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import RedeemBtn from '../components/RedeemBtn/RedeemBtn';
import rechargeService from '@/service/rechargeService';

export default {
    async created() {
        const list = await rechargeService.getRechargeList();
        this.creditSelection = list;
    },
    data() {
        return {
            credit: 1000,
            creditSelection: [],
            currentSelection: '' // 默认无选中
        };
    },
    computed: {
        ...mapState(['userInfo']),
        isCreditSelected() {
            return (id) => this.currentSelection === id;
        },
        kefuShow: {
            get() {
                return this.$store.state.kefuShow;
            },
            set(val) {
                this.$store.state.kefuShow = val;
            }
        }
    },
    methods: {
        onBridgeReady(res) {
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                {
                    "appId": res.appId,
                    "timeStamp": res.timeStamp,
                    "nonceStr": res.nonceStr,
                    "package": res.package,
                    "signType": res.signType,
                    "paySign": res.paySign
                },
                function (res) {
                    if (res.err_msg == 'get_brand_wcpay_request:ok') {
                        WeixinJSBridge.call('closeWindow');
                        this.$wmqModal({
                            title: '支付成功',
                            text: '积分充值已完成，赶快去领取红包吧！',
                            showConfirmButton: true,
                            confirmButtonText: '立即领取',
                            confirm: () => {
                                this.$router.push('/');
                            }
                        });
                    } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                        alert('支付取消');
                    } else if (res.err_msg == 'get_brand_wcpay_request:fail') {
                        alert('支付失败');
                    }
                }
            );
        },
        async toRecharge(id) {
            this.currentSelection = id;

            this.$toast.allowMultiple();

            let successToast = this.$toast({
                message: '支付中，请稍后...',
                duration: 0
            });

            try {
                let res = await rechargeService.createOrder({
                    id: id
                });
                if (typeof WeixinJSBridge == 'undefined') {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(res), false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(res));
                        document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(res));
                    }
                } else {
                    this.onBridgeReady(res);
                }
            } catch (err) {
                const errCode = err.code;

                // 积分不足弹框
                if (errCode === 1006) {
                    this.creditModalType = 1;
                    this.showTaskCenter = true;
                }

                successToast && successToast.clear();
            }
        }
    },
    components: {
        RedeemBtn
    }
};
</script>

<style lang="scss" scoped>
.recharge-wrapper {
    display: flex;
    flex-direction: column;
    $commonShadow: 1px 1px 5px 1px #efefef;
    background: #f1f6f9;

    // header
    .recharge-header {
        padding: 0.4rem 0.28rem 0;
        background: url('../assets/recharge/chongzhi-bg@2x.png') no-repeat;
        background-size: contain;
        color: #fff;

        .my-credit-icon {
            width: 0.34rem;
            height: 0.32rem;
            vertical-align: middle;
        }

        .my-current-credit {
            display: inline-block;
            margin-left: 0.14rem;
            vertical-align: middle;
        }

        .credit-selection-list {
            display: flex;
            flex-wrap: wrap;
            margin-top: 0.28rem;
            padding: 0.3rem;
            overflow: hidden;
            background: #fff;
            border-radius: 10px 10px 5px 5px;
            box-shadow: $commonShadow;

            .credit-selection {
                position: relative;
                margin-top: 0.3rem;
                width: 3.02rem;
                height: 1.47rem;
                border: 1px solid #2f5ee3;
                border-radius: 5px;
                box-sizing: border-box;

                // credit被选中
                &.active {
                    background: #eaeffc;

                    p {
                        color: #2f5ee3;
                    }
                }

                &:nth-child(odd) {
                    margin-right: 0.3rem;
                }

                &:nth-child(1),
                &:nth-child(2) {
                    margin-top: 0;
                }

                .credit-text {
                    margin-top: 0.4rem;
                    color: #545454;
                }

                .credit-price {
                    margin-top: 0.2rem;
                    color: #707070;
                }

                .credit-recommended {
                    position: absolute;
                    top: 0.1rem;
                    right: 0.1rem;
                    width: 0.76rem;
                    height: 0.32rem;
                    line-height: 0.32rem;
                    text-align: center;
                    background: url('../assets/recharge/icon-bg-tuijian@2x.png') no-repeat;
                    background-size: contain;
                }
            }

            li p {
                text-align: center;
            }
        }
    }

    // credit detail description
    .credit-desc-wrapper {
        margin: 0.3rem 0.28rem;
        padding: 0.31rem;
        color: #000;
        border-radius: 4px;
        background: #fff;
        box-shadow: $commonShadow;

        %bordered {
            border: 1px solid #ccc;
            border-collapse: collapse;
        }

        .desc-table {
            @extend %bordered;
            width: 100%;

            th,
            td {
                @extend %bordered;
                padding: 0.2rem;
                box-sizing: border-box;
                vertical-align: middle;
            }

            th {
                text-align: left;
                padding-left: 0.2rem;
                font-size: 0.28rem;
                font-weight: bold;
            }

            td {
                font-size: 0.24rem;
                line-height: 0.28rem;
            }

            tr td:first-child {
                width: 0.8rem;
                padding: 0.2rem 0;
                text-align: center;
                color: #999999;
            }

            .recommend-th {
                position: relative;

                .recommended-logo {
                    position: absolute;
                    top: -0.1rem;
                    right: 0.5rem;
                    width: 0.9rem;
                }
            }
        }
    }

    // extra description
    .extra-desc-wrapper {
        margin: 0.3rem 0.28rem 0;
        line-height: 0.3rem;
        font-size: 0.24rem;
        color: #707070;

        .wechat-link {
            text-decoration: underline;
        }
    }

    // footer
    .recharge-footer {
        display: flex;
        flex-grow: 1;
        margin: 0.6rem 0.28rem;

        .hb-redeem-btn {
            align-self: flex-end;
        }
    }
}
</style>
