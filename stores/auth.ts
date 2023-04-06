import { defineStore } from "pinia"

export const authStore = defineStore('auth', () => {
    const isLoggedIn = ref(false)
    const initialized = ref(false)
    const loading = ref(false)
    const userData = ref<any>(null)
  
    async function auth() {
      const userID = useCookie('user_id').value;
      const userToken = useCookie('user_token').value;
   
      if (!userID || !userToken) {
        return
      }
  
      loading.value = true
      try {
        const getUser: any = await $fetch.raw(`https://join-a9f9a-default-rtdb.europe-west1.firebasedatabase.app/users/${userID}.json?auth=${userToken}`, {
            method: 'GET',
        })
     
       
       const getUserKey = Object.keys(getUser._data)[0];
       userData.value = await getUser._data[getUserKey];
       isLoggedIn.value = true;
       console.log(userData.value);
       
  
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
  