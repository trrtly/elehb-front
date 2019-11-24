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
}

.din-font {
    font-family: 'DIN Medium';
}

/* overWrite vant ui css */
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

/* common */
.fz-32 {
    font-size: 0.32rem;
}

.fz-28 {
    font-size: 0.28rem;
}
</style>
