<template>
  <VAutocomplete
    v-model="selected"
    v-model:search="search"
    :menu-icon="null"
    :items="$props.items"
    :return-object="true"
    :custom-filter="
      (target, query) => lowerCase(target).startsWith(lowerCase(query))
    "
    item-title="name"
    prepend-inner-icon="search"
    variant="solo"
    flat
    hide-no-data
    @update:model-value="emitSelected"
    @update:search="emitSearch" />
</template>

<script setup>
  import { ref } from 'vue'
  import { lowerCase, debounce } from 'lodash'

  const wait = ref(500)
  const selected = ref(null)
  const search = ref(null)

  const $emit = defineEmits(['selected', 'search'])
  const $props = defineProps({
    items: {
      type: Array,
      required: true,
    },
  })

  const emitSelected = debounce(() => {
    if (!selected.value) return

    $emit('selected', selected.value)
  }, wait.value)

  const emitSearch = debounce(() => {
    if (!search.value) return
    if (
      selected.value?.name === search.value ||
      selected.value === search.value
    )
      return

    $emit('search', search.value)
  }, wait.value)
</script>
