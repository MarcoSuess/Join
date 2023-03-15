<template>
    <v-card
      width="465"
      height="max-content"
      class="d-flex justify-start align-center flex-column pa-8"
    >
      <AuthForm :is-register-form="true" />
    </v-card>
  </template>
  
  <script setup>
  definePageMeta({
    layout: "auth",
  });

  

  </script>
  
  <style lang="scss" scoped>
  
  </style>
  