<template>
  <LGeoJson
    ref="component"
    :geojson="$props.geometry"
    :options="{
      onEachFeature,
    }"
    :options-style="style" />
</template>

<script setup>
  import { ref } from 'vue'
  import { LGeoJson } from '@vue-leaflet/vue-leaflet'

  const component = ref(null)

  const $props = defineProps({
    geometry: {
      type: Object,
      required: true,
    },
  })

  const $emit = defineEmits(['clickFeature'])

  const style = () => ({
    fillColor: '#7B1FA2',
    weight: 3,
    color: 'white',
    dashArray: '4',
    fillOpacity: 0.7,
  })
  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: ({ target }) => {
        target.setStyle({
          weight: 4,
          dashArray: '',
          fillColor: '#6A1B9A',
        })
      },
      mouseout: ({ target }) => {
        component.value.leafletObject.resetStyle(target)
      },
      click: ({ target }) => {
        $emit('clickFeature', target)
      },
    })
  }
</script>
