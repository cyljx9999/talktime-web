import {defineStore} from 'pinia'
import router from "@/router"
import QmMessageBox from "@/utils/QmMessageBox";
import {reactive} from "vue";

// @ts-ignore
const url = import.meta.env.VITE_APP_WEBSOCKET_API
//定义store
export const websocketStore = defineStore('websocketStore', () => {
    const data = reactive({
        // 用于存储因网络异常等操作未发生信息存储
        unsentMessageInfo: [],
        // websocket实例
        websocketInstance: null,
        // 重连次数
        reconnectAttempts = 0,
        // 最大重连数
        maxReconnectAttempts = 5,
        // 重连间隔(ms)
        reconnectInterval = 10000,
        // 发送心跳数据间隔
        heartbeatInterval = 1000 * 30,
        // 计时器id
        heartbeatTimer = undefined,
        // 彻底终止ws
        stopWs = false
    })

    const initWebsocket = () => {
        if (data.reconnectAttempts === 0) {
            console.log('WebSocket', `初始化连接中...`);
        }
        if (data.websocketInstance && data.websocketInstance.readyState === WebSocket.OPEN) {
            return;
        }
        // @ts-ignore
        data.websocketInstance = new WebSocket(url + "?token=" + localStorage.getItem("token"));
        connectSuccess()
        handleMessage()
        handleError()
        handleClose()
    }
    // 连接成功之后的操作
    const connectSuccess = () => {
        this.websocketInstance.onopen = function () {
            data.stopWs = false;
            // 重置重连尝试成功连接
            data.reconnectAttempts = 0;
            // 在连接成功时停止当前的心跳检测并重新启动
            startHeartbeat();
        }
    }
    // 处理接收服务端返回消息
    const handleMessage = () => {
        this.websocketInstance.onmessage = function (e) {
            console.log(JSON.parse(e.data))
            // 服务器返回的消息实体
            const messageEntity = JSON.parse(e.data)
            startHeartbeat();
        }
    }
    // 处理异常信息消息
    const handleError = () => {
        this.websocketInstance.onerror = function (e) {
            if (data.reconnectAttempts === 0) {
                console.log('WebSocket', `连接异常[onerror]...`);
            }
            closeHeartbeat();
        }
    }
    // 处理关闭信息
    const handleClose = () => {
        this.websocketInstance.onclose = function (e) {
            if (data.reconnectAttempts === 0) {
                console.log('WebSocket', `连接断开[onclose]...`);
            }
            if (!data.stopWs) {
                handleReconnect();
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
            closeHeartbeat();
            console.log('WebSocket', `最大重连失败，终止重连:`);
        }
    }
    // 关闭连接
    const close = () => {
        if (this.socket) {
            this.stopWs = true;
            this.websocketInstance.close();
            this.websocketInstance = null;
        }
        closeHeartbeat();
    }

    // 心跳检测
    const startHeartbeat = () => {
        if (data.stopWs) return;
        if (data.heartbeatTimer) {
            closeHeartbeat();
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
    return {
        initWebsocket
    }
})
