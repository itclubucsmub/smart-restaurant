import Vue from 'vue'
import VueRouter from 'vue-router'
import Order from '../components/Order.vue'
import Inventory from '../components/Inventory.vue'
import Category from '../components/Category.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Order
    },
    {
        path: '/inventory',
        component: Inventory
    },
    {
        path: '/category',
        component: Category
    }
]

const router = new VueRouter({
    routes
})

export default router