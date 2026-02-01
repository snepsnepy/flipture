import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top on navigation
    return { top: 0, behavior: 'smooth' }
  }
}
