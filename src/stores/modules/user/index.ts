import {defineStore} from 'pinia'
import {reactive} from "vue";
//定义store
export const userStore = defineStore('userStore', () => {
    const data = reactive({
        personalInfo: [],
        encryptStr: "",
        userId: 0,
        tokenValue: "",
        tokenName: "",
    })
    // 获取个人信息
    const getPersonalInfo = () => {
        return data.personalInfo
    }
    const getTokenInfo = () => {
        return {
            tokenValue: data.tokenValue,
            tokenName: data.tokenName,
        }
    }
    const setTokenInfo = (data) => {
        data.tokenValue = data
        data.tokenName = data
    }
    const setUserId = (userId) => {
        data.userId = userId
    }
    const setEncryptStr = (encryptStr) => {
        data.encryptStr = encryptStr
    }
    const initPersonalInfo = () => {
        // todo 获取用户信息
    }
    return {
        getPersonalInfo,
        getTokenInfo,
        setTokenInfo,
        setUserId,
        setEncryptStr,
        initPersonalInfo
    }

}, {
    persist: {
        enabled: true
    }
})
