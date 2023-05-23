<script setup>
  import {
    LMap,
    LTileLayer,
    LControl,
    LGeoJson,
  } from '@vue-leaflet/vue-leaflet'
  import { ref } from 'vue'
  import { debounce, lowerCase } from 'lodash-es'

  import { searchCities, getNeighborhoods } from '~/api'

  const map = ref(null)
  const geojson = ref(null)

  const city = ref(null)
  const search = ref(null)
  const neighborhoods = ref(null)
  const cities = ref([])
  const wait = ref(500)

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
    map.value.leafletObject.setView(city.coordinates, 14)

    const { data: response } = await getNeighborhoods(city.id)

    neighborhoods.value = response
  }, wait.value)
</script>

<template>
  <VApp>
    <VMain>
      <LMap
        ref="map"
        v-model:center.sync="center"
        v-model:zoom.sync="zoom"
        :options="{
          minZoom: 4,
          maxZoom: 16,
          zoomControl: false,
          attributionControl: false,
        }"
        :use-global-leaflet="false">
        <LGeoJson
          ref="geojson"
          :geojson="neighborhoods"
          :options="{
            onEachFeature: (feature, layer) => {
              layer.on({
                mouseover: (event) => {
                  event.target.setStyle({
                    weight: 5,
                    dashArray: '',
                  })
                },
                mouseout: (event) => {
                  geojson.leafletObject.resetStyle(event.target)
                },
                click: (event) => {
                  map.leafletObject.fitBounds(event.target.getBounds())
                },
              })
            },
          }"
          :options-style="
            () => {
              return {
                fillColor: '#009688',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '4',
                fillOpacity: 0.7,
              }
            }
          " />
        <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
      </LMap>
    </VMain>
  </VApp>
</template>
