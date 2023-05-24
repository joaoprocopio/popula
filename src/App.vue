<script setup>
  import { LMap, LTileLayer, LControl } from '@vue-leaflet/vue-leaflet'
  import { ref } from 'vue'

  import { PChart, PGeometry, PSearchbar, PZoom } from '~/components'
  import { searchCities, getNeighborhoods, getPopulations } from '~/api'

  const isBarChart = ref(true)

  const map = ref(null)

  const neighborhood = ref({})

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

  const setPopulations = async (geometry) => {
    if (neighborhood.value?.id === geometry.feature?.id) return

    neighborhood.value = {
      id: geometry.feature.id,
      ...geometry.feature.properties,
    }

    const { data: response } = await getPopulations(neighborhood.value.id)

    map.value.leafletObject.fitBounds(geometry.getBounds())

    populations.value = response.populations
  }
</script>

<template>
  <VApp>
    <VMain>
      <LMap
        ref="map"
        :use-global-leaflet="false"
        :zoom="4"
        :center="[-14.235, -51.9253]"
        :options="{
          minZoom: 4,
          maxZoom: 16,
          zoomControl: false,
          attributionControl: false,
        }">
        <PGeometry
          v-if="neighborhoods"
          :geometry="neighborhoods"
          @click-feature="setPopulations" />
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
          <VCard v-if="neighborhood?.name && populations?.length">
            <VCardTitle>
              {{ neighborhood.name }}
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
