import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// import commonUtils
// import './utils/commonUtils';

// import global directive
import './utils/directive/routeJump';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
