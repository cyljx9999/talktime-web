// @ts-nocheck
import request from "@/utils/Request";


// 获取个人信息
export const getPersonalApi = ()=>{
    return request.get(`/user/getPersonalInfo`)
}

// 修改个人信息
export const alterPersonalInfoApi = (params)=>{
    return request.put(`/user/alterPersonalInfo`,params)
}

// 修改个人账号
export const alterAccountApi = (params)=>{
    return request.put(`/user/alterAccount`,params)
}

// 获取个人隐私设置信息信息
export const getPrivacySettingInfoApi = ()=>{
    return request.get(`/user/getPersonalPrivacySetting`)
}

// 修改个人隐私设置信息信息
export const alterPrivacySettingInfoApi = (params)=>{
    return request.put(`/user/alterPersonalPrivacySetting`,params)
}
