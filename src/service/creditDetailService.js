import axios from 'axios';

const urls = {
    getCreditDetail: '/api/v1/score/records'
};

export default {
    getCreditDetail(data) {
        return axios.get(urls.getCreditDetail, {
            params: data
        });
    }
};
