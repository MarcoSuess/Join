<template>
    
  <v-dialog persistent v-model="props.openDialog" width="64%">
    <v-card title="Edit Task" class="pa-8 v-card-modal">

       <TaskForm :task-data="props.dialogData" :status="'edit'"></TaskForm>


     
    </v-card>
  </v-dialog>

</template>

<script setup>
const props = defineProps({
  dialogData: Object,
  openDialog: Boolean
});
</script>

<style lang="scss" scoped>
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
</style>
