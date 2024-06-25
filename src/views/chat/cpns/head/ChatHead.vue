<template>
  <div class="link-container flex-row-between">
    <div class="title">Message</div>
    <div class="right-box flex-row-around">
      <div class="badge">

        <el-badge :value="12" class="item">
          <svg-icon name="lingdang" color="#4f54f6" width="20px" height="20px"></svg-icon>
        </el-badge>
      </div>
      <div class="line">
        <el-divider direction="vertical"/>
      </div>
      <div class="person-box">
        <div class="left">
          <el-image class="img"
                    :src="personInfo.userAvatar"/>
        </div>
        <div class="center flex-column-center">
          <div class="userName ellipsis">{{ personInfo.userName }}</div>
          <div class="status-box flex-row-around">
            <svg-icon name="circle" color="#4f54f6" width="20px" height="20px"></svg-icon>
            <div class="statusName">
              在线
            </div>
          </div>
        </div>
        <div class="right">
          <el-dropdown @command="handleCommand">
            <div class="setting-icon">
              <svg-icon name="setting" color="#4f54f6" width="30px" height="30px"></svg-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="personalInfo">个人信息</el-dropdown-item>
                <el-dropdown-item command="setting">账号设置</el-dropdown-item>
                <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <el-drawer v-model="pageData.personalInfoDrawerFlag" direction="rtl">
        <template #header>
          <h4>个人信息</h4>
        </template>
        <template #default>
          <el-form
              label-position="right"
              label-width="auto"
              :model="pageData.personalInfoFormData"
              style="max-width: 600px"
              :rules="personalInfoRules"
              ref="personalInfoRef"
          >
            <el-row :gutter="24">
              <el-col :span="18">
                <el-form-item label="账号">
                  <el-input disabled v-model="personInfo.userAccount"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button
                    class="btn btn-alter"
                    :disabled="pageData.personalInfoFormData.alterAccountCount === 0"
                    @click="showAlterAccountDialog"
                >修改
                </el-button>
              </el-col>
            </el-row>

            <el-form-item label="用户名" prop="userName">
              <el-input v-model="pageData.personalInfoFormData.userName"/>
            </el-form-item>
            <el-form-item label="手机号" prop="userPhone">
              <el-input v-model="pageData.personalInfoFormData.userPhone"/>
            </el-form-item>
            <el-form-item label="性别" prop="userSex">
              <el-radio-group v-model="pageData.personalInfoFormData.userSex" class="ml-4">
                <el-radio :value="0" size="large">女</el-radio>
                <el-radio :value="1" size="large">男</el-radio>
                <el-radio :value="2" size="large">隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="头像">
              <custom-img-upload-file :file-list="pageData.fileList"
                                      @upload-image-success="uploadImageSuccess"></custom-img-upload-file>
            </el-form-item>
            <el-form-item label="我的二维码">
              <el-image class="img" :src="pageData.personalInfoFormData.qrcodeUrl"></el-image>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancelPersonalInfoDrawerClick">关闭</el-button>
            <el-button class="btn" type="primary" @click="confirmPersonalInfoDrawerClick">提交修改</el-button>
          </div>
        </template>
      </el-drawer>

      <el-drawer v-model="pageData.privacySettingDrawerFlag" direction="rtl">
        <template #header>
          <h4>账号信息设置</h4>
        </template>
        <template #default>
          <el-form
              label-position="right"
              label-width="auto"
              :model="pageData.privacySettingFormData"
              style="max-width: 600px"
              :rules="personalInfoRules"
              ref="personalInfoRef"
              class="setting-form"
          >
            <el-divider content-position="center">可以通过以下方式找到我</el-divider>
            <el-form-item label="账号">
              <el-switch
                  v-model="pageData.privacySettingFormData.findByAccount"
                  class="mt-2"
                  :active-value="1"
                  :inactive-value="0"
                  style="margin-left: 24px"
                  inline-prompt
                  size="large"
                  width="100px"
                  :active-icon="Check"
                  :inactive-icon="Close"
                  @change="privacySettingChange"
              />
            </el-form-item>
            <el-form-item label="手机号">
              <el-switch
                  v-model="pageData.privacySettingFormData.findByPhone"
                  class="mt-2"
                  :active-value="1"
                  :inactive-value="0"
                  style="margin-left: 24px"
                  inline-prompt
                  size="large"
                  width="100px"
                  :active-icon="Check"
                  :inactive-icon="Close"
                  @change="privacySettingChange"
              />
            </el-form-item>

            <el-divider content-position="center">可以通过以下方式添加我</el-divider>
            <el-form-item label="账号">
              <el-switch
                  v-model="pageData.privacySettingFormData.addByAccount"
                  class="mt-2"
                  :active-value="1"
                  :inactive-value="0"
                  style="margin-left: 24px"
                  inline-prompt
                  size="large"
                  width="100px"
                  :active-icon="Check"
                  :inactive-icon="Close"
                  @change="privacySettingChange"
              />
            </el-form-item>
            <el-form-item label="手机号">
              <el-switch
                  v-model="pageData.privacySettingFormData.addByPhone"
                  class="mt-2"
                  :active-value="1"
                  :inactive-value="0"
                  style="margin-left: 24px"
                  inline-prompt
                  size="large"
                  width="100px"
                  :active-icon="Check"
                  :inactive-icon="Close"
                  @change="privacySettingChange"
              />
            </el-form-item>
            <el-form-item label="群聊">
              <el-switch
                  v-model="pageData.privacySettingFormData.addByGroup"
                  class="mt-2"
                  :active-value="1"
                  :inactive-value="0"
                  style="margin-left: 24px"
                  inline-prompt
                  size="large"
                  width="100px"
                  :active-icon="Check"
                  :inactive-icon="Close"
                  @change="privacySettingChange"
              />
            </el-form-item>
            <el-form-item label="名片">
              <el-switch
                  v-model="pageData.privacySettingFormData.addByCard"
                  class="mt-2"
                  :active-value="1"
                  :inactive-value="0"
                  style="margin-left: 24px"
                  inline-prompt
                  size="large"
                  width="100px"
                  :active-icon="Check"
                  :inactive-icon="Close"
                  @change="privacySettingChange"
              />
            </el-form-item>
            <el-form-item label="二维码">
              <el-switch
                  v-model="pageData.privacySettingFormData.addByQrcode"
                  class="mt-2"
                  :active-value="1"
                  :inactive-value="0"
                  style="margin-left: 24px"
                  inline-prompt
                  size="large"
                  width="100px"
                  :active-icon="Check"
                  :inactive-icon="Close"
                  @change="privacySettingChange"
              />
            </el-form-item>
            <el-divider></el-divider>
            <el-tooltip
                class="box-item"
                effect="dark"
                content="设置后，朋友拍你的时候将会出现"
                placement="top-start"
            >
              <el-form-item label="拍一拍">
                <el-row :gutter="24">
                  <el-col :span="6">
                    <span class="default-text">朋友拍了拍我</span>
                  </el-col>
                  <el-col :span="18">
                    <el-input type="text" maxlength="10" v-model="pageData.privacySettingFormData.patContent"/>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-tooltip>
            <el-form-item label="个性签名">
              <el-input type="textarea" maxlength="20" v-model="pageData.privacySettingFormData.personalizedSignature"/>
            </el-form-item>

          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancelPrivacySettingDrawerClick">关闭</el-button>
            <el-button class="btn" type="primary" @click="confirmPrivacySettingDrawerClick">提交修改</el-button>
          </div>
        </template>
      </el-drawer>

      <custom-dialog
          :title="alterAccountDialogConfig.title"
          :visible="alterAccountDialogConfig.visible"
          :width="alterAccountDialogConfig.width"
          :is-append-to-body="alterAccountDialogConfig.isAppendToBody"
          :loading="alterAccountDialogConfig.loading"
          @on-close="closeAlterAccountDialog"
          @on-confirm="confirmAlterAccountDialog"
      >
        <template #content>
          <el-form
              label-position="right"
              label-width="auto"
              :model="pageData.alterAccountForm"
              style="max-width: 600px"
              :rules="alterAccountRules"
              ref="alterAccountRef"
          >
            <el-form-item label="账号" prop="userAccount">
              <el-input v-model="pageData.alterAccountForm.userAccount"/>
            </el-form-item>
          </el-form>
        </template>
      </custom-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import {getCurrentInstance, onUpdated, reactive, ref} from "vue";
import CustomImgUploadFile from "@/components/fileUpload/CustomImgUploadFile.vue";
import {rsaEncrypt} from "@/utils/JSEncryptUtil.ts";
import {
  alterAccountApi,
  alterPersonalInfoApi,
  alterPrivacySettingInfoApi,
  getPrivacySettingInfoApi
} from "@/api/userApi.ts";
import CustomDialog from "@/components/dialog/CustomDialog.vue";
import {Check, Close} from "@element-plus/icons-vue";

const {proxy} = getCurrentInstance()

const props = defineProps({
  personInfo: {
    type: Object,
    required: true
  },
})


onUpdated(() => {
  initPersonalInfoFormData()
})
// 初始化表单数据
const initPersonalInfoFormData = () => {
  pageData.personalInfoFormData.userName = props.personInfo.userName
  pageData.personalInfoFormData.userPhone = props.personInfo.userPhone
  pageData.personalInfoFormData.userSex = props.personInfo.userSex
  pageData.personalInfoFormData.userAccount = props.personInfo.userAccount
  pageData.personalInfoFormData.qrcodeUrl = props.personInfo.qrcodeUrl
  pageData.personalInfoFormData.alterAccountCount= props.personInfo.alterAccountCount
  if (pageData.fileList.length === 0) {
    pageData.fileList.push({url: props.personInfo.userAvatar})
  }
}

const personalInfoRef = ref();
const alterAccountRef = ref();
const pageData = reactive({
  personalInfoDrawerFlag: false,
  privacySettingDrawerFlag: false,
  fileList: [],
  personalInfoFormData: {
    userName: "",
    userAccount: "",
    userPhone: "",
    userSex: 0,
    userAvatar: "",
    qrcodeUrl: "",
    alterAccountCount: ""
  },
  alterAccountForm: {
    userAccount: ""
  },
  privacySettingFormData:{
    addByAccount: 0,
    addByPhone: 0,
    addByGroup: 0,
    addByCard: 0,
    addByQrcode: 0,
    findByAccount: 0,
    findByPhone: 0,
    personalizedSignature: "",
    patContent: ""
  }
})
// 修改账号弹出框设置
const alterAccountDialogConfig = reactive({
  title: "修改账号",
  width: "600px",
  visible: false,
  isAppendToBody: true,
  loading: false
})
// 账号校验规则
const alterAccountRules = reactive({
  userAccount: [
    {required: true, message: '请输入账号', trigger: 'blur'},
    {min: 4, max: 10, message: '账号长度在 4 到 10 个字符', trigger: 'blur'}
  ]
})

// 个人信息校验规则
const personalInfoRules = {
  userName: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 1, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
  ],
  userPhone: [
    {required: true, message: '请输入手机号', trigger: 'blur'},
    {
      pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  userSex: [
    {required: true, message: '请选择性别', trigger: 'blur'}
  ]
}

// 上传图片成功回调
const uploadImageSuccess = (fileUrl) => {
  pageData.personalInfoFormData.userAvatar = fileUrl
}

// 下拉菜单点击事件
const handleCommand = (command) => {
  if (command === 'personalInfo') {
    initPersonalInfoFormData()
    pageData.personalInfoDrawerFlag = true
  } else if (command === "setting") {
    initPrivacySettingFormData()
    pageData.privacySettingDrawerFlag = true
  } else if (command === 'logout') {

  }
}
const emit = defineEmits(['updatePersonalInfo'])
// 个人信息抽屉关闭事件
const cancelPersonalInfoDrawerClick = () => {
  pageData.personalInfoDrawerFlag = false
  personalInfoRef.value.resetFields()
}
// 个人信息抽屉提交事件
const confirmPersonalInfoDrawerClick = () => {
  personalInfoRef.value.validate((valid) => {
    if (valid) {
      const sendData = {
        encryptStr: ""
      }
      sendData.encryptStr = rsaEncrypt(pageData.personalInfoFormData)
      alterPersonalInfoApi(sendData).then(res => {
        cancelPersonalInfoDrawerClick()
        proxy.$message.success(res.msg)
        emit('updatePersonalInfo')
      })
    }
  })
}
// 打开修改账号弹出框
const showAlterAccountDialog = () => {
  alterAccountDialogConfig.visible = true
}
// 关闭修改账号弹出框
const closeAlterAccountDialog = () => {
  alterAccountRef.value.resetFields()
  alterAccountDialogConfig.loading = false;
  alterAccountDialogConfig.visible = false
}
// 账号弹出框提交
const confirmAlterAccountDialog = () => {
  alterAccountRef.value.validate((valid) => {
    if (valid) {
      alterAccountDialogConfig.loading = true;
      alterAccountApi(pageData.alterAccountForm).then(res => {
        closeAlterAccountDialog()
        cancelPersonalInfoDrawerClick()
        proxy.$message.success(res.msg)
        emit('updatePersonalInfo')
      })
    }
  })
}

// 获取隐私设置信息
const initPrivacySettingFormData=()=>{
  getPrivacySettingInfoApi().then(res =>{
    pageData.privacySettingFormData = res.data
  })
}
// 隐私设置改变事件
const privacySettingChange= ()=>{
  alterPrivacySettingInfoApi(pageData.privacySettingFormData).then(res => {
    proxy.$message.success(res.msg)
    initPrivacySettingFormData()
  })
}

// 隐私设置抽屉关闭事件
const cancelPrivacySettingDrawerClick = () => {
  pageData.privacySettingDrawerFlag = false
}
// 隐私设置抽屉提交事件
const confirmPrivacySettingDrawerClick = () => {
  alterPrivacySettingInfoApi(pageData.privacySettingFormData).then(res => {
    proxy.$message.success(res.msg)
    initPrivacySettingFormData()
  })
}

</script>


<style scoped lang="scss">
.link-container {
  width: calc(100vw - 100px);
  min-width: 800px;
  height: 70px;
  background-color: #f5f5f5;
  padding-right: 40px;
  border-bottom: 1px solid #cfcfcf;

  .title {
    font-size: 25px;
    font-weight: bold;
  }

  .right-box {
    width: 270px;

    .line {
      margin-left: 25px;
    }

    :deep(.el-divider--vertical) {
      height: 35px;
      border-left: 2px solid $system-color;
    }

    .person-box {
      display: flex;
      margin-left: 20px;

      .left {
        .img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }

      .center {
        width: 110px;
        position: relative;

        .userName {
          width: 90px;
          text-align: center;
          font-size: 14px;
        }

        .status-box {
          height: 25px;

          .statusName {
            font-size: 12px;
            color: #747373;
          }
        }
      }

      .right {
        .setting-icon {
          margin-left: 10px;
          margin-top: 5px;
        }
      }

    }

  }

  .img {
    width: 130px;
    height: 130px;
  }

  .btn-alter {
    width: 100%;
  }

  .btn {
    background-color: $system-color;
    color: white;
    border: none;
  }

  .avatar {
    border-radius: 50%;
  }

  .setting-form{
    .default-text{
      color: #b7b1b1;
    }
    :deep(.el-row){
      width: 100%;
    }
  }


  :deep(.el-radio.el-radio--large) {
    height: 32px;
  }

  :deep(.el-radio__input.is-checked .el-radio__inner) {
    background: $system-color;
    border: none;
  }

  :deep(.el-radio__input.is-checked+.el-radio__label) {
    color: $system-color;
  }

  :deep(.el-button:hover) {
    color: $system-color;
    border: 1px solid $system-color;
    background-color: white;
  }

  :deep(.el-button:focus) {
    color: $system-color;
    border-color: $system-color;
    background-color: white;
  }
  :deep(.el-form-item__content) {
    justify-content: flex-end;
  }
}
</style>
