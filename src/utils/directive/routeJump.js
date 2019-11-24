/**
 * 跳转到指定路由directive
 * 节点上 v-route-jump="xxx路由路径"
 */

import Vue from 'vue';

let clickFunction;

Vue.directive('routeJump', {
    bind(el, binding, vnode) {
        const path = binding.value;
        const vm = vnode.context;

        clickFunction = () => {
            path && vm.$router.push(path);
        };

        el.addEventListener('click', clickFunction);
    },
    unbind() {
        removeEventListener('click', clickFunction);
    }
});
