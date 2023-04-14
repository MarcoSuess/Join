<template>
  <header class="d-flex justify-space-between pt-12">
    <h1 class="w-75">Board</h1>
    <v-text-field v-model="filter" prepend-inner-icon="mdi-select-search" clearable label="Search Tasks" variant="outlined"></v-text-field>
  </header>

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

const route = useRoute();
const router = useRouter();
const allTasks = computed(() => {
  return search(route.query.filter, taskStore().tasks);
});

const filter = computed({
  get() {
    return route.query.filter;
  },
  set(val) {
    router.push({
      path: "board",
      query: { filter: val },
    });
  },
});

const search = (searchKeyword, array) => {
  if (!searchKeyword) return taskStore().tasks;
  const filterProperty = ["category", "prio", "status", "title"];
  searchKeyword = searchKeyword.toLowerCase();
  return array.filter((a) => {
    return filterProperty.some((key) => {
      return a[key].toString().toLowerCase().indexOf(searchKeyword) !== -1;
    });
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
   const findTask =  allTasks.value.find((task) => task == event[0].added.element)
    findTask.status = event[1];
    const newTask = await { ...event[0].added.element, status: event[1] };
    await taskStore().patchTask(newTask);
  }
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
  .v-text-field  {
        width: 32px !important;
    }
}
</style>
