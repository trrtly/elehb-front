import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/Index.vue';

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
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
