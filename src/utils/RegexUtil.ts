// 正则校验手机号
export function regexPhone(phone){
   return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)
}
// 正则校验邮箱号
export function regexEmail(email){
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email)
}
