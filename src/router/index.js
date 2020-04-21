import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from '../store'
import api from '../plugins/api'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/profile',
        name: 'Profile',
        meta: {
            requireAuth: true
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/user/Profile.vue')
    },
    {
        path: '/admin',
        name: 'Admin',
        meta: {
            requireAuth: true
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/admin/Admin.vue')
    },
    // {
    //   path: "/404",
    //   name: "notFound",
    //   component: notFound
    //   },
    {
        path: "*", // 此处需特别注意置于最底部
        redirect: "/"
    }
]




const router = new VueRouter({
    mode: "history",
    routes
})
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        var token = window.localStorage.getItem("token")
        if (token) {
            var user = api.getUser(token)
            if (to.path == "/admin" && user.Role != 1) {
                console.log("12121")
                next({
                    path: '/',
                    query: {
                        redirect: to.fullPath
                    }
                })
            }


        } else {
            next({
                path: '/',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    }
    next()


})
export default router