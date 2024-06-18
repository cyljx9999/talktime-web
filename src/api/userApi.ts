// @ts-nocheck
import request from "@/utils/Request";


// 获取个人信息
export const getPersonalApi = ()=>{
    return request.get(`/user/getPersonalInfo`)
}
