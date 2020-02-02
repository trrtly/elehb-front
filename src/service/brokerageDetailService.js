import axios from 'axios';

const urls = {
    getBrokerage: '/api/v1/cms/records',
    withDraw: '/api/v1/user/withdraw'
};

export default {
    getBrokerage(data) {
        return axios.get(urls.getBrokerage, {
            params: data
        });
    },
    withDraw() {
        return axios.post(urls.withDraw);
    }
};
