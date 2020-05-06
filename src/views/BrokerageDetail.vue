<template>
    <div class="brokerage-wrapper">
        <header class="brokerage-header">
            <div class="brokerage-header-title fz-28"><span>当前佣金余额</span></div>
            <div class="brokerage-header-detail fz-28">
                <span class="din-font">{{ userBrokerage }}</span>
                元
            </div>
            <div class="brokerage-rule">
                <van-button class="brokerage-rule-btn" color="rgba(255, 255, 255, 0.3)" round @click="viewBrokerageDetail">查看佣金规则</van-button>
            </div>
        </header>

        <section class="brokerage-list">
            <van-list :offset="1" v-model="brokerageLoading" :finished="finished" finished-text="没有更多了" @load="getList">
                <van-cell v-for="brokerage in brokerageHistory" :key="brokerage.id">
                    <!-- 左侧插槽  -->
                    <template slot="title">
                        <p class="brokerage-source fz-28 font-bold">{{ brokerage.title }}</p>
                        <p style="font-size: 0.22rem; color: #a8a8a8;">{{ (brokerage.createdAt * 1000) | formatTime }}</p>
                    </template>

                    <!-- 右侧插槽 -->
                    <div class="brokerage-item-right">
                        <span class="din-font fz-28" :style="brokerage.cms > 0 && { color: '#fb5227' }">
                            <i>{{ brokerage.cms > 0 ? '+' : '-' }}</i>
                            {{ brokerage.cms }}
                        </span>
                        <span class="fz-24">元</span>
                    </div>
                </van-cell>
            </van-list>
        </section>

        <van-button class="bottom-button" block color="linear-gradient(to right, #6552ff, #2c3ffb)" @click="withDraw">佣金提现</van-button>
        <!-- <van-button class="bottom-button" block color="#E0E0E0">提现暂未开放</van-button> -->
    </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import { List, Cell } from 'vant';
import brokerageDetailService from '../service/brokerageDetailService';

Vue.use(List).use(Cell);

export default {
    data() {
        return {
            brokerageLoading: false,
            finished: false,
            brokerageHistory: [],
            userBrokerage: '0.00',
            currentPage: 1,
            pageLimit: 20
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
            if (this.userBrokerage === 0) {
                this.$toast('您没有可以提现的佣金');
                return;
            }

            this.$wmqModal({
                title: '确认提现吗？',
                text: `提现金额：${this.userBrokerage > 200 ? 200 : this.userBrokerage}元`,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '确认提现',
                cancelButtonText: '稍后再说',
                beforeClose: (action, done) => {
                    if (action === 'cancel') {
                        done();
                        return;
                    }

                    brokerageDetailService
                        .withDraw()
                        .then(() => {
                            done();
                            this.$wmqModal({
                                title: '',
                                text: '提现成功，请前往公众号领取',
                                showConfirmButton: true,
                                confirmButtonText: '我知道了'
                            });
                        })
                        .catch(() => {
                            done();
                        });
                }
            });
        },
        async getList() {
            this.brokerageLoading = true;

            let res = await brokerageDetailService.getBrokerage({
                page: this.currentPage,
                limit: this.pageLimit
            });

            this.brokerageLoading = false;

            let list = res.list || [];

            if (list.length < this.pageLimit) {
                this.finished = true;
            } else {
                this.currentPage++;
            }

            this.userBrokerage = res.totalCms;

            this.brokerageHistory = [...this.brokerageHistory, ...list];
        }
    }
};
</script>

<style lang="scss" scoped>
.brokerage-wrapper {
    // position: fixed;
    // width: 100%;
    // display: flex;
    // flex-direction: column;
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
        // margin-top: 2.55rem;
        margin-top: 3.47rem;
        margin-bottom: 0.88rem;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        // flex-grow: 1;
        // margin-top: -0.52rem;
        border-radius: 16px;
        background: #fff;
        overflow-y: scroll;

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

    .bottom-button {
        position: fixed;
        bottom: 0;

        // .van-button__text {
        //     color: #999;
        // }
    }
}
</style>
