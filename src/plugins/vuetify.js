import { createVuetify } from 'vuetify'

import { aliases, md } from 'vuetify/iconsets/md'
import * as directives from 'vuetify/directives'
import * as components from 'vuetify/components'

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
  },
  directives,
})
