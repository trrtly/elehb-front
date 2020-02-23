import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

// import utils
import './utils';

// import Filter
import './utils/filter';

// import global directive
import './utils/directive/routeJump';

import './components/WmqModal/WmqModal.js';

// scroll polyfill
import smoothscroll from 'smoothscroll-polyfill';
// kick off the polyfill!
smoothscroll.polyfill();

// import vant components
import { Swipe, SwipeItem, Dialog, Field, Button, CountDown, Image, Overlay, Checkbox, CheckboxGroup, Skeleton, Toast } from 'vant';

Toast.setDefaultOptions({ position: 'bottom', duration: 3000 });

// import vue copy
import VueClipboard from 'vue-clipboard2';

// import axios
import './service/axios';

// import bemMixins
import bemMixins from './utils/mixins/bemMixins';
Vue.mixin(bemMixins);

Vue.use(Swipe)
    .use(SwipeItem)
    .use(Dialog)
    .use(Field)
    .use(Button)
    .use(CountDown)
    .use(Image)
    .use(Overlay)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Skeleton)
    .use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
