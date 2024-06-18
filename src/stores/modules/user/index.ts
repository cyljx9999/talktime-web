// @ts-nocheck
import {defineStore} from 'pinia'
import {reactive} from "vue";
import {getPersonalApi} from "../../../api/userApi.ts";
import {rsaDecrypt} from "../../../utils/JSEncryptUtil.ts";
//定义store
export const userStore = defineStore('userStore', () => {
    const data = reactive({
        personalInfo: [],
        encryptStr: localStorage.getItem('encryptStr'),
        userId: localStorage.getItem('userId'),
        tokenValue: localStorage.getItem('tokenValue'),
        tokenName: localStorage.getItem('tokenName'),
    })
    // 获取个人信息
    const getPersonalInfo = () => {
        return rsaDecrypt(data.encryptStr)
    }
    const getTokenInfo = () => {
        return {
            tokenValue: data.tokenValue,
            tokenName: data.tokenName,
        }
    }
    const setTokenInfo = (info) => {
        localStorage.setItem('tokenValue', info.tokenValue)
        localStorage.setItem('tokenName', info.tokenName)
    }
    const setUserId = (userId) => {
        localStorage.setItem('userId', userId)
    }
    const setEncryptStr = (encryptStr) => {
        localStorage.setItem('encryptStr', encryptStr)
    }
    const initPersonalInfo = () => {
        // 获取用户信息
        getPersonalApi().then(res => {
            localStorage.setItem('encryptStr', res.data)
        });
    }
    return {
        getPersonalInfo,
        getTokenInfo,
        setTokenInfo,
        setUserId,
        setEncryptStr,
        initPersonalInfo,
        data
    }
})
