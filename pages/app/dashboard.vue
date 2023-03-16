<template>
    <div>
            <h1>{{useUserStore.email}}</h1>
    </div>
</template>

<script setup>
import { authStore } from "~~/stores/auth"

    const useUserStore = authStore().userData;
    
</script>

<style lang="scss" scoped>
    
</style>