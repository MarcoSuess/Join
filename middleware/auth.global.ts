import { authStore } from "~~/stores/auth"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authUserStore = authStore()


  if (!authUserStore.initialized) {
    await authUserStore.auth()
  }


  if (to.path === '/' && authUserStore.isLoggedIn || to.path === '/register' && authUserStore.isLoggedIn) {
    return navigateTo('/app/dashboard')
  }

  if (to.path !== '/' && to.path !== '/register' && !authUserStore.isLoggedIn) {
    return navigateTo('/')
  }

})
