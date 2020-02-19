<template>
    <div class="index-wrapper" ref="indexWrapper">
        <div class="scroll-container">
            <header class="header">
                <div class="header-upper">
                    <img class="header-element-logo" src="../assets/index/banner-text@2x.png" alt="ElementLogo" />
                    <img class="header-decorate-pic" src="../assets/index/banner-pic@2x.png" alt="Decorate" />
                </div>
                <div class="header-bottom">
                    <!-- 轮播 -->
                    <van-swipe class="header-swiper" :autoplay="3000" indicator-color="#00000000">
                        <van-swipe-item v-for="e in swipeImages" :key="e.id" style="background-color: #39a9ed;">
                            <a :href="e.url"><img style="withd: 100%;" :src="e.img" alt="i"/></a>
                        </van-swipe-item>
                    </van-swipe>
                </div>
            </header>

            <section class="main-section" ref="mainSection">
                <ul class="hb-selections-wrapper">
                    <van-skeleton title title-width="30%" :row="2" :loading="loading">
                        <li
                            class="hb-selection"
                            :class="{ active: isHbSelected(index) }"
                            v-for="(hb, index) in hbList"
                            :key="hb.id"
                            @click="itemClick(index)"
                        >
                            <div class="hb-selection-upper">
                                <div class="hb-selection-title">{{ hb.title }}</div>
                                <div class="hb-selection-price">
                                    <span class="hb-selection-price-num din-font" v-show="hb.score > 0">{{ hb.score }}</span>
                                    <span class="hb-selection-price-text">{{ hb.score > 0 ? '积分/次' : '免费' }}</span>
                                </div>
                            </div>
                            <div class="hb-selection-bottom" v-if="isHbSelected(index)" v-html="hb.description"></div>
                        </li>
                    </van-skeleton>
                    <van-skeleton v-for="(e, index) in 2" :key="index" title title-width="30%" :row="2" :loading="loading" />
                </ul>

                <div class="hb-form" v-if="hbList[currentHbSelection] && hbList[currentHbSelection].score > 0">
                    <div>
                        <van-field
                            class="phone-input van-hairline--surround"
                            type="number"
                            required
                            clearable
                            v-model="phoneNum"
                            maxlength="11"
                            placeholder="请输入饿了么账号（手机号）"
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
                </div>

                <van-button class="hb-form-submit fz-32" block color="linear-gradient(to right, #6552ff, #2c3ffb)" @click="getHbModal">
                    立即领取
                </van-button>

                <div class="hb-rules-wrapper">
                    <p>领取规则：</p>
                    <!-- <div class="hb-rules" v-html="hbList[currentHbSelection] && hbList[currentHbSelection].rule"></div> -->
                    <!-- <p>
                        1、每个手机号每日限领1次，部分异常账号由于饿了么风控原因，无法领取红包，请更换其他手机号领取；
                    </p>
                    <p>2、若领取失败，不会消耗积分；</p>
                    <p>3、领取的红包有效期以饿了么为准，请及时使用 。</p> -->
                    <p>1、同个手机号每日可分别免费领取一次午餐红包和晚餐红包</p>
                    <p>2、积分红包可与店铺满减优惠叠加使用</p>
                    <p>3、部分异常账号无法领取红包，请更换其他手机号领取</p>
                    <p>4、若领取失败，不会消耗积分</p>
                    <p>5、领取的红包有效期以饿了么为准，请及时使用</p>
                </div>
            </section>
        </div>

        <footer class="hb-bar van-hairline--top">
            <div class="hb-user">
                <div class="user-info">
                    <img class="user-avatar" :src="userInfo.headimgurl" alt="avatar" />
                    <div class="user-info-text fz-24">
                        <p class="user-name van-ellipsis">{{ userInfo.nickname }}</p>
                        <p class="user-credit">
                            我的积分:
                            <span class="user-credit-num din-font">
                                {{ userInfo.score }}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <!-- <van-button class="hb-recharge fz-32" block color="linear-gradient(to right, #6552ff, #2c3ffb)" to="/recharge">充值积分</van-button> -->
            <van-button class="hb-recharge fz-32" block color="linear-gradient(to right, #6552ff, #2c3ffb)" to="/me">前往个人中心</van-button>
        </footer>

        <!-- 个人中心悬浮 -->
        <!-- <div class="user-center-wrapper" v-route-jump="'/me'">
            <div class="user-center-btn fz-32">
                <span class="user-center-icon"></span>
                <span class="user-center-text fz-28">个人中心</span>
            </div>
        </div> -->

        <draggable :initStyle="{ right: 0, bottom: '2.9rem' }" lockVertical v-route-jump="'/comment'">
            <div class="auto-comment-wrapper"></div>
        </draggable>

        <!-- 验证码回执模态框 -->
        <hb-modal v-model="captchaModalShow" :close-on-click-overlay="false" title="输入图形验证码">
            <div style="margin-bottom: 0.4rem;">
                <van-field
                    class="captcha-code-input van-hairline--surround"
                    type="text"
                    required
                    clearable
                    v-model="captchaCode"
                    placeholder="请输入图形验证码"
                >
                    <van-image
                        slot="button"
                        style="width: 2rem; height: 0.98rem;"
                        :src="`data:image/png;base64,${captchaImage}`"
                        @click="getNewCaptcha(phoneNum)"
                    >
                        <template v-slot:error>
                            <van-icon name="photo-o" />
                        </template>
                    </van-image>
                </van-field>
            </div>
            <van-button class="fz-32" block color="linear-gradient(to right, #6552ff, #2c3ffb)" @click="captchaOK">确定</van-button>
        </hb-modal>

        <!-- 首次登陆模态框 -->
        <hb-modal
            class="first-login-modal"
            v-model="firstLogin"
            :close-on-click-overlay="false"
            :show-confirm-button="true"
            :show-cancel-button="true"
            confirm-button-text="同意并授权"
            cancel-button-text="不同意"
            :before-close="firstLoginModalClose"
            title="隐私政策"
        >
            <p>请充分阅读并理解以下内容:</p>
            <p>
                <a href="//r.xiumi.us/board/v5/2XWpR/190715124">《用户服务协议》</a>
                和
                <a href="//v.xiumi.us/board/v5/2XWpR/190719124">《隐私条款》</a>
            </p>
            <p style="margin-top: 0.36rem; text-align: left;">1、同意即授权免登录外部平台，将可简化领取各类福利的操作过程。</p>
            <p style="text-align: left;">2、若您不希望授权登陆外部平台，可在“个人中心-系统设置”中关闭。</p>
        </hb-modal>

        <hb-success-modal v-model="hbSuccessModalShow"></hb-success-modal>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import hbModal from '@/components/WmqModal/WmqModal.vue';
import hbSuccessModal from '@/components/HbSuccessModal/HbSuccessModal.vue';
import BScroll from '@better-scroll/core';
import Draggable from '@/components/Draggable';

import indexService from '@/service/indexService';
import settingService from '@/service/settingService';

export default {
    name: 'home',
    async created() {
        // 检查是否是第一次进入
        this.checkFirstLogin();

        try {
            this.hbList = await indexService.getRedPacks();
            this.swipeImages = await indexService.getBanners();
            this.loading = false;
        } catch (error) {
            this.loading = false;
        }

        this.$nextTick(() => {
            // init betterScroll
            this.scroller = new BScroll(this.$refs.indexWrapper, {
                bounce: {
                    top: false,
                    bottom: false
                },
                preventDefaultException: {
                    className: /[(^|\s)hb-|(^|\s)van-]/
                }
            });
        });
    },
    data() {
        return {
            firstLogin: false,
            loading: true,

            swipeImages: [],
            hbList: [],
            currentHbSelection: 0, // 默认选中第一个红包

            // phoneValid: false,
            phoneNum: '18577361464',
            captchaModalShow: false,

            captchaCode: '',
            captchaImage: '', // 图形验证码
            captchaHash: '',
            validateToken: '',

            isGetingCode: false,
            validaCode: '',

            hbSuccessModalShow: false
        };
    },
    computed: {
        isHbSelected() {
            return (index) => this.currentHbSelection === index;
        },
        phoneErrMsg() {
            return this.phoneValid ? '' : '手机号格式有误';
        },
        phoneValid() {
            return this.phoneNum !== '' && this.isPhoneNum(this.phoneNum);
        },
        ...mapState(['userInfo'])
    },
    methods: {
        async firstLoginModalClose(action, done) {
            if (action === 'confirm') {
                await settingService.setUserSetting({
                    agreePrivacy: 1
                });
            }
            done();
            localStorage.setItem('firstLogin', new Date().getTime());

            this.$toast('已授权登陆');
        },
        checkFirstLogin() {
            this.firstLogin = localStorage.getItem('firstLogin') === null;
        },
        itemClick(index) {
            this.currentHbSelection = index;
            this.$nextTick(() => {
                this.scroller.refresh();
                this.scroller.scrollToElement(this.$refs.mainSection, 500);
            });
        },
        // 获取红包弹窗
        async getHbModal() {
            // 检测积分余额
            // this.$wmqModal({
            //     text: '您的积分余额不足，快来充值积分吧！',
            //     showConfirmButton: true,
            //     confirmButtonText: '前往充值',
            //     confirm: () => {
            //         this.$router.push('/recharge');
            //     }
            // });
            // 校验手机号
            // if (!this.phoneValid) { return; }
            // this.hbSuccessModalShow = true;
            // setTimeout(() => {
            //     this.hbSuccessModalShow = false;
            // }, 5000);

            // 饿了么登陆接口
            await indexService.eleLogin({
                mobile: this.phoneNum,
                smsCode: this.validaCode,
                validateToken: this.validateToken
            });

            let currentHb = this.hbList[this.currentHbSelection];

            this.$toast('领取中，请稍后...', {
                duration: 0
            });

            let redpacks = await indexService.getRedPack({
                id: currentHb.id,
                mobile: this.phoneNum
            });

            this.$toast.clear();

            // 清空数据
            this.captchaCode = '';
            this.captchaHash = '';
            this.validateToken = '';
            this.validaCode = '';

            console.log(redpacks);
        },
        async getValidationCode() {
            if (!this.phoneValid) {
                this.$toast('请输入正确的手机号');
                return;
            }

            // 是否登陆
            const eleIsLogin = await indexService.eleIsLogin({
                mobile: this.phoneNum
            });

            if (!eleIsLogin) {
                // 弹图形验证码
                this.captchaModalShow = true;
                this.getNewCaptcha(this.phoneNum);
            } else {
                this.sendMsg();
                this.isGetingCode = true;
            }
        },
        async captchaOK() {
            // 调提交验证码接口
            this.sendMsg()
                .then(() => {
                    this.captchaModalShow = false;
                    this.isGetingCode = true;
                })
                .catch(() => {
                    this.getNewCaptcha(this.phoneNum);
                });
        },
        sendMsg() {
            return indexService
                .sendMsg({
                    captchaCode: this.captchaCode,
                    captchaHash: this.captchaHash,
                    mobile: this.phoneNum
                })
                .then((res) => {
                    this.validateToken = res.validateToken;
                    return Promise.resolve(res.validateToken);
                });
        },
        // 领取红包
        getCoupon() {
            // 积分余额不足
            this.captchaModalShow = false;
        },
        // 获取新的验证码
        getNewCaptcha(phone) {
            indexService
                .getCaptcha({
                    mobile: phone
                })
                .then((res) => {
                    this.captchaHash = res.captchaHash;
                    this.captchaImage = res.captchaImage;
                });
        }
    },
    components: {
        hbModal,
        hbSuccessModal,
        Draggable
    },
    watch: {
        captchaModalShow(newVal) {
            // 弹窗关闭时重置计时器
            if (!newVal && this.$refs.textCountDown) {
                setTimeout(() => {
                    this.$refs.textCountDown.reset();
                    this.isGetingCode = false;
                }, 200);
            }
        },
        isGetingCode(newVal) {
            newVal && this.$nextTick(() => this.$refs.textCountDown.start());
        }
    }
};
</script>

<style lang="scss" scoped>
/* common */
.index-wrapper {
    background: #f8f8f8;
}

.van-skeleton {
    margin-bottom: 0.2rem;
}

/* header */
.header {
    overflow: hidden;
}

.header > .header-upper {
    position: absolute;
    z-index: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 3.58rem;
    background: url('../assets/index/banner-bg.png') no-repeat;
    background-size: cover;
}

.header-upper > .header-element-logo {
    width: 3.97rem;
    height: 0.57rem;
    margin-top: 0.42rem;
    padding-left: 0.3rem;
}

.header-upper > .header-decorate-pic {
    width: 3.1rem;
    height: 2.55rem;
    margin-top: 0.16rem;
}

.header-bottom {
    position: relative;
    z-index: 1;
    width: 100%;
    margin-top: 1.4rem;
}

.header-bottom > .header-swiper {
    width: 6.94rem;
    height: 3rem;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 0.15rem;
    font-size: 0.4rem;
    line-height: 3rem;
    text-align: center;
}

/* section */
.main-section {
    font-size: 0.18rem;
    padding: 0.3rem 0.28rem 0;
    overflow: hidden;
}

.main-section > .hb-selections-wrapper {
    padding: 0.28rem;
    background-color: #fff;
    border-radius: 0.12rem;
    box-shadow: 0.01rem 0.01rem 0.1rem 0.02rem #eeeeee;
}

/* hb-selections */
.hb-selections-wrapper > .hb-selection {
    position: relative;
    padding: 0.3rem 0.28rem 0.24rem 0.14rem;
    box-sizing: border-box;
    background-color: #f7f7f9;
    border-radius: 0.08rem;
}

.hb-selections-wrapper > .hb-selection.active {
    // min-height: 2.3rem;
    border: 1px solid #2f5ee3;
    background: #f3f4ff url('../assets/index/click-bg@2x.png') right bottom no-repeat;
    background-size: 2.55rem 1.7rem;
}

.hb-selections-wrapper > .hb-selection:not(:last-child) {
    margin-bottom: 0.2rem;
}

.hb-selection .hb-selection-bottom {
    font-size: 0.24rem;
    margin-top: 0.14rem;
    line-height: 0.34rem;
    color: #545454;

    /deep/ .hb-selection-bottom__rules p:not(:last-child) {
        margin-bottom: 0.2rem;
    }

    .hb-selection-bottom__desc {
        margin-top: 0.2rem;
    }
}

.hb-selection .hb-selection-title {
    font-size: 0.32rem;
    font-weight: bold;
    color: #3d3d3d;
}

.hb-selection.active .hb-selection-title {
    font-size: 0.36rem;
}

.hb-selections-wrapper > .hb-selection.active .hb-selection-title {
    color: #455ac3;
}

.hb-selections-wrapper .hb-selection-upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.hb-selection .hb-selection-price {
    display: flex;
    align-items: center;
    color: #fb5227;

    // 修正移动端偏差
    & span:nth-child(2) {
        margin-left: 0.04rem;
        position: relative;
        top: -3px;
    }
}

.hb-selection .hb-selection-price-num {
    font-size: 0.4rem;
    font-weight: bold;
}

.hb-selection .hb-selection-price-text {
    font-size: 0.24rem;
}

/* hb-form */
.hb-form {
    margin-top: 0.3rem;
}

.hb-form .phone-input {
    border-radius: 0.12rem;
    margin-bottom: 0.3rem;
}

.hb-form-submit {
    margin-top: 0.3rem;
    font-size: 0.32rem;
}

/* hb-rules-wrapper */
.hb-rules-wrapper {
    margin: 0.3rem 0 0.95rem;
    font-size: 0.24rem;
    color: #858585;
    line-height: normal;
}

/deep/ .hb-rules-wrapper p {
    margin-bottom: 0.08rem;
}

/* hb-bar */
.hb-bar {
    position: fixed;
    display: flex;
    width: 100%;
    bottom: 0;
    background-color: #fff;
    font-size: 0.28rem;
}

.hb-bar .hb-user {
    padding: 0 0.1rem 0 0.28rem;
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
}

.hb-bar .hb-recharge {
    width: 2.6rem;
    border-radius: 0;
}

.hb-bar .user-info {
    display: flex;
    align-items: center;
}

.hb-bar .user-info-text {
    margin-left: 0.16rem;
    text-align: left;
}

.user-info .user-name {
    margin-bottom: 0.1rem;
    max-width: 1.8rem;
    // margin-left: 0.16rem;
}

.user-info .user-avatar {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
}

.hb-user .user-credit {
    // display: flex;
    align-items: center;
    color: #999999;
}

.user-credit .user-credit-num {
    font-weight: bold;
    color: #2f5ee3;
}

.user-center-wrapper {
    position: fixed;
    width: 1.95rem;
    height: 0.68rem;
    bottom: 1.36rem;
    right: 0;
    color: #fff;
    border-radius: 14rem 0 0 14rem;
    background: linear-gradient(to right, #fb6b41, #ff8c56);
    box-shadow: 0 0 0.1rem #fb6b41;
}

.auto-comment-wrapper {
    width: 1.96rem;
    height: 1.38rem;
    background: url('../assets/index/comment@2x.png') no-repeat;
    background-size: contain;
}

.user-center-wrapper:active {
    background: linear-gradient(to right, #f18f72, #f59e75);
}

.user-center-btn {
    padding-left: 0.25rem;
    height: 100%;
    display: flex;
    align-items: center;
}

.user-center-btn .user-center-icon {
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    background: url('../assets/index/icon-my@2x.png') center center no-repeat;
    background-size: 0.3rem 0.3rem;
}

.user-center-btn .user-center-text {
    margin-left: 0.05rem;
    font-weight: bold;
}

.first-login-modal {
    p {
        color: #666;
        line-height: 0.42rem;
        font-size: 0.24rem;
    }
}
</style>
