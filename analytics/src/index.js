/**
 * Tiny private visitor counter for cccccjin.github.io.
 *
 * POST /hit    — beacon from the site: { id: <visitor uuid> }.
 *                Records country (from Cloudflare), visit count, timestamps.
 * GET  /stats  — full data, requires Authorization: Bearer <STATS_TOKEN>
 *                (or ?token=). Only the owner holds the token.
 */

const SITE_ORIGIN = 'https://cccccjin.github.io'

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': SITE_ORIGIN,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    if (url.pathname === '/hit' && request.method === 'POST') {
      let body
      try {
        body = await request.json()
      } catch {
        return new Response('bad request', { status: 400 })
      }
      const id =
        typeof body?.id === 'string' && /^[0-9a-f-]{8,64}$/i.test(body.id) ? body.id : null
      if (!id) return new Response('bad id', { status: 400 })

      const country = request.cf?.country || '??'
      const now = new Date().toISOString()
      const key = `visitor:${id}`
      const prev = await env.STATS.get(key, 'json')
      const record = prev
        ? { ...prev, country, visits: (prev.visits || 0) + 1, lastSeen: now }
        : { country, visits: 1, firstSeen: now, lastSeen: now }
      await env.STATS.put(key, JSON.stringify(record))

      return new Response('ok', {
        headers: { 'Access-Control-Allow-Origin': SITE_ORIGIN },
      })
    }

    if (url.pathname === '/stats' && request.method === 'GET') {
      const auth = request.headers.get('Authorization') || ''
      const token = auth.replace(/^Bearer\s+/i, '') || url.searchParams.get('token') || ''
      if (!env.STATS_TOKEN || token !== env.STATS_TOKEN) {
        return new Response('unauthorized', { status: 401 })
      }

      const visitors = []
      let cursor
      do {
        const page = await env.STATS.list({ prefix: 'visitor:', cursor })
        for (const k of page.keys) {
          const record = await env.STATS.get(k.name, 'json')
          if (record) visitors.push({ id: k.name.slice('visitor:'.length), ...record })
        }
        cursor = page.list_complete ? undefined : page.cursor
      } while (cursor)

      let totalVisits = 0
      const byCountry = {}
      for (const v of visitors) {
        totalVisits += v.visits || 0
        byCountry[v.country] = (byCountry[v.country] || 0) + 1
      }
      visitors.sort((a, b) => (b.lastSeen || '').localeCompare(a.lastSeen || ''))

      return new Response(
        JSON.stringify({ uniqueVisitors: visitors.length, totalVisits, byCountry, visitors }),
        { headers: { 'Content-Type': 'application/json' } },
      )
    }

    return new Response('not found', { status: 404 })
  },
}
