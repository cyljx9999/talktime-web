<template>
  <div class="message-container flex-column-center">
    <div class="friend-box">
      <div class="top flex-row-start">
        <div class="img-box">
          <el-image class="img"
                    src="https://img.zcool.cn/community/01e4315542ab990000019ae99f4ef0.jpg@1280w_1l_2o_100sh.jpg"></el-image>
        </div>
        <div class="right-box flex-column-start">
          <div class="head flex-row-between">
            <div class="name">asd</div>
            <div class="operation">
              <el-dropdown @command="handleCommand">
                <div class="setting-text">
                  ...
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="shareInfo">推荐给朋友</el-dropdown-item>
                    <el-dropdown-item command="settingAttention">设为星标朋友</el-dropdown-item>
                    <el-dropdown-item command="joinInBlack">加入黑名单</el-dropdown-item>
                    <el-dropdown-item command="deleteFriend">删除好友</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
          <div class="account">账号:bbb</div>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="center">

      </div>
    </div>
    <div v-if="false" class="group-box"></div>
    <div v-if="false" class="chat-box"></div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck

// 下拉菜单点击事件
const handleCommand = (command) => {

}
</script>


<style scoped lang="scss">
.message-container {
  height: calc(100vh - 70px);
  background-color: #eef0f0;

  .friend-box {
    width: 800px;

    .top {
      width: 100%;
      height: 130px;

      .img-box {
        width: 100px;

        .img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
      }

      .right-box {
        flex: 1;
        height: 130px;
        margin-top: 45px;
        .head {
          width: 100%;
          .name{
            font-size: 20px;
            font-weight: bold;
          }
          .operation{
            .setting-text{
              font-size: 18px;
            }
          }
        }
        .account{
          width: 100%;
          font-size: 16px;
          color: #999;
          margin-top: 10px;
        }

      }


    }
  }
}
</style>
