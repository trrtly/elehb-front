<template>
    <div class="brokerage-wrapper">
        <header class="brokerage-header">
            <div class="brokerage-header-title fz-28"><span>当前佣金余额</span></div>
            <div class="brokerage-header-detail fz-28">
                <span class="din-font">{{ userInfo.cms }}</span>
                元
            </div>
            <div class="brokerage-rule">
                <van-button class="brokerage-rule-btn" color="rgba(255, 255, 255, 0.3)" round @click="viewBrokerageDetail">查看佣金规则</van-button>
            </div>
        </header>

        <section class="brokerage-list">
            <van-list v-model="brokerageLoading" :finished="finished" finished-text="没有更多了">
                <van-cell v-for="(brokerage, index) in 5 /*brokerageHistory*/" :key="index">
                    <!-- 左侧插槽  -->
                    <template slot="title">
                        <p class="brokerage-source fz-28 font-bold">好友充值返佣</p>
                        <p style="font-size: 0.22rem; color: #a8a8a8;">{{ new Date().toLocaleString() /*brokerage.time*/ }}</p>
                    </template>

                    <!-- 右侧插槽 -->
                    <div class="brokerage-item-right">
                        <span class="din-font fz-28" style="color: #fb5227;"><i>+</i>2.00</span><span class="fz-24">元</span>
                    </div>
                </van-cell>
            </van-list>
            <van-button block color="linear-gradient(to right, #6552ff, #2c3ffb)" @click="withDraw">佣金提现</van-button>
        </section>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import { List, Cell } from 'vant';

Vue.use(List).use(Cell);

export default {
    data() {
        return {
            brokerageLoading: false,
            finished: true,
            brokerageHistory: []
        };
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        viewBrokerageDetail() {
            this.$wmqModal({
                closeOnClickOverlay: true,
                title: '佣金及提现规则',
                text: `
                <div style="text-align: left; color: #666666; font-size: 0.3rem; line-height: 0.4rem;">
                    <p>①佣金获得：您使用专属二维码邀请好友，可获得好友每笔充值金额20%的佣金。举例，您邀请了胖虎，胖虎充值10元，你可获得2元佣金（10元*20%）</p>
                    <p style="margin-top: 0.42rem;">②佣金提现：单次提现最低1元，最高200元，每人每日做多可提现3次</p>
                </div>`
            });
        },
        // 提现
        withDraw() {
            this.$wmqModal({
                title: '确认提现吗？',
                text: `提现金额：${200}元`,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '确认提现',
                cancelButtonText: '稍后再说',
                beforeClose: (action, done) => {
                    setTimeout(() => {
                        this.$toast('提现成功');
                        done();
                    }, 500);
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.brokerage-wrapper {
    display: flex;
    flex-direction: column;
    color: #fff;

    .brokerage-header {
        min-height: 3.9rem;
        background: url('../assets/friends/bg-color@2x.png') no-repeat;
        background-size: cover;
        text-align: center;
        overflow: hidden;

        .brokerage-header-title {
            margin-top: 0.6rem;
        }

        .brokerage-header-detail {
            margin-top: 0.24rem;

            span {
                font-size: 0.8rem;
                vertical-align: -0.04rem;
            }
        }

        .brokerage-rule {
            margin-top: 0.44rem;

            .brokerage-rule-btn {
                width: 2.5rem;
                height: 0.56rem;
                line-height: 0.5rem;
                border: 0;
            }
        }
    }

    // brokerageList
    .brokerage-list {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        margin-top: -0.52rem;
        border-radius: 16px;
        background: #fff;

        .van-list {
            flex-grow: 1;

            .van-cell {
                background: transparent;
            }
        }

        .brokerage-item-right {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate3d(0, -50%, 0);
        }
    }
}
</style>
