import Vue from 'vue';

Vue.filter('currencyFormat', function toThousands(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
});
