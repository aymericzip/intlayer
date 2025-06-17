import { defineNuxtPlugin } from '#app';
import { installIntlayer } from 'vue-intlayer';

console.log('✅ Intlayer plugin loaded');

export default defineNuxtPlugin((nuxtApp) => {
  installIntlayer(nuxtApp.vueApp);
});
