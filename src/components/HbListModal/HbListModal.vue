<template>
    <hb-success-modal main-title="成功领取红包">
        <template slot="mainBody">
            <ul
                :class="bem('hb-list')"
                @touchstart.stop="touchStartY = $event.touches[0].pageY"
                @touchmove.stop="scroll($event, $event.currentTarget)"
            >
                <li :class="bem('hb-item')" v-for="(hb, index) in hbList" :key="index">
                    <div :class="bem('hb-item-left')">
                        <span class="fz-32 font-bold" style="position: relative; top: 0.02rem;">￥</span>
                        <span class="din-font" style="font-size: 0.5rem;">{{ hb.amount | numFilter }}</span>
                    </div>
                    <div :class="bem('hb-item-right')">
                        <p class="fz-32 font-bold" style="color: #393939;">{{ hb.title }}</p>
                        <p class="fz-24" style="margin-top: 0.18rem; color: #666666;">满{{ hb.threshold | numFilter }}可用</p>
                    </div>
                </li>
            </ul>
        </template>

        <div slot="bottomButton" @click="jumpToUrl">
            <p class="hb-bottom-button__text fz-36" style="margin-top: 0.14rem;">再领一个免费红包</p>
            <p class="hb-bottom-button__countdown fz-24" style="margin-top: 0.04rem;">
                (<van-count-down ref="jumpCountDown" :time="5000" format="ss秒" :auto-start="false" @finish="jumpToUrl" />后跳转)
            </p>
        </div>
    </hb-success-modal>
</template>

<script>
import hbSuccessModal from '../HbSuccessModal/HbSuccessModal';
import { CountDown } from 'vant';

export default {
    name: 'hbListModal',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: String,
        hbList: {
            type: Array,
            default: () => []
        },
        jumpUrl: {
            type: String,
            default: ''
        }
    },
    model: {
        prop: 'show',
        event: 'returnBack'
    },
    data() {
        return {
            scrollTop: 0, // 记录当前页面scrollTop
            touchStartY: 0,
            innerShow: this.show,

            hbArr: []
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
        },
        jumpToUrl() {
            this.jumpUrl && (location.href = this.jumpUrl);
            this.innerShow = false;
        }
    },
    filters: {
        numFilter(num) {
            return parseFloat(num).toFixed(0);
        }
    },
    components: {
        vanCountDown: CountDown,
        hbSuccessModal
    }
};
</script>

<style lang="scss" scoped>
.hb-success-modal {
    @include element('hb-list') {
        margin-top: 2.1rem;
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
