import { configure, defineRule } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import { required, email, min } from '@vee-validate/rules'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)

configure({
  generateMessage: localize('es', {
    messages: {
      required: 'Este campo es requerido',
      email: 'Este campo debe ser un correo electrónico valido',
      min: 'Este campo debe tener al menos {min} caracteres'
      // otros mensajes personalizados
    }
  }),
  validateOnInput: true // Valida en cada entrada
})
