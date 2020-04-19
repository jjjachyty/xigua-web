const proxy = require('http-proxy-middleware');

module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],

    devServer: {
        proxy: 'http://192.168.101.98'

    }





}