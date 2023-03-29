<template>
  <v-container class="main-contact d-flex h-100 w-100">
    <div class="contact-list h-100 overflow-y-auto pa-6">
      <div class="contact-item d-flex">
        <span> <strong>A</strong> </span>
        <v-divider class="border-opacity-25 mt-4"></v-divider>
        <v-item-group>
          <v-hover v-slot="{ isHovering, props }" close-delay="20">
            <v-item v-slot="{ isSelected, toggle }">
              <div
                class="contact d-flex align-center mt-4 w-100 pa-2"
                :elevation="isHovering ? 4 : 2"
                :class="{ 'on-hover': isHovering, selected: isSelected }"
                v-bind="props"
                @click="toggle"
              >
                <v-avatar color="red" size="40" class="avatar mr-4">
                  <!--  <span>{{ getUserFullNameAbbrByID(userID) }}</span> -->
                  <span>MS</span>
                </v-avatar>
                <div
                  :class="{ 'contact-name-email-active': isSelected }"
                  class="contact-name-email"
                >
                  <p>Marco Suess</p>
                  <p class="mail">marcosuess@web.de</p>
                </div>
              </div>
            </v-item>
          </v-hover>
        </v-item-group>
      </div>
    </div>

    <div class="contact-info h-100 w-100 pa-14">
      <div class="title d-flex align-center">
        <h1 class="mr-4">Contacts</h1>
        <p><strong> Better with a Team</strong></p>
      </div>
    </div>
  </v-container>
</template>

<script setup></script>

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
