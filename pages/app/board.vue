<template>
  <header class="d-flex justify-space-between pt-12">
    <h1 class="w-75">Board</h1>
    <v-text-field
      v-model="filter"
      prepend-inner-icon="mdi-select-search"
      clearable
      label="Search Tasks"
      variant="outlined"
    >
      <template v-slot:prepend>
        <v-btn
          icon="mdi-filter-cog"
          size="small"
          @click="openFilterDialog"
        ></v-btn>
      </template>
    </v-text-field>
  </header>

  <div class="filter-info">
    <strong
      >Tasks: {{ allTasks.length }} From {{ taskStore().tasks.length }}</strong
    >
    <div class="selected-filter d-flex mt-4 mb-4" v-if="getQuery">
      <v-chip
        class="mr-4 pa-5 main-chip"
        closable
        variant="elevated"
        prepend-icon="mdi-magnify"
        v-if="getQuery.search"
        @click:close="deletePropFromQuery('search')"
      >
        <strong class="mr-2">Search: </strong>{{ getQuery.search }}</v-chip
      >

      <v-chip
        class="mr-4 pa-5 main-chip"
        closable
        variant="elevated"
        v-if="getQuery.prio"
        @click:close="deletePropFromQuery('prio')"
      >
        <img class="icon mr-2" :src="getPrioIMG(getQuery.prio.toLowerCase())" />
        <strong class="mr-2">Prio: </strong> {{ getQuery.prio }}</v-chip
      >

      <v-chip
        class="mr-4 pa-5 main-chip"
        closable
        variant="elevated"
        prepend-icon="mdi-calendar-range"
        v-if="getQuery.dueDateFrom"
        @click:close="deletePropFromQuery('dueDateFrom')"
      >
        <strong class="mr-2">Date From: </strong
        >{{ formatDate(getQuery.dueDateFrom) }}</v-chip
      >

      <v-chip
        class="mr-4 pa-5 main-chip"
        closable
        variant="elevated"
        prepend-icon="mdi-calendar-range"
        @click:close="deletePropFromQuery('dueDateTo')"
        v-if="getQuery.dueDateTo"
      >
        <strong class="mr-2">Date To: </strong
        >{{ formatDate(getQuery.dueDateTo) }}</v-chip
      >
    </div>
    <strong v-if="getQuery.contacts && getQuery.contacts.length > 0"
      >Contacts</strong
    >
    <div v-if="getQuery.contacts" class="mt-2 mb-4">
      <v-chip
        class="mr-4 child-chip"
        closable
        prepend-icon="mdi-account"
        v-for="contact in getQuery.contacts"
        :key="contact"
        @click:close="deletePropFromQuery('contacts', contact)"
        >{{ filterUserFromID(contact).firstName }}
        {{ filterUserFromID(contact).lastName }}</v-chip
      >
    </div>

    <strong v-if="getQuery.category && getQuery.category.length > 0"
      >Category</strong
    >
    <div v-if="getQuery.category" class="mt-2">
      <v-chip
        class="mr-4 child-chip"
        closable
        prepend-icon="mdi-shape"
        v-for="cate in getQuery.category"
        :key="cate"
        @click:close="deletePropFromQuery('category', cate)"
        >{{ cate }}</v-chip
      >
    </div>
  </div>

  <DialogFilterSettings
    v-if="openFilterOptionDialog"
    @close="openFilterOptionDialog = false"
    @save="saveFilterOptions($event)"
    v-model="openFilterOptionDialog"
    :all-tasks="taskStore().tasks"
    :all-users="useUserStore().allUsers"
    :filter-options="filterOptions"
    :filter-options-from-query="getQuery"
  ></DialogFilterSettings>

  <v-container
    class="d-flex justify-space-between align-start text-h6 flex-row mt-16"
    style="min-height: 300px"
  >
    <div class="column w-25">
      <h3>To do</h3>

      <BoardDraggable
        :item-list="todo"
        :item-status="'todo'"
        @change-item="changeTask($event)"
      />
    </div>

    <div class="column w-25">
      <h3>In progress</h3>

      <BoardDraggable
        :item-list="inProgress"
        :item-status="'inProgress'"
        @change-item="changeTask($event)"
      />
    </div>

    <div class="column w-25">
      <h3>Awaiting Feedback</h3>
      <BoardDraggable
        :item-list="awaitFeedback"
        :item-status="'awaitingFeedback'"
        @change-item="changeTask($event)"
      />
    </div>

    <div class="column w-25">
      <h3>Done</h3>
      <BoardDraggable
        :item-list="done"
        :item-status="'done'"
        @change-item="changeTask($event)"
      />
    </div>
  </v-container>
</template>

<script setup>
import { taskStore } from "@/stores/task";

const openFilterOptionDialog = ref(false);
const filterOptions = ref({});
const route = useRoute();
const router = useRouter();

const getQuery = computed(() => {
  return route.query.filter ? JSON.parse(route.query.filter) : {};
});

const allTasks = computed(() => {
  return search(getQuery.value ? getQuery.value.search : "", taskStore().tasks);
});

const filter = computed({
  get() {
    return getQuery.value ? getQuery.value.search : "";
  },
  set(val) {
    const newQuery = route.query.filter
      ? JSON.stringify({ ...JSON.parse(route.query.filter), search: val })
      : JSON.stringify({ search: val });
    router.replace({
      path: "board",
      query: { filter: newQuery },
    });
  },
});

const search = (searchKeyword, array) => {
  array = filterWithOptions(array);
  if (!searchKeyword) return array;
  const filterProperty = ["category", "prio", "status", "title"];
  searchKeyword = searchKeyword.toLowerCase();
  return array.filter((a) => {
    return filterProperty.some((key) => {
      return a[key].toString().toLowerCase().indexOf(searchKeyword) !== -1;
    });
  });
};

const filterWithOptions = (array) => {
  if (getQuery.value == {}) return array;

  if (
    getQuery.value &&
    getQuery.value.category &&
    getQuery.value.category.length !== 0 &&
    array.length !== 0
  ) {
    array = multiplyFilter(array, getQuery.value.category, "category");
  }

  if (
    getQuery.value &&
    getQuery.value.contacts &&
    getQuery.value.contacts.length !== 0 &&
    array.length !== 0
  ) {
    array = multiplyFilter(array, getQuery.value.contacts, "assignedTo");
  }

  if (getQuery.value && getQuery.value.prio && array.length !== 0) {
    array = filterPrio(array, getQuery.value.prio);
  }

  if (
    (getQuery.value && getQuery.value.dueDateFrom && array.length !== 0) ||
    (getQuery.value && getQuery.value.dueDateTo && array.length !== 0)
  ) {
    array = filterDueDateRange(
      getQuery.value.dueDateFrom,
      getQuery.value.dueDateTo,
      array
    );
  }

  console.log(array);

  return array;
};

const saveFilterOptions = ($filterOptions) => {
  console.log($filterOptions);
  saveFilterOptionsToQuery($filterOptions);
  filterOptions.value = $filterOptions;
  openFilterOptionDialog.value = false;
};

const saveFilterOptionsToQuery = (filterOptions) => {
  router.replace({
    path: "board",
    query: { filter: JSON.stringify(filterOptions) },
  });
};

const todo = computed(() => {
  return allTasks.value.filter((t) => t.status == "todo");
});
const inProgress = computed(() => {
  return allTasks.value.filter((t) => t.status == "inProgress");
});
const awaitFeedback = computed(() => {
  return allTasks.value.filter((t) => t.status == "awaitingFeedback");
});
const done = computed(() => {
  return allTasks.value.filter((t) => t.status == "done");
});

const changeTask = async (event) => {
  if (event[0].added) {
    const findTask = allTasks.value.find(
      (task) => task == event[0].added.element
    );
    findTask.status = event[1];
    const newTask = await { ...event[0].added.element, status: event[1] };
    await taskStore().patchTask(newTask);
  }
};

const deletePropFromQuery = (key, value = undefined) => {
  console.log(value);
  if (value) {
    console.log(getQuery.value[key].indexOf(value));
    getQuery.value[key].splice(getQuery.value[key].indexOf(value), 1);
  } else {
    delete getQuery.value[key];
  }

  console.log(getQuery.value);
  router.replace({
    path: "board",
    query: { filter: JSON.stringify(getQuery.value) },
  });
};

const openFilterDialog = () => {
  openFilterOptionDialog.value = true;
};
</script>

<style lang="scss" scoped>
.column {
  margin-right: 64px;
}

h3 {
  min-height: 64px;
}
header {
  .v-text-field {
    width: 32px !important;
  }

  :deep(.v-input__prepend) {
    display: flex;
    align-items: center;
    padding: 0;
  }
}

.main-chip {
  background-color: $dark-navy;
}

.child-chip {
  background-color: $white;
}
</style>
