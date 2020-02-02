<template>
    <div :class="vBem('auto-comment')">
        <header :class="vBem('auto-comment', 'header')">
            <div class="header-text fz-28 font-bold">
                <p>每评价一单送<span class="fz-40" style="color: #FFDA04;">5</span>积分，</p>
                <p style="margin-top: 0.08rem;">评价越多送越多</p>
            </div>
        </header>

        <section :class="vBem('auto-comment', 'body')">
            <swiper :options="swiperOption" ref="commentTemplate" style="height: 100%;">
                <swiper-slide>I'm Slide 1</swiper-slide>
                <swiper-slide>I'm Slide 2</swiper-slide>
                <swiper-slide>I'm Slide 3</swiper-slide>
                <swiper-slide>I'm Slide 4</swiper-slide>
                <swiper-slide>I'm Slide 5</swiper-slide>
                <swiper-slide>I'm Slide 6</swiper-slide>
                <swiper-slide>I'm Slide 7</swiper-slide>
            </swiper>
        </section>

        <footer :class="vBem('auto-comment', 'footer')"></footer>
    </div>
</template>

<script>
import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';

// require styles
import 'swiper/dist/css/swiper.css';

Vue.use(VueAwesomeSwiper);

export default {
    data() {
        let clientWidth = document.documentElement.clientWidth;

        return {
            swiperOption: {
                effect: 'coverflow',
                centeredSlides: true,
                // spaceBetween: '12.8%',
                // spaceBetween: 80,
                spaceBetween: clientWidth <= 750 ? '18%' : 80,
                slidesPerView: 'auto',
                loop: true,
                loopedSlides: 7,
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 300,
                    modifier: 1,
                    slideShadows: false
                }
            }
        };
    }
};
</script>

<style lang="scss" scoped>
.auto-comment {
    @include element('header') {
        width: 100%;
        height: 3.49rem;
        background: url('../assets/autoComment/banner-bg@2x.png') no-repeat;
        background-size: contain;
        overflow: hidden;

        .header-text {
            margin-top: 1rem;
            padding-left: 0.54rem;
            color: #fff;
            // font-style: italic;
            letter-spacing: 1px;
        }
    }

    @include element('body') {
        height: 3rem;

        .swiper-container {
            .swiper-slide {
                // margin-right: 0.24rem;
                width: 6.42rem;
                background: red;
                border-radius: 4px;
                // transition: 300ms;
                // transform: scale(0.8);
            }
        }
    }
}
</style>
