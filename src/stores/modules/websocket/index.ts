// @ts-nocheck
import {defineStore} from 'pinia'
import {reactive} from "vue";
import {userStore} from "../user";

const url = import.meta.env.VITE_APP_WEBSOCKET_API
//定义store
export const websocketStore = defineStore('websocketStore', () => {
    const useUserStore = userStore();
    const data = reactive({
        // websocket实例
        websocketInstance: null,
        // 重连次数
        reconnectAttempts: 0,
        // 最大重连数
        maxReconnectAttempts: 5,
        // 重连间隔(ms)
        reconnectInterval: 10000,
        // 发送心跳数据间隔
        heartbeatInterval: 1000 * 30,
        // 计时器id
        heartbeatTimer: undefined,
        // 彻底终止ws
        stopWs: false,
    })

    const initWebsocket = () => {
        if (data.reconnectAttempts === 0) {
            console.log('WebSocket', `初始化连接中...`);
        }
        if (data.websocketInstance && data.websocketInstance.readyState === WebSocket.OPEN) {
            return;
        }
        let tokenValue = "";
        if (localStorage.getItem("tokenValue")) {
            tokenValue = localStorage.getItem("tokenValue");
        }
        data.websocketInstance = new WebSocket(url + "?token=" + tokenValue);
        connectSuccess()
        // receiveMessage()
        handleError()
        handleClose()
    }
    // 连接成功之后的操作
    const connectSuccess = () => {

        data.websocketInstance.onopen = function (e) {
            console.log("WebSocket', `初始化成功...");
            data.stopWs = false;
            // 重置重连尝试成功连接
            data.reconnectAttempts = 0;
            // 在连接成功时停止当前的心跳检测并重新启动
            // startHeartbeat();
        }
    }
    // 处理接收服务端返回消息
    const receiveMessage = () => {
        return new Promise((resolve) => {
            data.websocketInstance.onmessage = function (e) {
                // 服务器返回的消息实体
                const messageEntity = JSON.parse(e.data)
                resolve(messageEntity)
                // startHeartbeat();
            }
            setTimeout(function () {
                resolve(null)
            }, 5000)
        })
    }
    // 处理异常信息消息
    const handleError = () => {
        data.websocketInstance.onerror = function (e) {
            if (data.reconnectAttempts === 0) {
                console.log('WebSocket', `连接异常[onerror]...`);
            }
            // closeHeartbeat();
        }
    }
    // 处理关闭信息
    const handleClose = () => {
        data.websocketInstance.onclose = function (e) {
            if (data.reconnectAttempts === 0) {
                console.log('WebSocket', `连接断开[onclose]...`);
                if (!data.stopWs) {
                    handleReconnect();
                }
                data.stopWs = true;
                data.websocketInstance.close();
                data.websocketInstance = null;
                // closeHeartbeat();
            }

        }
    }
    // 断网重连逻辑
    const handleReconnect = () => {
        if (data.reconnectAttempts < data.maxReconnectAttempts) {
            data.reconnectAttempts++;
            console.log('WebSocket', `尝试重连... `);
            setTimeout(() => {
                initWebsocket();
            }, data.reconnectInterval);
        } else {
            // closeHeartbeat();
            console.log('WebSocket', `最大重连失败，终止重连:`);
        }
    }
    // 关闭连接
// 心跳检测
    const startHeartbeat = () => {
        if (data.stopWs) return;
        if (data.heartbeatTimer) {
            // closeHeartbeat();
        }
        data.heartbeatTimer = setInterval(() => {
            if (data.websocketInstance) {
                data.websocketInstance.send(JSON.stringify({type: 'heartBeat', data: {}}));
                console.log('WebSocket', '送心跳数据...');
            } else {
                console.error('[WebSocket] 未连接');
            }
        }, data.heartbeatInterval);
    }
    // >关闭心跳
    const closeHeartbeat = () => {
        clearInterval(data.heartbeatTimer);
        data.heartbeatTimer = undefined;
    }

    const getMessageList = (type) => {
        if (type == "new") {
            return data.messageList[data.messageList.length - 1]
        } else {
            return data.messageList
        }
    }
    return {
        initWebsocket,
        data,
        getMessageList,
        receiveMessage
    }
})
