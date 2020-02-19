<template>
    <div :class="vBem('auto-comment')">
        <header :class="vBem('auto-comment', 'header')">
            <div class="header-text fz-28">
                <div class="header-text-top font-bold">
                    <p>每评价一单送<span class="fz-40" style="color: #FFDA04;">5</span>积分，</p>
                    <p style="margin-top: 0.08rem;">评价越多送越多</p>
                </div>
                <div class="header-text-bottom">
                    <p>请选择以下评价模板</p>
                </div>
            </div>
        </header>

        <section :class="vBem('auto-comment', 'body')">
            <swiper v-once :options="swiperOption" ref="commentTemplate" @slideChangeTransitionEnd="transitionEnd">
                <swiper-slide v-for="(template, index) in commentTemplates" :key="index">
                    <section class="comment-template">
                        <div class="template-head fz-40">
                            {{ template.title }}
                            <span class="template-select-icon" />
                        </div>
                        <div class="template-body fz-28">{{ template.text }}</div>
                    </section>
                </swiper-slide>
            </swiper>

            <div :class="vBem('auto-comment-form')">
                <div class="privacy-check fz-28">
                    <van-checkbox v-model="privacyChecked">
                        <img
                            slot="icon"
                            slot-scope="props"
                            :src="props.checked ? activeIcon : inactiveIcon"
                            style="width: 0.28rem; border-radius: 50%; box-sizing: border-box;"
                        />
                        我已阅读并同意<a href="//v.xiumi.us/board/v5/2XWpR/190719124" @click.stop>《隐私条款》</a>即表示同意授权本平台
                    </van-checkbox>
                </div>

                <div class="phone-form">
                    <div>
                        <van-field
                            class="phone-input van-hairline--surround"
                            type="number"
                            required
                            clearable
                            v-model="phoneNum"
                            maxlength="11"
                            placeholder="请输入饿了么账号（手机号）"
                            @input="phoneValid = isPhoneNum(phoneNum)"
                            :error-message="phoneErrMsg"
                        />
                    </div>

                    <div>
                        <van-field
                            class="valida-code-input van-hairline--surround"
                            type="number"
                            required
                            clearable
                            v-model="validaCode"
                            placeholder="短信验证码"
                        >
                            <van-button
                                v-if="!isGetingCode"
                                style="height: 0.4rem; line-height: 0.4rem;"
                                slot="button"
                                size="small"
                                type="info"
                                color="#2c3ffb"
                                round
                                plain
                                hairline
                                @click="getValidationCode"
                            >
                                获取验证码
                            </van-button>
                            <van-count-down
                                v-else
                                slot="button"
                                ref="textCountDown"
                                :time="30000"
                                format="ss s"
                                :auto-start="false"
                                @finish="isGetingCode = false"
                            />
                        </van-field>
                    </div>

                    <van-button class="phone-form-submit fz-32" block color="linear-gradient(to right, #6552ff, #2c3ffb)" @click="submitComment">
                        授权评价（送5积分/单）
                    </van-button>
                </div>
            </div>
        </section>

        <footer :class="vBem('auto-comment', 'footer')">
            <ul :class="vBem('auto-comment-footer', 'stepper')" class="fz-24">
                <li class="stepper-icon">
                    <img src="../assets/autoComment/icon_shouquan@2x.png" />
                    <p class="stepper-text">选择模板并授权</p>
                </li>
                <li class="stepper-more-icon"><img src="../assets/autoComment/icon_more1@2x.png" /></li>
                <li class="stepper-icon">
                    <img src="../assets/autoComment/icon_search@2x.png" />
                    <p class="stepper-text">查询可评价订单</p>
                </li>
                <li class="stepper-more-icon"><img src="../assets/autoComment/icon_more1@2x.png" /></li>
                <li class="stepper-icon">
                    <img src="../assets/autoComment/icon_jifen@2x.png" />
                    <p class="stepper-text">评价完成并送积分</p>
                </li>
            </ul>

            <div :class="vBem('auto-comment-footer', 'notice')" class="fz-24">
                <p>用户须知：</p>
                <p>1、每成功评价一个订单，则立即送相应积分</p>
                <p>2、建议开启授权免登录，可一键评价，操作更便捷（在“个人中心-系统设置”中开启）</p>
                <p>3、系统会根据您选择的模板内容完成订单评价</p>
            </div>
        </footer>
    </div>
</template>

<script>
import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import activeIcon from '../assets/autoComment/checked@2x.png';
import inactiveIcon from '../assets/autoComment/uncheck@2x.png';

// require styles
import 'swiper/dist/css/swiper.css';

Vue.use(VueAwesomeSwiper);

export default {
    data() {
        let fontSize = parseFloat(document.documentElement.style.fontSize);

        return {
            swiperOption: {
                centeredSlides: true,
                spaceBetween: Math.floor((24 * fontSize) / 100),
                slidesPerView: 'auto',
                loop: true,
                loopedSlides: 9
            },

            commentTemplates: [
                {
                    title: '模板',
                    text: '上行下效嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻撒旦阿斯顿阿三大苏打阿萨大厦大厦大苏打阿萨大厦阿萨阿萨'
                },
                {
                    title: '模板1',
                    text: '2222上行下效嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻撒旦阿斯顿阿三大苏打阿萨大厦大厦大苏打阿萨大厦阿萨阿萨'
                },
                {
                    title: '模板2',
                    text: '3333上行下效嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻撒旦阿斯顿阿三大苏打阿萨大厦大厦大苏打阿萨大厦阿萨阿萨'
                },
                {
                    title: '模板3',
                    text: '444上行下效嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻撒旦阿斯顿阿三大苏打阿萨大厦大厦大苏打阿萨大厦阿萨阿萨'
                },
                {
                    title: '模板4',
                    text: '5555上行下效嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻撒旦阿斯顿阿三大苏打阿萨大厦大厦大苏打阿萨大厦阿萨阿萨'
                }
            ],
            currentSelectedTemplate: 0,
            privacyChecked: true,

            activeIcon,
            inactiveIcon,

            phoneNum: '',
            validaCode: '',
            phoneValid: false,
            isGetingCode: false // 是否正在获取验证码
        };
    },
    computed: {
        phoneErrMsg() {
            return this.phoneNum === '' || this.phoneValid ? '' : '手机号格式有误';
        }
    },
    watch: {
        isGetingCode(newVal) {
            newVal && this.$nextTick(() => this.$refs.textCountDown.start());
        }
    },
    methods: {
        transitionEnd() {
            this.currentSelectedTemplate = this.$refs.commentTemplate.swiper.realIndex;
        },
        async getValidationCode() {
            if (this.phoneNum === '' || !this.phoneValid) {
                this.$toast('请输入正确的手机号');
                return;
            }

            // 通过手机号获取验证码
            this.isGetingCode = true;
            // 调短信接口
        },
        // 提交评价
        submitComment() {}
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

            @at-root .header-text-bottom {
                margin-top: 0.64rem;
                color: rgba(255, 255, 255, 0.8);
            }
        }
    }

    @include element('body') {
        .comment-template {
            height: 100%;
            padding: 0 0.39rem;
            overflow: hidden;

            .template-head {
                position: relative;
                text-align: center;
                margin: 0.4rem 0;
                color: rgb(51, 51, 51);

                .template-select-icon {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 0.36rem;
                    height: 0.36rem;
                    background-size: contain !important;
                }
            }

            .template-body {
                text-indent: 0.6rem;
                color: rgb(102, 102, 102);
                line-height: 0.4rem;
            }
        }

        .swiper-container {
            height: 5.22rem;
            margin-top: -0.59rem;
            margin-bottom: -0.5rem;
            padding-bottom: 0.5rem;

            .swiper-slide {
                margin-top: 0.29rem;
                width: 6.42rem;
                height: 4.62rem;
                background: #fff;
                border-radius: 5px;
                box-sizing: border-box;
                transition: background-image, height, margin 300ms;

                .template-select-icon {
                    background: url('../assets/autoComment/uncheck@2x.png') no-repeat;
                }
            }

            .swiper-slide-active,
            .swiper-slide-duplicate-active {
                margin-top: 0;
                border: 1px solid #2f5ee3;
                height: 100%;
                background: #fff url('../assets/index/click-bg@2x.png') no-repeat;
                background-size: 2.4rem;
                background-position: bottom right;

                .template-select-icon {
                    background: url('../assets/autoComment/checked@2x.png') no-repeat;
                }
            }
        }

        @at-root .auto-comment-form {
            margin: 0.4rem 0.29rem 0;

            .phone-form {
                margin-top: 0.3rem;

                .valida-code-input,
                .phone-input {
                    margin-bottom: 0.3rem;
                    border-radius: 0.12rem;
                }
            }
        }
    }

    @include element('footer') {
        margin: 0.5rem 0.29rem 0.3rem;

        .auto-comment-footer {
            @include element('stepper') {
                padding: 0 0.42rem;

                li {
                    display: inline-block;
                    width: 1.08rem;
                    text-align: center;
                    vertical-align: top;
                }

                .stepper-icon {
                    width: 1.08rem;

                    img {
                        display: block;
                        width: 100%;
                        height: 1.08rem;
                    }
                }

                .stepper-more-icon {
                    margin: 0.35rem 0.12rem 0;
                    width: 1.18rem;

                    img {
                        width: 100%;
                    }
                }

                .stepper-text {
                    margin-top: 0.16rem;
                    line-height: 0.3rem;
                }
            }

            @include element('notice') {
                margin-top: 0.6rem;
                text-align: left;
                color: rgba(112, 112, 112, 1);

                p {
                    line-height: 0.34rem;
                }
            }
        }
    }
}
</style>
