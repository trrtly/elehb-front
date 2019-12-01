<template>
    <van-dialog v-model="innerShowFlag" :close-on-click-overlay="closeOnClickOverlay" :show-confirm-button="false" @closed="closeModal">
        <div slot="title" class="hb-modal-title">
            {{ title }}
            <van-icon class="hb-modal-close-btn" name="cross" @click="closeModal" />
        </div>
        <div class="hb-modal-body" v-html="text">
            <slot></slot>
        </div>
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
        },
        text: String,
        closeOnClickOverlay: {
            type: Boolean,
            default: false
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
    text-align: center;
}

.hb-modal-close-btn {
    position: absolute;
    top: -0.25rem;
    right: 0.15rem;
    color: #ababab;
    font-size: 0.35rem;
}
</style>
