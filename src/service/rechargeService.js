import axios from 'axios';

const urls = {
    getRechargeList: '/api/v1/scores',
    createOrder: '/api/v1/pay'
};

export default {
    getRechargeList() {
        return axios.get(urls.getRechargeList);
    },
    // 订单支付
    createOrder(data) {
        return axios.post(urls.createOrder, data);
    }
};
