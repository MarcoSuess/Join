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
      @click="showTaskDialog(item)"
    >
      <v-hover v-slot="{ isHovering, props }" open-delay="32">
        <v-card
          v-bind="props"
          :elevation="isHovering ? 16 : 2"
          :class="{ 'on-hover': isHovering }"
        >
          <v-chip> {{ item.category }} </v-chip>
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
                v-for="(userID, index) of item.assignedTo.slice(0, 4)"
              >
                <span>{{
                  index < 3
                    ? getUserFullNameAbbrByID(userID)
                    : `+${item.assignedTo.length - 3}`
                }}</span>
              </v-avatar>
            </div>
            <img class="icon" :src="getPrioIMG(item.prio)" />
          </div>
        </v-card>
      </v-hover>
    </div>
  </draggable>

  <DialogShowTask
    v-if="openShowTaskDialog"
    :dialog-data="dialogData"
    v-model="openShowTaskDialog"
    @showEditTaskDialog="showEditTaskDialog($event)"
    @deleteTask="deleteTask($event)"
  />

  <dialog-edit-task
    v-if="openEditTaskDialog"
    :open-dialog="openEditTaskDialog"
    :dialog-data="editDialogData"
    @close="openEditTaskDialog = false"
    @save="closeEditTaskDialogSave($event)"
  />
</template>

<script setup>
const props = defineProps({
  itemList: Array,
  itemStatus: String,
});

const emit = defineEmits(["changeItem"]);

const changeItem = ($event, itemStatus) => {
  emit("changeItem", [$event, itemStatus]);
};

const openShowTaskDialog = ref(false);
const dialogData = ref({});

const showTaskDialog = (task) => {
  openShowTaskDialog.value = true;
  dialogData.value = task;
};

const openEditTaskDialog = ref(false);
const editDialogData = ref({});

const showEditTaskDialog = (task) => {
  console.log("edit dialog");
  openEditTaskDialog.value = true;
  editDialogData.value = task;
};

const closeEditTaskDialogSave = (task) => {
  console.log(task);
  openEditTaskDialog.value = false;
  dialogData.value = task;
};


const deleteTask = async(task) => {
    await taskStore().deleteTask(task)
    openShowTaskDialog.value = false;
    
}

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
</style>
