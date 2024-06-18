<template>
  <div class="head-container flex-row-between">
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
          <div class="userName">{{personInfo.userName}}</div>
          <div class="status-box flex-row-around">
            <svg-icon name="circle" color="#4f54f6" width="20px" height="20px"></svg-icon>
            <div class="statusName">
              在线
            </div>
          </div>
        </div>
        <div class="right">
          <el-dropdown  @command="handleCommand">
            <div class="setting-icon">
              <svg-icon name="setting" color="#4f54f6" width="30px" height="30px"></svg-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="personalInfo">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>

    <el-drawer v-model="pageData.drawerFlag" direction="rtl">
      <template #header>
        <h4>个人信息</h4>
      </template>
      <template #default>
        <el-form
            label-position="right"
            label-width="auto"
            :model="personInfo"
            style="max-width: 600px"
        >
          <el-form-item label="账号">
            <el-input v-model="personInfo.userAccount" />
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="personInfo.userName" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="personInfo.userPhone" />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="personInfo.userSex" class="ml-4">
              <el-radio value="0" size="large">女</el-radio>
              <el-radio value="1" size="large">男</el-radio>
              <el-radio value="2" size="large">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">cancel</el-button>
          <el-button type="primary" @click="confirmClick">confirm</el-button>
        </div>
      </template>
    </el-drawer>

  </div>
</template>

<script setup lang="ts">

import {reactive} from "vue";

defineProps({
  personInfo: {
    type: Object,
    required: true
  },
})

const pageData =reactive({
  drawerFlag:true
})

const handleCommand = (command)=>{
  if (command === 'personalInfo') {

  }else if (command === 'logout') {

  }
}
</script>


<style scoped lang="scss">
.head-container {
  width: calc(100vw - 100px);
  min-width: 800px;
  height: 70px;
  background-color: #f5f5f5;
  padding-right: 40px;
  border-bottom: 1px solid #f5f5f5;

  .title {
    font-size: 25px;
    font-weight: bold;
  }

  .right-box {
    width: 270px;

    .line{
      margin-left: 25px;
    }
    :deep(.el-divider--vertical){
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
          // 超出长度省略号
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
      .right{
        .setting-icon{
          margin-left: 10px;
          margin-top: 5px;
        }
      }

    }

  }
}
</style>
