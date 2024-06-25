import Vue3Toastify, { type Options, toast } from 'vue3-toastify';
import { defineNuxtPlugin } from '#app';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    theme: 'dark',
    position: 'bottom-right',
  } as Options);

  return {
    provide: { toast },
  };
});
