<template>
    <div class="redeem-hb-btn">
        <div class="redeem-hb-btn-text font-bold" v-route-jump="'/'">我要兑换红包</div>
    </div>
</template>

<script>
export default {
    name: 'RedeemBtn'
};
</script>

<style lang="scss" scoped>
.redeem-hb-btn {
    width: 100%;
    height: 0.93rem;
    background: url('../../assets/me/butten_bg_hongbao@2x.png') no-repeat;
    background-size: contain;

    .redeem-hb-btn-text {
        font-size: 0.36rem;
        color: #ffdc39;
        line-height: 0.93rem;
        text-align: center;
    }

    &:active {
        opacity: 0.8;
    }
}
</style>
