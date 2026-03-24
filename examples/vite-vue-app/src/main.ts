import { createApp, h } from 'vue';
import { installIntlayer } from 'vue-intlayer';
import App from './App.vue';
import { router } from './routes';
import './style.css';
import { installIntlayerHTML } from 'vue-intlayer/html';
import { installIntlayerMarkdown } from 'vue-intlayer/markdown';

const app = createApp(App);

// Add the router to the app
app.use(router);

// Inject the provider at the top level
installIntlayer(app); // provide the singleton instance

// Use the new framework-agnostic markdown compiler from vue-intlayer/markdown
// This uses the core @intlayer/core markdown processor with Vue-specific runtime
app.use(installIntlayerMarkdown, {
  renderMarkdown: async (md) => {
    const { compileMarkdown } = await import('vue-intlayer/markdown');
    return compileMarkdown(md);
  },
  components: {
    h1: (props) =>
      h('h1', { style: { color: 'orange' }, ...props }, props.children),
    ComponentDemo: () => h('div', { style: { background: 'grey' } }, 'DEMO'),
    bold: (props) => h('strong', props),
    code: (props) => h('code', props),
  },
});

app.use(installIntlayerHTML, {
  components: {
    bold: (props) => h('strong', props),
  },
});

// Mount the app
app.mount('#app');
