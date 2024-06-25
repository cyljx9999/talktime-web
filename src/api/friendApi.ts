// @ts-nocheck
import request from "@/utils/Request";


// 获取好友列表
export const getFriendListApi = ()=>{
    return request.get(`/user/getFriendList`)
}
