// @ts-nocheck
import {defineStore} from 'pinia'
import {reactive} from "vue";
//定义store
export const chatStore = defineStore('chatStore', () => {
    const data = reactive({
        currentMenuActive: 'chat',

    })

    /**
     * 更新菜单激活状态
     * @param type 菜单类型
     */
    const updateMenuActive = (type) =>{
        data.currentMenuActive = type
    }

    return {
        data,
        updateMenuActive
    }
})
