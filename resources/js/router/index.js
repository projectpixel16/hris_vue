import { createRouter, createWebHistory } from "vue-router";


import notFound from '../pages/notFound.vue'
import home from '../pages/home.vue'
import seeker_apply from '../pages/application_form.vue'
import admin_dashboard from '../hr_admin/dashboard.vue'
import employee_list from '../hr_admin/employee_list.vue'
import employee_add from '../hr_admin/employee_add.vue'
import employee_profile from '../hr_admin/employee_profile.vue'

// filing UI
import filing_dashboard from '../efiling/dashboard.vue'
import document_form from '../efiling/document_form.vue'
import document_list from '../efiling/document_list.vue'
import document_update from '../efiling/document_update.vue'
import document_view from '../efiling/document_view.vue'
import master_users from '../efiling/masterfile/users.vue'
import master_departments from '../efiling/masterfile/departments.vue'
import master_company from '../efiling/masterfile/company.vue'

// CVF UI
import cvf_dashboard from '../cvf/dashboard.vue'

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

    {
        path:'/filing/dashboard',
        component: filing_dashboard,
    },

    {
        path:'/filing/form',
        component: document_form,
    },
    {
        path:'/filing/document_list',
        component: document_list,
    },
    {
        path:'/filing/document_view',
        component: document_view,
    },
    {
        path:'/filing/document_update',
        component: document_update,
    },
    {
        path:'/filing/users',
        component: master_users,
    },
    {
        path:'/filing/departments',
        component: master_departments,
    },
    {
        path:'/filing/company',
        component: master_company,
    },

    {
        path:'/cvf/dashboard',
        component: cvf_dashboard,
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
