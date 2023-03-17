import { defineStore } from "pinia";


export const taskStore = defineStore('task', () => {



    async function createTask(task: Task) {

        try {
            await $fetch.raw(`https://join-a9f9a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`, {
                method: 'POST',
                body: JSON.stringify(task)
            }).then( (res) => {
                    console.log(res);
                    
            })
        } catch (error) {
            console.log('[task store]', error);

        }
    }


    return {
            createTask
    }

})


interface Task {
    title: string,
    description?: string
    category: string,
    assignedTo: string[],
    dueDate: Date,
    prio: string,
    subTasks: string[]

}

