import { defineStore } from "pinia";




export const useRegisterStore = defineStore('register', () => {
    const runtimeConfig = useRuntimeConfig();


    async function registerUser(userData: User, userPassword: string) {

        try {
            const getRegisterResponse = await $fetch.raw(runtimeConfig.public.apiSignUp, {
                method: 'POST',
                body: JSON.stringify({
                    email: userData.email,
                    password: userPassword,
                    returnSecureToken: true
                })
            })
            console.log(getRegisterResponse);
            await createUserToDatabase(userData, getRegisterResponse._data);

        } catch (error) {
            console.error('[register store]', error)
        }

    }

    async function createUserToDatabase(user: User, registerResponse: any) {
        try {
            const createUser = await $fetch.raw(`https://join-a9f9a-default-rtdb.europe-west1.firebasedatabase.app/users/${registerResponse.localId}.json?auth=${registerResponse.idToken}`, {
                method: 'POST',
                body: JSON.stringify(user)
            })

            console.log(createUser);


            localStorage.setItem('user_id', registerResponse.localId);
            localStorage.setItem('user_token', registerResponse.idToken);



        } catch (error) {
            console.error('[register store Database]', error)
        }
    }

    return {
        registerUser
    }




})




interface User {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
}