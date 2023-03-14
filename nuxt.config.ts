import vuetify from 'vite-plugin-vuetify'



export default defineNuxtConfig({
  modules: ['@pinia/nuxt', async (_, nuxt) => {
    nuxt.hooks.hook("vite:extendConfig", (config: any) => config.plugins.push(vuetify()));
  },],  
  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_colors.scss" as *;'
        }
      }
    },
  },

  
 
})
