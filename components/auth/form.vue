<template>
  <v-text-field
    v-if="showNameInput"
    v-model="userName"
    :rules="nameRules"
    label="Name*"
    variant="outlined"
    required
    append-inner-icon="mdi-account-outline"
  ></v-text-field>

  <v-text-field
    v-model="email"
    :rules="emailRules"
    label="E-mail*"
    variant="outlined"
    required
    append-inner-icon="mdi-email-outline"
  ></v-text-field>

  <v-text-field
    v-model="password"
    :rules="passwordRules"
    label="Password*"
    type="password"
    required
    append-inner-icon="mdi-lock-outline"
    variant="outlined"
  ></v-text-field>
</template>

<script setup lang="ts">
defineProps({
    showNameInput: { 
        default() {
                return false
        },

        
    }
})


const userName = ref("")
const email = ref("")
const password = ref("")





</script>

<style lang="scss" scoped>

        
</style>
