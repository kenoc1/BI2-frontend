import {createRouter, createWebHistory} from 'vue-router'

import store from '../store'

import Home from '../views/Home.vue'

import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import Cart from '../views/Cart.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import MyAccount from '../views/MyAccount.vue'
import Checkout from '../views/Checkout.vue'
import Success from '../views/Success.vue'
import AppLogIn from "../views/AppLogIn.vue";
import storageHelper from "storage-helper";


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminDashboard.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/log-in',
        name: 'LogIn',
        component: LogIn,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/app-login',
        name: 'AppLogIn',
        component: AppLogIn
    },
    {
        path: '/my-account',
        name: 'MyAccount',
        component: MyAccount,
        meta: {
            requiresAuth: true,
            requireLogin: true
        }
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/cart/success',
        name: 'Success',
        component: Success,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/cart/checkout',
        name: 'Checkout',
        component: Checkout,
        meta: {
            requiresAuth: true,
            requireLogin: true
        }
    },
    {
        path: '/:category_slug/:product_slug',
        name: 'Product',
        component: Product,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/:category_slug',
        name: 'Category',
        component: Category,
        meta: {
            requiresAuth: true,
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
        next({name: 'LogIn', query: {to: to.path}});
    } else {
        next()
    }
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (!storageHelper.getItem('user-password')) next('/app-login')
        else next()
    } else next()
})


export default router
