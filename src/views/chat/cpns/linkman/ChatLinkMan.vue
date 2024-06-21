<template>
  <div class="link-container">
    <div class="search-box flex-row-around">
      <el-input  :prefix-icon="Search" placeholder="搜索" v-model="pageData.searchContent"></el-input>
      <el-button type="success">
        <el-icon>
          <Plus />
        </el-icon>
      </el-button>
    </div>

    <message-list></message-list>
    <friend-list v-if="false"></friend-list>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import {reactive, ref} from "vue";
import {Plus, Search} from "@element-plus/icons-vue";
import MessageList from "@/views/chat/cpns/linkman/cpns/MessageList.vue";
import FriendList from "@/views/chat/cpns/linkman/cpns/FriendList.vue";

const pageData = reactive({
  searchContent: ''
})

</script>


<style scoped lang="scss">
.link-container{
  width: 420px;
  height: calc(100vh - 70px);
  .search-box{
      margin: 10px 0;
  }
}
:deep(.el-input){
  width: 260px;
}
</style>
