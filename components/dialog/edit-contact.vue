<template>
   <v-dialog persistent  width="64%" class="d-flex pa-0">
    <v-card class="v-card-modal flex-row pa-0">
      <v-icon
        @click="closeForm"
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
              editContactData.firstName,
              editContactData.lastName
            )
          }}</span>
        </v-avatar>

        <div class="contact-form ml-6 w-100">
          <v-text-field
            v-model="editContactData.firstName"
            :rules="nameRules"
            label="First Name*"
            variant="outlined"
            required
            append-inner-icon="mdi-account-outline"
          ></v-text-field>

          <v-text-field
            v-model="editContactData.lastName"
            :rules="nameRules"
            label="Last Name*"
            variant="outlined"
            required
            append-inner-icon="mdi-account-outline"
          ></v-text-field>

          <v-text-field
            v-model="editContactData.phoneNumber"
            :rules="phoneRules"
            label="Phone Number*"
            variant="outlined"
            required
            append-inner-icon="mdi-phone-outline"
          ></v-text-field>

          <v-text-field
            v-model="editContactData.email"
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
          @click="saveContact()"
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

const editContactData = ref()

const props = defineProps({
        editContact: Object
})

const emit = defineEmits(['close', 'update'])


onMounted( () => {
    console.log(props.editContact);
    editContactData.value = JSON.parse(JSON.stringify(props.editContact));
}) 

const clearForm = () => {
    console.log(props.editContact);
    editContactData.value = JSON.parse(JSON.stringify(props.editContact));
}

const closeForm = () => {
        emit('close')
}

const saveContact = async () => {
      await useUserStore().patchUser(editContactData.value);
      await useUserStore().getAllUsers();
      emit('update', editContactData.value) 
}
</script>

<style lang="scss" scoped>


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