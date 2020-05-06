<template>
    <hb-success-modal :show.sync="innerShow" :main-title="mainTitle" :title="title" bottom-desc="请前往“个人中心-我的佣金-提现”">
        <template slot="mainBody">
            <ul
                :class="bem('hb-list')"
                @touchstart.stop="touchStartY = $event.touches[0].pageY"
                @touchmove.stop="scroll($event, $event.currentTarget)"
            >
                <li :class="bem('hb-item')" v-for="(hb, index) in cashHbList" :key="index">
                    <div :class="bem('hb-item-left')">
                        <span class="fz-32 font-bold" style="position: relative; top: 0.02rem;">￥</span>
                        <span class="din-font" style="font-size: 0.5rem;">{{ hb.amount }}</span>
                    </div>
                    <div :class="bem('hb-item-right')">
                        <p class="fz-32 font-bold" style="color: #393939;">{{ hb.title }}</p>
                        <p class="fz-24" style="margin-top: 0.18rem; color: #666666;">可提现佣金</p>
                    </div>
                </li>
            </ul>
        </template>

        <div slot="bottomButton" v-route-jump="'/brokerage'">
            <p class="hb-bottom-button__text fz-36" style="margin-top: 0.14rem;">去提现</p>
        </div>
    </hb-success-modal>
</template>

<script>
import hbSuccessModal from '../HbSuccessModal/HbSuccessModal';

export default {
    name: 'CashHbListModal',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: String,
        mainTitle: String,
        cashHbList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            scrollTop: 0, // 记录当前页面scrollTop
            touchStartY: 0,
            innerShow: this.show
        };
    },
    methods: {
        // 处理滑动影响popup外层页面问题
        scroll(e, { scrollTop, scrollHeight }) {
            // > 0 向下， < 0 向上
            const targetHeight = e.currentTarget.offsetHeight;
            const touchY = e.changedTouches[0].pageY - this.touchStartY;
            if (
                e.cancelable &&
                ((touchY > 0 && scrollTop === 0) || (touchY < 0 && Math.ceil(targetHeight + scrollTop + 2) >= Math.ceil(scrollHeight)))
            ) {
                e.preventDefault();
            }
        }
    },
    watch: {
        show(v) {
            this.innerShow = v;
        },
        innerShow(v) {
            if (v === false) {
                this.$emit('update:show', false);
            }
        }
    },
    components: {
        hbSuccessModal
    }
};
</script>

<style lang="scss" scoped>
.cash-hb-list-modal {
    @include element('hb-list') {
        // margin-top: 2.1rem;
        padding: 0.2rem 0.2rem 0;
        min-height: 4.14rem;
        max-height: 4.14rem;
        overflow-y: scroll;
        -webkit-overflow-scrolling: auto;
        touch-action: pan-y;
    }

    @include element('hb-item') {
        display: flex;
        padding: 0.29rem 0.38rem;
        width: 100%;
        height: 1.28rem;
        background: #fdebd3;
        border-radius: 8px;
        box-shadow: 0px 0px 2px 2px #efefef2e;
        box-sizing: border-box;

        &:not(:first-child) {
            margin-top: 0.14rem;
        }
    }

    @include element('hb-item-left') {
        display: flex;
        align-items: center;
        color: #e72a29;
    }

    @include element('hb-item-right') {
        margin-left: 0.38rem;
    }
}
</style>
