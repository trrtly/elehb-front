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
    top: 0;
    width: 100%;
    background: url('../../assets/me/butten_bg_hongbao@2x.png') no-repeat;
    background-size: cover;
    transition: top 0.2s;

    @include element('text') {
        font-size: 0.36rem;
        color: #ffdc39;
        line-height: 0.93rem;
        text-align: center;
    }

    &:active {
        top: 2px;
        opacity: 0.8;
    }
}
</style>
