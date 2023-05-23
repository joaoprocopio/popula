<script setup>
  import {
    LMap,
    LTileLayer,
    LControl,
    LGeoJson,
  } from '@vue-leaflet/vue-leaflet'
  import { Bar, Line } from 'vue-chartjs'
  import { ref } from 'vue'
  import { debounce, lowerCase } from 'lodash-es'

  import { searchCities, getNeighborhoods, getPopulations } from '~/api'

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
  } from 'chart.js'
  import { VBtnGroup } from 'vuetify/lib/components/index.mjs'

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
  )

  const isBarChart = ref(true)

  const map = ref(null)
  const geojson = ref(null)
  const zoom = ref(4)
  const center = ref([-14.235, -51.9253])

  const neighborhoodName = ref(null)

  const city = ref(null)
  const neighborhoods = ref(null)
  const populations = ref(null)
  const cities = ref([])
  const search = ref(null)
  const wait = ref(500)

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

    cities.value = response.cities
  }, wait.value)

  const setNeighborhoods = debounce(async (city) => {
    map.value.leafletObject.setView(city.coordinates, 14)

    const { data: response } = await getNeighborhoods(city.id)

    neighborhoods.value = response
  }, wait.value)

  const setPopulations = debounce(async (neighborhoodId) => {
    const { data: response } = await getPopulations(neighborhoodId)

    populations.value = response.populations.map((population) => {
      return {
        id: population.id,
        year: population.year,
        count: population.count,
      }
    })
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
        <LControl position="bottomleft" class="ma-4">
          <VCard v-if="neighborhoodName && populations?.length">
            <VCardTitle>
              {{ neighborhoodName }}
            </VCardTitle>
            <VCardText>
              <Bar
                v-if="isBarChart"
                :data="{
                  labels: populations.map((population) => population.year),
                  datasets: [
                    {
                      label: 'Population',
                      backgroundColor: '#7B1FA2',
                      data: populations.map((population) => population.count),
                    },
                  ],
                }" />
              <Line
                v-else
                :data="{
                  labels: populations.map((population) => population.year),
                  datasets: [
                    {
                      label: 'Population',
                      backgroundColor: '#7B1FA2',
                      data: populations.map((population) => population.count),
                    },
                  ],
                }" />
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
          <VBtnGroup>
            <VBtn icon="remove" @click="zoomOut" />
            <VBtn icon="add" @click="zoomIn" />
          </VBtnGroup>
        </LControl>
      </LMap>
    </VMain>
  </VApp>
</template>
