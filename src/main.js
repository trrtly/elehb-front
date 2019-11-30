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

Vue.config.productionTip = false;

// import vant components
import { Swipe, SwipeItem, Dialog, Field, Button, CountDown, Toast } from 'vant';

// import vue copy
import VueClipboard from 'vue-clipboard2';

Vue.use(Swipe)
    .use(SwipeItem)
    .use(Dialog)
    .use(Field)
    .use(Button)
    .use(CountDown)
    .use(VueClipboard);

// Toast默认配置
Toast.setDefaultOptions({ position: 'bottom' });
Vue.prototype.$toast = Toast;

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
