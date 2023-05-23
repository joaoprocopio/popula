import { Model, belongsTo } from 'miragejs'

export const models = {
  city: Model,
  neighborhood: Model.extend({
    city: belongsTo(),
  }),
  population: Model.extend({
    neighborhood: belongsTo(),
  }),
}
