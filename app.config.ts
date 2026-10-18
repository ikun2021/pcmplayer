import { defineAppConfig } from '#app'

export default defineAppConfig({
  ui: {
    primary: 'blue',
    gray: 'slate',
    button: { 
      rounded: 'rounded-lg', 
      font: 'font-semibold',
      transition: 'transition-all duration-300'
    },
    card: { 
      rounded: 'rounded-xl', 
      shadow: 'shadow-tech',
      border: 'border-slate-200'
    },
    input: {
      rounded: 'rounded-lg',
      ring: 'focus:ring-2 focus:ring-blue-500/20'
    },
    container: {
      constrained: 'max-w-7xl'
    }
  }
})
