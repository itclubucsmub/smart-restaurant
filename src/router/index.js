import Vue from 'vue'
import VueRouter from 'vue-router'
import Order from '../components/Order.vue'

import TableOrder from '../components/TableOrder.vue'
import Inventory from '../components/Inventory.vue'
import Category from '../components/Category.vue'
import Feedback from '../components/Feedback.vue'
import OrderDetail from '../components/OrderDetail.vue'

import OrderDetailTable from '../components/OrderDetailTable.vue'
import OrderHistory from '../components/OrderHistory.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Order',
        component: Order
    },
    {
        path: '/tableOrder',
        name: 'TableOrder',
        component: TableOrder
    },
    {
        path: '/tableOrderDetail',
        name: 'TableOrderDetail',
        component: OrderDetailTable
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
    },
    {
        path: '/orderdetail/:id',
        name: 'OrderDetail',
        component: OrderDetail
    },
    {
        path: '/orderhistory',
        name: 'OrderHistory',
        component: OrderHistory
    }
]

const router = new VueRouter({
    routes
})

export default router