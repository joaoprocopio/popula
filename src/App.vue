<script setup>
  import { ref } from 'vue'

  import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'

  import { PChart, PControl, PGeometry, PSearchbar, PZoom } from '~/components'
  import { searchCities, getNeighborhoods, getPopulations } from '~/api'

  const chartVariant = ref('bar')

  const map = ref(null)

  const neighborhood = ref({})

  const cities = ref([])
  const neighborhoods = ref(null)
  const populations = ref(null)

  const flyTo = (coordinates) => map.value.leafletObject.flyTo(coordinates, 13)
  const fitBounds = (bounds) => map.value.leafletObject.fitBounds(bounds)

  const zoomIn = () => map.value.leafletObject.zoomIn()
  const zoomOut = () => map.value.leafletObject.zoomOut()

  const setCities = async (query) => {
    const { data: response } = await searchCities(query)

    cities.value = response.cities
  }
  const setNeighborhoods = async (city) => {
    const { data: response } = await getNeighborhoods(city.id)

    neighborhoods.value = response

    flyTo(city.coordinates)
  }
  const setPopulations = async (geometry) => {
    if (neighborhood.value?.id === geometry.feature?.id) return

    neighborhood.value = {
      id: geometry.feature.id,
      ...geometry.feature.properties,
    }

    const { data: response } = await getPopulations(neighborhood.value.id)

    fitBounds(geometry.getBounds())

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
        <PControl :is-responsive="true" position="topleft">
          <PSearchbar
            :items="cities"
            @search="setCities"
            @selected="setNeighborhoods" />
        </PControl>
        <PControl :is-responsive="true" position="bottomleft">
          <VCard v-if="neighborhood?.name && populations?.length">
            <VCardTitle class="font-weight-bold text-center">
              {{ neighborhood.name }}
            </VCardTitle>
            <VCardText>
              <PChart
                label="Population"
                :variant="chartVariant"
                :labels="populations.map((population) => population.year)"
                :dataset="populations.map((population) => population.count)" />
            </VCardText>
            <VTabs v-model="chartVariant" grow>
              <VTab value="bar">
                <VIcon icon="bar_chart" />
              </VTab>
              <VTab value="line">
                <VIcon icon="show_chart" />
              </VTab>
            </VTabs>
          </VCard>
        </PControl>
        <PControl position="bottomright">
          <PZoom @zoom-out="zoomOut" @zoom-in="zoomIn" />
        </PControl>
      </LMap>
    </VMain>
  </VApp>
</template>
