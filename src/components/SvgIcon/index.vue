<template>
  <svg :style="{width,height}">
    <use :xlink:href="prefix+name" :fill="color"></use>
  </svg>
</template>

<script setup>

defineProps({
  // xlink:href 属性前缀
  prefix: {
    type: String,
    default: "#icon-"
  },
  // 提供使用的图标名字
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: "32px"
  },
  height: {
    type: String,
    default: "32px"
  }
})
</script>

<style scoped lang="scss">

</style>
