// export const base_url = "http://127.0.0.1:9090/xg"; //"http://47.98.148.191";

import qs from 'qs'
import jwtDecode from 'jwt-decode'



export default {
    base_url: "http://47.98.148.191:9090/xg",
    get(url, {
        params,
        token,
        router,
    }) {
        return fetch(this.base_url + url + "?" + qs.stringify(params), {
                method: "get",
                withCredentials: true,
                headers: {
                    Authorization: token
                }
            })
            .then(res => {
                console.log("res=", res);
                if (res.status == 403) {
                    router.push({
                        path: "/"
                    });
                }
                return res.json();
            })
            .then(res => {
                return res;
            }).catch((e) => {
                console.error(e);
            })

    },
    post(url, {
        params,
        token,
        router,
    }) {
        return fetch(this.base_url + url, {
                method: "post",
                withCredentials: true,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: token
                },
                body: qs.stringify(params)
            })
            .then(res => {
                console.log("res=", res);
                if (res.status == 403) {
                    router.push({
                        path: "/"
                    });
                }
                return res.json();
            })
            .then(res => {
                return res;
            }).catch((e) => {
                console.error(e);
            })

    },
    getUser(token) {
        var decoded = jwtDecode(token);
        return decoded;
    }
}