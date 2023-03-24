<template>
  <draggable
    class="list-group dropList"
    :list="props.itemList"
    group="tasks"
    @change="changeItem($event, props.itemStatus)"
  >
    <div
      class="list-group-item main-card"
      v-for="item in itemList"
      :key="item.id"
      @click="openEditTaskDialog(item)"
    >
      <v-hover v-slot="{ isHovering, props }" open-delay="32">
        <v-card
          v-bind="props"
          :elevation="isHovering ? 16 : 2"
          :class="{ 'on-hover': isHovering }"
        >
          <v-chip> IT </v-chip>
          <h5 class="mt-4">{{ item.title }}</h5>
          <div
            v-if="item.subTasks"
            class="mt-4 w-100 justify-space-between d-flex"
          >
            <h6>Subtasks:</h6>

            <h6>
              {{
                getSubTaskDoneLength(item.subTasks) + "/" + item.subTasks.length
              }}
              Done
            </h6>
          </div>
          <v-progress-linear
            v-if="item.subTasks"
            color="blue-lighten-1"
            :model-value="getSubTaskDoneInPercent(item.subTasks)"
          ></v-progress-linear>

          <div class="labels w-100 mt-6">
            <div class="assignedUser">
              <v-avatar
                color="orange"
                size="small"
                class="avatar"
                :style="{ left: index * -8 + 'px' }"
                v-for="(user, index) of item.assignedTo.slice(0, 4)"
              >
                <span>{{
                  index < 3 ? "MS" : `+${item.assignedTo.length - 3}`
                }}</span>
              </v-avatar>
            </div>
            <img class="icon" :src="getPrioIMG(item.prio)" />
          </div>
        </v-card>
      </v-hover>
    </div>
  </draggable>

  <v-dialog v-model="openDialog" width="512px">
    <v-card class="pa-8">
      <v-chip> IT </v-chip>
      <h2 class="mt-2">
        <strong class="opacity-font">Title: </strong> {{ dialogData.title }}
      </h2>
      <p class="mt-2">
        <strong class="opacity-font">Description: </strong
        >{{ dialogData.description }}
      </p>
      <div class="mt-6 w-100 justify-space-between d-flex">
        <p><strong>Due Date: </strong></p>
        <p>{{ dialogData.dueDate }}</p>
      </div>

      <div class="mt-6 w-100 justify-space-between d-flex">
        <p><strong>Priority: </strong></p>
        <img class="icon" :src="getPrioIMG(dialogData.prio)" />
      </div>

      <div class="mt-6 w-100 justify-space-between d-flex mb-2">
        <p><strong>Subtasks: </strong></p>
        <p>
          {{
            getSubTaskDoneLength(dialogData.subTasks) +
            "/" +
            dialogData.subTasks.length
          }}
          Done
        </p>
      </div>

      <v-progress-linear
        v-if="dialogData.subTasks"
        color="blue-lighten-1"
        :model-value="getSubTaskDoneInPercent(dialogData.subTasks)"
      ></v-progress-linear>
      <div class="subtaks">
        <v-checkbox
          v-for="subTask, index in dialogData.subTasks"
          :key="index"
          v-model="subTask.done"
          :label="subTask.title"
          @change="subTaskDoneUpdated($event, dialogData)"
         
        ></v-checkbox>
      </div>

      <p class="mt-10"><strong>Assigned To: </strong></p>
      <div class="assigned-list">
            

      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import urgent from "@/assets/icons/Urgent.png";
import medium from "@/assets/icons/Medium.png";
import low from "@/assets/icons/Low.png";

const props = defineProps({
  itemList: Array,
  itemStatus: Number,
});

const emit = defineEmits(["changeItem"]);

const changeItem = ($event, itemStatus) => {
  emit("changeItem", [$event, itemStatus]);
};

const openDialog = ref(false);
const dialogData = ref([]);

const openEditTaskDialog = (task) => {
  openDialog.value = true;
  dialogData.value = task;
};

const subTaskDoneUpdated = ($event, subtask) =>{
            console.log(subtask);
}

const getPrioIMG = (prio) => {
  switch (prio) {
    case "urgent":
      return urgent;
    case "medium":
      return medium;
    case "low":
      return low;
  }
};

console.log(props.itemList);
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

.v-card {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 16px;
  border-radius: 8px;
  color: $dark-navy;
  width: 100%;
  cursor: pointer;
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

.labels {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.icon {
  object-fit: contain;
}

.avatar {
  position: relative;

  span {
    font-size: 0.8rem !important;
  }
}

.main-card {
  width: 90%;
}

.opacity-font {
  color: rgb(42 54 71 / 50%) !important;
}

.subtaks{

    :deep(.v-input__control){
        height: 40px;
    }
     
    :deep(.v-input__details) {
            display: none;
    }
}
</style>
