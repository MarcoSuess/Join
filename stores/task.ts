import { defineStore } from "pinia";
import { Task, TaskStatus } from "~~/composables/task";


export const taskStore = defineStore('task', () => {

    const tasks = ref<Task[]>([]);


    async function createTask(task: Task) {

        const newTask = { ...task, status: TaskStatus.Todo }


        try {
            await $fetch.raw(`https://join-a9f9a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`, {
                method: 'POST',
                body: JSON.stringify(newTask)
            }).then((res) => {
                console.log(res);

            })
        } catch (error) {
            console.log('[task store, Post]', error);

        }
    }


    async function getTasks() {

        try {
            await $fetch.raw(`https://join-a9f9a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`).then((res: any) => {
                console.log(res);
                tasks.value = Object.keys(res._data).map((taskKey) => {
                    return res._data[taskKey]
                });
            })

        } catch (error) {
            console.log('[task store, Get]', error);
        }

    }


    return {
        createTask,
        getTasks,
        tasks
    }

})




