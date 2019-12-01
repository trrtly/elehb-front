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
    position: relative;
    top: 0;
    width: 100%;
    background: url('../../assets/me/butten_bg_hongbao@2x.png') no-repeat;
    background-size: cover;
    transition: top 0.1s;

    .redeem-hb-btn-text {
        font-size: 0.36rem;
        color: #ffdc39;
        line-height: 0.93rem;
        text-align: center;
    }

    &:active {
        top: 0.03rem;
        opacity: 0.8;
    }
}
</style>
