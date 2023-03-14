<template>
  <v-card
    width="400"
    height="max-content"
    class="d-flex justify-start align-center flex-column pa-8"
  >
    <v-card-title class="d-flex justify-center align-center flex-column mb-4">
      <h1>Log in</h1>
      <div class="underline mt-8"></div>
    </v-card-title>

    <v-container>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        variant="outlined"
        required
        append-inner-icon="mdi-email-outline"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="rules"
        label="Password"
        type="password"
        append-inner-icon="mdi-lock-outline"
        variant="outlined"
      ></v-text-field>
    </v-container>

    <v-card-actions class="mt-8 d-flex justify-space-around w-100">
      <v-btn size="large" variant="tonal"> Login </v-btn>
      <v-btn class="btn-outlined" size="large" variant="outlined"> Guest Log in </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});

const email = ref("");
const password = ref("");

const rules = [
  (value) => {
    if (value) return true;
    return "You must enter a first name.";
  },
];
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
