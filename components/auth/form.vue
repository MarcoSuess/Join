<template>
  <NuxtLink v-if="isRegisterForm" to="/login">
    <v-icon class="backIcon" icon="mdi-arrow-left"></v-icon>
  </NuxtLink>

  <v-card-title class="d-flex justify-center align-center flex-column mb-4">
    <h1>{{ isRegisterForm ? "Sign up" : "Log in" }}</h1>
    <div class="underline mt-8"></div>
  </v-card-title>

  <v-container>
    <v-text-field
      v-if="isRegisterForm"
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
  </v-container>

  <v-card-actions class="mt-2 d-flex w-100 pl-4">
    <v-btn v-if="!isRegisterForm" class="mr-4" size="large" variant="tonal">
      Login
    </v-btn>
    <v-btn
      v-if="!isRegisterForm"
      class="btn-outlined"
      size="large"
      variant="outlined"
    >
      Guest Log in
    </v-btn>
    <v-btn v-if="isRegisterForm" class="mr-4" size="large" variant="tonal">
      Sign up
    </v-btn>
  </v-card-actions>
</template>

<script setup lang="ts">
defineProps({
  isRegisterForm: {
    default() {
      return false;
    },
  },
});

const userName = ref("");
const email = ref("");
const password = ref("");
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

.backIcon {
  position: absolute;
  left: 64px;
  top: 48px;
  color: $secondary;
  font-size: 1.8rem;
}
</style>
