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

export const getPopulations = async (neighborhoodId) =>
  $axios
    .get(`populations/neighborhoods/${neighborhoodId}`)
    .then((response) => response)
    .catch((error) => reject(error))
