// 拷贝参数
import {ElMessage} from "element-plus";

// 把source数据拷贝给target，把source所有属性拷贝给target
export function deepCopyParams(source, target) {
    if (!source || typeof source !== 'object') {
        ElMessage({
            message: '无效参数，请重试',
            type: 'error',
        })
        return
    }
    // 获取对象上的键值数组并对它进行遍历
    Object.keys(source).forEach(key => {
        target[key] = source[key]
        // 判断如果当前的值还是对象的话，递归拷贝
        if (typeof source[key] === 'object') {
            deepCopyParams(source[key], target[key])
        }
    })
}

// 把source数据对象拷贝给target对象，仅拷贝target有的属性
export function objCopy (source, target) {
    Object.keys(target).forEach(key => {
        target[key] = source[key]
    })
}
