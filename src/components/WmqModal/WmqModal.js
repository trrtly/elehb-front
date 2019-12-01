// 函数式调用Modal组件
import Vue from 'vue';
import WmqModal from './WmqModal.vue';

const WmqModalConstructor = Vue.extend(WmqModal);

let instance;

let getAnInstance = (propsData) => {
    if (instance) {
        instance.$destroy();
        instance.$el.remove();
    }
    instance = new WmqModalConstructor({
        el: document.createElement('div'),
        propsData: propsData
    });
    return instance;
};

let removeDom = (event) => {
    if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target);
    }
};

WmqModalConstructor.prototype.close = function() {
    this.$el.addEventListener('transitionend', removeDom);
    // returnAnInstance(this);
};

let Modal = (options = {}) => {
    let props = {
        title: options.title || '标题',
        text: options.text || '默认文字',
        closeOnClickOverlay: options.closeOnClickOverlay || false
    };

    let instance = getAnInstance(props);

    instance.$mount();
    document.body.appendChild(instance.$el);

    Vue.nextTick(function() {
        instance.innerShowFlag = true;
    });

    return instance;
};

Vue.prototype.$wmqModal = Modal;

export default Modal;
