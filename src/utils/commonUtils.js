import Vue from 'vue';

// 复制内容到剪贴板
Vue.prototype.copyText = function(text) {
    let vm = this.$root; // root Vm
    vm.$copyText(text).then(
        () => {
            vm.$toast('复制成功');
        },
        () => {
            vm.$toast('复制失败');
        }
    );
};
