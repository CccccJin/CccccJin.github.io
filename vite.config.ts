import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Date of the last commit, baked into the bundle for the footer. Reflects when
 * the content actually changed rather than when the build ran. Works under the
 * shallow clone Actions checks out; falls back to build time if git is absent.
 */
function lastUpdated() {
  try {
    return execSync('git log -1 --format=%cI', { encoding: 'utf8' }).trim()
  } catch {
    return new Date().toISOString()
  }
}

export default defineConfig({
  base: './',
  plugins: [react()],
  define: { __LAST_UPDATED__: JSON.stringify(lastUpdated()) },
})
