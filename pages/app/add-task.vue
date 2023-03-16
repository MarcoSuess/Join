<template>
  <h1>Add Task</h1>
  <v-container
    class="d-flex justify-center align-start text-h5 flex-row mt-16"
    style="min-height: 300px"
  >
    <div class="form-container w-50 d-flex flex-column align-center">
      <div class="text-subtitle-1 text-medium-emphasis w-75">Title</div>
      <v-text-field
        placeholder="Enter a title"
        required
        variant="solo"
        class="w-75"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis w-75">Description</div>
      <v-textarea
        class="w-75"
        placeholder="Enter a Description"
        variant="solo"
      ></v-textarea>

      <div class="text-subtitle-1 text-medium-emphasis w-75">Category</div>
      <v-select
        placeholder="Select a task category"
        class="w-75"
        :items="[
          'California',
          'Colorado',
          'Florida',
          'Georgia',
          'Texas',
          'Wyoming',
        ]"
        variant="solo"
      ></v-select>

      <div class="text-subtitle-1 text-medium-emphasis w-75">Assigned to</div>
      <v-select
        class="w-75"
        clearable
        chips
        placeholder="Select contacts"
        :items="[
          'California',
          'Colorado',
          'Florida',
          'Georgia',
          'Texas',
          'Wyoming',
        ]"
        multiple
        variant="solo"
      ></v-select>
    </div>

    <v-divider
      :thickness="2"
      class="border-opacity-100"
      color="rgb(205, 205, 205)"
      vertical
    ></v-divider>

    <div class="form-container w-50 d-flex flex-column align-center">
      <div class="text-subtitle-1 text-medium-emphasis w-75">Due date</div>
      <v-text-field
        required
        variant="solo"
        type="date"
        class="w-75"
      ></v-text-field>

      <v-radio-group>
        <v-radio true-icon="'$radioOff'" false-icon="'$radioOff'"  value="Google">
          <template  v-slot:label>
            <div>
              Of course it's <strong class="text-success">Google</strong>
            </div>
          </template>
        </v-radio>
        <v-radio value="2"></v-radio>
        <v-radio value="3"></v-radio>
      </v-radio-group>
    </div>
  </v-container>
</template>

<script setup>
const date = ref(
  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10)
);
const modal = ref(false);
</script>

<style lang="scss" scoped>
.text-subtitle-1 {
  color: $dark-navy !important;
  font-weight: 900;
}

</style>

<!-- https://stackoverflow.com/questions/67371579/vue-3-emit-event-from-parent-to-child-component -->
<!-- https://stackoverflow.com/questions/71668860/how-to-apply-style-of-selected-radiobutton-in-vuetify -->