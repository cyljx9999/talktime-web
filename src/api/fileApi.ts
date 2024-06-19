// @ts-nocheck
import request from "@/utils/Request";


// 获取预请求上传地址
export const getPreSignedUrlApi = (params)=>{
    return request.post(`/file/getPreSignedUrl`,params)
}
