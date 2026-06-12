import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import i18n from './i18n/index.ts';
import router from './router/index.ts';

createApp(App).use(router).use(i18n).mount('#app');
