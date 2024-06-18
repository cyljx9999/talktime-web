// @ts-nocheck
import request from "@/utils/Request";
// 获取系统验证码
export const getSystemCodeApi = ()=>{
    return request.get("/talktime/getCaptcha")
}

// 发送手机验证码
export const sendPhoneCodeApi = (phone)=>{
    return request.post(`/talktime/sendPhoneCode/${phone}`)
}
// 登录
export const loginApi = (param)=>{
    return request.post("/login",param)
}
