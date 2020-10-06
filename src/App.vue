<template>
    <div id="app" ref="appWrapper">
        <router-view />

        <van-tabbar v-if="$route.meta.showBar" class="home-bar" route>
            <van-tabbar-item replace to="/">
                <span>首页</span>
                <template #icon="props">
                    <img :src="props.active ? barIcon.index.active : barIcon.index.inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/me">
                <span>我的</span>
                <template #icon="props">
                    <img :src="props.active ? barIcon.me.active : barIcon.me.inactive" />
                </template>
            </van-tabbar-item>
        </van-tabbar>

        <!-- 客服弹层 -->
        <hb-modal class="kefu-modal" :show.sync="kefuShow" :beforeClose="kefuBeforeClose" title="请长按识别二维码">
            <van-image :src="platformInfo.kfImg" style="width: 3.1rem; height: 3.1rem;" />
        </hb-modal>

        <!-- 我的邀请码弹窗 -->
        <van-overlay :show="myQRShow" @click="$store.commit('changeMyQR', false)">
            <van-image class="my-qr-code" :src="myQRCode" @click.stop />
        </van-overlay>
    </div>
</template>

<script>
import 'reset-css'; // reset-css
import commonService from '@/service/commonService';
import WmqModal from '@/components/WmqModal/WmqModal.vue';
import { Overlay } from 'vant';
import { mapState } from 'vuex';

export default {
    async created() {
        // 获取平台信息
        const res = await commonService.fetchSetPlatformInfo();
        document.title = res.name;

        this.$store.dispatch('fetchSetMyQR');
    },
    computed: {
        ...mapState(['platformInfo', 'myQRShow', 'myQRCode']),
        kefuShow: {
            get() {
                return this.$store.state.kefuShow;
            },
            set(val) {
                this.$store.state.kefuShow = val;
            }
        }
    },
    data() {
        return {
            barIcon: {
                index: {
                    active:
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzRBRjc1MTZFNUY2MTFFQThBMjNEQzQ5MEM5QTk4RDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzRBRjc1MTdFNUY2MTFFQThBMjNEQzQ5MEM5QTk4RDUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDNDYyNzFCMUU1RjYxMUVBOEEyM0RDNDkwQzlBOThENSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDNDYyNzFCMkU1RjYxMUVBOEEyM0RDNDkwQzlBOThENSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgCViBEAAAcCSURBVHja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',
                    inactive:
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAoCAYAAACIC2hQAAABqElEQVRYhe3YPU7DMBQH8H9RmR3UG9AjpF/sLAxcgBswI8FYwZUYytfODnOYEIKFihOAHnpPICdO4vglbqX8pzZxnn+xU8XuIMsyKGYM4JjLXQNQK64JPQCwAmD4+xeAIwCPGsV3NIoAWFhI8OcV30BwNKCEvLGQNnYRGzovQUoMtwnChkAJeVuBlAh23rSzptCZB1Ji+JpG2CZQQt55IiWNsb7QaQBSItiZz0U+UELeByIlhm94WveCulBNpMRwzVrYOtBJC0hJbWwVlJAPLSElgp2UNSqDdoGUGO7LiXVB25xuV0qxRVBBJh0iJc7HwIamEZGSpAj7H5ry0MdESgSbygGBbsJI2kl44H6xBB3xW2Jvg5CShG0jgg6tX/dVXFvOQLZdgn4AOAXwDOAMwDIiULJkyxPb3l2bu+8ovL8M7ANam7vWszXQoVKdl4rz+6EdaEHHFeeDn/n+GdVOD9VOD9VOD9XO1r9C154Lac1F97rooAtK/xKfeBT/bGZy9p2La+ovaLGq2HndUJ/nRY1dI/rKmypaaR92sJ+i6aaN3CWAt9xZAD9HU0eQfKqtyQAAAABJRU5ErkJggg=='
                },
                me: {
                    active:
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDhDMDRBRjZFNUY2MTFFQThBMjNEQzQ5MEM5QTk4RDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDhDMDRBRjdFNUY2MTFFQThBMjNEQzQ5MEM5QTk4RDUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEOEMwNEFGNEU1RjYxMUVBOEEyM0RDNDkwQzlBOThENSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEOEMwNEFGNUU1RjYxMUVBOEEyM0RDNDkwQzlBOThENSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvKUmakAAAd6SURBVHja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',
                    inactive:
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDYyQTlDOTdFNUY2MTFFQThBMjNEQzQ5MEM5QTk4RDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDYyQTlDOThFNUY2MTFFQThBMjNEQzQ5MEM5QTk4RDUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENjJBOUM5NUU1RjYxMUVBOEEyM0RDNDkwQzlBOThENSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpENjJBOUM5NkU1RjYxMUVBOEEyM0RDNDkwQzlBOThENSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrpaRi0AAAJzSURBVHjazJlBSBRhFMdna6m1LNIOJpu2QniqCJSiRFEIEkIIDworXoUEPdiWVNChg0FL0NKlk6EHE9mgSNluQguioBeNcIUlgw2KCpU1MnHD/wdvYTDF2fnem5kHv4t8883PN9/35s23/nQ6bTDGEXAK/AXfwRbXxAcY5lBiD8EcWAfqP8+ATfARPAJB3Zv4NDJ6ENwBD0DxPmP/gMdgAOSczKh6xON082IL44sosxN0rSOiPjAImm1cex28pDnERXtAu8ZyawO90mv0OPgCTmjujVUQAmtSGQ0zSBo0R1jy0bcw1twWSdFqRtELkqJBRtEyp99MdmNLUjTDKJqRFJ1hFJ2WFB1jFI1Liqp39SKDZAq8kxT9B7rtdkAU6tpbNJforp8EtzVEIzSHI21eDNwtMLM5uuaZ0x1+FNSBpIWxSRobtXszv+amUOWqAVwGN8EVUEEd/Vf6FHkLPujuPj9TqZlhrrFioualVEod/ArnV6iO6HnQSI/9HDgNTu4YkwW/wBKYB1O0Xn9Kd/g1oBO00lq0W0fVMnkFRq1KWxVVH2X3aeNwxgYYBk/oPMB2eboKZsF7AUkVAdAFPoGn4GihogGqeUl63NJxCPSBBXDJqmiIshhxobGuoprbtt+uP0sDy13s/A+DEWpa4rtltAQkXJbMhzrXGqIS+J/oc8qoV0KdUb3IH//kRS8WeiDgUKiqc80s2m3YOLhyKDrMok2Gd6PeLBrysOgZs2jWw6K/zaJvPCyaMIv2M30Gc8c3cM8s+oP6yphHloF6K70GteDzXm3eMXCDuiX1Zqikv0nGOiUrRc21+iFjWadxdi22BRgARdZ/VeKwTxkAAAAASUVORK5CYII='
                }
            }
        };
    },
    methods: {
        kefuBeforeClose() {
            this.$store.commit('changeKefuShow', false);
        }
    },
    components: {
        vanOverlay: Overlay,
        HbModal: WmqModal
    }
};
</script>

<style lang="scss">
@font-face {
    font-family: 'DIN Medium';
    src: url('./assets/font/DIN_Medium.ttf');
}

html,
body,
#app {
    display: flex;
    flex-direction: column;
    height: 100%;
    // min-height: 100%;
    background: #fff;
}

#app > div {
    overflow-y: scroll;
}

body {
    font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', Arial, sans-serif;
    user-select: none;
    font-size: 0.16rem;
}

.din-font {
    font-family: 'DIN Medium';
}

.font-bold {
    font-weight: bold;
}

/* overWrite vant ui Swipe css */
/* swiper indicator */
#app {
    .van-swipe__indicators {
        bottom: 30px;
    }

    .home-bar {
        box-shadow: 0 0px 2px #aaaaaa61;
        z-index: 9999;
    }

    .van-tabbar-item__icon img {
        height: 45px;
    }
}

#app .van-swipe__indicator {
    width: 0.2rem;
    height: 0.06rem;
    border-radius: 0;
    background: url('./assets/index/swipe-indicator-no@2x.png') no-repeat;
    background-size: contain;
}

#app .van-swipe__indicator--active {
    width: 0.3rem;
    background: url('./assets/index/swipe-indicator-active@2x.png') no-repeat;
    background-size: contain;
}

/* overWrite vant ui Dialog css */
#app .van-dialog {
    border-radius: 0.1rem;
}

/* overWrite vant ui Cell css */
#app .van-cell:not(:last-child)::after {
    right: 0.28rem;
    border-bottom-color: #e6e6e6;
}

/* overWrite vant field required */
.van-cell--required::before {
    content: '';
}

.van-cell__title {
    flex: 2;
}

/* common */
.fz-40 {
    font-size: 0.4rem;
}

.fz-36 {
    font-size: 0.36rem;
}

.fz-32 {
    font-size: 0.32rem;
}

.fz-28 {
    font-size: 0.28rem;
}

.fz-24 {
    font-size: 0.24rem;
}

.flex {
    display: flex;
}

.flex-vertical {
    @extend .flex;
    align-items: center;
}

/* modal */
.modal-title {
    font-size: 0.3rem;
    font-weight: bold;
}

a {
    color: #2f5ee3;

    &:visited {
        color: #2f5ee3 !important;
    }
}

.my-qr-code {
    position: absolute;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
}

.kefu-modal {
    width: auto;
    overflow-y: hidden !important;

    /deep/ .hb-modal__body {
        padding: 0.4rem 0.9rem 0.6rem;
    }
}
</style>
