<template>
    <div :class="bem()">
        <div class="font-bold" :class="bem('text')" v-route-jump="'/'">我要兑换红包</div>
    </div>
</template>

<script>
export default {
    name: 'hbRedeemBtn'
};
</script>

<style lang="scss" scoped>
.hb-redeem-btn {
    position: relative;
    width: 100%;
    background: url('../../assets/me/butten_bg_hongbao@2x.png') no-repeat;
    background-size: cover;
    transition: transform 0.2s;

    @include element('text') {
        font-size: 0.36rem;
        // color: #ffdc39;
        color: #fff;
        line-height: 0.93rem;
        text-align: center;
    }

    &:active {
        transform: translate3d(0, 2px, 0);
        opacity: 0.8;
    }
}
</style>
