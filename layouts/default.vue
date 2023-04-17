<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer width="174">
        <div class="nav-bar">
          <img src="../assets/images/logo.png" alt="logo" />

          <v-list width="100%">
            <v-list-item
              to="/app/dashboard"
              prepend-icon="mdi-view-dashboard"
              title="Dashboard"
              value="dashboard"
            ></v-list-item>
            <v-list-item
              to="/app/board"
              prepend-icon="mdi-human-male-board-poll"
              title="Board"
              value="board"
            ></v-list-item>
            <v-list-item
              to="/app/add-task"
              prepend-icon="mdi-pencil-plus"
              title="Add Task"
              value="addTask"
            ></v-list-item>
            <v-list-item
              to="/app/contacts"
              prepend-icon="mdi-contacts"
              title="Contacts"
              value="contacts"
            ></v-list-item>
          </v-list>
        </div>

        <template v-slot:append>
          <div class="logout pb-16">
            <v-btn
              @click="logOut"
              class="btn-default"
              prepend-icon="mdi-logout"
              block
              >Logout</v-btn
            >
          </div>
        </template>
      </v-navigation-drawer>

      <v-app-bar title="Kanban Project Managemet Tool">
        <div class="user-profile">
          <v-icon icon="mdi-account-circle"></v-icon>
        </div>
      </v-app-bar>

      <v-main style="min-height: 100vh">
        <v-container :class="{ 'contacts-container': checkRouteContacts() }">
          <slot></slot>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { authStore } from "~~/stores/auth";
import { taskStore } from "@/stores/task";
import { useUserStore } from "@/stores/user";

const router = useRouter();

const checkRouteContacts = () => {
  const route = useRoute();
  return route.path.includes("contacts");
};

await useUserStore().getAllUsers();
await taskStore().getTasks();

console.log(useUserStore().allUsers);

const userData = authStore().userData;

const logOut = () => {
  useCookie("user_id").value = "";
  useCookie("user_token").value = "";
  return navigateTo({path: '/'})
};
</script>

<style lang="scss" scoped>
.v-app-bar {
  color: $dark-navy;
}

.nav-bar {
  background-color: $dark-navy !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 48px;
  color: white;

  img {
    margin-bottom: 128px;
  }
}

.v-list-item {
  margin-top: 24px;
  flex-direction: column;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;

  :deep(.v-icon) {
    -webkit-margin-end: 0px !important;
    margin-inline-end: 0px !important;
    font-size: 48px;
  }
}

.logout {
  background: $dark-navy;
}

.v-list {
}

.user-profile {
  :deep(.v-icon) {
    -webkit-margin-end: 0px !important;
    margin-inline-end: 0px !important;
    font-size: 48px;
    margin-right: 32px !important;
  }
}

.contacts-container {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.v-main {
  background-color: rgb(246, 247, 248);
}
</style>
