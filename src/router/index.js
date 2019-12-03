import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/Index.vue';
import Guard from './guard.js';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/me',
        name: 'me',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "me" */ '../views/Me.vue')
    },
    {
        path: '/recharge',
        name: 'recharge',
        component: () => import(/* webpackChunkName: "recharge" */ '../views/Recharge.vue')
    },
    {
        path: '/brokerage',
        name: 'brokerage',
        component: () => import(/* webpackChunkName: "brokerage" */ '../views/BrokerageDetail.vue')
    },
    {
        path: '/friends',
        name: 'friends',
        component: () => import(/* webpackChunkName: "friends" */ '../views/Friends.vue')
    },
    {
        path: '/credit',
        name: 'credit',
        component: () => import(/* webpackChunkName: "credit" */ '../views/CreditDetail.vue')
    }
];

const router = new VueRouter({
    // mode: 'history',
    routes
});

// 全局前置守卫导航
router.beforeEach(Guard.bind(router));

export default router;
