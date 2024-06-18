<template>
  <div class="login-container">
    <div class="form-box">
      <el-tabs v-model="pageData.activeName" :stretch=true class="demo-tabs" @tab-click="tabHandleClick">
        <el-tab-pane label="账号登陆" name="account">
          <el-form
              label-position="right"
              label-width="auto"
              :model="accountLoginParams"
              style="max-width: 600px"
              :rules="accountLoginRules"
              ref="accountLoginRef"
          >
            <el-form-item label="账号" prop="account">
              <el-input v-model="accountLoginParams.account"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="accountLoginParams.password" show-password/>
            </el-form-item>
            <el-row :gutter="24">
              <el-col :span="16">
                <el-form-item label="验证码" prop="code">
                  <el-input v-model="accountLoginParams.code"/>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="2">
                <el-image class="image" :src="pageData.codeImage" @click="getSystemCode"></el-image>
              </el-col>
            </el-row>
            <el-form-item label="自动登陆" prop="flag">
              <el-radio-group v-model="accountLoginParams.flag">
                <el-radio :value="true" size="large"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-button class="login-btn" type="primary" @click="loginBtnClick">登陆</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="手机号登陆" name="phone">
          <el-form
              label-position="right"
              label-width="auto"
              :model="phoneLoginParams"
              style="max-width: 600px"
              :rules="phoneLoginRules"
              ref="phoneLoginRef"
          >
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="phoneLoginParams.phone"/>
            </el-form-item>
            <el-row :gutter="24">
              <el-col :span="16">
                <el-form-item label="验证码" prop="phoneCode">
                  <el-input v-model="phoneLoginParams.phoneCode"/>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-button class="send-btn" :loading="sendCodeData.loading" :disabled="sendCodeData.disabled"
                           @click="sendPhoneCode">{{ sendCodeData.text }}
                </el-button>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-button class="login-btn" type="primary" @click="loginBtnClick">登陆</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <el-row :gutter="24">
        <el-col :span="24">
          <el-button class="qrCode-btn" @click="showQrCodeDialog">扫码登陆</el-button>
        </el-col>
      </el-row>
    </div>

    <custom-dialog
        :title="qrCodeConfig.title"
        :visible="qrCodeConfig.visible"
        :width="qrCodeConfig.width"
        :button-confirm-show="qrCodeConfig.buttonConfirmShow"
        @onClose="qrCodeClose"
    >
      <template #content>
        <div class="qrcode-box flex-column-center">
          <p class="tip">{{ pageData.qrCodeTip }}</p>
          <vue-qr :text="pageData.qrCodeUrl" :size="280"></vue-qr>
        </div>
      </template>
    </custom-dialog>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import {ref, reactive, getCurrentInstance} from 'vue'
import {getSystemCodeApi, loginApi, sendPhoneCodeApi} from "@/api/loginApi.ts";
import {regexPhone} from "@/utils/RegexUtil.ts";
import {rsaEncrypt} from "@/utils/JSEncryptUtil.ts";
import router from "@/router";
import {userStore} from "@/stores/modules/user";
import CustomDialog from "@/components/dialog/CustomDialog.vue";
import {websocketStore} from "@/stores/modules/websocket";
import {ScanLoginResponseStatusEnum} from "@/utils/Enum.ts";
import vueQr from "vue-qr/src/packages/vue-qr.vue";

// 账号登录表单引用
const accountLoginRef = ref("")
// 手机登录表单引用
const phoneLoginRef = ref("")
// 获取当前实例代理
const {proxy} = getCurrentInstance()
// 使用用户存储
const useUserStore = userStore()
const useWebsocketStore = websocketStore()

// 页面数据
const pageData = reactive({
  // 当前活跃的选项卡，默认为账号
  activeName: "account",
  // 验证码图片
  codeImage: "",
  // 公众号登陆二维码
  qrCodeUrl: "",
  // 公众号登陆默认提示
  qrCodeTip: "首次扫码登陆会自动创建账号",
})
const qrCodeConfig = reactive({
  title: "请使用微信扫码关注",
  width: "600px",
  visible: false,
  buttonConfirmShow: false
})

// 账号登录参数
const accountLoginParams = reactive({
  // 账号
  account: "",
  // 密码
  password: "",
  // 验证码
  code: "",
  // 验证码ID
  codeId: "",
  // 标志
  flag: true,
  // 登录类型
  loginType: "pc",
  // 登录方法
  loginMethod: "account"
})

// 手机登录参数
const phoneLoginParams = reactive({
  // 标志
  flag: true,
  // 登录类型
  loginType: "pc",
  // 登录方法
  loginMethod: "phone",
  // 手机号
  phone: "",
  // 手机验证码
  phoneCode: ""
})

// 发送手机验证码相关操作
const sendCodeData = reactive({
  // 持续时间
  duration: 60,
  // 是否禁用
  disabled: false,
  // 定时器
  timer: null,
  // 文本
  text: "发送验证码",
  // 加载状态
  loading: false
})

// 账号登录校验规则
const accountLoginRules = reactive({
  account: [
    {required: true, message: '请输入账号', trigger: 'blur'},
    {min: 4, max: 10, message: '账号长度在 4 到 10 个字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'}
  ],
  code: [
    {required: true, message: '请输入验证码', trigger: 'blur'}
  ],
  flag: [
    {required: true, message: '请选择是否自动登陆', trigger: 'change'}
  ]
})

// 手机登录校验规则
const phoneLoginRules = reactive({
  phone: [
    {required: true, message: '请输入账号', trigger: 'blur'},
    {
      pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  phoneCode: [
    {required: true, message: '请输入验证码', trigger: 'blur'}
  ]
})

// 获取系统验证码
const getSystemCode = async () => {
  let res = await getSystemCodeApi()
  pageData.codeImage = res.data.code
  accountLoginParams.codeId = res.data.codeId
}
// 默认初始化调用
getSystemCode()

// 发送手机验证码
const sendPhoneCode = () => {
  if (regexPhone(phoneLoginParams.phone)) {
    return proxy.$message.success("请输入手机号");
  }
  sendCodeData.loading = true
  // 倒计时期间按钮不能单击
  if (sendCodeData.duration !== 60) {
    sendCodeData.disabled = true
  }
  // 清除掉定时器
  sendCodeData.timer && clearInterval(sendCodeData.timer)
  // 开启定时器
  sendCodeData.timer = setInterval(() => {
    const tmp = sendCodeData.duration--
    sendCodeData.text = `${tmp}秒`
    if (tmp <= 0) {
      // 清除掉定时器
      clearInterval(sendCodeData.timer)
      sendCodeData.duration = 60
      sendCodeData.text = '重新获取'
      // 设置按钮可以单击
      sendCodeData.disabled = false
    }
  }, 1000);
  sendPhoneCodeApi(phoneLoginParams.phone).then(() => {
    proxy.$message.success("验证码发送成功")
    sendCodeData.loading = false
  });
}

// 登陆按钮点击事件
const loginBtnClick = async () => {
  let formEl = "";
  let formData = {};
  if (pageData.activeName === "account") {
    formEl = accountLoginRef.value
    formData = accountLoginParams
  } else if (pageData.activeName === "phone") {
    formEl = phoneLoginRef.value
    formData = phoneLoginParams
  }
  await formEl.validate((valid) => {
    if (valid) {
      const sendData = {
        encryptStr: "",
      }
      sendData.encryptStr = rsaEncrypt(formData)
      loginApi(sendData).then(res => {
        // 存储登录信息
        useUserStore.setTokenInfo({
          tokenName: res.data.tokenName,
          tokenValue: res.data.tokenValue
        });
        useUserStore.setUserId(Number(res.data.userId));
        // 初始化个人信息
        useUserStore.initPersonalInfo()
        router.push("/system/userList")
      }).finally(() => {
        // 无论登录成功与否都刷新一次验证码
        getSystemCode()
      })
    } else {
      proxy.$message.error("请检查输入项")
    }
  })
}

// 选项卡点击事件
const tabHandleClick = (tab) => {
  if (tab.props.name === 'phone') {
    accountLoginRef.value.resetFields()
  } else if (tab.props.name === 'account') {
    phoneLoginRef.value.resetFields()
  }
}

// 二维码弹出框关闭事件
const qrCodeClose = () => {
  qrCodeConfig.visible = false
}
// 二维码弹出框点击事件
useWebsocketStore.initWebsocket()
useWebsocketStore.data.websocketInstance.onmessage = function (e) {
  // 服务器返回的消息实体
  const messageEntity = JSON.parse(e.data)
  console.log(messageEntity)
  if (messageEntity.type === ScanLoginResponseStatusEnum.LOGIN_URL) {
    // 第一步 获取登陆二维码
    pageData.qrCodeUrl = messageEntity.data.loginUrl
    qrCodeConfig.visible = true
    console.log("扫码登陆二维码地址：" + pageData.qrCodeUrl)
  } else if (messageEntity.type === ScanLoginResponseStatusEnum.LOGIN_SCAN_SUCCESS) {
    // 第二步 用户扫码成功，等到授权
    pageData.qrCodeTip = "扫码成功，请点击授权"
  } else if (messageEntity.type === ScanLoginResponseStatusEnum.LOGIN_SUCCESS) {
    // 第三步 用户登陆成功
    // 存储登录信息
    useUserStore.setTokenInfo({
      tokenName: messageEntity.data.tokenName,
      tokenValue: messageEntity.data.tokenValue
    })
    useUserStore.setUserId(Number(messageEntity.data.userId))
    qrCodeConfig.visible = false
    // 跳转到聊天页面
    router.push("/chat")
  }
}
// 扫码登陆弹出框点击事件
const showQrCodeDialog = async () => {
  useWebsocketStore.data.websocketInstance.send(JSON.stringify({
    "type": "qrcode"
  }))
}
</script>

<style scoped lang="scss">

.login-container {
  width: 100vw;
  height: 100vh;
  background-image: url('src/assets/bg_logo.png');
  /* 背景图垂直、水平均居中 */
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  /* 设置背景颜色，背景图加载过程中会显示背景色 */
  background-color: #464646;
  .form-box {

    width: 20%;
    min-width: 300px;
    position: fixed;
    left: 276px;
    top: 350px;

    .image {
      width: 100%;
      height: 30px;
    }

    .login-btn {
      width: 100%;
      background-color: $system-color;
      border: none;
    }

    .qrCode-btn {
      width: 100%;
      background-color: $system-color;
      border: none;
      margin-top: 10px;
      color: white;
    }

    .send-btn {
      width: 100%;
    }


    // 发送验证码按钮鼠标移入颜色
    :deep(.el-button:hover) {
      color: $system-color;
      border-color: $system-color;
      background-color: white;
    }

    // 发送验证码按钮点击颜色
    :deep(.el-button:focus) {
      color: $system-color;
      border-color: $system-color;
      background-color: white;
    }

    .login-btn:hover, .login-btn:focus {
      width: 100%;
      background-color: $system-color;
      border: none;
      color: white;
    }

    .qrCode-btn:hover, .qrCode-btn:focus {
      width: 94%;
      background-color: $system-color;
      border: none;
      margin-top: 10px;
      color: white;
    }

    :deep(.login-container .el-button:hover) {
      color: $system-color;
      border-color: $system-color;
      background-color: #84f0a6;
    }

    :deep(.el-radio__input.is-checked .el-radio__inner) {
      background-color: $system-color;
      border: none;
    }

    :deep(.el-tabs__item.is-active) {
      color: $system-color;
    }

    :deep(.el-tabs__nav .el-tabs__item:hover) {
      color: $system-color;
    }

    :deep(.el-radio--large) {
      height: 32px !important;
    }

    :deep(.el-tabs) {
      width: 100% !important;
    }

    /* 去掉长分割线 */
    :deep(.el-tabs__nav-wrap::after) {
      background-color: #f9f9f9;
    }

    /* 去掉下划线 */
    :deep(.el-tabs__active-bar) {
      background-color: $system-color;
    }

  }

  .qrcode-box {
    .tip {
      margin-top: 10px;
      color: $system-color;
      font-weight: 500;
    }
  }
}
</style>
