<template>
  <VBtnGroup>
    <VBtn data-testid="zoomOut" icon="remove" @click="$emit('zoomOut')" />
    <VBtn data-testid="zoomIn" icon="add" @click="$emit('zoomIn')" />
  </VBtnGroup>
</template>

<script setup>
  const $emit = defineEmits(['zoomOut', 'zoomIn'])
</script>
