<template>
    <div class="index-wrapper">
        <header class="header">
            <div class="header-upper">
                <img class="header-element-logo" src="../assets/index/banner-text@2x.png" alt="ElementLogo" />
                <img class="header-decorate-pic" src="../assets/index/banner-pic@2x.png" alt="Decorate" />
            </div>
            <div class="header-bottom">
                <!-- 轮播 -->
                <van-swipe class="header-swiper" :autoplay="2000" indicator-color="#00000000">
                    <van-swipe-item v-for="e in swipeImages" :key="e.id" style="background-color: #39a9ed;">
                        <a :href="e.url"><img style="withd: 100%;" :src="e.img" alt="i"/></a>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </header>

        <section class="main-section" ref="mainSection">
            <ul class="hb-selections-wrapper">
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
                            <span class="hb-selection-price-num din-font">{{ hb.score }}</span>
                            <span class="hb-selection-price-text">积分/次</span>
                        </div>
                    </div>
                    <div class="hb-selection-bottom" v-if="isHbSelected(index)" v-html="hb.description"></div>
                </li>
            </ul>

            <div class="hb-form">
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

            <van-button class="hb-form-submit fz-32" block color="linear-gradient(to right, #6552ff, #2c3ffb)" @click="getHbModal">
                立即领取
            </van-button>

            <div class="hb-rules-wrapper">
                <p>领取规则：</p>
                <div class="hb-rules" v-html="hbList[currentHbSelection] && hbList[currentHbSelection].rule"></div>
                <!-- <p>
                    1、每个手机号每日限领1次，部分异常账号由于饿了么风控原因，无法领取红包，请更换其他手机号领取；
                </p>
                <p>2、若领取失败，不会消耗积分；</p>
                <p>3、领取的红包有效期以饿了么为准，请及时使用 。</p> -->
            </div>
        </section>

        <footer class="hb-bar van-hairline--top">
            <div class="hb-user">
                <div class="user-info">
                    <img class="user-avatar" :src="userInfo.headimgurl" alt="avatar" />
                    <span class="user-name van-ellipsis">{{ userInfo.nickname }}</span>
                </div>
                <div class="user-credit">
                    我的积分：
                    <span class="user-credit-num din-font">
                        {{ userInfo.score }}
                    </span>
                </div>
            </div>
            <van-button class="hb-recharge fz-32" block color="linear-gradient(to right, #6552ff, #2c3ffb)" to="/recharge">充值积分</van-button>
        </footer>

        <div class="user-center-wrapper" v-route-jump="'/me'">
            <div class="user-center-btn fz-32">
                <span class="user-center-icon"></span>
                <span class="user-center-text fz-28">个人中心</span>
            </div>
        </div>

        <!-- 验证码回执模态框 -->
        <hb-modal v-model="getCbModalShow" :close-on-click-overlay="false" title="请输入接收到的短信验证码">
            <div style="margin-bottom: 0.4rem;">
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
                        发送验证码
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
            <van-button class="fz-32" block color="linear-gradient(to right, #6552ff, #2c3ffb)" @click="getCoupon">立即领取</van-button>
        </hb-modal>

        <hb-success-modal v-model="hbSuccessModalShow"></hb-success-modal>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import hbModal from '../components/WmqModal/WmqModal.vue';
import hbSuccessModal from '../components/HbSuccessModal/HbSuccessModal.vue';

export default {
    name: 'home',
    async created() {
        !this.$store.state.platformInfo && (await this.$store.dispatch('fetchSetPlatformInfo'));
        this.hbList = this.$store.state?.platformInfo?.redpacks;
        this.swipeImages = this.$store.state?.platformInfo?.banners;
    },
    mounted() {
        this.mainOffsetTop = this.$refs.mainSection.offsetTop;
    },
    data() {
        return {
            swipeImages: [],
            hbList: [],
            currentHbSelection: 0, // 默认选中第一个红包

            phoneValid: false,
            phoneNum: '',
            getCbModalShow: false,

            validaCode: '',
            isGetingCode: false, // 是否正在获取验证码

            hbSuccessModalShow: false
        };
    },
    computed: {
        isHbSelected() {
            return (index) => this.currentHbSelection === index;
        },
        phoneErrMsg() {
            return this.phoneNum === '' || this.phoneValid ? '' : '手机号格式有误';
        },
        ...mapState(['userInfo'])
    },
    methods: {
        itemClick(index) {
            this.currentHbSelection = index;
            this.smoothScroll(this.mainOffsetTop);
        },
        // 获取红包弹窗
        getHbModal() {
            // 校验手机号
            // this.phoneValid && (this.getCbModalShow = true);
            this.hbSuccessModalShow = true;
            // setTimeout(() => {
            //     this.hbSuccessModalShow = false;
            // }, 5000);
        },
        getValidationCode() {
            // 通过手机号获取验证码
            this.isGetingCode = true;
            // 调短信接口
        },
        getCoupon() {
            // 积分余额不足
            this.getCbModalShow = false;
            this.$wmqModal({
                text: '您的积分余额不足，快来充值积分吧！',
                showConfirmButton: true,
                confirmButtonText: '前往充值',
                confirm: () => {
                    this.$router.push('/recharge');
                }
            });
        }
    },
    components: {
        hbModal,
        hbSuccessModal
    },
    watch: {
        getCbModalShow(newVal) {
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
    margin: 0.3rem 0;
}

.hb-form .phone-input {
    border-radius: 0.12rem;
}

.hb-form-submit {
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

.user-info .user-name {
    max-width: 1.8rem;
    margin-left: 0.16rem;
}

.user-info .user-avatar {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
}

.hb-user .user-credit {
    display: flex;
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
</style>
