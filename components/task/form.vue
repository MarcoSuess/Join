<template>
  <v-container
    class="d-flex justify-center align-start text-h5 flex-row mt-16"
    style="min-height: 300px"
  >
    <div class="form-container w-50 d-flex flex-column align-center">
      <div class="text-subtitle-1 text-medium-emphasis w-75">Title</div>
      <v-text-field
        v-model="state.title"
        :error-messages="v$.title.$errors.map((e) => e.$message)"
        @input="v$.title.$touch"
        @blur="v$.title.$touch"
        :class="{ warningBorderInput: v$.title.$errors.length }"
        placeholder="Enter a title"
        required
        variant="solo"
        class="w-75"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis w-75">Description</div>
      <v-textarea
        v-model="state.description"
        class="w-75"
        placeholder="Enter a Description"
        variant="solo"
      ></v-textarea>

      <div class="text-subtitle-1 text-medium-emphasis w-75">Category</div>
      <v-select
        v-model="state.category"
        :error-messages="v$.category.$errors.map((e) => e.$message)"
        @input="v$.category.$touch"
        @blur="v$.category.$touch"
        :class="{ warningBorderSelect: v$.category.$errors.length }"
        placeholder="Select a task category"
        class="w-75"
        :items="category"
        variant="solo"
      ></v-select>

      <div class="text-subtitle-1 text-medium-emphasis w-75">Assigned to</div>
      <v-select
        v-model="state.assignedTo"
        :error-messages="v$.assignedTo.$errors.map((e) => e.$message)"
        @input="v$.assignedTo.$touch"
        @blur="v$.assignedTo.$touch"
        :class="{ warningBorderSelect: v$.assignedTo.$errors.length }"
        class="w-75"
        clearable
        chips
        placeholder="Select contacts"
        :items="getUserWithTitle"
        item-title="title"
        item-value="id"
        multiple
        variant="solo"
      ></v-select>
    </div>

    <v-divider
      :thickness="2"
      class="border-opacity-100"
      color="rgb(205, 205, 205)"
      vertical
    ></v-divider>

    <div class="form-container w-50 d-flex flex-column align-center">
      <div class="text-subtitle-1 text-medium-emphasis w-75">Due date</div>
      <v-text-field
        v-model="state.dueDate"
        :error-messages="v$.dueDate.$errors.map((e) => e.$message)"
        @input="v$.dueDate.$touch"
        @blur="v$.dueDate.$touch"
        :class="{ warningBorderInput: v$.dueDate.$errors.length }"
        required
        variant="solo"
        type="date"
        class="w-75"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis w-75">Prio</div>
      <v-container class="w-75 d-flex flex-row prio-container">
        <ul>
          <li class="urgency">
            <input
              v-model="state.prio"
              type="radio"
              value="urgent"
              name="radio"
              id="radio1"
            />
            <label v-ripple for="radio1"
              >Urgent
              <img src="@/assets/icons/Urgent.png" alt="urgent" />
            </label>
          </li>
          <li class="medium">
            <input
              v-model="state.prio"
              type="radio"
              value="medium"
              name="radio"
              id="radio2"
            />
            <label v-ripple for="radio2"
              >Medium
              <img src="@/assets/icons/Medium.png" alt="medium" />
            </label>
          </li>
          <li class="low">
            <input
              v-model="state.prio"
              type="radio"
              value="low"
              name="radio"
              id="radio3"
            />
            <label v-ripple for="radio3"
              >Low
              <img src="@/assets/icons/Low.png" alt="low" />
            </label>
          </li>
        </ul>
      </v-container>

      <v-text-field
        placeholder="Add new Subtask"
        v-model="subInput"
        variant="solo"
        class="w-75"
        clear-icon="mdi-close-circle"
        clearable
        @keyup.enter="addSubtitle"
      >
        <template v-slot:append>
          <v-icon :class="{ disable: !subInput }" @click="addSubtitle">
            mdi-send
          </v-icon>
        </template>
      </v-text-field>
      <v-container
        class="w-75 overflow-y-auto"
        style="max-height: 128px; min-height: 128px"
      >
        <v-chip
          v-for="subTask in state.subTasks"
          :key="subTask"
          class="ma-2"
          closable
          @click:close="removeSubTitle(subTask)"
        >
          {{ subTask.title }}
        </v-chip>
      </v-container>
      <v-container class="w-75 pl-0 mt-12 d-flex justify-end">
        <v-btn
          class="mr-8"
          :append-icon="
            props.status == 'create' ? 'mdi-close' : 'mdi-backup-restore'
          "
          color="error"
          variant="plain"
          @click="clearForm"
        >
          {{ props.status == "create" ? "Clear" : "Reset" }}
        </v-btn>

        <v-btn
          @click="submitForm()"
          class="btn-default"
          append-icon="mdi-check"
        >
          {{ props.status == "create" ? "create" : "save" }} Task
        </v-btn>
      </v-container>
    </div>
  </v-container>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { taskStore } from "@/stores/task";

const props = defineProps({
  status: { default: "create" },
  taskData: {},
});

const emit = defineEmits(["saveEditTask", "snackbar"]);

const getUserWithTitle = useUserStore().allUsers.map((user) => {
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

const initialState = {
  title: props.taskData?.title || "",
  description: props.taskData?.description || "",
  category: props.taskData?.category || null,
  assignedTo: props.taskData?.assignedTo || [],
  dueDate: props.taskData?.dueDate || null,
  prio: props.taskData?.prio || "urgent",
  subTasks: props.taskData?.subTasks
    ? JSON.parse(JSON.stringify(props.taskData?.subTasks))
    : [],
};

const state = reactive({
  ...initialState,
});

const rules = {
  title: { required },
  category: { required },
  assignedTo: { required },
  dueDate: { required },
};

const v$ = useVuelidate(rules, state);

const clearForm = () => {
  console.log(initialState);
  v$.value.$reset();
  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }

  if (props.status === "edit") {
    state.subTasks = JSON.parse(JSON.stringify(props.taskData?.subTasks)) || [];
  } else {
    state.subTasks = [];
  }
};

const subInput = ref("");

const addSubtitle = () => {
  if (subInput.value) {
    state.subTasks.unshift({ title: subInput.value, done: false });
    clearSubInput();
  }
};

const clearSubInput = () => {
  subInput.value = "";
};

const removeSubTitle = (subTask) => {
  state.subTasks.splice(state.subTasks.indexOf(subTask), 1);
};

const submitForm = async () => {
  const isFormCorrect = await v$.value.$validate();
  console.log(isFormCorrect);

  if (!isFormCorrect) return;

  if (props.status == "create") {
    await taskStore().createTask(state);
    console.log("create task", state);
     clearForm();
     emit('snackbar');
  } else {
    console.log("patch task", state);
    await taskStore().patchTask({ ...state, id: props.taskData.id });
    emit("saveEditTask", { ...state, id: props.taskData.id });
  }

  
};
</script>

<style lang="scss" scoped>
.text-subtitle-1 {
  color: $dark-navy !important;
  font-weight: 900;
}

.prio-container {
  padding-top: 0;
  padding-left: 0;

  ul {
    list-style: none;
    display: flex;
  }
  li {
    margin-right: 8px;
    display: flex;
    flex-direction: column-reverse;
  }
  input {
    visibility: hidden;
  }
  label {
    cursor: pointer;
    background-color: rgb(0 0 0);
    color: white;
    padding: 8px;
    font-size: 0.9em;
  }
}

.urgency {
  input:checked + label {
    background: rgb(255 79 62 / 80%);
  }
}

.medium {
  input:checked + label {
    background: rgb(233 126 16);
  }
}

.low {
  input:checked + label {
    background: rgb(124 175 2);
  }
}

label {
  align-items: center;
  display: flex;
  height: 40px;
  margin-right: 16px;

  img {
    margin-left: 8px;
  }
}

.warningBorderInput {
  :deep(input) {
    border: 1px solid red;
    transition: all 530ms ease-in-out;
  }
}

.warningBorderSelect {
  :deep(.v-input__control) {
    border: 1px solid red;
    transition: all 530ms ease-in-out;
  }
}
</style>
