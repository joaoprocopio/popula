import { $axios, reject } from './utils'

export const searchCities = async (query) =>
  $axios
    .get('search/cities', { params: { query } })
    .then((response) => response)
    .catch((error) => reject(error))

export const getNeighborhoods = async (cityId) =>
  $axios
    .get(`geo/neighborhoods/${cityId}`)
    .then((response) => response)
    .catch((error) => reject(error))
