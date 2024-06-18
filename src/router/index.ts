// @ts-nocheck
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        "path": "/",
        redirect: "/login"
    },
    {
        "path": "/chat",
        "name": "chat",
        "component": () => import('@/views/chat/Chat.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/NotFound.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: "notFound"
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return {top: 0, left: 0}
    }
})

export default router
