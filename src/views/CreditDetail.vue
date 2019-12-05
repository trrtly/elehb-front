<template>
    <div :class="vBem('credit-detail')">
        <header :class="vBem('credit-header')">
            <div class="fz-28" :class="vBem('credit-header', 'title')"><span>当前积分余额</span></div>
            <div class="fz-28" :class="vBem('credit-header', 'detail')">
                <span class="din-font">{{ myCredit }}</span>
                点
            </div>
        </header>
        <section :class="vBem('credit-list')">
            <van-list v-model="creditLoading" :finished="finished" finished-text="没有更多了">
                <van-cell v-for="(creditDetail, index) in 5 /*brokerageHistory*/" :key="index">
                    <!-- 左侧插槽  -->
                    <template slot="title">
                        <p class="fz-28 font-bold">兑换饿了么红包</p>
                        <p style="font-size: 0.22rem; color: #a8a8a8;">{{ new Date().toLocaleString() /*brokerage.time*/ }}</p>
                    </template>

                    <!-- 右侧插槽 -->
                    <div :class="vBem('credit-list', 'item', 'right')">
                        <span class="din-font fz-28" style="color: #fb5227;"><i>+</i>200</span>
                    </div>
                </van-cell>
            </van-list>
            <van-button block color="linear-gradient(to right, #6552ff, #2c3ffb)" to="/recharge">充值积分</van-button>
        </section>
    </div>
</template>

<script>
import Vue from 'vue';
import { List, Cell } from 'vant';

Vue.use(List).use(Cell);

export default {
    data() {
        return {
            myCredit: 1000,

            creditLoading: false,
            finished: true,
            creditDetailHistory: []
        };
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
