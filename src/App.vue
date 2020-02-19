<template>
    <div id="app" ref="appWrapper">
        <router-view />
    </div>
</template>

<script>
import 'reset-css'; // reset-css

export default {};
</script>

<style lang="scss">
@font-face {
    font-family: 'DIN Medium';
    src: url('./assets/font/DIN_Medium.ttf');
}

html,
body,
#app {
    height: 100%;
    // min-height: 100%;
    background: #fff;
}

#app > div {
    // min-height: 100% !important;
    height: 100%;
}

body {
    font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', Arial, sans-serif;
    user-select: none;
    font-size: 0.16rem;
}

.din-font {
    font-family: 'DIN Medium';
}

.font-bold {
    font-weight: bold;
}

/* overWrite vant ui Swipe css */
/* swiper indicator */
#app .van-swipe__indicator {
    width: 0.2rem;
    height: 0.06rem;
    border-radius: 0;
    background: url('./assets/index/swipe-indicator-no@2x.png') no-repeat;
    background-size: contain;
}

#app .van-swipe__indicator--active {
    width: 0.3rem;
    background: url('./assets/index/swipe-indicator-active@2x.png') no-repeat;
    background-size: contain;
}

/* overWrite vant ui Dialog css */
#app .van-dialog {
    border-radius: 0.1rem;
}

/* overWrite vant ui Cell css */
#app .van-cell:not(:last-child)::after {
    right: 0.28rem;
    border-bottom-color: #e6e6e6;
}

/* overWrite vant field required */
.van-cell--required::before {
    content: '';
}

/* common */
.fz-40 {
    font-size: 0.4rem;
}

.fz-36 {
    font-size: 0.36rem;
}

.fz-32 {
    font-size: 0.32rem;
}

.fz-28 {
    font-size: 0.28rem;
}

.fz-24 {
    font-size: 0.24rem;
}

.flex {
    display: flex;
}

.flex-vertical {
    @extend .flex;
    align-items: center;
}

/* modal */
.modal-title {
    font-size: 0.3rem;
    font-weight: bold;
}

a {
    color: #2f5ee3;

    &:visited {
        color: #2f5ee3 !important;
    }
}
</style>
