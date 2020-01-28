import axios from 'axios';

const urls = {
    getRechargeList: '/api/v1/scores'
};

export default {
    async getRechargeList() {
        return axios.get(urls.getRechargeList);
    }
};
