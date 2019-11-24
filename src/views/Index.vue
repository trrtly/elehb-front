<template>
    <div class="index-wrapper">
        <header class="header">
            <div class="header-upper">
                <img class="header-element-logo" src="../assets/index/banner-text@2x.png" alt="ElementLogo" />
                <img class="header-decorate-pic" src="../assets/index/banner-pic@2x.png" alt="Decorate" />
            </div>
            <div class="header-bottom">
                <!-- 轮播 -->
                <van-swipe class="header-swiper" indicator-color="#00000000">
                    <van-swipe-item v-for="(e, i) in images" :key="i" style="background-color: #39a9ed;">{{ i }}</van-swipe-item>
                </van-swipe>
            </div>
        </header>

        <section class="main-section">
            测试内容<br />
            测试内容<br />
            测试内容<br />
            测试内容<br />
            测试内容<br />
            测试内容<br />
            测试内容<br />
            测试内容<br />
            测试内容<br />

            测试内容<br />
            测试内容<br />
            测试内容<br />
            测试内容<br />
            测试内容<br />
            测试内容<br />
            测试内容<br />
            测试内容<br />
            测试内容<br />
        </section>
    </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue';
import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe).use(SwipeItem);

export default {
    name: 'home',
    data() {
        return {
            images: [1, 2, 3, 4]
        };
    },
    methods: {}
};
</script>

<style scoped>
.index-wrapper {
    background-color: #f8f8f8;
}

/* header */
.header {
    overflow: hidden;
}

.header > .header-upper {
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 3.58rem;
    background: url('../assets/index/banner-bg.png');
    background-size: contain;
}

.header-upper > .header-element-logo {
    width: 3.97rem;
    height: 0.57rem;
    margin-top: 0.42rem;
    padding-left: 0.3rem;
}

.header-upper > .header-decorate-pic {
    width: 3.1rem;
    height: 2.55rem;
    margin-top: 0.16rem;
}

.header-bottom {
    position: relative;
    z-index: 2;
    width: 100%;
    margin-top: 1.4rem;
}

.header-bottom > .header-swiper {
    width: 6.94rem;
    height: 3rem;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 0.15rem;
    font-size: 0.4rem;
    line-height: 3rem;
    text-align: center;
}

/* section */
.main-section {
    margin-top: 0.3rem;
    padding: 0 0.28rem;
}
</style>
