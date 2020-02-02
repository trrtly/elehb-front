import axios from 'axios';

const urls = {
    getFriends: '/api/v1/invite/records'
};

export default {
    getFriends(data) {
        return axios.get(urls.getFriends, {
            params: data
        });
    }
};
