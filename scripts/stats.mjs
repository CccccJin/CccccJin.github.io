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

const countryName = new Intl.DisplayNames(['en'], { type: 'region' })
const fmtDate = (iso) => (iso ? iso.replace('T', ' ').slice(0, 16) + ' UTC' : '-')

console.log('─'.repeat(64))
console.log(`  Unique visitors : ${data.uniqueVisitors}`)
console.log(`  Total visits    : ${data.totalVisits}`)
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
