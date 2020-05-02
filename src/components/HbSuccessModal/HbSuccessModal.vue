<template>
    <div :class="bem()">
        <van-overlay :show="innerShow">
            <div :class="bem('content')">
                <section :class="bem('hb-container')">
                    <div class="font-bold" :class="bem('hb-maintitle')">{{ mainTitle }}</div>
                    <div :class="bem('hb-title')">{{ title }}</div>

                    <div :class="bem('hb-wrapper')">
                        <slot name="mainBody"></slot>
                    </div>
                    <div :class="bem('hb-bottom')">
                        <p class="hb-bottom-desc fz-24">{{ bottomDesc }}</p>
                        <div class="hb-bottom-button">
                            <slot name="bottomButton"></slot>
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
import { Overlay, Icon } from 'vant';

export default {
    name: 'hbSuccessModal',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: String,
        mainTitle: String,
        bottomDesc: String
    },
    model: {
        prop: 'show',
        event: 'returnBack'
    },
    data() {
        return {
            innerShow: this.show
        };
    },
    methods: {
        closeModal() {
            this.$refs.jumpCountDown.reset();
            this.innerShow = false;
            this.$emit('returnBack', this.innerShow);
        }
    },
    watch: {
        show(v) {
            this.innerShow = v;

            if (v === false) {
                this.$emit('close');
            }
        },
        innerShow(v) {
            // 处理QQ浏览器滚动穿透--暂时
            if (v) {
                this.scrollTop = document.body.parentNode.scrollTop || document.body.scrollTop;
                document.body.style.top = `${-this.scrollTop}px`;
            }

            // 处理QQ浏览器滚动穿透--暂时
            document.body.style.position = v ? 'fixed' : 'static';
            document.body.style.overflow = v ? 'hidden' : 'auto';
            document.body.style.width = v ? '100%' : '';

            // 处理QQ浏览器滚动穿透--暂时
            if (!v) {
                document.body.scrollTop = document.body.parentNode.scrollTop = this.scrollTop;
            }
        }
    },
    components: {
        vanOverlay: Overlay,
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
        position: relative;
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

    @include element('hb-maintitle') {
        position: absolute;
        left: 50%;
        top: 1.1rem;
        transform: translate3d(-50%, 0, 0);
        font-size: 0.52rem;
        color: #fff;
    }

    @include element('hb-title') {
        position: absolute;
        left: 50%;
        top: 1.1rem;
        transform: translate3d(-50%, 0, 0);
        font-size: 0.28rem;
        color: #f6ceb9;
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
