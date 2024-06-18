// 接口响应状态枚举
export enum ResultEnum {
    // 成功
    SUCCESS = 200,
    // 无权限
    NO_PERMISSION = 403,
    // 失败
    ERROR = 500,
    // 账号封禁
    ACCOUNT_BANNED = 501,
    // 异地登陆
    BE_REPLACED = 603,
    // 被强制下线
    KICK_OUT = 604,
    // 未登录
    NOT_TOKEN = 600,
    // token无效
    INVALID_TOKEN = 601,
    // token过期
    TOKEN_TIMEOUT = 602,
    // token错误
    TOKEN_ERROR = 605,
}

// 性别状态枚举
export enum SexEnum {
    // 女
    FEMALE = 0,
    // 男
    MALE = 1,
    // 未知
    UNKNOWN = 2
}

// 扫码登陆响应状态枚举
export enum ScanLoginResponseStatusEnum {
    // 获取二维码
    LOGIN_URL = 1,
    // 扫码成功等待授权
    LOGIN_SCAN_SUCCESS = 2,
    // 扫码成功
    LOGIN_SUCCESS = 3,
}
