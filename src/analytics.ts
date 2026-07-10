/**
 * Anonymous visit beacon. Sends a locally generated visitor id to the
 * private analytics worker. Fire-and-forget: must never break the page,
 * and only runs on the production host.
 */

const ENDPOINT = 'https://site-analytics.cccccjin.workers.dev/hit'

export function trackVisit() {
  if (window.location.hostname !== 'cccccjin.github.io') return
  if (!ENDPOINT.startsWith('https://')) return

  try {
    let id = localStorage.getItem('visitor-id')
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem('visitor-id', id)
    }
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
