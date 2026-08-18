/**
 * Anonymous visit beacon. Sends a locally generated visitor id to the
 * private analytics worker. Fire-and-forget: must never break the page,
 * and only runs on the production host.
 */

const ENDPOINT = 'https://site-analytics.cccccjin.workers.dev/hit'

/**
 * My own browsers. Skipping the beacon here saves a pointless request; the
 * worker holds the same list and is the authority, since anyone can edit
 * their own localStorage. Keep the two in step — see OWN_VISITOR_IDS in
 * analytics/src/index.js.
 */
const OWN_VISITOR_IDS = ['56e5775a-dfb5-4dfb-9407-1cb52a541e60']

export function trackVisit() {
  if (window.location.hostname !== 'cccccjin.github.io') return
  if (!ENDPOINT.startsWith('https://')) return

  try {
    let id = localStorage.getItem('visitor-id')
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem('visitor-id', id)
    }
    if (OWN_VISITOR_IDS.includes(id.toLowerCase())) return
    const payload = JSON.stringify({ id })
    // Plain-text beacon avoids a CORS preflight; we never read the response.
    if (!navigator.sendBeacon?.(ENDPOINT, payload)) {
      fetch(ENDPOINT, { method: 'POST', body: payload, mode: 'no-cors', keepalive: true }).catch(
        () => {},
      )
    }
  } catch {
    // analytics must never interfere with the site
  }
}
