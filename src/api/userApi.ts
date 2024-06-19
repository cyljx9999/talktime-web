// @ts-nocheck
import request from "@/utils/Request";


// 获取个人信息
export const getPersonalApi = ()=>{
    return request.get(`/user/getPersonalInfo`)
}

// 获取修改个人信息
export const alterPersonalInfoApi = (params)=>{
    return request.put(`/user/alterPersonalInfo`,params)
}

// 获取修改个人账号
export const alterAccountApi = (params)=>{
    return request.put(`/user/alterAccount`,params)
}
