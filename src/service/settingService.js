import axios from 'axios';

const urls = {
    getUserSetting: '/api/v1/user/setting'
};

export default {
    getUserSetting() {
        return axios.get(urls.getUserSetting);
    },
    setUserSetting(data) {
        return axios.post(urls.getUserSetting, data);
    }
};
