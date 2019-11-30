<template>
    <div class="me-wrapper">
        <header class="header">
            <div class="header-upper">
                <div class="avatar-wrapper">
                    <img
                        class="user-avatar"
                        src="https://cube.elemecdn.com/6/a5/db7ddf9ccce4a54e07f5513520370png.png?x-oss-process=image/format,webp/resize,w_120,h_120,m_fixed"
                        alt="avatar"
                    />
                    <span class="user-name fz-32">绿色森林</span>
                </div>

                <span class="user-id fz-24">
                    账户ID：{{ userId }}
                    <span class="user-id-copy-btn" @click="copyText(userId)">复制</span>
                </span>
            </div>
            <div class="header-bottom flex">
                <div class="credit-wrapper">
                    <div class="user-credit">
                        <span class="credit-num din-font">{{ userCredit }}</span>
                        <span class="my-credit flex fz-28">我的积分 <van-icon name="arrow"/></span>
                        <van-button
                            class="me-recharge-btn fz-28 font-bold"
                            size="small"
                            color="linear-gradient(to right, #ffe28a, #ffcf51)"
                            round
                            to="/recharge"
                            >充值</van-button
                        >
                    </div>
                    <div class="user-money">
                        <span class="din-font">{{ userMoney }} <span class="fz-28">元</span></span>
                        <span class="my-money flex fz-28">我的佣金 <van-icon name="arrow"/></span>
                        <van-button class="me-get-money-btn fz-28 font-bold" size="small" hairline round to="/recharge">提现</van-button>
                    </div>
                </div>
            </div>
        </header>
        <section class="invite-wrapper">
            <div class="invite-left">
                <div class="invite-text fz-28">
                    <p style="color: #545454;">每邀请一位好友的奖励：</p>
                    <p style="color: #707070;">◆ 立即获得<span class="din-font font-bold" style="color: #2f5ee3;">10</span>积分奖励</p>
                    <p style="color: #707070;">◆ 好友每笔充值金额的<span class="din-font font-bold" style="color: #2f5ee3;">20%</span>佣金</p>
                </div>
                <van-button class="invite-link-btn fz-24" color="#2f5ee3" round plain @click="copyText(inviteLink)">复制邀请链接</van-button>
            </div>
            <div class="invite-right">
                <span class="flex fz-28" style="color: #2f5ee3;">好友列表 <van-icon name="arrow"/></span>
                <van-button class="invite-btn fz-24" color="linear-gradient(to right, #ff8b56, #fb5d37)" round>邀请好友</van-button>
            </div>
        </section>
        <section class="common-wrapper">
            <h5 class="fz-28 font-bold">常用功能</h5>
            <ul class="common-btn-list fz-28">
                <li class="new">
                    <img class="common-btn-icon" src="../assets/me/icon_new@2x.png" alt="new" />
                    <span class="common-btn-text">新手指引</span>
                </li>
                <li class="faq">
                    <img class="common-btn-icon" src="../assets/me/icon_faq@2x.png" alt="faq" />
                    <span class="common-btn-text">常见问题</span>
                </li>
                <li class="kefu">
                    <img class="common-btn-icon" src="../assets/me/icon_kefu@2x.png" alt="kefu" />
                    <span class="common-btn-text">联系客服</span>
                </li>
            </ul>
        </section>
        <footer class="me-footer">
            <div class="redeem-hb-btn">
                <div class="redeem-hb-btn-text font-bold">我要兑换红包</div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userId: '2019011',
            userCredit: 1024,
            userMoney: 879.99,
            inviteLink: 'www.baidu.com'
        };
    },
    methods: {}
};
</script>

<style scoped>
/* header */
.me-wrapper .header {
    padding-top: 0.4rem;
    margin: 0 0.28rem;
    width: 6.96rem;
}

.header .header-upper {
    display: flex;
    justify-content: space-between;
}

.header-upper .user-avatar {
    margin-left: 0.42rem;
    width: 0.98rem;
    border-radius: 50%;
}

.header-upper .user-name {
    padding-top: 0.15rem;
    margin-left: 0.2rem;
    font-weight: bold;
}

.header-upper .user-id {
    padding-top: 0.18rem;
}

.header-upper .avatar-wrapper {
    display: flex;
}

.header-upper .user-id-copy-btn {
    color: #2f5ee3;
}

.header .header-bottom {
    margin-top: -0.4rem;
    width: 100%;
    height: 2.94rem;
    background: url('../assets/me/bg_my@2x.png') no-repeat;
    background-size: cover;
    overflow: hidden;
}

.header-bottom .credit-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0.68rem 0 0.4rem;
    padding: 0 0.64rem 0 1.06rem;
}

.credit-wrapper .user-credit,
.credit-wrapper .user-money {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.user-credit .my-credit,
.user-money .my-money {
    align-items: center;
    color: #ccffffff;
}

.user-credit .credit-num,
.credit-wrapper .user-money {
    font-size: 0.6rem;
    color: #fefefe;
}

.credit-wrapper .me-recharge-btn {
    width: 1.48rem;
    height: 0.56rem;
    color: #b37013 !important;
}

.user-money .me-get-money-btn {
    width: 1.48rem;
    background: transparent;
    color: #fff;
}

/* invite */
.invite-wrapper {
    display: flex;
    justify-content: space-between;
    margin: 0.3rem 0.28rem 0;
    padding: 0.52rem 0.06rem 0.5rem 0.42rem;
    border-radius: 0.15rem;
    background: #f7f7f9;
}

.invite-wrapper .invite-text p:not(:first-child) {
    margin-top: 0.28rem;
}

.invite-wrapper .invite-link-btn {
    margin-top: 0.44rem;
    width: 2.4rem;
    height: 0.56rem;
    line-height: 0.56rem;
}

.invite-wrapper .invite-btn {
    margin-top: 0.6rem;
    width: 1.58rem;
    height: 0.56rem;
    line-height: 0.56rem;
}

/* common */
.common-wrapper {
    margin: 0.3rem 0.28rem 0;
}

.common-wrapper .common-btn-list {
    display: flex;
    justify-content: space-between;
    margin-top: 0.26rem;
}

.common-btn-list li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 2.06rem;
    height: 2.06rem;
    border-radius: 0.04rem;
}

.common-btn-list li .common-btn-icon {
    width: 0.58rem;
    height: 0.58rem;
}

.common-btn-text {
    position: relative;
    top: 0.4rem;
}

.common-btn-list .new {
    background: #fefaf2;
}

.common-btn-list .faq {
    background: #eff9f7;
}

.common-btn-list .kefu {
    background: #f2f6fe;
}

/* footer */
.me-footer {
    margin-top: 0.74rem;
    padding: 0 0.28rem;
}

.me-footer .redeem-hb-btn {
    width: 100%;
    height: 0.93rem;
    background: url('../assets/me/butten_bg_hongbao@2x.png') no-repeat;
    background-size: contain;
}

.redeem-hb-btn .redeem-hb-btn-text {
    font-size: 0.36rem;
    color: #ffdc39;
    line-height: 0.93rem;
    text-align: center;
}

/* common */
.common-btn-list li:active,
.redeem-hb-btn:active {
    opacity: 0.8;
}
</style>
