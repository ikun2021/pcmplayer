import { buildSitemapXml } from '../utils/sitemap'

export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return buildSitemapXml(useRuntimeConfig().public.siteUrl)
})
