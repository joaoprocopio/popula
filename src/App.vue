<script setup>
  import { LMap, LTileLayer, LControl } from '@vue-leaflet/vue-leaflet'
  import { ref } from 'vue'
  import { debounce, lowerCase } from 'lodash-es'
  import axios from 'axios'

  const map = ref(null)

  const city = ref(null)
  const search = ref(null)
  const cities = ref([])
  const wait = ref(500)

  const tileUrl = ref('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')

  const minZoom = ref(4)
  const maxZoom = ref(16)

  const zoom = ref(13)
  const center = ref([-23.2198, -45.8916])

  const zoomOut = () => {
    zoom.value--
  }
  const zoomIn = () => {
    zoom.value++
  }

  const searchCities = debounce(async () => {
    if (!search.value) return
    if (city.value?.name === search.value) return

    const { data } = await axios
      .get('api/v1/search/cities', {
        params: {
          query: search.value,
        },
      })
      .then((response) => response)
      .catch((error) => error)

    cities.value = data
  }, wait.value)

  const getNeighborhoods = debounce((city) => {
    center.value = city.coordinates

    console.log(map.value)
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
          :class="{
            'ma-4': true,
            'w-screen': true,
            'w-medium': $vuetify.display.smAndUp,
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
            @update:model-value="getNeighborhoods"
            @update:search="searchCities" />
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

<style>
  .w-screen {
    width: calc(100vw - 32px);
  }

  .w-medium {
    width: 500px;
  }
</style>
