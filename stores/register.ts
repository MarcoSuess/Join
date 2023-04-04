import { defineStore } from "pinia";
import { User } from "~~/types/user";




export const useRegisterStore = defineStore('register', () => {
    const runtimeConfig = useRuntimeConfig();


    async function registerUser(userData: User, userPassword: string) {

        try {
            const getRegisterResponse: any = await $fetch.raw(runtimeConfig.public.apiSignUp, {
                method: 'POST',
                body: JSON.stringify({
                    email: userData.email,
                    password: userPassword,
                    returnSecureToken: true
                })
            })
            console.log(getRegisterResponse);
            const user = { ...userData, id: getRegisterResponse._data.localId};
            const token = getRegisterResponse._data.idToken;
            await createUserToDatabase(user, token);

        } catch (error) {
            console.error('[register store]', error)
        }

    } 

    async function createUserToDatabase(user: User, token: string) {
        try {
            const createUser: any = await $fetch.raw(`https://join-a9f9a-default-rtdb.europe-west1.firebasedatabase.app/users/${user.id}.json?auth=${token}`, {
                method: 'POST',
                body: JSON.stringify(user)
            })
            await useUserStore().patchUser({...user, uid: createUser._data.name})
            console.log(createUser);
            useCookie('user_id').value = user.id as string;
            useCookie('user_token').value = token;

        } catch (error) {
            console.error('[register store Database Create]', error)
        }
    }


  



    return {
        registerUser
    }




})




