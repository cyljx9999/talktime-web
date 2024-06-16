import Cookies from 'js-cookie'

// 写入cookie并设置有效期
export function setCookie(key,value,second){
    let expiresTime = new Date(new Date() * 1 + second * 1000);
    Cookies.set(key, value, { expires: expiresTime });
}

// 根据key获取
export function getCookie(key){
    return Cookies.get(key)
}

// 根据key删除
export function deleteCookie(key){
    return Cookies.remove(key)
}
