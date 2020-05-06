<template>
    <hb-success-modal :show.sync="innerShow" :main-title="mainTitle" :title="title" bottom-desc="请加客服微信领取">
        <div class="body-wrapper" slot="mainBody">
            <div class="virtual-inner">
                <p class="inner-head">
                    {{ virtualHb.title }}
                </p>
                <p class="inner-body" @touchstart.stop="touchStartY = $event.touches[0].pageY" @touchmove.stop="scroll($event, $event.currentTarget)">
                    {{ virtualHb.content }}
                </p>
                <p class="inner-desc">
                    若“一键复制”失败，可手动长按复制
                </p>
            </div>
        </div>

        <div slot="bottomButton" @click="copy">
            <p class="hb-bottom-button__text fz-36" style="margin-top: 0.14rem;">一键复制</p>
        </div>
    </hb-success-modal>
</template>

<script>
import hbSuccessModal from '../HbSuccessModal/HbSuccessModal';

export default {
    name: 'VirtualHbListModal',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: String,
        mainTitle: String,
        virtualHb: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            scrollTop: 0, // 记录当前页面scrollTop
            touchStartY: 0,
            innerShow: this.show
        };
    },
    watch: {
        show(v) {
            this.innerShow = v;
        },
        innerShow(v) {
            if (v === false) {
                this.$emit('update:show', false);
            }
        }
    },
    methods: {
        copy() {
            this.copyText(this.virtualHb.content);
        },
        // 处理滑动影响popup外层页面问题
        scroll(e, { scrollTop, scrollHeight }) {
            // > 0 向下， < 0 向上
            const targetHeight = e.currentTarget.offsetHeight;
            const touchY = e.changedTouches[0].pageY - this.touchStartY;
            if (
                e.cancelable &&
                ((touchY > 0 && scrollTop === 0) || (touchY < 0 && Math.ceil(targetHeight + scrollTop + 2) >= Math.ceil(scrollHeight)))
            ) {
                e.preventDefault();
            }
        }
    },
    components: {
        hbSuccessModal
    }
};
</script>

<style lang="scss" scoped>
.body-wrapper {
    padding: 0.3rem;
    height: 100%;
}

.virtual-inner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.3rem;
    width: 100%;
    height: 3.8rem;
    background: #fdebd3;
    border-radius: 8px;
    box-shadow: 0px 0px 2px 2px #efefef2e;
    box-sizing: border-box;
    text-align: center;
    word-break: break-all;

    .inner-head {
        font-size: 0.32rem;
    }

    .inner-body {
        font-size: 0.28rem;
        max-height: 2.3rem;
        // overflow-y: auto;
        text-align: left;
        user-select: text;
        font-weight: bold;
    }

    .inner-desc {
        font-size: 0.24rem;
    }
}
</style>
