<template>
  <v-dialog width="512px">
    <v-card class="pa-8 v-card-modal">
      <v-chip> {{ props.dialogData.category }} </v-chip>
      <h2 class="mt-2">
        <strong class="opacity-font">Title: </strong>
        {{ props.dialogData.title }}
      </h2>
      <p class="mt-2">
        <strong class="opacity-font">Description: </strong
        >{{ props.dialogData.description }}
      </p>
      <div class="mt-6 w-100 justify-space-between d-flex">
        <p><strong>Due Date: </strong></p>
        <p>{{formatDate(props.dialogData.dueDate)  }}</p>
      </div>

      <div class="mt-6 w-100 justify-space-between d-flex">
        <p><strong>Priority: </strong></p>
        <img class="icon" :src="getPrioIMG(props.dialogData.prio)" />
      </div>

      <div
        v-if="props.dialogData.subTasks"
        class="mt-6 w-100 justify-space-between d-flex mb-2"
      >
        <p><strong>Subtasks: </strong></p>
        <p>
          {{
            getSubTaskDoneLength(props.dialogData.subTasks) +
            "/" +
            props.dialogData.subTasks.length
          }}
          Done
        </p>
      </div>

      <v-progress-linear
        v-if="props.dialogData.subTasks"
        color="blue-lighten-1"
        :model-value="getSubTaskDoneInPercent(props.dialogData.subTasks)"
      ></v-progress-linear>
      <div class="subtasks">
        <v-checkbox
          v-for="(subTask, index) in props.dialogData.subTasks"
          :key="index"
          v-model="subTask.done"
          :label="subTask.title"
          @change="subTaskDoneUpdated($event, props.dialogData)"
        ></v-checkbox>
      </div>

      <p class="mt-10"><strong>Assigned To: </strong></p>
      <div class="assigned-list">
        <div
          v-for="assignedUser in props.dialogData.assignedTo"
          class="d-flex mt-4 align-center overflow-y-auto"
        >
          <v-avatar color="orange" size="small" class="avatar">
            <span>{{ getUserFullNameAbbrByID(assignedUser) }}</span>
          </v-avatar>

          <p class="ml-4">
            {{ filterUserFromID(assignedUser).firstName }}
            {{ filterUserFromID(assignedUser).lastName }}
          </p>
        </div>
      </div>

      <v-card-actions class="w-100 d-flex justify-end mt-12">
        <v-btn
          class="mr-4"
          append-icon="mdi-trash-can-outline"
          color="error"
          variant="tonal"
          @click="deleteTask(props.dialogData)"
        >
          delete
        </v-btn>
        <v-btn
          @click="showEditTaskDialog(props.dialogData)"
          class="btn-default"
          append-icon="mdi-file-edit-outline"
        >
          Edit Task
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script scoped setup>
import { taskStore } from "@/stores/task";
const props = defineProps({
  dialogData: Object,
});

const emit = defineEmits(["showEditTaskDialog", 'deleteTask']);



const deleteTask = (taskData) => {
    emit('deleteTask', taskData)
}

const showEditTaskDialog = (taskData) => {
  emit("showEditTaskDialog", taskData);
};

const subTaskDoneUpdated = ($event, subtask) => {
  console.log(subtask);
  taskStore().patchTask(subtask);
};
</script>

<style scoped lang="scss">
.subtasks {

  :deep(.v-input__control) {
    height: 40px !important;
  }

  :deep(.v-input__details) {
    display: none !important;
  }
}


.v-card-modal {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 16px;
  border-radius: 8px;
  color: $dark-navy;
  width: 100%;
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

.icon {
  object-fit: contain;
}

.opacity-font {
  color: rgb(42 54 71 / 50%) !important;
}
.avatar {
  position: relative;

  span {
    font-size: 0.8rem !important;
  }
}
</style>
