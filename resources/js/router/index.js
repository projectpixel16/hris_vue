import { createRouter, createWebHistory } from "vue-router"; 

import notFound from '../pages/notFound.vue'
import home from '../pages/home.vue'
import seeker_apply from '../pages/application_form.vue'
import admin_dashboard from '../hr_admin/dashboard.vue'
import employee_list from '../hr_admin/employee_list.vue'
import employee_add from '../hr_admin/employee_add.vue'
import employee_profile from '../hr_admin/employee_profile.vue'
import applicants from '../hr_admin/applicant_list.vue'

const routes = [
    {
        path:'/',
        component: home,
    },

    {
        path:'/admin/dashboard',
        component: admin_dashboard,
    },
    {
        path:'/apply',
        component: seeker_apply,
    },
    {
        path:'/admin/applicants',
        component: applicants,
    },
    {
        path:'/admin/employee_list',
        component: employee_list,
    },

    {
        path:'/admin/employee_add',
        component: employee_add,
    },
    {
        path:'/admin/employee_profile',
        component: employee_profile,
    },
    {
        path:'/:pathMatch(.*)*',
        name:'notFound',
        component: notFound,
        meta:{
            requiresAuth:false
        }
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
