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
body {
    font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', Arial, sans-serif;
}

/* overWrite vant ui css */
/* swiper indicator */
#app .van-swipe__indicator {
    width: 0.2rem;
    height: 0.06rem;
    border-radius: 0;
    background: url('./assets/index/swipe-indicator-no@2x.png');
    background-size: contain;
}

#app .van-swipe__indicator--active {
    width: 0.3rem;
    background: url('./assets/index/swipe-indicator-active@2x.png');
    background-size: contain;
}
</style>
