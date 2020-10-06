import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/NewIndex.vue';
import { beforeEnter } from './guard.js';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
        meta: {
            showBar: true
        }
    },
    {
        path: '/me',
        name: 'me',
        component: () => import(/* webpackChunkName: "me" */ '../views/Me.vue'),
        meta: {
            showBar: true
        }
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
    },
    {
        path: '/comment',
        name: 'comment',
        component: () => import(/* webpackChunkName: "comment" */ '../views/AutoComment.vue')
    },
    {
        path: '/setting',
        name: 'setting',
        component: () => import(/* webpackChunkName: "setting" */ '../views/Setting.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

// 全局前置守卫导航
router.beforeEach(beforeEnter.bind(router));

export default router;
