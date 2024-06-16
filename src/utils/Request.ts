import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders} from "axios";
import {ElMessage, ElMessageBox} from 'element-plus';
import router from '@/router/index'
import {ResultEnum} from "@/utils/Enum";
import {loginStore} from "@/stores/modules/login";
import {h} from "vue";
//axios请求配置
const config = {
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10000
}
let flag = null

class Request {
    //axios实例
    private instance;

    //构造函数里面初始化
    constructor(config) {
        this.instance = axios.create(config)

        //定义拦截器
        this.interceptors(config)
    }

    //拦截器
    private interceptors(config) {
        //axios发送请求之前的处理
        this.instance.interceptors.request.use(config => {
            const useLoginStore = loginStore()
            //在请求头部携带token
            let tokenValue = useLoginStore.tokenValue
            let tokenName = useLoginStore.tokenName
            if (tokenValue) {
                config.headers![tokenName] = tokenValue
            }
            if (config.url == "/user/getExcelTemplate" || config.url == "/user/exportExcel") {
                config.responseType = 'blob'
                flag = false
            } else {
                flag = true
            }
            return config;
        }, (error: any) => {
            error.data = {}
            error.data.msg = '服务器异常，请联系管理员!'
            return error;
        })
        //axios请求返回之后的处理
        //请求返回之后的处理
        this.instance.interceptors.response.use(response => {
            let res = response.data
            if (!res) {
                ElMessage.error('系统异常')
                return Promise.reject('系统异常')
            }
            if (!flag) {
                return res
            }
            if (res.code != ResultEnum.SUCCESS) {
                switch (res.code) {
                    case ResultEnum.NO_PERMISSION:
                        ElMessage.error(res.msg || '暂无权限')
                        break
                    case ResultEnum.ERROR:
                        ElMessage.error(res.msg || '请求失败，请联系管理员处理')
                        break
                    case ResultEnum.ERROR_OTHER:
                        let list = []
                        for (const [key, value] of Object.entries(res.data)) {
                            let str = h('p', null, `${key} : ${value} `)
                            list.push(str)
                        }
                        ElMessageBox({
                            title: '系统提示',
                            message: h('p', null, list),
                        }).then(() => {
                        })
                        break
                    case ResultEnum.NOT_TOKEN:
                        ElMessageBox.confirm("当前身份凭证已过期请重新登录", '系统提示', {
                            confirmButtonText: '确定',
                            type: 'warning'
                        }).then(() => {
                            router.push("/login").then(() => {
                            })
                        });
                        break
                    case ResultEnum.INVALID_TOKEN:
                        ElMessageBox.confirm("当前身份凭证已过期请重新登录", '系统提示', {
                            confirmButtonText: '确定',
                            type: 'warning'
                        }).then(() => {
                            router.push("/login").then(() => {
                            })
                        });
                        break
                    case ResultEnum.TOKEN_TIMEOUT:
                        ElMessageBox.confirm("当前身份凭证已过期请重新登录", '系统提示', {
                            confirmButtonText: '确定',
                            type: 'warning'
                        }).then(() => {
                            router.push("/login").then(() => {
                            })
                        });
                        break
                    case ResultEnum.BE_REPLACED:
                        ElMessageBox.confirm("当前账号已在异地登录，如果不是本人操作，请立即修改密码，避免出现损失", '系统提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '修改密码',
                            type: 'warning'
                        }).then(() => {
                            router.push("/login").then(() => {
                            })
                        }).catch(() => {
                            router.push("/updatePassword").then(() => {
                            })
                        });
                        break
                    case ResultEnum.KICK_OUT:
                        ElMessageBox.confirm("当前账号出现违规行为，已被管理员强制下线", '系统提示', {
                            confirmButtonText: '确定',
                            type: 'warning'
                        }).then(() => {
                            router.replace("/login").then(() => {
                            })
                        });
                        break
                    case ResultEnum.TOKEN_ERROR:
                        ElMessageBox.confirm("当前身份凭证已过期请重新登录", '系统提示', {
                            confirmButtonText: '确定',
                            type: 'warning'
                        }).then(() => {
                            router.replace("/login").then(() => {
                            })
                        });
                        break
                    default:
                        ElMessage.error(res.msg || '请求失败，请联系管理员处理')
                }
                return Promise.reject(res.msg || '服务器出错')
            } else {
                return res
            }
        }, (error) => {
            if (error && error.response) {
                let status = error.response.status
                switch (status) {
                    case 404:
                        ElMessage.error('系统未知请求路径，请检查后重试')
                        break
                    default:
                        ElMessage.error('请求失败，请联系管理员处理')
                }
            } else {
                ElMessage.error("系统未知异常，请联系管理员")
            }
            return Promise.reject(error)
        })
    }

    /* GET 方法 */
    get<T>(url: string, params?: object): Promise<T> {
        return this.instance.get(url, {params})
    }

    /* POST 方法 */
    post<T>(url: string, data?: object): Promise<T> {
        return this.instance.post(url, data)
    }

    /* PUT 方法 */
    put<T>(url: string, data?: object): Promise<T> {
        return this.instance.put(url, data)
    }

    /* DELETE 方法 */
    delete<T>(url: string): Promise<T> {
        return this.instance.delete(url)
    }

    //上传
    upload<T>(url: string, params?: object): Promise<T> {
        return this.instance.post(url, params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export default new Request(config)
