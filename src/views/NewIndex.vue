<template>
    <div class="home-wrapper">
        <div class="swiper-wrapper">
            <van-swipe class="header-swiper" :autoplay="3000" indicator-color="#00000000">
                <template v-if="swipeImages.length > 0">
                    <van-swipe-item v-for="e in swipeImages" :key="e.id">
                        <a :href="e.url"><img style="width: 100%;" :src="e.img" alt="i"/></a>
                    </van-swipe-item>
                </template>

                <template v-else>
                    <van-swipe-item style="background-color: #39a9ed;">暂无内容</van-swipe-item>
                </template>
            </van-swipe>
        </div>
        <div class="home-body">
            <div class="list-section">
                <van-tabs swipe-threshold="2" animated>
                    <van-tab>
                        <template slot="title">
                            <div class="list-tab-item">
                                <img class="tab-icon" src="../assets/me/icon_new@2x.png" alt="tab-icon" />
                                <span>饿了么</span>
                            </div>
                        </template>

                        <index-list />
                    </van-tab>
                    <van-tab>
                        <template slot="title">
                            <div class="list-tab-item">
                                <img class="tab-icon" src="../assets/me/icon_new@2x.png" alt="tab-icon" />
                                <span>饿了么2222</span>
                            </div>
                        </template>

                        <index-list />
                    </van-tab>
                    <van-tab>
                        <template slot="title">
                            <div class="list-tab-item">
                                <img class="tab-icon" src="../assets/me/icon_new@2x.png" alt="tab-icon" />
                                <span>饿了么333333333</span>
                            </div>
                        </template>

                        <index-list />
                    </van-tab>

                    <!-- 占位 -->
                    <van-tab />
                </van-tabs>
            </div>

            <div class="additon-desc-section">
                <h2 class="case-title fz-32 font-bold">领红包点外卖得返利</h2>
                <ul class="show-case-list">
                    <li>
                        <img class="case-logo" src="../assets/index/icon_shouquan@2x.png" alt="shou-quan" />
                        <p>每日领红包</p>
                    </li>
                    <li><img class="progress-line" src="../assets/index/icon_guocheng@2x.png" /></li>
                    <li>
                        <img class="case-logo" src="../assets/index/icon_search@2x.png" alt="shou-quan" />
                        <p>点外卖使用</p>
                    </li>
                    <li><img class="progress-line" src="../assets/index/icon_guocheng@2x.png" /></li>
                    <li>
                        <img class="case-logo" src="../assets/index/icon_jifen.png" alt="shou-quan" />
                        <p>坐等返利</p>
                    </li>
                </ul>
            </div>

            <div class="desc-section">
                <h3>注意事项</h3>
                <p>1、注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项</p>
                <p>2、注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项</p>
                <p>3、注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项</p>
                <p>4、注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项</p>
            </div>
        </div>
    </div>
</template>

<script>
import { Tabs, Tab } from 'vant';
import IndexList from '@/components/IndexList';
import { ref } from '@vue/composition-api';

function useSwiper() {
    const swipeImages = ref([
        { img: '//qddgo.oss-cn-hangzhou.aliyuncs.com/posters/8203374e-c9f1-4db2-9c78-a99f5170f25c.jpg' },
        { img: '//qddgo.oss-cn-hangzhou.aliyuncs.com/posters/8203374e-c9f1-4db2-9c78-a99f5170f25c.jpg' }
    ]);

    return { swipeImages };
}

export default {
    setup() {
        return {
            ...useSwiper()
        };
    },
    components: {
        [Tabs.name]: Tabs,
        [Tab.name]: Tab,
        IndexList
    }
};
</script>

<style lang="scss" scoped>
.home-wrapper {
    display: flex;
    height: 100%;
    flex-direction: column;
    background-color: #fefefe;
}

.header-swiper {
    height: 240px;
}

.home-body {
    flex: 1;
    margin-top: -20px;
    margin-bottom: 100px;
    z-index: 99;
}

.list-section {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 0 8px #aaaaaa61;

    .van-tabs /deep/ .van-tabs__line {
        display: none;
    }

    /deep/ .van-tabs__content {
        margin-bottom: 40px;
    }

    /deep/ .van-tabs__nav {
        margin: 40px 0;
        padding-bottom: 0;
        background-color: transparent;
    }

    /deep/ .van-tabs__wrap {
        height: auto;
    }

    /deep/ .van-tab {
        padding: 16px 35px;
        border-radius: 50px;
        background-color: #f0f0f0;
        white-space: nowrap;

        &--active {
            background-color: #3944fc;
            color: #fff;
        }

        &:not(:last-of-type) {
            margin-right: 40px;
        }

        &:first-of-type {
            margin-left: 28px;
        }

        &:nth-last-child(3) {
            margin-right: 0;
        }

        &:nth-last-child(2) {
            padding: 28px;
            width: 0;
            height: 0;
            background-color: transparent;
            pointer-events: none;
        }

        .list-tab-item {
            display: flex;
            align-items: center;
        }

        .tab-icon {
            margin-right: 14px;
            width: 33px;
            height: 33px;
        }
    }
}

.additon-desc-section {
    margin-top: 40px;
    padding: 0 28px;
}

.desc-section {
    margin-top: 40px;
    padding: 0 28px;
}

.additon-desc-section {
    text-align: center;
    color: #3d3d3d;

    .case-title {
        margin-bottom: 30px;
    }

    .show-case-list {
        display: flex;
        align-items: center;
        justify-content: center;

        .case-logo {
            margin-bottom: 18px;
            width: 108px;
            height: 108px;
        }

        .progress-line {
            width: 52px;
            margin: 0 42px;
            vertical-align: 32px;
            object-fit: contain;
        }
    }
}

.desc-section {
    margin-bottom: 30px;
    color: #858585;
    line-height: 40px;
}
</style>
