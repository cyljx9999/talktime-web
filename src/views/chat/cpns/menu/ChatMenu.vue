<template>
  <div class="menu-container">
    <div class="top-circle-box">
      <svg-icon name="circle" color="red" width="30px" height="30px"></svg-icon>
      <svg-icon name="circle" color="yellow" width="30px" height="30px"></svg-icon>
      <svg-icon name="circle" color="green" width="30px" height="30px"></svg-icon>
    </div>
    <div class="avatar-box flex-row-center">
      <el-image class="img"
                src="https://tse4-mm.cn.bing.net/th/id/OIP-C.EXm6YrmQaDu0enP4vXJ9_gAAAA?w=175&h=180&c=7&r=0&o=5&pid=1.7"/>
    </div>
    <div class="icon-box flex-column-around">
      <svg-icon @click="chatClick" name="chat" :color="pageData.chatIconColor" width="70px" height="50px"></svg-icon>
      <svg-icon @click="linkManClick" name="linkMan" :color="pageData.linkManColor" width="70px" height="50px"></svg-icon>
    </div>
    <div class="bottom-box">
      <div class="time">{{getTimeState()}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import {reactive} from "vue";
import {getTimeState} from "@/utils/TimeUtils";

const pageData = reactive({
  chatIconColor: "#bbbbbb",
  linkManColor: "#bbbbbb",
});

const chatClick = ()=>{
  pageData.chatIconColor = "#4f54f6"
  pageData.linkManColor = "#bbbbbb"
}
const linkManClick = ()=>{
  pageData.linkManColor = "#4f54f6"
  pageData.chatIconColor = "#bbbbbb"
}

const emit = defineEmits(['chatClick','linkManClick'])

const onChatClick = () => {
  emit('chatClick')
}
const onLinkManClick = () => {
  emit('linkManClick')
}

</script>

<style scoped lang="scss">
.menu-container {
  position: relative;
  width: 100px;
  height: 100vh;
  background-color: $menu-color;

  .avatar-box {
    height:100px;
    .img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
  .icon-box{
    height: 130px;
    margin-top: 20px;
  }
  .bottom-box{
    width: 100px;
    position: absolute;
    left: 0;
    bottom: 20px;
    .time{
      text-align: center;
      font-size: 15px;
    }
    color: $system-color-two;
  }
}
</style>
