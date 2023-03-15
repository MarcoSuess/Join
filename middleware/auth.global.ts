import { authStore } from "~~/stores/auth"

export default defineNuxtRouteMiddleware(async (to, from) => {

    if(process.client) {

      const authUserStore = authStore()
  
      if (!authUserStore.initialized) {
        await authUserStore.auth()
      }
  
  
      console.log(to);



    }

    
  })
  