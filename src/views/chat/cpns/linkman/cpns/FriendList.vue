<template>
  <div class="friend-list-container">
    <el-divider content-position="center">好友列表</el-divider>
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="1">标题1</van-index-anchor>
      <div class="friend-item flex-row-first">
        <div class="img-box">
          <el-image class="avatar" src="https://tse1-mm.cn.bing.net/th/id/OIP-C.Cq4khLPWJj0oPbx9P_dRbwAAAA?rs=1&pid=ImgDetMain"></el-image>
        </div>
        <div class="name ellipsis">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
      </div>
    </van-index-bar>
  </div>
</template>

<script setup lang="ts">

const indexList =[1, 2, 3, 4, 5,6,7,8,9,10]
</script>


<style scoped lang="scss">
.friend-list-container{
  overflow-y: scroll;
  .friend-item{
    height: 60px;
    .img-box{
      width: 55px;
      margin: 0 10px;
      .avatar{
        width: 50px;
        border-radius: 50%;
        height: 50px;
      }
    }
  }
  .message-item:hover{
    background-color: #dad9d9;
  }
}

:deep(.van-index-anchor--sticky){
  color: #e6b131;
}
:deep(.van-index-bar__sidebar){
  width: 30px;
  left:473px;
  right: 0;
  text-align: center;
}
:deep(.van-index-bar__index){
  font-size: 14px;
  padding: 5px;
}
:deep(.van-index-bar__index--active){
  color: $system-color;
}
</style>
