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
          v-model="filterOptions.contacts"
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
          v-model="filterOptions.category"
          class="w-100 mt-6"
          clearable
          chips
          placeholder="Select Category"
          :items="category"
          multiple
          variant="solo"
        ></v-select>

        <p><strong>Filter Prio </strong></p>
        <v-divider class="border-opacity-100"></v-divider>
        <v-select
          class="mt-6"
          clearable
          variant="solo"
          label="Select Prio"
          :items="['Urgent', 'Medium', 'Low']"
          v-model="filterOptions.prio"
        ></v-select>

        <p><strong>Filter Due Date Range</strong></p>
        <v-divider class="border-opacity-100"></v-divider>
        <div class="d-flex w-100 mt-4">
          <div class="date w-50">
            <label for="startDate">From Date</label>
            <v-text-field
              v-model="filterOptions.dueDateFrom"
              required
              variant="solo"
              type="date"
              id="startDate"
            ></v-text-field>
          </div>

          <div class="date w-50">
            <label for="toDate">To Date</label>
            <v-text-field
              v-model="filterOptions.dueDateTo"
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
const props = defineProps({
  allTasks: Array,
  allUsers: Array,
  filterOptions: Object,
  filterTasks: Array,
});

const emit = defineEmits(["close", "save"]);

const optionFilterTasks = ref([]);

const getUserWithTitle = props.allUsers.map((user) => {
  return { ...user, title: `${user.firstName} ${user.lastName}` };
});

const category = [
  "Management",
  "Costumer Service",
  "Marketing",
  "Team",
  "Design",
  "IT",
  "Media",
  "Sales",
];

onMounted(() => {
  optionFilterTasks.value = props.allTasks;
});

const saveFilterOptions = () => {
  filterContacts(props.filterOptions.contacts);
  filterCategory(props.filterOptions.category);
  filterPrio(props.filterOptions.prio);
  filterDueDateRange(
    props.filterOptions.dueDateFrom,
    props.filterOptions.dueDateTo
  );
  emit("save", [props.filterOptions, optionFilterTasks.value]);
};

const filterContacts = (contacts) => {
  if (!contacts || contacts.length <= 0) return;
  optionFilterTasks.value = optionFilterTasks.value.filter((task) => {
    return contacts.some((contact) => {
      return task.assignedTo.indexOf(contact) !== -1;
    });
  });
};

const filterCategory = (category) => {
  if (!category || category.length <= 0) return;
  optionFilterTasks.value = optionFilterTasks.value.filter((task) => {
    return category.some((categ) => {
      return task.category.indexOf(categ) !== -1;
    });
  });
};

const filterPrio = (prio) => {
  if (!prio) return;
  optionFilterTasks.value = optionFilterTasks.value.filter((task) => {
    return task.prio == prio.toLowerCase();
  });
};

const filterDueDateRange = (startDate, endDate) => {
  if (!startDate && !endDate) return;

  if (startDate && endDate) {
    optionFilterTasks.value = optionFilterTasks.value.filter((task) => {
      return (
        new Date(task.dueDate) < new Date(endDate) &&
        new Date(task.dueDate) > new Date(startDate)
      );
    });
  }

  if (startDate && !endDate) {
    optionFilterTasks.value = optionFilterTasks.value.filter((task) => {
      return new Date(task.dueDate) > new Date(startDate);
    });
  }

  if (!startDate && endDate) {
    optionFilterTasks.value = optionFilterTasks.value.filter((task) => {
      return new Date(task.dueDate) < new Date(endDate);
    });
  }
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
