<template>
    <ul class="index-item-list">
        <!-- <li v-for="item in listItems"></li> -->
        <li class="item" v-for="(item, index) in 4" :key="index">
            <div class="item-left-side">
                <img class="title-pic" src="//qddgo.oss-cn-hangzhou.aliyuncs.com/posters/8203374e-c9f1-4db2-9c78-a99f5170f25c.jpg" alt="" />

                <div class="info">
                    <h3 class="info-title van-ellipsis fz-32 font-bold">每日午餐红包</h3>
                    <p class="info-detail van-ellipsis fz-24">约2%返现+10积分</p>
                </div>
            </div>

            <van-button class="fz-24" round color="linear-gradient(to right, #6451FF, #2F40FB)">免费领取</van-button>
        </li>
    </ul>
</template>

<script>
import {} from '@vue/composition-api';
export default {
    setup(props) {
        return {
            listItems: props.listItems
        };
    }
};
</script>

<style lang="scss" scoped>
.index-item-list {
    margin: 0 28px 40px;

    .item {
        padding: 26px 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #f7f7f9;
        border-radius: 10px;

        .item-left-side {
            display: flex;
            align-items: center;
            flex: 1;
        }

        &:not(:last-of-type) {
            margin-bottom: 20px;
        }

        @at-root .info {
            max-width: 380px;

            .info-title {
                margin-bottom: 18px;
                color: #3d3d3d;
            }

            .info-detail {
                color: #fb5227;
            }
        }
    }

    .title-pic {
        margin-right: 40px;
        width: 104px;
        height: 100px;
        object-fit: contain;
    }

    .van-button {
        flex-shrink: 1;
        width: 156px;
        height: 56px;
    }
}
</style>
