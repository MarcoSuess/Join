<template>
  <v-container class="main-contact d-flex h-100 w-100">
    <div class="contact-list overflow-y-auto pa-6">
      <v-item-group>
        <div
          v-for="contact of useUserStore().allUsers"
          class="contact-item d-flex"
        >
          <template v-for="letter of letters">
            <div
              class="mt-12"
              v-if="contact.firstName.charAt(0).toLowerCase() === letter"
            >
              <span>
                <strong>{{ letter.toUpperCase() }}</strong>
              </span>
              <v-divider class="border-opacity-25 mt-4"></v-divider>

              <v-hover v-slot="{ isHovering, props }" close-delay="20">
                <v-item v-slot="{ isSelected, select }">
                  <div
                    class="contact d-flex align-center mt-4 w-100 pa-2"
                    :elevation="isHovering ? 4 : 2"
                    :class="{ 'on-hover': isHovering, selected: isSelected }"
                    v-bind="props"
                    @click="
                      selectUser(contact);
                      select(true);
                    "
                  >
                    <v-avatar color="red" size="40" class="avatar mr-4">
                      <span>{{
                        getUserFullNameAbbr(contact.firstName, contact.lastName)
                      }}</span>
                    </v-avatar>
                    <div
                      :class="{ 'contact-name-email-active': isSelected }"
                      class="contact-name-email"
                    >
                      <p>{{ contact.firstName }} {{ contact.lastName }}</p>
                      <p class="mail">{{ contact.email }}</p>
                    </div>
                  </div>
                </v-item>
              </v-hover>
            </div>
          </template>
        </div>
      </v-item-group>
    </div>

    <div class="contact-info h-100 w-100 pa-14">
      <div class="title d-flex align-center">
        <h1 class="mr-4">Contacts</h1>
        <p><strong> Better with a Team</strong></p>

        <v-btn
          v-if="selectedUserData"
          append-icon="mdi-file-edit-outline"
          class="ml-auto btn-default"
          @click="openEditModal = true"
        >
          Edit Contact
        </v-btn>
      </div>
      <template v-if="selectedUserData">
        <div class="contact-profile d-flex mt-12 align-center">
          <v-avatar color="red" size="64" class="avatar mr-4">
            <span class="text-h5">{{
              getUserFullNameAbbr(
                selectedUserData.firstName,
                selectedUserData.lastName
              )
            }}</span>
          </v-avatar>

          <p class="text-h6 ml-2">
            {{ selectedUserData.firstName }} {{ selectedUserData.lastName }}
          </p>
        </div>

        <h3 class="mt-12">Contact-Information</h3>
        <div class="d-flex mt-4">
          <strong style="width: 64px" class="mr-2">Email:</strong>
          <p class="mail">{{ selectedUserData.email }}</p>
        </div>
        <div class="d-flex mt-4">
          <strong style="width: 64px" class="mr-2">Phone:</strong>
          <p>+{{ selectedUserData.phoneNumber }}</p>
        </div>
      </template>
    </div>
  </v-container>

  <v-dialog persistent v-model="openEditModal" width="64%" class="d-flex pa-0">
    <v-card class="v-card-modal flex-row pa-0">
      <v-icon
        @click="closeDialog"
        class="close-icon"
        icon="mdi-close"
        size="large"
      ></v-icon>

      <div class="left-title">
        <img src="../../assets/images/logo.png" />
        <h2 class="text-h5 mt-4"><strong>Edit Contact </strong></h2>
        <div class="costume-divider"></div>
      </div>

      <div
        class="right-edit h-100 d-flex flex-row align-center pl-8  pt-12"
      >
        <v-avatar color="red" size="96" class="avatar mr-4">
          <span class="text-h4">{{
            getUserFullNameAbbr(
              selectedUserData.firstName,
              selectedUserData.lastName
            )
          }}</span>
        </v-avatar>

        <div class="contact-form ml-6 w-100">
          <v-text-field
            v-model="selectedUserData.firstName"
            :rules="nameRules"
            label="First Name*"
            variant="outlined"
            required
            append-inner-icon="mdi-account-outline"
          ></v-text-field>

          <v-text-field
            v-model="selectedUserData.lastName"
            :rules="nameRules"
            label="Last Name*"
            variant="outlined"
            required
            append-inner-icon="mdi-account-outline"
          ></v-text-field>

          <v-text-field
            v-model="selectedUserData.phoneNumber"
            :rules="phoneRules"
            label="Phone Number*"
            variant="outlined"
            required
            append-inner-icon="mdi-phone-outline"
          ></v-text-field>

          <v-text-field
            v-model="selectedUserData.email"
            :rules="emailRules"
            label="E-mail*"
            variant="outlined"
            required
            append-inner-icon="mdi-email-outline"
          ></v-text-field>
        </div>
      </div>

      <div class="action">
        <v-btn
          class="mr-8"
          :append-icon="'mdi-backup-restore'"
          color="error"
          variant="plain"
          @click="clearForm"
        >
          Reset
        </v-btn>

        <v-btn
          @click="submitForm()"
          class="btn-save-contact"
          append-icon="mdi-check"
        >
          Save Contact
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

const selectedUserData = ref();

const openEditModal = ref(false);

const selectUser = (user) => {
  selectedUserData.value = user;
};

const letters = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
</script>

<style lang="scss" scoped>
.contact-list {
  background-color: rgb(245 245 245);
  min-width: 25%;
}

.main-contact {
  margin: 0;
  padding: 0;
}

.title {
  h1 {
    border-right: 3px solid $secondary;
    padding-right: 32px;
  }

  p {
    font-size: 1.3rem;
    color: $dark-navy;
  }
}

.contact-list {
  max-height: calc(100vh - 64px) !important;
  height: auto;
}
.contact-item {
  flex-direction: column;
}

.mail {
  color: #024f93;
}

.contact {
  cursor: pointer;
  border-radius: 4px;
}
.on-hover {
  scale: 1.05;
}

.selected {
  background-color: $dark-navy;
}

.contact-name-email-active {
  p {
    color: white;
  }

  .mail {
    color: #0ff;
  }
}

//modal

.left-title {
  background-color: $dark-navy;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 32px;
  width: 30%;

  img {
    object-fit: cover;
    width: 64px;
  }

  h2 {
    color: white;
  }
}

.right-edit {
  padding-bottom: 96px;
  width: 56%;
}

.costume-divider {
  border: 1.8px solid $secondary;
  width: 25%;
  margin-top: 8px;
}

.close-icon {
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
}

.btn-save-contact {
  background-color: $dark-navy;
  color: white;
}

.action {
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
}

.contact-form {
  .v-text-field {
    margin-top: 16px;
  }
}
</style>
