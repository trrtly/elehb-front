<template>
    <div class="friends-wrapper">
        <header class="friends-header">
            <div class="friends-header-title fz-28"><span>好友数</span></div>
            <div class="friends-header-detail fz-28">
                <span class="din-font">{{ totalFriends }}</span>
                人
            </div>
        </header>

        <section class="friends-list">
            <van-list :offset="1" v-model="friendsLoading" :finished="finished" finished-text="没有更多了" @load="getList">
                <van-cell v-for="friend in friendsList" :key="friend.id" :value="formatTime(friend.createdAt * 1000)" value-class="friend-join-time">
                    <template slot="title">
                        <div class="friend-left flex-vertical">
                            <img class="friend-avatar" :src="friend.headimgurl" alt="avatar" />
                            <span class="friend-name fz-28 font-bold van-ellipsis">好友 {{ friend.nickname }} 加入了</span>
                        </div>
                    </template>
                </van-cell>
            </van-list>
        </section>

        <van-button class="bottom-button" block color="linear-gradient(to right, #6552ff, #2c3ffb)" @click="showQRDialog">邀请好友</van-button>

        <!-- 我的邀请码弹窗 -->
        <van-overlay :show="myQRShow" @click="myQRShow = false">
            <van-image class="my-qr-code" :src="myQRCode" @click.stop />
        </van-overlay>
    </div>
</template>

<script>
import Vue from 'vue';
import { List, Cell } from 'vant';
import friendsService from '../service/friendsService';
import meService from '../service/meService';

Vue.use(List).use(Cell);

export default {
    created() {
        // 预先加载接口
        this.myQRPromise = meService.getMyQRCode();
    },
    data() {
        return {
            totalFriends: 245,

            friendsLoading: false,
            finished: false,
            friendsList: [],

            currentPage: 1,
            pageLimit: 5,

            myQRShow: false,
            myQRCode: ''
        };
    },
    methods: {
        async getList() {
            this.friendsLoading = true;

            let res = await friendsService.getFriends({
                page: this.currentPage,
                limit: this.pageLimit
            });

            this.friendsLoading = false;

            let list = res.list || [];

            if (list.length < this.pageLimit) {
                this.finished = true;
            } else {
                this.currentPage++;
            }

            this.totalFriends = res.totalInviteNum;

            this.friendsList = [...this.friendsList, ...list];
        },
        async showQRDialog() {
            this.myQRShow = true;

            if (!this.myQRCode) {
                let res = await this.myQRPromise;
                this.myQRCode = res.url;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.friends-wrapper {
    // display: flex;
    // flex-direction: column;
    color: #fff;

    .friends-header {
        min-height: 3.9rem;
        background: url('../assets/friends/bg-color@2x.png') no-repeat;
        background-size: cover;
        text-align: center;
        overflow: hidden;

        .friends-header-title {
            margin-top: 0.6rem;
        }

        .friends-header-detail {
            margin-top: 0.24rem;

            span {
                font-size: 0.8rem;
                vertical-align: -0.04rem;
            }
        }
    }

    // firends list
    .friends-list {
        margin-top: 2.55rem;
        margin-bottom: 0.88rem;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        // margin-top: -1.35rem;
        border-radius: 16px;
        background: #fff;
        overflow-y: scroll;

        .friend-avatar {
            width: 0.82rem;
            border-radius: 50%;
            vertical-align: middle;
        }

        .friend-name {
            margin-left: 0.24rem;
            color: #3b3b3b;
        }

        .friend-join-time {
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
            font-size: 0.22rem;
            color: #a8a8a8;
        }

        .friend-left {
            max-width: 25rem;
        }

        // overwrite van cell css
        .van-list {
            flex-grow: 1;

            & > .van-cell {
                background-color: transparent;
            }
        }
    }

    .bottom-button {
        position: fixed;
        bottom: 0;
    }

    .my-qr-code {
        position: absolute;
        width: 80%;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
    }
}
</style>
