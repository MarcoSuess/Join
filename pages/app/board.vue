<template>
  <header>
    <h1>Board</h1>
  </header>

  <v-container
    class="d-flex justify-space-between align-start text-h6 flex-row mt-16"
    style="min-height: 300px"
  >
    <div class="column w-25">
      <h3>To do</h3>

      <BoardDraggable
        :item-list="todo"
        :item-status="0"
        @change-item="changeTask($event)"
      />
    </div>

    <div class="column w-25">
      <h3>In progress</h3>

      <BoardDraggable
        :item-list="inProgress"
        :item-status="1"
        @change-item="changeTask($event)"
      />
    </div>

    <div class="column w-25">
      <h3>Awaiting Feedback</h3>
      <BoardDraggable
        :item-list="awaitFeedback"
        :item-status="2"
        @change-item="changeTask($event)"
      />
    </div>

    <div class="column w-25">
      <h3>Done</h3>
      <BoardDraggable
        :item-list="done"
        :item-status="3"
        @change-item="changeTask($event)"
      />
    </div>
  </v-container>
</template>

<script setup>
import { taskStore } from "@/stores/task";

const todo = ref(taskStore().tasks.filter((t) => t.status == 0)).value;
const inProgress = ref(taskStore().tasks.filter((t) => t.status == 1)).value;
const awaitFeedback = ref(taskStore().tasks.filter((t) => t.status == 2)).value;
const done = ref(taskStore().tasks.filter((t) => t.status == 3)).value;

console.log(taskStore().tasks);

const changeTask = async (event) => {
  if (event[0].added) {
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
</style>
