import { createRouter, createWebHashHistory } from "vue-router";


const Home = () => import('@/views/Home.vue')
const Employees = () => import('@/views/Employees.vue')
const Sections = () => import('@/views/Sections.vue')
const Responsive = () => import('@/views/Responsive.vue')
const SectionLayout = () => import('@/views/SectionLayout.vue')

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/employees',
        name: 'employees',
        component: Employees
    },
    {
        path: '/sections',
        name: 'sections',
        component: Sections
    },
    {
        path: '/responsive',
        name: 'responsive',
        component: Responsive
    }
    ,
    {
        path: '/sectionlayout',
        name: 'sectionlayout',
        component: SectionLayout
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

export default router;