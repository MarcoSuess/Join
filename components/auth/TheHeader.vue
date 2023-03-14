<template>
  <header class="d-flex justify-space-between align-center pa-16">
    <NuxtLink to="/login">
      <img
        to="/login"
        class=""
        src="./../../assets/images/logo_black.png"
        alt="logo"
      />
    </NuxtLink>

    <div v-if="route.name == 'login'" class="d-flex align-center">
      <p>Not a Join user?</p>
      <v-btn to="/register" class="ml-4" variant="tonal"> Sign up </v-btn>
    </div>
  </header>
</template>

<script lang="ts" setup>
const route = useRoute();
console.log(route.name);
</script>

<style scoped lang="scss">
header {
  p {
    color: $dark-navy;
  }
}
</style>
