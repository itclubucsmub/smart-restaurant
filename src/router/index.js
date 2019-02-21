import Vue from 'vue'
import VueRouter from 'vue-router'
import Order from '../components/Order.vue'
import Inventory from '../components/Inventory.vue'
import Category from '../components/Category.vue'
import Feedback from '../components/Feedback.vue'
import OrderDetail from '../components/OrderDetail.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name:'Order',
        component: Order
    },
    {
        path: '/inventory',
        component: Inventory
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/feedback',
        component: Feedback
    }, {
        path: '/orderdetail/:id',
        name: 'OrderDetail',
        component: OrderDetail
    }
]

const router = new VueRouter({
    routes
})

export default router