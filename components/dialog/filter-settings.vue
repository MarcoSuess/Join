<template>
  <v-dialog persistent width="512px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Filter Options</span>
      </v-card-title>

      <v-card-text>
        <p><strong>Filter Contacts </strong></p>
        <v-divider class="border-opacity-100"></v-divider>
        <v-select
          v-model="getFilterOptions.contacts"
          class="w-100 mt-6"
          clearable
          chips
          placeholder="Select Contact"
          :items="getUserWithTitle"
          item-title="title"
          item-value="id"
          multiple
          variant="solo"
        ></v-select>

        <p><strong> Filter Category</strong></p>
        <v-divider class="border-opacity-100"></v-divider>
        <v-select
          v-model="getFilterOptions.category"
          @update:menu="useCategoryStore().loadCategories"
          class="w-100 mt-6"
          clearable
          chips
          placeholder="Select Category"
          multiple
          variant="solo"
          :items="useCategoryStore().allCategories"
          item-title="value"
          item-value="id"
          :loading="useCategoryStore().loading"
          no-data-text="Fetch Data ..."
        ></v-select>

        <p><strong>Filter Prio </strong></p>
        <v-divider class="border-opacity-100"></v-divider>
        <v-select
          class="mt-6"
          clearable
          variant="solo"
          label="Select Prio"
          :items="['Urgent', 'Medium', 'Low']"
          v-model="getFilterOptions.prio"
        ></v-select>

        <p><strong>Filter Due Date Range</strong></p>
        <v-divider class="border-opacity-100"></v-divider>
        <div class="d-flex w-100 mt-4">
          <div class="date w-50">
            <label for="startDate">From Date</label>
            <v-text-field
              v-model="getFilterOptions.dueDateFrom"
              required
              variant="solo"
              type="date"
              id="startDate"
            ></v-text-field>
          </div>

          <div class="date w-50">
            <label for="toDate">To Date</label>
            <v-text-field
              v-model="getFilterOptions.dueDateTo"
              required
              variant="solo"
              type="date"
              id="toDate"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>

      <v-card-actions class="w-100 d-flex justify-end mt-12">
        <v-btn
          class="mr-2"
          append-icon="mdi-close-outline"
          color="error"
          variant="tonal"
          @click="emit('close')"
        >
          Close
        </v-btn>
        <v-btn
          class="btn-default"
          append-icon="mdi-content-save-check-outline"
          @click="saveFilterOptions"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useCategoryStore } from "@/stores/category";

const props = defineProps({
  allTasks: Array,
  allUsers: Array,
  filterOptions: Object,
  filterOptionsFromQuery: Object,
});

const emit = defineEmits(["close", "save"]);

const getFilterOptions = ref();

onMounted(() => {
  getFilterOptions.value = props.filterOptionsFromQuery ?? props.filterOptions;
});

const getUserWithTitle = props.allUsers.map((user) => {
  return { ...user, title: `${user.firstName} ${user.lastName}` };
});

const saveFilterOptions = () => {
  emit("save", getFilterOptions.value);
};

console.log(props);
</script>

<style lang="scss" scoped>
.btn-default {
  background-color: $dark-navy;
}

.v-divider {
  color: $dark-navy;
}

.date {
  .v-text-field {
    width: 90%;
  }
}
</style>
