<script setup>
  import {
    LMap,
    LTileLayer,
    LControl,
    LGeoJson,
  } from '@vue-leaflet/vue-leaflet'
  import { ref } from 'vue'

  import { PChart, PSearchbar, PZoom } from '~/components'
  import { searchCities, getNeighborhoods, getPopulations } from '~/api'

  const isBarChart = ref(true)

  const map = ref(null)
  const geojson = ref(null)
  const zoom = ref(4)
  const center = ref([-14.235, -51.9253])

  const neighborhoodName = ref(null)

  const zoomIn = () => map.value.leafletObject.zoomIn()

  const zoomOut = () => map.value.leafletObject.zoomOut()

  const neighborhoods = ref(null)
  const populations = ref(null)
  const cities = ref([])

  const setCities = async (query) => {
    const { data: response } = await searchCities(query)

    cities.value = response.cities
  }

  const setNeighborhoods = async (city) => {
    const { data: response } = await getNeighborhoods(city.id)

    neighborhoods.value = response

    map.value.leafletObject.flyTo(city.coordinates, 14)
  }

  const setPopulations = async (neighborhoodId) => {
    const { data: response } = await getPopulations(neighborhoodId)

    populations.value = response.populations
  }
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
                    weight: 4,
                    dashArray: '',
                    fillColor: '#6A1B9A',
                  })

                  event.target.bringToFront()
                },
                mouseout: (event) => {
                  geojson.leafletObject.resetStyle(event.target)
                },
                click: (event) => {
                  map.leafletObject.fitBounds(event.target.getBounds())

                  neighborhoodName = event.target.feature.properties.name
                  setPopulations(event.target.feature.id)
                },
              })
            },
          }"
          :options-style="
            () => {
              return {
                fillColor: '#7B1FA2',
                weight: 3,
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
            width: $vuetify.display.smAndUp ? '500px' : 'calc(100vw - 32px)',
          }">
          <PSearchbar
            :items="cities"
            @search="setCities"
            @selected="setNeighborhoods" />
        </LControl>
        <LControl
          position="bottomleft"
          class="ma-4"
          :style="{
            width: $vuetify.display.smAndUp ? '500px' : 'calc(100vw - 32px)',
          }">
          <VCard v-if="neighborhoodName && populations?.length">
            <VCardTitle>
              {{ neighborhoodName }}
            </VCardTitle>
            <VCardText>
              <PChart
                label="Population"
                :variant="isBarChart ? 'bar' : 'line'"
                :labels="populations.map((population) => population.year)"
                :dataset="populations.map((population) => population.count)" />
            </VCardText>
            <VCardActions>
              <VBtnToggle v-model="isBarChart" style="width: 100%" mandatory>
                <VBtn icon="bar_chart" :value="true" />
                <VBtn icon="show_chart" class="ma-0" :value="false" />
              </VBtnToggle>
            </VCardActions>
          </VCard>
        </LControl>
        <LControl position="bottomright" class="ma-4">
          <PZoom @zoom-out="zoomOut" @zoom-in="zoomIn" />
        </LControl>
      </LMap>
    </VMain>
  </VApp>
</template>
