import { loadingPage, LOADING_STATE } from './tv.js'
import { navigate, swapFunctions } from 'astro:transitions/client'

const MIN_LOADING_TIME = 300

// ─── Caption bar (index page) ──────────────────────────────────────────────
// Must live here because deselectScripts() prevents index.astro's <script>
// from running during SPA navigations. This module runs once at startup
// regardless of which page was the entry point.

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&*?@^~'
const rc = () => CHARS[Math.floor(Math.random() * CHARS.length)]
const MODES = ['ON', 'CC1', 'CC2', 'EGG']
const ARROW = ' \u25B8'
const LABELS = {
  ON: 'SUBTITLE: ON' + ARROW,
  CC1: 'SUBTITLE: CC1' + ARROW,
  CC2: 'SUBTITLE: CC2' + ARROW,
  EGG: 'SUBTITLE: ????' + ARROW,
}
const CAPTIONS = {
  ON: 'CAPTION: ABOUT',
  CC1: 'CAPTION: LIVE FEED',
  CC2: 'CAPTION: SYS DATA',
  EGG: 'CAPTION: [REDACTED]',
}
// Session state for the homepage caption bar. We intentionally reset it
// whenever index DOM is entered so `/` always starts in SUBTITLE: ON.
const captionState = { modeIndex: 0, transitioning: false }

function resetCaptionState() {
  captionState.modeIndex = 0
  captionState.transitioning = false
}

function applyMode(mode) {
  document.querySelectorAll('.subtitle-mode').forEach((p) => {
    p.style.display = 'none'
  })
  const pane = document.querySelector('.subtitle-mode-' + mode.toLowerCase())
  if (pane) {
    pane.removeAttribute('hidden')
    pane.style.display = ''
  }
  const btn = document.getElementById('lt-subtitle-toggle')
  if (btn) {
    btn.textContent = LABELS[mode]
    btn.dataset.mode = mode
  }
  const meta = document.getElementById('lt-caption-meta')
  if (meta) meta.textContent = CAPTIONS[mode]
}

function syncCaptionUI({ reset = false } = {}) {
  if (!document.getElementById('lt-subtitle-toggle')) return
  if (reset) resetCaptionState()
  applyMode(MODES[captionState.modeIndex])
}

function scrambleReveal(duration, onDone) {
  const content = document.querySelector('.lower-third-content')
  const decodeBtn = document.getElementById('lt-decode-btn')
  if (!content) {
    if (onDone) onDone()
    return
  }
  const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT)
  const nodes = []
  const originals = []
  let n
  while ((n = walker.nextNode())) {
    if (n.textContent.trim()) {
      nodes.push(n)
      originals.push(n.textContent)
    }
  }
  nodes.forEach((nd) => {
    nd.textContent = nd.textContent.replace(/\S/g, rc)
  })
  if (decodeBtn) {
    decodeBtn.classList.add('decoding')
    decodeBtn.textContent = 'MODE: ACTIVE'
  }
  let elapsed = 0
  const id = setInterval(() => {
    elapsed += 25
    const p = elapsed / duration
    nodes.forEach((nd, i) => {
      const orig = originals[i]
      const rev = Math.floor(orig.length * p)
      nd.textContent = Array.from(orig, (c, j) =>
        j < rev || !c.trim() ? c : rc()
      ).join('')
    })
    if (elapsed >= duration) {
      clearInterval(id)
      nodes.forEach((nd, i) => {
        nd.textContent = originals[i]
      })
      if (decodeBtn) {
        decodeBtn.classList.remove('decoding')
        decodeBtn.textContent = 'MODE: DECODE'
      }
      if (onDone) onDone()
    }
  }, 25)
}

export function initCaptionBar() {
  // Sync UI state immediately (handles hard-refresh on index)
  syncCaptionUI({ reset: true })

  // Bind listeners only once for the whole browser session
  if (window.__captionBound) return
  window.__captionBound = true

  document.addEventListener('click', (e) => {
    if (e.target?.closest('#lt-subtitle-toggle')) {
      if (captionState.transitioning) return
      captionState.transitioning = true
      captionState.modeIndex = (captionState.modeIndex + 1) % MODES.length
      applyMode(MODES[captionState.modeIndex])
      scrambleReveal(700, () => {
        captionState.transitioning = false
      })
      return
    }
    if (e.target?.closest('#lt-decode-btn')) {
      const btn = document.getElementById('lt-decode-btn')
      if (
        !btn ||
        btn.classList.contains('decoding') ||
        captionState.transitioning
      )
        return
      scrambleReveal(900, undefined)
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return
    const toggle = e.target?.closest('#lt-subtitle-toggle')
    if (toggle) {
      e.preventDefault()
      toggle.click()
    }
  })
}

export function gotoPage(url) {
  if (!url || url.startsWith('#')) return
  navigate(url)
}

const HEAD_PERSIST_ATTR = 'data-astro-transition-persist'

function getMatchingHeadElement(newEl) {
  const persistId = newEl.getAttribute(HEAD_PERSIST_ATTR)
  if (persistId) {
    return document.head.querySelector(`[${HEAD_PERSIST_ATTR}="${persistId}"]`)
  }

  if (newEl.matches('link[rel=stylesheet]')) {
    const href = newEl.getAttribute('href')
    if (!href) return null
    return document.head.querySelector(`link[rel=stylesheet][href="${href}"]`)
  }

  return null
}

function swapHeadElementsInOrder(newDoc) {
  const nextHeadChildren = []
  const reusedChildren = new Set()

  for (const newChild of Array.from(newDoc.head.children)) {
    const existingChild = getMatchingHeadElement(newChild)
    if (existingChild) {
      reusedChildren.add(existingChild)
      nextHeadChildren.push(existingChild)
    } else {
      nextHeadChildren.push(newChild)
    }
  }

  for (const currentChild of Array.from(document.head.children)) {
    if (!reusedChildren.has(currentChild)) {
      currentChild.remove()
    }
  }

  document.head.append(...nextHeadChildren)
}

// ─── Role cycling (index page) ──────────────────────────────────────────
const roles = [
  'Cybersecurity Engineer',
  'Penetration Tester',
  'Ethical Hacker',
  'Security Researcher',
]

export function stopRoleCycling() {
  if (window.__roleIntervalId != null) {
    clearInterval(window.__roleIntervalId)
    window.__roleIntervalId = null
  }
}

export function initRoleCycling() {
  stopRoleCycling()
  const roleElement = document.querySelector('.role-text')
  if (!roleElement) return // not on index
  let roleIndex = 0
  window.__roleIntervalId = setInterval(() => {
    roleElement.classList.add('changing')
    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length
      roleElement.textContent = roles[roleIndex] + ' '
      setTimeout(() => roleElement.classList.remove('changing'), 400)
    }, 200)
  }, 3000)
}

// ─── Title cycling (whoami page) ───────────────────────────────────────
const titles = ['WHOAMI', 'm00lut', 'Mevlüt Yıldırım']

export function stopTitleCycling() {
  if (window.__whoamiTitleInterval != null) {
    clearInterval(window.__whoamiTitleInterval)
    window.__whoamiTitleInterval = null
  }
}

export function initTitleCycling() {
  stopTitleCycling()
  const titleElement = document.querySelector('.whoami-text')
  if (!titleElement) return // not on whoami
  let titleIndex = 0
  window.__whoamiTitleInterval = setInterval(() => {
    titleElement.classList.add('changing')
    setTimeout(() => {
      titleIndex = (titleIndex + 1) % titles.length
      titleElement.textContent = titles[titleIndex]
      setTimeout(() => titleElement.classList.remove('changing'), 400)
    }, 200)
  }, 3000)
}

export function setupClientNavigation() {
  document.addEventListener('astro:before-preparation', (event) => {
    const navStart = performance.now()
    loadingPage.set(LOADING_STATE.Loading)

    // Wrap loader to enforce minimum time BEFORE swap so old content stays visible
    const originalLoader = event.loader
    event.loader = async () => {
      const start = navStart
      await originalLoader()
      const elapsed = performance.now() - start
      const remaining = MIN_LOADING_TIME - elapsed

      if (remaining > 0) {
        await new Promise((r) => setTimeout(r, remaining))
      }
    }
  })

  document.addEventListener('astro:before-swap', (event) => {
    // Stop cycling intervals before DOM is replaced
    stopRoleCycling()
    stopTitleCycling()
    const newDoc = event.newDocument
    if (!newDoc) return

    // Mirror native sequence except we don't replace the whole body element.
    event.swap = () => {
      //Mark new scripts that should not execute
      swapFunctions.deselectScripts(newDoc)

      // no need for swapping html attributes
      // swapFunctions.swapRootAttributes(newDoc)

      // Keep the incoming head order stable while reusing identical stylesheets.
      swapHeadElementsInOrder(newDoc)

      const restoreFocus = swapFunctions.saveFocus()

      const currentSwapContainer = document.querySelector(
        '[data-swap-container]'
      )
      const newSwapContainer = newDoc.querySelector('[data-swap-container]')
      // custom swap container to preserve css animations
      swapFunctions.swapBodyElement(newSwapContainer, currentSwapContainer)

      restoreFocus()
    }
  })

  document.addEventListener('astro:after-swap', () => {
    loadingPage.set(LOADING_STATE.Done)
    document
      .querySelector('.tv-content')
      ?.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    // Re-bind whoami nav scroll every swap (nav is fresh DOM after each transition)
    initNavScroll()
    // Re-bind achievements HUD/path interactions every swap (DOM is fresh too)
    initAchievementsInteractions()
    // Reset the index subtitle state whenever homepage DOM is swapped in
    syncCaptionUI({ reset: true })
    // Restart correct cycling animation for the new page
    initRoleCycling()
    initTitleCycling()
  })
}

// ─── Whoami smooth-scroll nav ───────────────────────────────────────────────
// Lives here (not in whoami.astro) because Astro's deselectScripts() prevents
// page-level <script> modules from re-executing during SPA navigations. The
// layout script (and this module) runs once on startup; astro:after-swap then
// re-binds to the fresh .page-nav DOM element on every navigation.
export function initNavScroll() {
  const nav = document.querySelector('.page-nav')
  if (!nav) return // not on whoami

  nav.addEventListener('click', (e) => {
    const link = e.target?.closest?.('.page-nav__link')
    if (!link) return

    const scrollRoot = document.querySelector('.tv-content')
    if (!scrollRoot) return

    // Scroll-to-top button
    if ('scrollTop' in link.dataset) {
      scrollRoot.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const targetId = link.dataset.target
    if (!targetId) return

    const target = document.querySelector(targetId)
    if (!target) return

    const navH = nav.offsetHeight
    const rootRect = scrollRoot.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    const offsetTop =
      scrollRoot.scrollTop + (targetRect.top - rootRect.top) - navH

    scrollRoot.scrollTo({ top: Math.max(0, offsetTop), behavior: 'smooth' })
  })
}

// ─── Achievements HUD navigation + touch panels ───────────────────────────
// Lives here for the same reason as whoami nav: page-level scripts are not
// reliable during SPA swaps when only the content container is replaced.
export function initAchievementsInteractions() {
  const strip = document.querySelector('.hud-strip')
  if (strip && !strip._hudScrollBound) {
    strip._hudScrollBound = true
    strip.addEventListener('click', (e) => {
      const link = e.target?.closest?.('.hud-link')
      if (!link) return

      const scrollRoot = document.querySelector('.tv-content')
      if (!scrollRoot) return

      const targetId = link.dataset.target
      if (!targetId) return

      const target = document.querySelector(targetId)
      if (!target) return

      const hudH = strip.offsetHeight
      const rootRect = scrollRoot.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      const offsetTop =
        scrollRoot.scrollTop + (targetRect.top - rootRect.top) - hudH - 16

      scrollRoot.scrollTo({ top: Math.max(0, offsetTop), behavior: 'smooth' })
    })
  }

  document.querySelectorAll('.path-row').forEach((row) => {
    if (row._pathTouchBound) return
    row._pathTouchBound = true

    row.addEventListener('click', () => {
      if (!window.matchMedia('(hover: hover)').matches) {
        row.classList.toggle('is-open')
      }
    })
  })
}
