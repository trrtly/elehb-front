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

Vue.prototype.smoothScroll = function(position) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            return setTimeout(callback, 17);
        };
    }
    // 当前滚动高度
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    if (position === scrollTop) return;

    // 滚动step方法
    let step = function() {
        // 距离目标滚动距离
        let distance = position - scrollTop;
        // 目标滚动位置
        scrollTop = scrollTop + distance / 5;
        if (Math.abs(distance) < 1) {
            window.scrollTo(0, position);
        } else {
            window.scrollTo(0, scrollTop);
            window.requestAnimationFrame(step);
        }
    };
    step();
};
