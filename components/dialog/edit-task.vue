<template>
    
  <v-dialog persistent v-model="props.openDialog" width="64%">
  

    <v-card title="Edit Task" class="pa-8 v-card-modal">
        <v-icon @click="closeDialog" class="close-icon" icon="mdi-close" size="large"></v-icon>
       <TaskForm @close="closeDialog" @save-edit-task="saveEditTask($event)" :task-data="props.dialogData" :status="'edit'"></TaskForm>


     
    </v-card>
  </v-dialog>

</template>

<script setup>
const props = defineProps({
  dialogData: Object,
  openDialog: Boolean
});

const emit = defineEmits(['close', 'save'])


const closeDialog = () => {
    emit('close')
}

const saveEditTask = (task) => {
    emit('save', task)
}

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

.close-icon {
    position: absolute;
    right: 40px;
    cursor: pointer;
}
</style>
