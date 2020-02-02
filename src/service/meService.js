import axios from 'axios';

const urls = {
    getMyQRCode: '/api/v1/user/poster'
};

export default {
    getMyQRCode() {
        return axios.get(urls.getMyQRCode);
    }
};
