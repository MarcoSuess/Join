import { defineStore } from "pinia";
import { User } from "~~/types/user";



export const useUserStore = defineStore('user', () => {



    const allUsers = ref<any[]>([])





    async function getAllUsers() {

        try {
            await $fetch.raw(`https://join-a9f9a-default-rtdb.europe-west1.firebasedatabase.app/users.json`).then(async (res: any) => {
                console.log(res);
                const getAllUserToArr = Object.keys(res._data).map((taskKey) => {
                    return Object.keys(res._data[taskKey]).map((childKey) => res._data[taskKey][childKey])
                });
                allUsers.value = getAllUserToArr.map((user) => user[0]);
            })


        } catch (error) {
            console.error('[register store Database Patch]', error)
        }

    }



    async function patchUser(user: User) {
        try {
            const patchUser = await $fetch.raw(`https://join-a9f9a-default-rtdb.europe-west1.firebasedatabase.app/users/${user.id}/${user.uid}.json?auth=${user.token}`, {
                method: 'PATCH',
                body: JSON.stringify(user)
            })
            console.log(patchUser);
        } catch (error) {
            console.error('[register store Database Patch]', error)
        }


    }


    return {
        patchUser,
        getAllUsers,
        allUsers
    }


})