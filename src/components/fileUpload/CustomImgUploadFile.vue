<template>
  <div class="upload-container">
    <el-upload
        ref="uploadRef"
        action="#"
        :on-change="uploadFile"
        :auto-upload="false"
        :limit="1"
        :file-list="pageData.newFileList"
        list-type="picture-card"
    >
      <el-icon>
        <Plus/>
      </el-icon>
      <template #file="{ file }">
        <div>
          <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
          />
          <span class="el-upload-list__item-actions">
                  <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                  >
                    <el-icon><zoom-in/></el-icon>
                  </span>
                  <span
                      v-if="!pageData.disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                  >
                    <el-icon><Delete/></el-icon>
                  </span>
                </span>
        </div>
      </template>
    </el-upload>
    <el-dialog v-model="pageData.dialogVisible">
      <img w-full :src="pageData.dialogImageUrl" alt="Preview Image"/>
    </el-dialog>
  </div>
</template>

<script setup>
import {getCurrentInstance, reactive, ref} from "vue"
import {ElMessage} from "element-plus";
import {ResultEnum, UploadSceneStatusEnum} from "@/utils/Enum";
import {getPreSignedUrlApi} from "@/api/fileApi";
import axios from "axios";

const props = defineProps({
  fileList: {
    type: Array,
    required: true
  },
  uploadScene: {
    type: Number,
    default: UploadSceneStatusEnum.CHAT
  }
})
//图片上传组件ref属性
const uploadRef = ref()

const pageData = reactive({
  //图片预览地址
  dialogImageUrl: "",
  //是否点击预览
  dialogVisible: false,
  disabled: false,
  //上传的文件
  newFileList: props.fileList,
  uploadUrl: "",
  downloadUrl: ""
})
const {proxy} = getCurrentInstance()
//删除图片
const handleRemove = (file) => {
  pageData.newFileList = pageData.newFileList.filter(item => item.name !== file.name)
  pageData.newFileList = pageData.newFileList.filter(item => item.url !== file.url)
  if (pageData.newFileList.length === 0 && file.name) {
    pageData.newFileList = props.fileList
  }
}
//点击预览图片
const handlePictureCardPreview = (file) => {
  pageData.dialogImageUrl = file.url
  pageData.dialogVisible = true
}
const emit = defineEmits(['uploadImageSuccess'])
//图片上传
const uploadFile = async (file) => {
  const typeArr = ["image/png", "image/gif", "image/jpeg", "image/jpg"];
  const isImg = typeArr.indexOf(file.raw.type) !== -1;
  const isMore3M = file.size / 1024 / 1024 < 3;
  if (!isImg) {
    proxy.$message.warning("只能上传图片类型");
    ref.value?.clearFiles()
    return;
  }
  if (!isMore3M) {
    proxy.$message.warning("文件大小不能超过3M");
    ref.value?.clearFiles()
    return;
  }
  // 请求预签名地址
  let params = {
    fileName: file.name,
    uploadScene: props.uploadScene
  }
  getPreSignedUrlApi(params).then(res => {
    pageData.uploadUrl = res.data.uploadUrl
    pageData.downloadUrl = res.data.downloadUrl
    axios.put(pageData.uploadUrl, file.raw, {
      headers: {
        token: localStorage.getItem("tokenValue")
      }
    }).then(response => {
        if (response.status === ResultEnum.HTTP_SUCCESS){
          emit('uploadImageSuccess', pageData.downloadUrl)
        }
    });
  })

}
</script>

<style scoped lang="scss">

</style>
