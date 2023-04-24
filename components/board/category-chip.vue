<template>
  <v-chip>{{ categoryValue }} </v-chip>
</template>

<script setup>
const props = defineProps({
  categoryId: Number,
});

const categoryStore = useCategoryStore();
const categoryValue = ref();

onBeforeMount(async () => {
    try {
        const get = await categoryStore.getCategoryByID(props.categoryId);
  categoryValue.value = get.value;
    } catch (error) {
        console.log(error);
        categoryValue.value = 'Not Found'
    }
  
});
</script>

<style lang="scss" scoped></style>
