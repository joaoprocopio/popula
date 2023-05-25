<template>
  <VBtnGroup>
    <VBtn data-test-id="zoom-out" icon="remove" @click="$emit('zoomOut')" />
    <VBtn data-test-id="zoom-in" icon="add" @click="$emit('zoomIn')" />
  </VBtnGroup>
</template>

<script setup>
  const $emit = defineEmits(['zoomOut', 'zoomIn'])
</script>
