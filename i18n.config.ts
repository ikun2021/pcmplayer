import { messages } from './locales.ts'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: messages,
  availableLocales: Object.keys(messages),
  dynamicRouteParams: true,
  formatFallbackMessages: true,
  silentFallbackWarn: true,
  silentTranslationWarn: true
}))
