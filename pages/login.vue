<template>
  <v-card
    width="465"
    height="max-content"
    class="d-flex justify-start align-center flex-column pa-8"
  >
    <v-card-title class="d-flex justify-center align-center flex-column mb-4">
      <h1>Log in</h1>
      <div class="underline mt-8"></div>
    </v-card-title>

    <v-container>
      <AuthForm/>
    </v-container>

    <v-card-actions class="mt-2 d-flex w-100 pl-4">
      <v-btn class="mr-4" size="large" variant="tonal"> Login </v-btn>
      <v-btn class="btn-outlined" size="large" variant="outlined"> Guest Log in </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});


</script>

<style lang="scss" scoped>
h1 {
  color: $dark-navy;
}

.underline {
  width: 75%;
  border: 2px solid $secondary;
  border-radius: 8px;
}
</style>
