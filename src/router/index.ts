import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/error/404.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name:"notFound"
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(){
        return { top: 0 , left: 0}
    }
})

export default router
