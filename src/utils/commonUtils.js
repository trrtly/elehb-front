import Vue from 'vue';
import { Toast } from 'vant';

Vue.prototype.$toast = Toast;

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

export const formatTime = function(nowDate) {
    if (!(nowDate instanceof Date)) {
        nowDate = new Date(nowDate);
    }

    let year = nowDate.getFullYear();
    let month = nowDate.getMonth() + 1 < 10 ? `0${nowDate.getMonth() + 1}` : nowDate.getMonth() + 1;
    let day = nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate();
    let hours = nowDate.getHours() < 10 ? `0${nowDate.getHours()}` : nowDate.getHours();
    let minutes = nowDate.getMinutes() < 10 ? `0${nowDate.getMinutes()}` : nowDate.getMinutes();

    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

Vue.prototype.formatTime = formatTime;
