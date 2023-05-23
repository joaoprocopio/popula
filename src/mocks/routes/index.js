import { Response } from 'miragejs'
import { lowerCase } from 'lodash-es'

// api/v1/search/cities?query=sao+jose+dos+campos

// api/v1/geo/cities/<int:state_id>
// api/v1/geo/districts/<int:city_id>

// api/v1/population/districts/<int:city_id>
export function routes() {
  this.namespace = 'api/v1/'

  this.get('search/cities', function (schema, request) {
    const query = request.queryParams?.query

    if (!query) {
      return new Response(400, {}, {})
    }

    const cities = this.serialize(
      schema.cities.where((city) =>
        lowerCase(city.name).startsWith(lowerCase(query))
      )
    )

    if (!cities.length) {
      return new Response(404, {}, {})
    }

    return new Response(200, {}, cities)
  })

  // this.get('geo/cities', function (schema) {
  //   const neighborhoods = this.serialize(schema.neighborhoods.all())

  //   let geometries = []

  //   neighborhoods.forEach((neighborhood) =>
  //     geometries.push(
  //       multiPolygon(
  //         neighborhood.coordinates,
  //         { name: neighborhood.name },
  //         { bbox: neighborhood.bbox, id: neighborhood.id }
  //       )
  //     )
  //   )

  //   geometries = featureCollection(geometries)

  //   return new Response(200, {}, geometries)
  // })
}
