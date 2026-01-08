import { createRouter, createWebHistory } from "vue-router";


import notFound from '../pages/notFound.vue'
import home from '../pages/home.vue'


const routes = [
    {
        path:'/',
        component: home,
    },
    {
        path:'/:pathMatch(.*)*',
        name:'notFound',
        component: notFound,
        meta:{
            requiresAuth:false
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
