import MarkdownIt from 'markdown-it';
import { createApp, h } from 'vue';
import { installIntlayer, installIntlayerMarkdown } from 'vue-intlayer';
import App from './App.vue';
import { router } from './routes';
import './style.css';

const app = createApp(App);

// Add the router to the app
app.use(router);

// Inject the provider at the top level
installIntlayer(app); // provide the singleton instance

const md = new MarkdownIt({
  html: true, // allow HTML tags
  linkify: true, // auto-link URLs
  typographer: true, // enable smart quotes, dashes, etc.
});

// Tell Intlayer to use md.render() whenever it needs to turn markdown into HTML
installIntlayerMarkdown(app, (markdown) => {
  const html = md.render(markdown);
  return h('div', { innerHTML: html });
});

// Mount the app
app.mount('#app');
