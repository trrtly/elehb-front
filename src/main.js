import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// import utils
import './utils';

// import Filter
import './utils/filter';

// import global directive
import './utils/directive/routeJump';

import './components/WmqModal/WmqModal.js';

Vue.config.productionTip = false;

// import vant components
import { Swipe, SwipeItem, Dialog, Field, Button, CountDown } from 'vant';

// import vue copy
import VueClipboard from 'vue-clipboard2';

// import axios
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Swipe)
    .use(SwipeItem)
    .use(Dialog)
    .use(Field)
    .use(Button)
    .use(CountDown)
    .use(VueClipboard)
    .use(VueAxios, axios);

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
