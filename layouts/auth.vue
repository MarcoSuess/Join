<template>
  <v-app>
    <AuthTheHeader />
    <v-main class="d-flex justify-center pt-16">
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">

    
</script>

<style scoped lang="scss">
.v-application{
  background: $white;
}


</style>
