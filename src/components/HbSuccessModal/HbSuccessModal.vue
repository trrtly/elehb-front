<template>
    <div :class="bem()">
        <van-overlay :show="innerShow">
            <div :class="bem('content')">
                <section :class="bem('hb-container')">
                    <div :class="bem('hb-wrapper')">
                        <ul
                            :class="bem('hb-list')"
                            @touchstart.stop="touchStartY = $event.touches[0].pageY"
                            @touchmove.stop="scroll($event, $event.currentTarget)"
                        >
                            <li :class="bem('hb-item')" v-for="(hb, index) in 6 /*hbList*/" :key="index">
                                <div :class="bem('hb-item-left')">
                                    <span class="fz-32 font-bold" style="position: relative; top: 0.02rem;">￥</span>
                                    <span class="din-font" style="font-size: 0.5rem;">4</span>
                                </div>
                                <div :class="bem('hb-item-right')">
                                    <p class="fz-32 font-bold" style="color: #393939;">饿了么通用红包</p>
                                    <p class="fz-24" style="margin-top: 0.18rem; color: #666666;">满35可用</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div :class="bem('hb-bottom')">
                        <p class="hb-bottom-desc fz-24">请打开饿了么APP“我的-红包-店铺红包”查看</p>
                        <div class="hb-bottom-button font-bold">
                            <p class="hb-bottom-button__text fz-36" style="margin-top: 0.14rem;">再领一个免费红包</p>
                            <p class="hb-bottom-button__countdown fz-24" style="margin-top: 0.04rem;">
                                (<van-count-down ref="jumpCountDown" :time="5000" format="ss秒" :auto-start="false" />后跳转)
                            </p>
                        </div>
                    </div>
                </section>
                <div :class="bem('hb-footer')">
                    <van-icon name="close" @click="closeModal" />
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
import { Overlay, CountDown, Icon } from 'vant';

export default {
    name: 'hbSuccessModal',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        hbList: {
            type: Array,
            default: () => []
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
        closeModal() {
            this.innerShow = false;
            this.$emit('returnBack', this.innerShowFlag);
        }
    },
    watch: {
        show(v) {
            this.innerShow = v;
        },
        innerShow(v) {
            this.$refs.jumpCountDown[v ? 'start' : 'reset']();

            // 处理QQ浏览器滚动穿透--暂时
            if (v) {
                this.scrollTop = document.body.parentNode.scrollTop || document.body.scrollTop;
                document.body.style.top = `${-this.scrollTop}px`;
            }

            // 处理QQ浏览器滚动穿透--暂时
            document.body.style.position = v ? 'fixed' : 'static';
            document.body.style.overflow = v ? 'hidden' : 'auto';

            // 处理QQ浏览器滚动穿透--暂时
            if (!v) {
                document.body.scrollTop = document.body.parentNode.scrollTop = this.scrollTop;
            }
        }
    },
    components: {
        vanOverlay: Overlay,
        vanCountDown: CountDown,
        vanIcon: Icon
    }
};
</script>

<style lang="scss" scoped>
.hb-success-modal {
    @include element('content') {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    @include element('hb-container') {
        width: 6.12rem;
        height: 8.9rem;
        background: url('./assets/hb-success-bg@2x.png') no-repeat;
        background-size: contain;
    }

    @include element('hb-wrapper') {
        padding-bottom: 0.33rem;
        border-bottom-left-radius: 175px 49px;
        border-bottom-right-radius: 175px 49px;
        overflow: hidden;
    }

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

    @include element('hb-bottom') {
        margin-top: 0.38rem;
        text-align: center;

        .hb-bottom-desc {
            margin-bottom: 0.2rem;
            color: #f8d1bb;
        }

        .hb-bottom-button {
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            margin: 0 auto;
            padding-bottom: 0.2rem;
            width: 5.33rem;
            height: 0.98rem;
            background: url('./assets//button-pop@2x.png') no-repeat;
            background-size: contain;
            color: #6c2701;
            transition: top 0.2s;

            &:active {
                top: 2px;
                opacity: 0.8;
            }

            // overWrite this count down css
            .van-count-down {
                display: inline;
                font-size: 0.24rem;
                color: #6c2701;
            }
        }
    }

    @include element('hb-footer') {
        margin-top: 0.32rem;
        text-align: center;
        color: #fff;
        font-size: 28px;
    }
}
</style>