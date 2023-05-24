<template>
  <!-- labels: populations.map((population) => population.year),
    datasets: [
      {
        label: 'Population',
        backgroundColor: '#7B1FA2',
        data: populations.map((population) => population.count),
      },
    ],
  }
  labels: populations.map((population) => population.year),
    datasets: [
      {
        label: 'Population',
        backgroundColor: '#7B1FA2',
        data: populations.map((population) => population.count),
      },
    ],
  } -->
  <Bar v-if="isBarChart" :class="classes" :data="data" :options="options" />
  <Line v-if="isLineChart" :class="classes" :data="data" :options="options" />
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { Bar, Line } from 'vue-chartjs'

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

  const $props = defineProps({
    label: {
      type: String,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
    dataset: {
      type: Array,
      required: true,
    },
    variant: {
      type: String,
      default: 'bar',
      validator: (variant) => {
        return ['bar', 'line'].includes(variant)
      },
    },
  })

  const classes = ref('d-inline')
  const options = ref({
    font: 'Roboto',
  })
  const data = computed(() => {
    return {
      labels: $props.labels,
      datasets: [
        {
          label: 'Population',
          backgroundColor: '#7B1FA2',
          data: $props.dataset,
        },
      ],
    }
  })

  const isBarChart = computed(() => $props.variant === 'bar')
  const isLineChart = computed(() => $props.variant === 'line')
</script>
