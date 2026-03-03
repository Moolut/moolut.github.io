import { loadingPage, LOADING_STATE } from './tv.js'
import { navigate, swapFunctions } from 'astro:transitions/client'

const MIN_LOADING_TIME = 300

export function gotoPage(url) {
  if (!url || url.startsWith('#')) return
  navigate(url)
}

const htmlClassToPersist = ['webp', 'avif']

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
    const newDoc = event.newDocument
    if (!newDoc) return

    // Mirror native sequence except we don't replace the whole body element.
    event.swap = () => {
      //Mark new scripts that should not execute
      swapFunctions.deselectScripts(newDoc)

      // no need for swapping html attributes
      // swapFunctions.swapRootAttributes(newDoc)

      // essential for page-specific styles
      swapFunctions.swapHeadElements(newDoc)

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

    const targetId = link.dataset.target
    if (!targetId) return

    const target = document.querySelector(targetId)
    if (!target) return

    const scrollRoot = document.querySelector('.tv-content')
    if (!scrollRoot) return

    const navH = nav.offsetHeight
    const rootRect = scrollRoot.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    const offsetTop =
      scrollRoot.scrollTop + (targetRect.top - rootRect.top) - navH

    scrollRoot.scrollTo({ top: Math.max(0, offsetTop), behavior: 'smooth' })
  })
}
