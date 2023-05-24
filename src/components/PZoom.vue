<template>
  <VBtnGroup>
    <VBtn icon="remove" @click="$emit('zoomOut')" />
    <VBtn icon="add" @click="$emit('zoomIn')" />
  </VBtnGroup>
</template>

<script setup>
  const $emit = defineEmits(['zoomOut', 'zoomIn'])
</script>
