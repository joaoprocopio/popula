import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, md } from 'vuetify/iconsets/md'
import * as labsComponents from 'vuetify/labs/components'

export const vuetify = createVuetify({
  defaults: {
    global: {
      elevation: 0,
    },
  },
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md,
    },
  },
  components: {
    ...components,
    ...labsComponents,
  },
  directives,
})
