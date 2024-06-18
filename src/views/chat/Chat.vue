<template>
  <div class="chat-container">
    <chat-head></chat-head>
    <chat-menu @chat-click="onChatClick" @link-man-click="onLinkManClick"></chat-menu>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import {chatStore} from "@/stores/modules/chat";
import ChatMenu from "@/views/chat/cpns/menu/ChatMenu.vue";
import ChatHead from "@/views/chat/cpns/head/ChatHead.vue";

const useChatStore = chatStore()

/**
 * 聊天菜单点击事件
 */
const onChatClick = () => {
  useChatStore.updateMenuActive("chat")
}
/**
 * 联系人点击事件
 */
const onLinkManClick = () => {
  useChatStore.updateMenuActive("linkMan")
}
</script>


<style scoped lang="scss">
.chat-container {
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
      .userName{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        -o-text-overflow:ellipsis;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
      }
      .time{
        text-align: center;
        margin-top: 15px;
        font-size: 12px;
      }
      color: $system-color-two;
    }
  }
}
</style>
