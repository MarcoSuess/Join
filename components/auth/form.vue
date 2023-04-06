<template>
  <NuxtLink v-if="isRegisterForm" to="/">
    <v-icon class="backIcon" icon="mdi-arrow-left"></v-icon>
  </NuxtLink>

  <v-card-title class="d-flex justify-center align-center flex-column mb-4">
    <h1>{{ isRegisterForm ? "Sign up" : "Log in" }}</h1>
    <div class="underline mt-8"></div>
  </v-card-title>

  <v-container>
    <v-text-field
      v-if="isRegisterForm"
      v-model="firstName"
      :rules="nameRules"
      label="First Name*"
      variant="outlined"
      required
      append-inner-icon="mdi-account-outline"
    ></v-text-field>

    <v-text-field
      v-if="isRegisterForm"
      v-model="lastName"
      :rules="nameRules"
      label="Last Name*"
      variant="outlined"
      required
      append-inner-icon="mdi-account-outline"
    ></v-text-field>

    <v-text-field
      v-if="isRegisterForm"
      v-model="phoneNumber"
      :rules="phoneRules"
      label="Phone Number*"
      variant="outlined"
      required
      append-inner-icon="mdi-phone-outline"
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
    <v-btn
      v-if="!isRegisterForm"
      :disabled="!checkLoginValues"
      class="mr-4"
      size="large"
      variant="tonal"
      @click="loginUser"
    >
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
    <v-btn
      @click="registerUser"
      :disabled="!checkRegisterValues"
      v-if="isRegisterForm"
      class="mr-4"
      size="large"
      variant="tonal"
    >
      Sign up
    </v-btn>
  </v-card-actions>
</template>

<script setup lang="ts">
import { useRegisterStore } from "@/stores/register";
import { authStore } from "@/stores/auth";

const router = useRouter();

defineProps({
  isRegisterForm: {
    default() {
      return false;
    },
  },
});

const firstName = ref("");
const lastName = ref("");
const phoneNumber = ref("");
const email = ref("");
const password = ref("");

const checkRegisterValues = computed(() => {
  if (
    nameRules[0](firstName.value) === true &&
    nameRules[0](lastName.value) === true &&
    phoneRules[0](phoneNumber.value) === true &&
    emailRules[0](email.value) === true &&
    passwordRules[1](password.value) === true
  ) {
    return true;
  }

  return false;
});

const registerUser = async () => {
  const registerStore = useRegisterStore();
  await registerStore.registerUser(
    {
      firstName: firstName.value,
      lastName: lastName.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
    },
    password.value
  );

  await authStore().auth();
  return navigateTo({path: "/app/dashboard"})
};

const checkLoginValues = computed(() => {
  if (
    emailRules[0](email.value) === true &&
    passwordRules[1](password.value) === true
  ) {
    return true;
  }

  return false;
});

const loginUser = async () => {
  await useLoginStore().login(email.value, password.value);
  return navigateTo({path: "/app/dashboard"})
};


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

.v-text-field {
  margin-top: 8px;
}
</style>
