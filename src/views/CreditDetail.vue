<template>
    <div :class="vBem('credit-detail')">
        <header :class="vBem('credit-header')">
            <div class="fz-28" :class="vBem('credit-header', 'title')"><span>当前积分余额</span></div>
            <div class="fz-28" :class="vBem('credit-header', 'detail')">
                <span class="din-font">{{ userInfo.score }}</span>
                点
            </div>
        </header>

        <section :class="vBem('credit-list')">
            <van-list :offset="1" v-model="creditLoading" :finished="finished" finished-text="没有更多了" @load="getList">
                <van-cell v-for="(creditDetail, index) in creditDetailHistory" :key="index">
                    <!-- 左侧插槽  -->
                    <template slot="title">
                        <p class="fz-28 font-bold">{{ creditDetail.title }}</p>
                        <p style="font-size: 0.22rem; color: #a8a8a8;">{{ formateTime(creditDetail.createdAt) }}</p>
                    </template>

                    <!-- 右侧插槽 -->
                    <div :class="vBem('credit-list', 'item', 'right')">
                        <span class="din-font fz-28" :style="creditDetail.score > 0 && { color: '#fb5227' }">
                            <i>{{ creditDetail.score > 0 ? '+' : '-' }}</i>
                            {{ Math.abs(creditDetail.score) }}
                        </span>
                    </div>
                </van-cell>
            </van-list>
        </section>

        <van-button block color="linear-gradient(to right, #6552ff, #2c3ffb)" to="/recharge">充值积分</van-button>
    </div>
</template>

<script>
import Vue from 'vue';
import { List, Cell } from 'vant';
import { mapState } from 'vuex';
import creditDetailService from '@/service/creditDetailService';

Vue.use(List).use(Cell);

export default {
    data() {
        return {
            // myCredit: 1000,

            creditLoading: false,
            finished: false,
            creditDetailHistory: [],

            // 当前页数
            currentPage: 1,
            pageLimit: 5
        };
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        async getList() {
            this.creditLoading = true;
            let res =
                (await creditDetailService.getCreditDetail({
                    page: this.currentPage,
                    limit: this.pageLimit
                })) || [];

            this.creditLoading = false;

            if (res.length < this.pageLimit) {
                this.finished = true;
            } else {
                this.currentPage++;
            }

            this.creditDetailHistory = [...this.creditDetailHistory, ...res];
        }
    }
};
</script>

<style lang="scss" scoped>
.credit-detail {
    display: flex;
    flex-direction: column;
    color: #fff;

    .credit-header {
        min-height: 3.9rem;
        background: url('../assets/friends/bg-color@2x.png') no-repeat;
        background-size: cover;
        text-align: center;
        overflow: hidden;

        @include element('title') {
            margin-top: 0.6rem;
        }

        @include element('detail') {
            margin-top: 0.24rem;

            span {
                font-size: 0.8rem;
                vertical-align: -0.04rem;
            }
        }
    }

    .credit-list {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        margin-top: -1.35rem;
        border-radius: 16px;
        background: #fff;
        overflow-y: scroll;

        .van-list {
            flex-grow: 1;

            .van-cell {
                background: transparent;
            }
        }

        @include element('item') {
            position: relative;

            @include modifier('right') {
                position: absolute;
                right: 0;
                top: 50%;
                transform: translate3d(0, -50%, 0);
            }
        }
    }
}
</style>
