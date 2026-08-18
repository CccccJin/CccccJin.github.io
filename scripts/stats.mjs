#!/usr/bin/env node
/**
 * Private visitor stats viewer. Run: npm run stats
 *
 * Reads STATS_URL and STATS_TOKEN from .stats.env (gitignored) or the
 * environment. Only whoever holds the token can read the data.
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function loadEnvFile() {
  try {
    const text = readFileSync(resolve(import.meta.dirname, '..', '.stats.env'), 'utf8')
    for (const line of text.split('\n')) {
      const match = line.match(/^\s*([A-Z_]+)\s*=\s*(.+?)\s*$/)
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2]
    }
  } catch {
    /* fall back to process env */
  }
}

loadEnvFile()
const { STATS_URL, STATS_TOKEN } = process.env
if (!STATS_URL || !STATS_TOKEN) {
  console.error('Missing STATS_URL / STATS_TOKEN. Put them in .stats.env (see README).')
  process.exit(1)
}

const res = await fetch(`${STATS_URL}/stats`, {
  headers: { Authorization: `Bearer ${STATS_TOKEN}` },
})
if (!res.ok) {
  console.error(`Request failed: ${res.status} ${await res.text()}`)
  process.exit(1)
}
const data = await res.json()

/**
 * Same list as OWN_VISITOR_IDS in analytics/src/index.js. A worker that
 * predates the server-side filter sends every record and no `excluded`
 * block, so fall back to filtering here — this viewer should report
 * visitor-only numbers either way.
 */
const OWN_VISITOR_IDS = new Set(['56e5775a-dfb5-4dfb-9407-1cb52a541e60'])

if (!data.excluded) {
  const excluded = { visitors: 0, visits: 0 }
  const kept = []
  for (const v of data.visitors) {
    if (OWN_VISITOR_IDS.has(v.id.toLowerCase())) {
      excluded.visitors += 1
      excluded.visits += v.visits || 0
    } else {
      kept.push(v)
    }
  }
  data.visitors = kept
  data.uniqueVisitors = kept.length
  data.totalVisits = kept.reduce((n, v) => n + (v.visits || 0), 0)
  data.byCountry = {}
  for (const v of kept) data.byCountry[v.country] = (data.byCountry[v.country] || 0) + 1
  data.excluded = excluded
}

const countryName = new Intl.DisplayNames(['en'], { type: 'region' })
const fmtDate = (iso) => (iso ? iso.replace('T', ' ').slice(0, 16) + ' UTC' : '-')

console.log('─'.repeat(64))
console.log(`  Unique visitors : ${data.uniqueVisitors}`)
console.log(`  Total visits    : ${data.totalVisits}`)
if (data.excluded?.visits) {
  console.log(`  (excluding ${data.excluded.visits} own visits from ${data.excluded.visitors} id)`)
}
console.log('─'.repeat(64))

const countries = Object.entries(data.byCountry).sort((a, b) => b[1] - a[1])
if (countries.length) {
  console.log('  Visitors by country:')
  const max = countries[0][1]
  for (const [code, count] of countries) {
    let name = code
    try {
      name = code === '??' ? 'Unknown' : `${countryName.of(code)} (${code})`
    } catch {
      /* keep raw code */
    }
    const bar = '█'.repeat(Math.max(1, Math.round((count / max) * 24)))
    console.log(`    ${name.padEnd(28)} ${String(count).padStart(4)}  ${bar}`)
  }
  console.log('─'.repeat(64))
}

console.log('  Recent visitors:')
for (const v of data.visitors.slice(0, 20)) {
  console.log(
    `    ${v.id.slice(0, 8)}…  ${String(v.country).padEnd(3)} visits=${String(v.visits).padStart(3)}  first=${fmtDate(v.firstSeen)}  last=${fmtDate(v.lastSeen)}`,
  )
}
if (data.visitors.length > 20) {
  console.log(`    … and ${data.visitors.length - 20} more`)
}
console.log('─'.repeat(64))
