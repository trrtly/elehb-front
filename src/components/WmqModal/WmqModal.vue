<template>
    <van-dialog v-model="innerShowFlag" close-on-click-overlay :show-confirm-button="false" @closed="closeModal">
        <div slot="title" class="hb-modal-title">
            {{ title }}
            <van-icon class="hb-modal-close-btn" name="cross" @click="closeModal" />
        </div>
        <div class="hb-modal-body">
            <slot></slot>
        </div>
        <!-- <div style="padding: 0 0.4rem; margin-top: 0.4rem; margin-bottom: 0.62rem;">
            <div style="margin-bottom: 0.4rem;">
                <van-field class="valida-code-input van-hairline--surround" type="number" required clearable v-model="validaCode" placeholder="短信验证码" />
            </div>
            <van-button class="fz-32" block color="linear-gradient(to right, #6552ff, #2c3ffb)">立即领取</van-button>
        </div> -->
    </van-dialog>
</template>

<script>
import Vue from 'vue';
import { Dialog, Icon } from 'vant';

Vue.use(Dialog).use(Icon);

export default {
    name: 'hbModal',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: {
            required: true,
            type: String
        }
    },
    model: {
        prop: 'show',
        event: 'returnBack'
    },
    data() {
        return {
            innerShowFlag: this.show
        };
    },
    methods: {
        closeModal() {
            this.innerShowFlag = false;
            this.$emit('returnBack', this.innerShowFlag);
        }
    },
    watch: {
        show(v) {
            this.innerShowFlag = v;
        }
    }
};
</script>

<style scoped>
.hb-modal-title {
    position: relative;
}

.hb-modal-body {
    padding: 0.4rem 0.4rem 0.62rem;
}

.hb-modal-close-btn {
    position: absolute;
    top: -0.25rem;
    right: 0.15rem;
    color: #ababab;
    font-size: 0.35rem;
}
</style>
