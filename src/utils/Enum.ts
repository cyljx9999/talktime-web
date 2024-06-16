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

// 系统枚举
export enum SystemEnum {
    // 账号类型枚举
    // 用户
    USER = 0,
    // 管理员
    ADMIN = 1,

    // 账号状态枚举
    // 用户
    BANNED = 0,
    // 管理员
    NORMAL = 1,

    // 菜单类型
    CATALOGUE = 0,
    MENU = 1,
    BUTTON = 2,

    // 0新增 1编辑
    ADD = 0,
    TITLE_ADD = "新增",
    UPDATE = 1,
    TITLE_EDIT = "编辑",

    // 二级认证类型
    PASSWORD_VERIFY = 0,
    PHONE_VERIFY = 1,
    EMAIL_VERIFY = 2,

    // 0自定义时间 1永久封禁
    BANNED_CUSTOM = 0,
    BANNED_FOREVER = 1,

    // 封禁时间最大值
    BANNED_MAX_TIME = 2147483647,

    // 二级认证key
    SAFE_KEY = "safe",

    // 敏感词类型
    // 黑名单
    BLACK_SENSITIVE = 0,
    // 白名单
    WHITE_SENSITIVE = 1,

    // 启动状态
    // 启动
    OPEN = 1,
    // 关闭
    CLOSE = 0,

    // 分类等级
    CLASSIFY_FIRST = 0,
    CLASSIFY_SECOND = 1,
    CLASSIFY_THIRD = 2,

    // 试题题型
    SINGLE_CHOICE = 0,
    MULTIPLE_CHOICE = 1,
    TRUE_OR_FALSE = 2,

    // 试题是否包含代码块
    NOT_HAVE_CODE = 0,
    HAVE_CODE = 1,

    // 商品上架状态 0下架1上架
    SHOP_NOT_ROCKING = 0,
    SHOP_IS_ROCKING = 1,
}
