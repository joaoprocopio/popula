import { Response } from 'miragejs'
import { lowerCase } from 'lodash'
import { featureCollection, multiPolygon } from '@turf/helpers'

export function routes() {
  this.namespace = 'api/v1/'

  this.get('search/cities', function (schema, request) {
    const query = request.queryParams?.query

    if (!query) {
      return new Response(400, {}, { cities: [] })
    }

    const cities = this.serialize(
      schema.cities.where((city) =>
        lowerCase(city.name).startsWith(lowerCase(query))
      )
    )

    if (!cities.length) {
      return new Response(404, {}, { cities })
    }

    return new Response(200, {}, { cities })
  })

  this.get('geo/neighborhoods/:cityId', function (schema, request) {
    const cityId = request.params?.cityId

    if (!cityId) {
      return new Response(400, {}, {})
    }

    const neighborhoods = this.serialize(schema.neighborhoods.where({ cityId }))

    if (!neighborhoods.length) {
      return new Response(404, {}, {})
    }

    let geometries = []

    neighborhoods.forEach((neighborhood) =>
      geometries.push(
        multiPolygon(
          neighborhood.coordinates,
          { name: neighborhood.name },
          { bbox: neighborhood.bbox, id: neighborhood.id }
        )
      )
    )

    geometries = featureCollection(geometries)

    return new Response(200, {}, geometries)
  })

  this.get(
    'populations/neighborhoods/:neighborhoodId',
    function (schema, request) {
      const neighborhoodId = request.params?.neighborhoodId

      if (!neighborhoodId) {
        return new Response(400, {}, {})
      }

      const populations = this.serialize(
        schema.populations.where({ neighborhoodId })
      )

      if (!populations.length) {
        return new Response(404, {}, {})
      }

      return new Response(200, {}, { populations })
    }
  )
}
