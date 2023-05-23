import { $axios, reject } from './utils'

export const searchCities = async (query) =>
  $axios
    .get('search/cities', { params: { query } })
    .then((response) => response)
    .catch((error) => reject(error))
