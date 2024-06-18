// @ts-nocheck
import SvgIcon from '@/components/SvgIcon/index'

// 全局对象
const allGlobalComponent = {SvgIcon}
export default {
    install(app){
        Object.keys(allGlobalComponent).forEach(key =>{
            // @ts-ignore
            app.component(key, allGlobalComponent[key])
        })
    }
}
