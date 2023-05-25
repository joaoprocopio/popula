<template>
  <VBtnGroup>
    <VBtn data-test-id="zoomOut" icon="remove" @click="$emit('zoomOut')" />
    <VBtn data-test-id="zoomIn" icon="add" @click="$emit('zoomIn')" />
  </VBtnGroup>
</template>

<script setup>
  const $emit = defineEmits(['zoomOut', 'zoomIn'])
</script>
