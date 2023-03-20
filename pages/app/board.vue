<template>
    <div>
        <h1>board</h1>
        <p v-for="task in tasks">
            {{ task.title }}
            {{ task.category }}
        </p>
    </div>
</template>

<script setup>
    import { taskStore } from "@/stores/task";
    
    const tasks = taskStore().tasks;
    
  

 

</script>

<style lang="scss" scoped>

</style>