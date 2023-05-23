import { ActiveModelSerializer } from 'miragejs'

export const serializers = {
  city: ActiveModelSerializer.extend({
    embed: true,
    root: false,
  }),
  neighborhood: ActiveModelSerializer.extend({
    embed: true,
    root: false,
    include: ['city'],
  }),
  population: ActiveModelSerializer.extend({
    embed: true,
    root: false,
    include: ['neighborhood'],
  }),
}
