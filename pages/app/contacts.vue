<template>
  <v-container class="main-contact d-flex h-100 w-100">
    <div class="contact-list  overflow-y-auto pa-6">
      <v-item-group>
        <div
          v-for="contact of useUserStore().allUsers"
          class="contact-item d-flex"
        >
          <template v-for="letter of letters" >
            <div class="mt-12" v-if="contact.firstName.charAt(0).toLowerCase() === letter">
              <span> <strong>{{ letter.toUpperCase() }}</strong> </span>
              <v-divider class="border-opacity-25 mt-4"></v-divider>

              <v-hover v-slot="{ isHovering, props }" close-delay="20">
                <v-item v-slot="{ isSelected, select }">
                  <div
                    class="contact d-flex align-center mt-4 w-100 pa-2"
                    :elevation="isHovering ? 4 : 2"
                    :class="{ 'on-hover': isHovering, selected: isSelected }"
                    v-bind="props"
                    @click="select"
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
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

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
</style>
