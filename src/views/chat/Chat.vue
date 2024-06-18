<template>
  <div class="chat-container">
    <chat-menu :person-info="pageData.personalInfo" @chat-click="onChatClick" @link-man-click="onLinkManClick"></chat-menu>
    <div class="box">
      <chat-head :person-info="pageData.personalInfo" ></chat-head>
      <div class="inner-box">
        <chat-link-man class="linkman"></chat-link-man>
        <chat-message class="message"></chat-message>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import {chatStore} from "@/stores/modules/chat";
import ChatMenu from "@/views/chat/cpns/menu/ChatMenu.vue";
import ChatHead from "@/views/chat/cpns/head/ChatHead.vue";
import ChatLinkMan from "@/views/chat/cpns/linkman/ChatLinkMan.vue";
import ChatMessage from "@/views/chat/cpns/message/ChatMessage.vue";
import {websocketStore} from "@/stores/modules/websocket";
import {ScanLoginResponseStatusEnum} from "@/utils/Enum.ts";
import {userStore} from "@/stores/modules/user";
import {reactive} from "vue";

const pageData = reactive({
  personalInfo:{}
})

const useChatStore = chatStore()
const useUserStore = userStore()
const useWebsocketStore = websocketStore()
useWebsocketStore.initWebsocket()
useWebsocketStore.data.websocketInstance.onmessage = function (e) {
  // 服务器返回的消息实体
  const messageEntity = JSON.parse(e.data)
  console.log(messageEntity)
  if (messageEntity.type === ScanLoginResponseStatusEnum.LOGIN_SUCCESS) {
    // 获取个人信息
    useUserStore.initPersonalInfo()
    pageData.personalInfo = useUserStore.getPersonalInfo()
    console.log(pageData.personalInfo)
  }
}



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
  display: flex;

  .box {
    .inner-box {
      width: calc(100vw - 100px);
      display: flex;
      .linkman{
        width: 20%;
        min-width: 200px;
      }
      .message{
        min-width: 500px;
        flex:1;
      }
    }
  }
}
</style>
