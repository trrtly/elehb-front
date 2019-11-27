<template>
    <div class="me-wrapper">
        <header class="header">
            <div class="header-upper">TEST</div>
            <div class="header-bottom"></div>
        </header>
        <section class="invite"></section>
        <section class="common"></section>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style scoped>
.me-wrapper .header {
    padding-top: 0.4rem;
    margin: 0 0.28rem;
    width: 6.96rem;
}

.header .header-bottom {
    width: 100%;
    height: 2.94rem;
    background: url('../assets/me/bg-my@2x.png') no-repeat;
    background-size: cover;
}
</style>
