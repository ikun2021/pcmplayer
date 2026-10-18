const LOCALES = [
  { hreflang: 'en', prefix: '' },
  { hreflang: 'zh-CN', prefix: '/zh' },
  { hreflang: 'ja-JP', prefix: '/ja' },
  { hreflang: 'ko-KR', prefix: '/ko' }
] as const

const stripLocale = (path: string) => {
  const match = path.match(/^\/(zh|ja|ko)(?=\/|$)/)
  if (!match) return path || '/'
  const rest = path.slice(match[0].length)
  return rest || '/'
}

const localizedPath = (prefix: string, path: string) => {
  if (path === '/') return prefix || '/'
  return `${prefix}${path}`
}

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    const path = event.path.split('?')[0] || '/'
    if (path.startsWith('/_') || path.includes('.')) return

    const origin = String(useRuntimeConfig().public.siteUrl || 'https://audio-converters.net').replace(/\/$/, '')
    const basePath = stripLocale(path)
    const canonical = `${origin}${localizedPath('', path === '/' ? '/' : path)}`
    const english = `${origin}${localizedPath('', basePath)}`
    const alternates = LOCALES.map((locale) => {
      const href = `${origin}${localizedPath(locale.prefix, basePath)}`
      return `<link rel="alternate" hreflang="${locale.hreflang}" href="${escapeAttr(href)}">`
    })

    html.head.push(
      `<link rel="canonical" href="${escapeAttr(canonical)}">`,
      ...alternates,
      `<link rel="alternate" hreflang="x-default" href="${escapeAttr(english)}">`,
      `<meta property="og:url" content="${escapeAttr(canonical)}">`
    )
  })
})
