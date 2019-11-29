<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import 'reset-css'; // reset-css

export default {};
</script>

<style>
@font-face {
    font-family: 'DIN Medium';
    src: url('./assets/font/DIN_Medium.ttf');
}

html,
body,
#app {
    height: 100%;
}

body {
    font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', Arial, sans-serif;
    user-select: none;
    background-color: #f8f8f8;
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
    background-size: cover;
}

#app .van-swipe__indicator--active {
    width: 0.3rem;
    background: url('./assets/index/swipe-indicator-active@2x.png') no-repeat;
    background-size: cover;
}

/* overWrite vant ui Dialog css */
#app .van-dialog {
    border-radius: 0.1rem;
}

/* common */
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

/* modal */
.modal-title {
    font-size: 0.3rem;
    font-weight: bold;
}
</style>
