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
                    <van-swipe-item v-for="(e, i) in swipeImages" :key="i" style="background-color: #39a9ed;">
                        <img style="height: 100%;" :src="e" alt="i" />
                    </van-swipe-item>
                </van-swipe>
            </div>
        </header>

        <section class="main-section">
            <ul class="hb-selections-wrapper">
                <li class="hb-selection" :class="{ active: isHbSelected(index) }" v-for="(hb, index) in hbArr" :key="hb.id" @click="hbSelect(index)">
                    <div class="hb-selection-upper">
                        <span class="hb-selection-title">{{ hb.title }}</span>
                        <div class="hb-selection-price">
                            <span class="hb-selection-price-num din-font">{{ hb.price }}</span> <span class="hb-selection-price-text">积分/次</span>
                        </div>
                    </div>
                    <div class="hb-selection-bottom" v-if="isHbSelected(index)">
                        <p v-html="hb.desc"></p>
                    </div>
                </li>
            </ul>

            <div class="hb-form">
                <van-field class="phone-input van-hairline--surround" type="number" required clearable v-model="phoneNum" maxlength="11" placeholder="请输入饿了么账号（手机号）" />
            </div>

            <van-button class="hb-form-submit fz-32" block color="linear-gradient(to right, #6552ff, #2c3ffb)" @click="getHb">立即领取</van-button>

            <div class="hb-description">
                <p>领取规则：</p>
                <p>1、每个手机号每日限领1次，部分异常账号由于饿了么风控原因，无法领取红包，请更换其他手机号领取；</p>
                <p>2、若领取失败，不会消耗积分；</p>
                <p>3、领取的红包有效期以饿了么为准，请及时使用 。</p>
            </div>
        </section>

        <footer class="hb-bar van-hairline--top">
            <div class="hb-user">
                <div class="user-info">
                    <img class="user-avatar" src="https://cube.elemecdn.com/6/a5/db7ddf9ccce4a54e07f5513520370png.png?x-oss-process=image/format,webp/resize,w_120,h_120,m_fixed" alt="avatar" />
                    <span class="user-name van-ellipsis">{{ 'userName' }}</span>
                </div>
                <div class="user-credit">
                    我的积分：
                    <span class="user-credit-num din-font">
                        {{ '999' }}
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
        <!-- <van-dialog v-model="getCbModalShow" close-on-click-overlay :show-confirm-button="false">
            <div slot="title" class="modal-title">
                请输入接收到的短信验证码
                <van-icon name="cross" />
            </div>
            <div style="padding: 0 0.4rem; margin-top: 0.4rem; margin-bottom: 0.62rem;">
                <div style="margin-bottom: 0.4rem;">
                    <van-field class="valida-code-input van-hairline--surround" type="number" required clearable v-model="validaCode" placeholder="短信验证码" />
                </div>
                <van-button class="fz-32" block color="linear-gradient(to right, #6552ff, #2c3ffb)">立即领取</van-button>
            </div>
        </van-dialog> -->
        <hb-modal v-model="getCbModalShow" />
    </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue';
import { Swipe, SwipeItem, Dialog, Field, Button } from 'vant';
import hbModal from '../components/WmqModal/WmqModal.vue';

Vue.use(Swipe)
    .use(SwipeItem)
    .use(Dialog)
    .use(Field)
    .use(Button);

export default {
    name: 'home',
    data() {
        return {
            swipeImages: [
                'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2754363298,2864020823&fm=26&gp=0.jpg',
                'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2754363298,2864020823&fm=26&gp=0.jpg',
                'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2754363298,2864020823&fm=26&gp=0.jpg',
                'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2754363298,2864020823&fm=26&gp=0.jpg'
            ],
            hbArr: [
                {
                    id: 1,
                    price: 6,
                    title: '通用组合红包',
                    desc: `
                        <p style="margin-bottom: 0.2rem;">◆ 平台通用红包【满30减4】</p>
                        <p style="margin-bottom: 0.2rem;">◆ 平台通用红包【满45减5】</p>
                        <p style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">◆ 手气好有可能领取到16减16、66减66红包哦~</p>
                    `
                },
                {
                    id: 2,
                    price: 6,
                    title: '品质联盟30-5组合包',
                    desc: '2222'
                },
                {
                    id: 3,
                    price: 6,
                    title: '随机批量组合包',
                    desc: '3333'
                },
                {
                    id: 4,
                    price: 6,
                    title: '每日四合一礼包',
                    desc: '4444'
                }
            ],
            currentHbSelection: 0, // 默认选中第一个红包
            phoneNum: '',
            phoneErrMsg: '',
            getCbModalShow: false,

            validaCode: ''
        };
    },
    computed: {
        isHbSelected() {
            return (index) => this.currentHbSelection === index;
        }
    },
    methods: {
        // 选择红包类型
        hbSelect(index) {
            this.currentHbSelection = index;
        },
        // 获取红包
        getHb() {
            this.getCbModalShow = true;
        }
    },
    components: {
        hbModal
    }
};
</script>

<style scoped>
/* header */
.header {
    overflow: hidden;
}

.header > .header-upper {
    position: absolute;
    z-index: 1;
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
    z-index: 2;
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
    margin-top: 0.3rem;
    padding: 0 0.28rem;
    overflow: hidden;
}

.main-section > .hb-selections-wrapper {
    padding: 0.28rem;
    background-color: #fff;
    border-radius: 0.12rem;
}

/* hb-selections */
.hb-selections-wrapper > .hb-selection {
    padding: 0.3rem 0.28rem 0.24rem 0.14rem;
    box-sizing: border-box;
    background-color: #f7f7f9;
    border-radius: 0.08rem;
}

.hb-selections-wrapper > .hb-selection.active {
    min-height: 2.3rem;
    border: 1px solid #2f5ee3;
    background: url('../assets/index/click-bg@2x.png') right bottom no-repeat;
    background-size: 2.55rem 1.7rem;
}

.hb-selections-wrapper > .hb-selection:not(:last-child) {
    margin-bottom: 0.2rem;
}

.hb-selection .hb-selection-bottom {
    font-size: 0.24rem;
    margin-top: 0.24rem;
}

.hb-selection .hb-selection-title {
    font-size: 0.32rem;
    font-weight: bold;
}

.hb-selection.active .hb-selection-title {
    font-size: 0.36rem;
}

.hb-selections-wrapper > .hb-selection.active .hb-selection-title {
    color: #455ac3;
}

.hb-selection .hb-selection-price span {
    vertical-align: middle;
}

.hb-selection .hb-selection-price {
    float: right;
    color: #fb5227;
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

/* hb-description */
.hb-description {
    margin: 0.3rem 0 0.95rem;
    font-size: 0.24rem;
    color: #858585;
    line-height: normal;
}

.hb-description p {
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
