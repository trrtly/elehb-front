import Vue from 'vue';
import { Toast } from 'vant';

Vue.prototype.$toast = Toast;

// Toast默认配置
Toast.setDefaultOptions({ position: 'bottom', confirmButtonColor: '#2f5ee3' });

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

Vue.prototype.isPhoneNum = function(num) {
    return /^1(3|4|5|7|8)\d{9}$/.test(num);
};
