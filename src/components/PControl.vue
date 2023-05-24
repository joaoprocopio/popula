<template>
  <LControl :position="$props.position" :style="style" class="ma-4">
    <slot />
  </LControl>
</template>

<script setup>
  import { computed } from 'vue'
  import { useDisplay } from 'vuetify'
  import { LControl } from '@vue-leaflet/vue-leaflet'

  const { smAndUp } = useDisplay()

  const $props = defineProps({
    position: {
      type: String,
      required: true,
      validator: (position) =>
        ['topleft', 'topright', 'bottomleft', 'bottomright'].includes(position),
    },
    isResponsive: {
      type: Boolean,
      default: false,
    },
  })

  const style = computed(() =>
    $props.isResponsive
      ? {
          width: smAndUp.value ? '500px' : 'calc(100vw - 32px)',
        }
      : {}
  )
</script>
