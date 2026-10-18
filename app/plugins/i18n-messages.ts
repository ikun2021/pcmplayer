import { messages } from '../../locales'

export default defineNuxtPlugin({
  name: 'i18n-messages',
  dependsOn: ['i18n:plugin'],
  setup(nuxtApp) {
    const i18n = nuxtApp.$i18n as any
    if (!i18n?.setLocaleMessage) return
    for (const code of Object.keys(messages)) {
      i18n.setLocaleMessage(code, (messages as Record<string, any>)[code])
    }
  }
})
