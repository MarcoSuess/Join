import { defineStore } from "pinia";
import type { Task } from "~~/types/task";



export const taskStore = defineStore('task', () => {

    const tasks = ref<Task[]>([]);


    async function createTask(task: Task) {
        const newTask = { ...task, status: 'todo' }
        try {
            await $fetch.raw(`https://join-a9f9a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`, {
                method: 'POST',
                body: JSON.stringify(newTask)
            }).then(async (res: any) => {
                await patchTask({ ...task, id: res._data.name })
            })
        } catch (error) {
            console.log('[task store, Post]', error);

        }
    }

    async function patchTask(task: Task) {
        try {
            await $fetch.raw(`https://join-a9f9a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${task.id}.json`, {
                method: 'PATCH',
                body: JSON.stringify(task)
            }).then(async (res) => {
                await getTasks();
            })
        } catch (error) {
            console.log('[task store, Post]', error);

        }
    }

    async function getTasks() {

        try {
            await $fetch.raw(`https://join-a9f9a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`).then((res: any) => {
                tasks.value = Object.keys(res._data).map((taskKey) => {
                    return res._data[taskKey]
                });
            })

        } catch (error) {
            console.log('[task store, Get]', error);
        }

    }

    async function deleteTask(task: Task) {
        try {
            await $fetch.raw(`https://join-a9f9a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${task.id}.json`, {
                method: 'DELETE',
                body: JSON.stringify(task)
            }).then(async (res) => {
                await getTasks();
            })
        } catch (error) {
            console.log('[task store, DELETE]', error);

        }
    }


    return {
        createTask,
        getTasks,
        patchTask,
        deleteTask,
        tasks
    }

})




