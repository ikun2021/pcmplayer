import { BLOG_POSTS } from '../../app/utils/blog-data'

const SITE_URL = 'https://audio-converters.net'

const LOCALES = [
  { hreflang: 'en', prefix: '' },
  { hreflang: 'zh-CN', prefix: '/zh' },
  { hreflang: 'ja-JP', prefix: '/ja' },
  { hreflang: 'ko-KR', prefix: '/ko' }
] as const

type ChangeFreq = 'weekly' | 'monthly' | 'yearly'

interface SitemapPage {
  path: string
  changefreq: ChangeFreq
  priority: string
  lastmod?: string
}

const xmlEscape = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export const toIsoDate = (input: string) => {
  const parsed = new Date(input)
  if (Number.isNaN(parsed.getTime())) return ''
  const year = parsed.getFullYear()
  const month = String(parsed.getMonth() + 1).padStart(2, '0')
  const day = String(parsed.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const absoluteUrl = (pathname: string) => new URL(pathname, SITE_URL).toString()

const localizedPath = (prefix: string, path: string) => {
  if (path === '/') return prefix || '/'
  return `${prefix}${path}`
}

const newestPostDate = () => {
  const dates = BLOG_POSTS.map(post => toIsoDate(post.date)).filter(Boolean).sort()
  return dates[dates.length - 1] || ''
}

const pages = (): SitemapPage[] => {
  const blogUpdated = newestPostDate()
  const posts = BLOG_POSTS.map(post => ({
    path: `/blog/${post.slug}`,
    changefreq: 'monthly' as const,
    priority: '0.7',
    lastmod: toIsoDate(post.date)
  }))

  return [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/blog', changefreq: 'weekly', priority: '0.9', lastmod: blogUpdated },
    { path: '/about', changefreq: 'monthly', priority: '0.8' },
    { path: '/contact', changefreq: 'monthly', priority: '0.6' },
    { path: '/privacy', changefreq: 'yearly', priority: '0.5' },
    { path: '/terms', changefreq: 'yearly', priority: '0.5' },
    ...posts
  ]
}

export const buildSitemapXml = () => {
  const urls = pages().flatMap(page => {
    const alternates = LOCALES.map(locale => ({
      hreflang: locale.hreflang,
      href: absoluteUrl(localizedPath(locale.prefix, page.path))
    }))
    const xDefault = absoluteUrl(localizedPath('', page.path))

    return LOCALES.map(locale => {
      const loc = absoluteUrl(localizedPath(locale.prefix, page.path))
      const links = [
        ...alternates.map(alt => `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${xmlEscape(alt.href)}" />`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(xDefault)}" />`
      ]
      const lastmod = page.lastmod ? `    <lastmod>${page.lastmod}</lastmod>\n` : ''
      return [
        '  <url>',
        `    <loc>${xmlEscape(loc)}</loc>`,
        lastmod.trimEnd(),
        `    <changefreq>${page.changefreq}</changefreq>`,
        `    <priority>${page.priority}</priority>`,
        ...links,
        '  </url>'
      ].filter(Boolean).join('\n')
    })
  })

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urls.join('\n'),
    '</urlset>',
    ''
  ].join('\n')
}
