<template>
  <div class="custom-dialog-container">
    <el-dialog v-model="props.visible" :show-close="false" :width="props.width" :top="props.top" :close-on-click-modal="false">
      <template #header>
        <div class="header flex-row-between">
          <h4 class="title">{{ props.title }}</h4>
          <svg-icon name="close" width="22px" @click="onClose"></svg-icon>
        </div>
      </template>
      <div>
        <slot name="content"></slot>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button v-if="props.buttonCloseShow" @click="onClose">{{ props.buttonCloseTitle }}</el-button>
        <el-button v-if="props.buttonDownloadShow" @click="download">{{ props.buttonDownloadTitle }}</el-button>
        <el-button v-if="props.buttonConfirmShow" v-loading="props.loading" type="primary" @click="onConfirm">{{ props.buttonConfirmTitle }}</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import SvgIcon from "@/components/SvgIcon/index.vue"

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  buttonConfirmTitle: {
    type: String,
    default: "提交"
  },
  buttonCloseTitle: {
    type: String,
    default: "取消"
  },
  buttonDownloadTitle: {
    type: String,
    default: "下载模板"
  },
  buttonConfirmShow: {
    type: Boolean,
    default:()=>true
  },
  buttonCloseShow: {
    type: Boolean,
    default:()=>true
  },
  buttonDownloadShow: {
    type: Boolean,
    default:()=>false
  },
  width: {
    type: String,
    default: "900px"
  },
  top:{
    type: String,
    default: "10px"
  },
  loading: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['onClose','onConfirm','download'])
const onClose = () => {
  emit('onClose')
}
const onConfirm = () => {
  emit('onConfirm')
}
const download = () => {
  emit('download')
}
</script>

<style scoped lang="scss">
.custom-dialog-container {
  display: flex;
  flex-direction: column;
  z-index: 9;

  .header {
    width: 100%;
    border-bottom: 1px solid #4f54f6;
    padding: 15px;
    .title {
      color: $system-color;
      font-weight: 700;
      letter-spacing: 3px;
    }
  }

  .dialog-footer {
    button {
      border-color: $system-color;
    }
  }
}
:deep(.el-dialog__header){
  margin: 0;
  padding: 0;
}
</style>
