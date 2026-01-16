import { createApp } from 'vue';
import { installIntlayer, installIntlayerMarkdown } from 'vue-intlayer';
import { compileMarkdown } from 'vue-intlayer/markdown';
import App from './App.vue';
import { router } from './routes';
import './style.css';

const app = createApp(App);

// Add the router to the app
app.use(router);

// Inject the provider at the top level
installIntlayer(app); // provide the singleton instance

// Use the new framework-agnostic markdown compiler from vue-intlayer/markdown
// This uses the core @intlayer/core markdown processor with Vue-specific runtime
installIntlayerMarkdown(app, (markdown) => compileMarkdown(markdown));

// Mount the app
app.mount('#app');
