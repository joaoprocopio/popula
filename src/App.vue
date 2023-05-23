<script setup>
  import { LMap, LTileLayer, LControl } from '@vue-leaflet/vue-leaflet'
  import { ref } from 'vue'
  import { debounce, lowerCase } from 'lodash-es'

  import { searchCities, getNeighborhoods } from '~/api'

  const map = ref(null)

  const city = ref(null)
  const search = ref(null)
  const neighborhoods = ref(null)
  const cities = ref([])
  const wait = ref(500)

  const tileUrl = ref('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')

  const minZoom = ref(4)
  const maxZoom = ref(16)

  const zoom = ref(4)
  const center = ref([-14.235, -51.9253])

  const zoomOut = () => {
    map.value.leafletObject.zoomOut()
  }
  const zoomIn = () => {
    map.value.leafletObject.zoomIn()
  }

  const setCities = debounce(async () => {
    if (!search.value) return
    if (city.value?.name === search.value) return

    const { data: response } = await searchCities(search.value)

    cities.value = response
  }, wait.value)

  const setNeighborhoods = debounce(async (city) => {
    map.value.leafletObject.setView(city.coordinates, 12)

    const { data: response } = await getNeighborhoods(city.id)

    neighborhoods.value = response
  }, wait.value)
</script>

<template>
  <VApp>
    <VMain>
      <LMap
        ref="map"
        v-model:center="center"
        v-model:zoom="zoom"
        :options="{
          minZoom: minZoom,
          maxZoom: maxZoom,
          zoomControl: false,
          attributionControl: false,
        }"
        :use-global-leaflet="false">
        <LControl
          position="topleft"
          class="ma-4"
          :style="{
            width: $vuetify.display.mdAndUp ? '600px' : 'calc(100vw - 32px)',
          }">
          <VAutocomplete
            v-model="city"
            v-model:search="search"
            item-props
            :items="cities"
            :return-object="true"
            :custom-filter="
              (city, search) => lowerCase(city).startsWith(lowerCase(search))
            "
            item-title="name"
            flat
            hide-no-data
            variant="solo"
            prepend-inner-icon="search"
            @update:model-value="setNeighborhoods"
            @update:search="setCities" />
        </LControl>
        <LControl position="bottomright" class="ma-4">
          <VBtnGroup :divided="true">
            <VBtn icon="remove" @click="zoomOut" />
            <VBtn icon="add" @click="zoomIn" />
          </VBtnGroup>
        </LControl>
        <LTileLayer :url="tileUrl" />
      </LMap>
    </VMain>
  </VApp>
</template>