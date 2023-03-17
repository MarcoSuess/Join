<template>
  <h1>Add Task</h1>
  <v-container
    class="d-flex justify-center align-start text-h5 flex-row mt-16"
    style="min-height: 300px"
  >
    <div class="form-container w-50 d-flex flex-column align-center">
      <div class="text-subtitle-1 text-medium-emphasis w-75">Title</div>
      <v-text-field
        placeholder="Enter a title"
        required
        variant="solo"
        class="w-75"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis w-75">Description</div>
      <v-textarea
        class="w-75"
        placeholder="Enter a Description"
        variant="solo"
      ></v-textarea>

      <div class="text-subtitle-1 text-medium-emphasis w-75">Category</div>
      <v-select
        placeholder="Select a task category"
        class="w-75"
        :items="[
          'California',
          'Colorado',
          'Florida',
          'Georgia',
          'Texas',
          'Wyoming',
        ]"
        variant="solo"
      ></v-select>

      <div class="text-subtitle-1 text-medium-emphasis w-75">Assigned to</div>
      <v-select
        class="w-75"
        clearable
        chips
        placeholder="Select contacts"
        :items="[
          'California',
          'Colorado',
          'Florida',
          'Georgia',
          'Texas',
          'Wyoming',
        ]"
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
        required
        variant="solo"
        type="date"
        class="w-75"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis w-75">Prio</div>
      <v-container class="w-75 d-flex flex-row prio-container">
        <ul>
          <li>
            <input type="radio" value="urgent" name="radio" id="radio1" />
            <label v-ripple for="radio1"
              >Urgent
              <img src="@/assets/icons/Urgent.png" alt="urgent" />
            </label>
          </li>
          <li>
            <input type="radio" value="medium" name="radio" id="radio2" />
            <label v-ripple for="radio2"
              >Medium
              <img src="@/assets/icons/Medium.png" alt="medium" />
            </label>
          </li>
          <li>
            <input type="radio" value="low" name="radio" id="radio3" />
            <label v-ripple for="radio3"
              >Low
              <img src="@/assets/icons/Low.png" alt="low" />
            </label>
          </li>
        </ul>
      </v-container>

      <div class="text-subtitle-1 text-medium-emphasis w-75">Subtasks</div>

      <v-text-field
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
      <v-container class="w-75 overflow-y-auto" style="max-height: 128px; min-height: 128px;">
        <v-chip
          v-for="(subTitle, index) in subtitles"
          :key="subTitle"
          class="ma-2"
          closable
          @click:close="removeSubTitle(subTitle)"
        >
          {{ subTitle }}
        </v-chip>
      </v-container>
      <v-container class="w-75 pl-0 mt-12">
        <v-btn class="mr-8" append-icon="mdi-close" color="error" variant="plain"> Clear </v-btn>
        <v-btn  class="btn-default" append-icon="mdi-check"> Create Task </v-btn>
      </v-container>
    </div>
  </v-container>
</template>

<script setup>
const subInput = ref("");
const subtitles = ref([]);

const addSubtitle = () => {
  if (subInput.value) {
    subtitles.value.unshift(subInput.value);
    clearSubInput();
  }
};

const clearSubInput = () => {
  subInput.value = "";
};

const removeSubTitle = (subTitle) => {
  subtitles.value.splice(subtitles.value.indexOf(subTitle), 1);
  console.log(subTitle);
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
  input:checked + label {
    background: rgb(42 127 215);
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
</style>

<!-- https://stackoverflow.com/questions/67371579/vue-3-emit-event-from-parent-to-child-component -->
<!-- https://stackoverflow.com/questions/71668860/how-to-apply-style-of-selected-radiobutton-in-vuetify -->
