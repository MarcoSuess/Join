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

      <draggable
        class="list-group  dropList"
        v-model="taskArr"
        group="tasks"
        @sort="log"
        @add="log"
      >
        <v-card
          class="list-group-item"
          v-for="(task, index) in taskArr"
          :key="index"
        >
          <v-chip> IT </v-chip>
          <h5 class="mt-4">{{ task.title }}</h5>

          <h6 class="mt-4">Subtasks Completed</h6>
          <v-progress-linear
            v-model="skill"
            :color="skill === 100 ? 'green' : 'orange'"
            height="25"
          >
            <template #default="{ value }">
              <strong>{{ Math.ceil(value) }}%</strong>
            </template>
          </v-progress-linear>

          <div class="labels">
            <div class="assignedUser"></div>
            <img src="@/assets/icons/Low.png" />
          </div>
        </v-card>
      </draggable>
    </div>

    <div class="column w-25">
      <h3>In progress</h3>

      <draggable
        class="list-group dropList"
        :list="testarr"
        group="tasks"
        @change="log"
      >
        <v-card
          class="list-group-item"
          v-for="(task, index) in testarr"
          :key="index"
        >
          <v-chip> IT </v-chip>
          <h5 class="mt-4">{{ task.title }}</h5>

          <h6 class="mt-4">Subtasks Completed</h6>
          <v-progress-linear
            v-model="skill"
            :color="skill === 100 ? 'green' : 'orange'"
            height="25"
          >
            <template v-slot:default="{ value }">
              <strong>{{ Math.ceil(value) }}%</strong>
            </template>
          </v-progress-linear>

          <div class="labels">
            <div class="assignedUser"></div>
            <img src="@/assets/icons/Low.png" />
          </div>
        </v-card>
      </draggable>
    </div>

    <div class="column w-25">
      <h3>Awaiting Feedback</h3>
      <div class="dropList"></div>
    </div>

    <div class="column w-25">
      <h3>Done</h3>
      <div class="dropList"></div>
    </div>
  </v-container>
</template>

<script setup>
import { taskStore } from "@/stores/task";
const tasks = toRaw(taskStore().tasks);
const skill = ref(80);

const testarr = ref([])

const getList = (taskStatus) => {
  return ref(tasks.filter((task) => task.status == taskStatus));
};


const taskArr = getList(0);





const log = (event, ) => {
    console.log(testarr.value);
};
</script>

<style lang="scss" scoped>
.dropList {
  background-color: #0000000a;
  height: 60vh;
  width: 100%;
  overflow-y: auto;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.column {
  margin-right: 64px;
}

h3 {
  min-height: 64px;
}

.v-card {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 16px;
  border-radius: 8px;
  color: $dark-navy;
  width: 90%;
}

.v-chip {
  background-color: $dark-navy;
  color: white;
  padding: 16px;
  margin-bottom: 8px;
}

h5 {
  line-height: normal;
}
</style>
