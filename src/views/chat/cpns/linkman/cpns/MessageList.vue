<template>
  <div class="message-list-container">
    <div class="message-item flex-row-start">
      <div class="img-box">
        <el-image class="avatar"
                  src="https://tse1-mm.cn.bing.net/th/id/OIP-C.Cq4khLPWJj0oPbx9P_dRbwAAAA?rs=1&pid=ImgDetMain"></el-image>
      </div>
      <div class="right-box flex-column-around">
        <div class="top flex-row-between">
          <div class="name ellipsis">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div class="time">{{ formatTime(new Date()) }}</div>
        </div>
        <div class="bottom flex-row-between">
          <div class="msg ellipsis">111111111111111111111111111111111111111111111</div>
          <div class="icon">
            <svg-icon name="jingying-lingdang" color="#afafaf" width="18px" height="18px"></svg-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import {formatTime} from "@/utils/TimeUtils.ts";
</script>


<style scoped lang="scss">
.message-list-container {
  overflow-y: scroll;

  .message-item {
    width: 100%;
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

    .right-box {
      width: 340px;
      height: 60px;

      .top {
        .name {
          width: 270px;
          font-size: 18px;
        }

        .time {
          width: 70px;
          font-size: 12px;
          color: #afafaf;
        }
      }

      .bottom {
        width: 340px;

        .msg {
          width: 300px;
          font-size: 13px;
          color: #afafaf;
        }

        .icon {
          width: 40px;
        }
      }
    }
  }

  .message-item:hover {
    background-color: #dad9d9;
  }
}

</style>
