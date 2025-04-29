import { createApp } from 'vue';
import { installIntlayer } from 'vue-intlayer';
import App from './App.vue';
import './style.css';

const app = createApp(App);

// Inject the provider at the top level
installIntlayer(app); // provide the singleton instance

// Mount the app
app.mount('#app');
