import { defineStore } from "pinia";


export const useLoginStore = defineStore('login', () => {
    const runtimeConfig = useRuntimeConfig();

    async function login(email: string, password: string) {


        try {
            const loginResponse: any = await $fetch.raw(runtimeConfig.public.apiSignIn, {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })
            })
            console.log(loginResponse);
            useCookie('user_id').value = loginResponse._data.localId;
            useCookie('user_token').value = loginResponse._data.idToken;

        } catch (error) {
            console.error('[register store]', error)

        }

    }


    return {
        login
    }

})