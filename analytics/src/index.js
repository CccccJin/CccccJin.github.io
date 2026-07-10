/**
 * Tiny private visitor counter for cccccjin.github.io.
 *
 * POST /hit       — beacon from the site: { id: <visitor uuid> }.
 *                   Records country (from Cloudflare), visit count, timestamps.
 * GET  /stats     — full data, requires Authorization: Bearer <STATS_TOKEN>
 *                   (or ?token=). Only the owner holds the token.
 * GET  /dashboard — HTML dashboard shell (no data inside); asks for the
 *                   token once, keeps it in the browser's localStorage,
 *                   then reads /stats from the same origin.
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

    if (url.pathname === '/dashboard' && request.method === 'GET') {
      return new Response(DASHBOARD_HTML, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Robots-Tag': 'noindex',
          'Cache-Control': 'no-store',
        },
      })
    }

    return new Response('not found', { status: 404 })
  },
}

const DASHBOARD_HTML = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<link rel="icon" href="data:,">
<title>访客统计 · cccccjin.github.io</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jsvectormap@1.6.0/dist/jsvectormap.min.css">
<script src="https://cdn.jsdelivr.net/npm/jsvectormap@1.6.0/dist/jsvectormap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jsvectormap@1.6.0/dist/maps/world.js"></script>
<style>
  body { margin: 0; background: #fff; color: #111; font: 16px/1.6 -apple-system, "PingFang SC", "Segoe UI", sans-serif; }
  .wrap { width: min(100% - 40px, 760px); margin: 40px auto 60px; }
  h1 { font-size: 22px; font-weight: 600; margin: 0 0 4px; }
  .sub { color: #777; font-size: 13px; margin-bottom: 24px; }
  .cards { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 26px; }
  .card { flex: 1; min-width: 140px; border: 1px solid #e5e5e5; border-radius: 12px; padding: 14px 18px; }
  .card b { display: block; font-size: 30px; font-weight: 650; }
  .card span { color: #777; font-size: 13px; }
  h2 { font-size: 15px; font-weight: 600; margin: 26px 0 10px; }
  #map { height: 360px; border: 1px solid #eee; border-radius: 12px; }
  .jvm-tooltip { font-family: inherit; }
  .row { display: flex; align-items: center; gap: 10px; margin: 5px 0; font-size: 14px; }
  .row .name { width: 180px; }
  .row .bar { height: 12px; background: #1772d0; border-radius: 3px; }
  .row .n { color: #555; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid #eee; white-space: nowrap; }
  th { color: #777; font-weight: 500; }
  td.id { font-family: ui-monospace, monospace; }
  button { font: inherit; padding: 6px 14px; border: 1px solid #ccc; border-radius: 8px; background: #fff; cursor: pointer; }
  button:hover { border-color: #888; }
  input { font: inherit; padding: 8px 10px; border: 1px solid #ccc; border-radius: 8px; width: 100%; box-sizing: border-box; }
  .err { color: #c0392b; }
  .top { display: flex; justify-content: space-between; align-items: baseline; }
</style>
</head>
<body>
<div class="wrap">
  <div class="top">
    <div><h1>访客统计</h1><div class="sub">cccccjin.github.io · 仅持密钥者可见</div></div>
    <button onclick="load()">刷新</button>
  </div>
  <div id="app">加载中…</div>
</div>
<script>
const app = document.getElementById('app')
const params = new URLSearchParams(location.search)
let token = params.get('token')
if (token) {
  localStorage.setItem('stats-token', token)
  history.replaceState(null, '', location.pathname)
} else {
  token = localStorage.getItem('stats-token')
}

function askToken(msg) {
  app.innerHTML =
    (msg ? '<p class="err">' + msg + '</p>' : '') +
    '<p>请输入访问密钥(输入一次后此浏览器会记住):</p>' +
    '<p><input id="tk" type="password" placeholder="STATS_TOKEN"></p>' +
    '<p><button onclick="saveToken()">进入</button></p>'
}
function saveToken() {
  token = document.getElementById('tk').value.trim()
  if (token) { localStorage.setItem('stats-token', token); load() }
}
function flag(cc) {
  return /^[A-Z]{2}$/.test(cc)
    ? String.fromCodePoint(...[...cc].map((c) => 127397 + c.charCodeAt(0)))
    : '🌐'
}
function fmt(iso) {
  return iso ? new Date(iso).toLocaleString() : '-'
}
async function load() {
  if (!token) return askToken()
  app.textContent = '加载中…'
  let res
  try {
    res = await fetch('/stats', { headers: { Authorization: 'Bearer ' + token } })
  } catch {
    app.innerHTML = '<p class="err">网络错误,请重试。</p>'
    return
  }
  if (res.status === 401) {
    localStorage.removeItem('stats-token')
    token = null
    return askToken('密钥不正确,请重新输入。')
  }
  const d = await res.json()
  const countries = Object.entries(d.byCountry).sort((a, b) => b[1] - a[1])
  const max = countries.length ? countries[0][1] : 1
  const names = new Intl.DisplayNames(['zh'], { type: 'region' })
  const visitsByCountry = {}
  for (const v of d.visitors) {
    if (/^[A-Z]{2}$/.test(v.country)) {
      visitsByCountry[v.country] = (visitsByCountry[v.country] || 0) + (v.visits || 0)
    }
  }
  let html =
    '<div class="cards">' +
    '<div class="card"><b>' + d.uniqueVisitors + '</b><span>独立访客</span></div>' +
    '<div class="card"><b>' + d.totalVisits + '</b><span>总访问次数</span></div>' +
    '<div class="card"><b>' + countries.length + '</b><span>国家/地区</span></div>' +
    '</div>' +
    '<h2>全球访问热度</h2><div id="map"></div>'
  if (countries.length) {
    html += '<h2>按国家/地区</h2>'
    for (const [cc, n] of countries) {
      let label = cc
      try { label = cc === '??' ? '未知' : names.of(cc) } catch { /* keep code */ }
      html +=
        '<div class="row"><span class="name">' + flag(cc) + ' ' + label + '</span>' +
        '<div class="bar" style="width:' + Math.max(4, (n / max) * 320) + 'px"></div>' +
        '<span class="n">' + n + '</span></div>'
    }
  }
  html += '<h2>访客明细(最近在前)</h2><table><tr><th>访客 ID</th><th>国家</th><th>次数</th><th>首次访问</th><th>最近访问</th></tr>'
  for (const v of d.visitors) {
    html +=
      '<tr><td class="id">' + v.id.slice(0, 13) + '…</td><td>' + flag(v.country) + ' ' + v.country +
      '</td><td>' + v.visits + '</td><td>' + fmt(v.firstSeen) + '</td><td>' + fmt(v.lastSeen) + '</td></tr>'
  }
  html += '</table>'
  app.innerHTML = html
  renderMap(visitsByCountry, d.byCountry)
}

let worldMap = null
function renderMap(visitsByCountry, visitorsByCountry) {
  const el = document.getElementById('map')
  if (!el) return
  if (typeof jsVectorMap === 'undefined') {
    el.textContent = '地图组件加载失败(CDN 不可达),其余数据不受影响。'
    el.style.padding = '20px'
    return
  }
  if (worldMap) {
    try { worldMap.destroy() } catch { /* stale instance */ }
    worldMap = null
  }
  worldMap = new jsVectorMap({
    selector: '#map',
    map: 'world',
    backgroundColor: 'transparent',
    zoomButtons: true,
    zoomOnScroll: false,
    regionStyle: {
      initial: { fill: '#e9edf2', stroke: '#fff', strokeWidth: 0.4 },
      hover: { fill: '#f09228' },
    },
    series: {
      regions: [{
        attribute: 'fill',
        values: visitsByCountry,
        scale: ['#cfe0f5', '#0b4f9e'],
        normalizeFunction: 'polynomial',
      }],
    },
    onRegionTooltipShow(event, tooltip, code) {
      const visits = visitsByCountry[code] || 0
      const people = visitorsByCountry[code] || 0
      tooltip.text(
        tooltip.text() + ':' + visits + ' 次访问 · ' + people + ' 位访客',
      )
    },
  })
}
load()
</script>
</body>
</html>`
