<template>
  <div class="title d-flex align-center mt-4">
    <h1>Summary</h1>
    <p class="ml-4"><strong> Everthing is a nutshell!</strong></p>
  </div>

  <div class="dashboard h-100 d-flex justify-start">
    <v-container class="w-75 ma-0">
      <v-row>
        <v-col>
          <v-hover v-slot="{ isHovering, props }" close-delay="200">
            <v-card
              class="d-flex flex-column align-center text-center pa-8"
              :elevation="isHovering ? 16 : 2"
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
              to="/app/board"
            >
              <strong class="text-h3">{{ tasks.length }}</strong>
              <p class="text-h5">Tasks in Board</p>
            </v-card>
          </v-hover>
        </v-col>
        <v-col>
          <v-hover v-slot="{ isHovering, props }" close-delay="200">
            <v-card
              class="d-flex flex-column align-center text-center pa-8"
              :elevation="isHovering ? 16 : 2"
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
              @click="navigateToBoard('inProgress')"
            >
              <strong class="text-h3">{{ filterTaskStatus('inProgress').length }}</strong>
              <p class="text-h5">Tasks in Progress</p>
            </v-card>
          </v-hover>
        </v-col>
        <v-col>
          <v-hover v-slot="{ isHovering, props }" close-delay="200">
            <v-card
              class="d-flex flex-column align-center text-center pa-8"
              :elevation="isHovering ? 16 : 2"
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
              @click="navigateToBoard('awaitingFeedback')"
            >
              <strong class="text-h3">{{ filterTaskStatus('awaitingFeedback').length }}</strong>
              <p class="text-h5">Awaiting Feedback</p>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-hover v-slot="{ isHovering, props }" close-delay="200">
            <v-card
              class="d-flex align-center pa-8"
              :elevation="isHovering ? 16 : 2"
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
              @click="navigateToBoard('urgent')"
            >
              <div class="left d-flex w-50 align-center">
                <img
                  class="icon mr-4 ml-4"
                  src="../../assets/icons/high-urgency.png"
                />
                <div class="d-flex flex-column text-center ml-10">
                  <strong class="text-h3">{{
                    filterTaskUrgent().length
                  }}</strong>
                  <p class="text-h5">Urgent</p>
                </div>
              </div>
              <v-divider
                thickness="2 "
                class="border-opacity-50"
                vertical
              ></v-divider>

              <div
                class="right w-50 d-flex flex-column align-center justify-center"
              >
                <p class="text-h6">{{ filterNearestDate[0]?.dueDate }}</p>
                <strong class="text-h5">Upcoming Deadline</strong>
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-hover v-slot="{ isHovering, props }" close-delay="200">
            <v-card
              class="d-flex align-center justify-center text-center pa-8"
              :elevation="isHovering ? 16 : 2"
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
              @click="navigateToBoard('todo')"
            >
              <v-icon
                icon="mdi-file-edit-outline"
                :class="{ 'on-hover-icon': isHovering }"
              ></v-icon>
              <div
                class="right w-50 d-flex flex-column align-center justify-center"
              >
                <strong class="text-h3">{{
                  filterTaskStatus('todo').length
                }}</strong>
                <p class="text-h5">To-do</p>
              </div>
            </v-card>
          </v-hover>
        </v-col>

        <v-col>
          <v-hover v-slot="{ isHovering, props }" close-delay="200">
            <v-card
              class="d-flex align-center justify-center text-center pa-8"
              :elevation="isHovering ? 16 : 2"
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
              @click="navigateToBoard('done')"
            >
              <v-icon
                icon="mdi-check"
                :class="{ 'on-hover-icon': isHovering }"
              ></v-icon>
              <div
                class="right w-50 d-flex flex-column align-center justify-center"
              >
                <strong class="text-h3">{{
                  filterTaskStatus('done').length
                }}</strong>
                <p class="text-h5">Done</p>
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { taskStore } from "@/stores/task";

const tasks = taskStore().tasks || [];
console.log(tasks);

const filterTaskStatus = (status) => {
  return tasks.filter((task) => task.status == status);
};

const filterTaskUrgent = () => {
  return tasks.filter((task) => task.prio == "urgent");
};

const filterNearestDate = tasks.sort((a, b) => {
  const currentDate = new Date();
  const distanceA = Math.abs(currentDate - new Date(a.dueDate));
  const distanceB = Math.abs(currentDate - new Date(b.dueDate));
  return distanceA - distanceB;
});


const navigateToBoard = (filterValue) => {
  const router = useRouter();

  router.push({
      path: "board",
      query: { filter: filterValue },
    });
}

</script>

<style lang="scss" scoped>
.title {
  h1 {
    border-right: 3px solid $secondary;
    padding-right: 32px;
  }

  p {
    font-size: 1.3rem;
    color: $dark-navy;
  }
}

.dashboard {
  margin-top: 96px;
}

.on-hover {
  background-color: $dark-navy;
  color: white;
  cursor: pointer;
}

.icon {
  width: 64px;
  object-fit: contain;
}

.v-icon {
  font-size: 48px;
  padding: 32px;
  background-color: $dark-navy;
  color: white;
  border-radius: 50%;
}

.on-hover-icon {
  background-color: $secondary;
}
</style>
