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
            <van-list v-model="friendsLoading" :finished="finished" finished-text="没有更多了">
                <van-cell v-for="(friend, index) in friendsList" :key="index" :value="friend.time" value-class="friend-join-time">
                    <template slot="title">
                        <img class="friend-avatar" :src="friend.avatar" alt="avatar" />
                        <span class="friend-name fz-28 font-bold">好友{{ friend.name }}加入了</span>
                    </template>
                </van-cell>
            </van-list>
            <van-button block color="linear-gradient(to right, #6552ff, #2c3ffb)">邀请好友</van-button>
        </section>
    </div>
</template>

<script>
import Vue from 'vue';
import { List, Cell } from 'vant';

Vue.use(List).use(Cell);

export default {
    data() {
        return {
            totalFriends: 245,

            friendsLoading: false,
            finished: true,
            friendsList: [
                {
                    name: '昊昊',
                    time: '2019-08-28 18:40',
                    avatar:
                        'https://cube.elemecdn.com/6/a5/db7ddf9ccce4a54e07f5513520370png.png?x-oss-process=image/format,webp/resize,w_120,h_120,m_fixed'
                },
                {
                    name: '昊昊',
                    time: '2019-08-28 18:40',
                    avatar:
                        'https://cube.elemecdn.com/6/a5/db7ddf9ccce4a54e07f5513520370png.png?x-oss-process=image/format,webp/resize,w_120,h_120,m_fixed'
                },
                {
                    name: '昊昊',
                    time: '2019-08-28 18:40',
                    avatar:
                        'https://cube.elemecdn.com/6/a5/db7ddf9ccce4a54e07f5513520370png.png?x-oss-process=image/format,webp/resize,w_120,h_120,m_fixed'
                },
                {
                    name: '昊昊',
                    time: '2019-08-28 18:40',
                    avatar:
                        'https://cube.elemecdn.com/6/a5/db7ddf9ccce4a54e07f5513520370png.png?x-oss-process=image/format,webp/resize,w_120,h_120,m_fixed'
                },
                {
                    name: '昊昊',
                    time: '2019-08-28 18:40',
                    avatar:
                        'https://cube.elemecdn.com/6/a5/db7ddf9ccce4a54e07f5513520370png.png?x-oss-process=image/format,webp/resize,w_120,h_120,m_fixed'
                }
            ]
        };
    }
};
</script>

<style lang="scss">
.friends-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
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
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        margin-top: -1.35rem;
        border-radius: 16px;
        background: #fff;

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

        // overwrite van cell css
        .van-list {
            flex-grow: 1;

            & > .van-cell {
                background-color: transparent;
            }
        }
    }
}
</style>
