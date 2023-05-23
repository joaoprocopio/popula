import { Server } from 'miragejs'

import { models } from './models'
import { fixtures } from './fixtures'
import { seeds } from './seeds'
import { serializers } from './serializers'
import { routes } from './routes'

export function createServer({ environment = 'development' } = {}) {
  return new Server({
    environment,
    models,
    fixtures,
    seeds,
    serializers,
    routes,
  })
}
