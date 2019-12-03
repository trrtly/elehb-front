// import commonService from '../service/commonService';

export default async function(to, from, next) {
    // 判断一下有没有微信授权
    // let query = to.query;

    // let userCode = localStorage.getItem('userCode');

    // if (!query.code || !userCode) {
    //     // 如果code不存在
    //     window.location.href = commonService.validateHref();
    // } else {
    //     this.app.$toast(query.code || userCode);
    //     localStorage.setItem('userCode', query.code);
    next();
    // }

    // await commonService.validateLogin();
    // document.write(data.data);
}
