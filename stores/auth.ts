import { defineStore } from "pinia"

export const authStore = defineStore('auth', () => {
    const isLoggedIn = ref(false)
    const initialized = ref(false)
    const loading = ref(false)
    const userData = ref<any>(null)
  
    async function auth() {
      const id = localStorage.getItem('user_id')
      const token = localStorage.getItem('user_token')
  
      if (!id || !token) {
        return
      }
  
      loading.value = true
      try {
        const getUser = await $fetch.raw(`https://join-a9f9a-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json?auth=${token}`, {
            method: 'GET',
        })
        console.log('res', getUser)
  
      } catch (error) {
        console.error('[auth store]', error)
      }
      loading.value = false
      initialized.value = true
    }
  
    return {
      auth,
  
      initialized,
      isLoggedIn,
      loading,
      userData
    }
  })
  