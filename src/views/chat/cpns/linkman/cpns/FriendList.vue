<template>
  <div class="friend-list-container">
    <el-divider content-position="center">好友列表</el-divider>
    <van-index-bar :index-list="pageData.indexBarList">
      <template v-for="item in pageData.friendList">
        <van-index-anchor :index="item.type">{{item.type}}</van-index-anchor>
        <template v-for="friend in item.userList">
          <div class="friend-item flex-row-start">
            <div class="img-box">
              <el-image class="avatar"
                        :src="friend.userAvatar"></el-image>
            </div>
            <div class="name ellipsis">{{friend.userName}}</div>
          </div>
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import {reactive} from "vue";
import {getFriendListApi} from "@/api/friendApi.ts";

const pageData = reactive({
  indexBarList: [],
  friendList: []
})

const getFriendList = () => {
  getFriendListApi().then(res => {
    pageData.friendList = res.data
    pageData.indexBarList = res.data.map(item => item.type)
  })
}
getFriendList()

</script>


<style scoped lang="scss">
.friend-list-container {
  overflow-y: scroll;

  .friend-item {
    height: 60px;

    .img-box {
      width: 55px;
      margin: 0 10px;

      .avatar {
        width: 50px;
        border-radius: 50%;
        height: 50px;
      }
    }
  }

  .friend-item:hover {
    background-color: #dad9d9;
  }
}

:deep(.van-index-anchor--sticky) {
  color: #e6b131;
}

:deep(.van-index-bar__sidebar) {
  width: 30px;
  left: 473px;
  right: 0;
  text-align: center;
}

:deep(.van-index-bar__index) {
  font-size: 14px;
  padding: 5px;
}

:deep(.van-index-bar__index--active) {
  color: $system-color;
}
</style>
