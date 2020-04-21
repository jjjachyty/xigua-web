import Vue from 'vue'
import Vuex from 'vuex'
import api from '../plugins/api'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: "",
        user: {}
    },
    mutations: {
        ["LOGIN_OUT"](state, {
            tree
        }) {
            state.token = ""
            window.localStorage.removeItem("token")
        },
        ["LOGIN_IN"](state,
            token
        ) {
            state.token = token
            state.user = api.getUser(token)

            window.localStorage.setItem("token", token)
                // console.log("111", window.localStorage.getItem("token"))



        },
    },
    actions: {
        loginout({
            commit
        }) {
            commit("LOGIN_OUT", {})
        },
    },
    modules: {}
})