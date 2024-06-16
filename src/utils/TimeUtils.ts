// 判断当前的时间状态
import dayjs from "dayjs";

// 根据当前的系统时间进行判断所处时间段
export function getTimeState(){
    // 获取当前时间
    let timeNow = new Date();
    // 获取当前小时
    let hours = timeNow.getHours();
    // 设置默认文字
    let state= ``;
    // 判断当前时间段
    if (hours >= 0 && hours <= 11) {
        state = `早上好!`;
    } else if (hours > 11 && hours <= 14) {
        state= `中午好!`;
    } else if (hours > 14 && hours <= 18) {
        state= `下午好!`;
    } else if (hours > 18 && hours <= 24) {
        state= `晚上好!`;
    }
    return state;
}

/**
 * 根据type计算两者时间的插值
 * @param startTime
 * @param endTime
 * @param type
 */
export function countTime(startTime,endTime,type){
    const begin = dayjs(startTime)
    const over = dayjs(endTime)
    // @ts-ignore
    return over.diff(begin, type)
}

/**
 * 根据time时间转成对应的文字
 * @param time
 */
export function secondFormatText(time){
    if(time === -1){
        return "永久封禁"
    }
    if(time === 0 || time < -1){
        return ""
    }
    let duration
    let days = Math.floor(time / 86400);
    let hours = Math.floor((time % 86400) / 3600);
    let minutes = Math.floor(((time % 86400) % 3600) / 60);
    let seconds = Math.floor(((time % 86400) % 3600) % 60);
    if(days>0){
        duration = days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
    } else if(hours>0){
        duration = hours + "小时" + minutes + "分" + seconds + "秒";
    } else if(minutes>0) {
        duration = minutes + "分" + seconds + "秒";
    }
    else if(seconds>0){
        duration = seconds + "秒";
    }
    return duration;
}
