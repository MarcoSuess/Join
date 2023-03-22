<template>
  <draggable
    class="list-group dropList"
    :list="props.itemList"
    group="tasks"
    @change="changeItem($event, props.itemStatus)"
  >
    <v-card class="list-group-item" v-for="item in itemList" :key="item.id">
      <v-chip> IT </v-chip>
      <h5 class="mt-4">{{ item.title }}</h5>

      
      <h6 class="mt-4">1/2 Done</h6>
      <v-progress-linear color="blue-lighten-1" model-value="20"></v-progress-linear>

      <div class="labels">
        <div class="assignedUser"></div>
        <img src="@/assets/icons/Low.png" />
      </div>
    </v-card>
  </draggable>
</template>

<script setup>
const props = defineProps({
  itemList: Array,
  itemStatus: Number,
});

const emit = defineEmits(["changeItem"]);

const changeItem = ($event, itemStatus) => {
   
  emit("changeItem", [$event, itemStatus]);
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
