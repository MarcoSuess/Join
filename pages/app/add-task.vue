<template>
  <h1>Add Task</h1>

    <TaskForm @snackbar="openSnackBar"></TaskForm>

    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
    >
    Task was successfully created

      <template v-slot:actions>
        <v-btn
          class="snackbar-btn"
          variant="text"
          @click="routeToBoard"
        >
          Go to Board
        </v-btn>
      </template>
    </v-snackbar>

</template>

<script setup>

  const snackbar = ref(false);
  

  const openSnackBar = () => {
      snackbar.value = true;
  }

  const routeToBoard  = () => {
      useRouter().push({path: 'board'})
  }

</script>


<style lang="scss" scoped>

.v-snackbar {

.snackbar-btn{
    background-color: $secondary;
    color: white;
}

:deep(.v-overlay__content) {
  div {
    background-color: $dark-navy;
  }
  
}
}


</style>




