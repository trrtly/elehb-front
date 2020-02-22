<template>
    <van-dialog
        :class="bem()"
        v-model="innerShowFlag"
        :close-on-click-overlay="closeOnClickOverlay"
        :show-confirm-button="showConfirmButton"
        :show-cancel-button="showCancelButton"
        :confirm-button-text="confirmButtonText"
        :cancel-button-text="cancelButtonText"
        @closed="closeModal"
        @confirm="confirm"
        @cancel="cancel"
        :before-close="beforeClose"
        ref="dialog"
    >
        <div slot="title" :class="bem('title')">
            {{ title }}
            <van-icon :class="bem('close-btn')" name="cross" @click="crossClose" />
        </div>
        <div :class="bem('body')">
            <template v-if="text">
                <div v-html="text"></div>
            </template>
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
        },
        showConfirmButton: {
            type: Boolean,
            default: false
        },
        showCancelButton: {
            type: Boolean,
            default: false
        },
        confirmButtonText: String,
        cancelButtonText: String,
        confirm: {
            type: Function,
            default: () => {}
        },
        cancel: {
            type: Function,
            default: () => {}
        },
        beforeClose: {
            type: Function,
            default: (action, done) => {
                done();
            }
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
        crossClose() {
            const action = 'closeCross';
            const _dialog = this.$refs.dialog;
            _dialog.beforeClose(action, (state) => {
                if (state !== false) {
                    _dialog.onClose(action);
                }
            });
        },
        closeModal() {
            this.innerShowFlag = false;
        }
    },
    watch: {
        show(v) {
            this.innerShowFlag = v;
        },
        innerShowFlag(v) {
            this.$emit('returnBack', v);
        }
    }
};
</script>

<style lang="scss" scoped>
.hb-modal {
    @include element('title') {
        position: relative;
    }

    @include element('body') {
        padding: 0.4rem 0.4rem 0.62rem;
        text-align: center;
    }

    @include element('close-btn') {
        position: absolute;
        top: -0.25rem;
        right: 0.15rem;
        color: #ababab;
        font-size: 0.35rem;
    }
}
</style>
