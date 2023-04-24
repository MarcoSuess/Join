import { defineStore } from "pinia";


export const useCategoryStore = defineStore('category', () => {


    const allCategories = ref();


    const loading = ref(false);



    async function getAllCategories() {
        try {
            loading.value = true
            const categoryResponse: any = await $fetch.raw('https://64424e7876540ce22588d56c.mockapi.io/marcosuessweb/join/api/category');
            console.log('fetch categories', categoryResponse)
            setTimeout(() => {
                allCategories.value = categoryResponse._data.map((data: any) => {return {...data, id: data.id}});
                loading.value = false 
            }, 800);
          
        } catch (error) {
            console.error('[category store]', error)
        }
    }


    async function getCategoryByID(id: number) {
        
        console.log(id);
        
   
        try {
            const categoryResponse: any = await $fetch.raw(`https://64424e7876540ce22588d56c.mockapi.io/marcosuessweb/join/api/category/${id}`);
            console.log('byID', categoryResponse);
            
           return  categoryResponse._data 
          
        } catch (error) {
            console.error('[category store]', error)
        }

   
    }


    async function loadCategories() {
            if(allCategories.value) return
            await getAllCategories();
            console.log('get categories', allCategories.value);
    }


    return {
        getAllCategories,
        loadCategories,
        getCategoryByID,
        allCategories,
        loading
    }

})