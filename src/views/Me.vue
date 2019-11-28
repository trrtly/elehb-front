<template>
    <div class="me-wrapper">
        <header class="header">
            <div class="header-upper">
                <img class="user-avatar" src="https://cube.elemecdn.com/6/a5/db7ddf9ccce4a54e07f5513520370png.png?x-oss-process=image/format,webp/resize,w_120,h_120,m_fixed" alt="avatar" />
                <span class="user-id">
                    账户ID：{{ userId }}
                    <span class="user-id-copy-btn fz-24" @click="copyUserId">复制</span>
                </span>
            </div>
            <div class="header-bottom"></div>
        </header>
        <section class="invite"></section>
        <section class="common"></section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userId: '2019011'
        };
    },
    methods: {
        // 复制用户id
        copyUserId() {
            this.$copyText(this.userId).then(
                () => {
                    this.$toast('复制成功');
                },
                () => {
                    this.$toast('复制失败');
                }
            );
        }
    }
};
</script>

<style scoped>
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
    width: 0.98rem;
    border-radius: 50%;
}

.header-upper .user-id-copy-btn {
    color: #2f5ee3;
}

.header .header-bottom {
    width: 100%;
    height: 2.94rem;
    background: url('../assets/me/bg-my@2x.png') no-repeat;
    background-size: cover;
}
</style>
