import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import { es } from 'vuetify/locale'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: 'es',
    fallback: 'es',
    messages: { es }
  }
})

export default vuetify
