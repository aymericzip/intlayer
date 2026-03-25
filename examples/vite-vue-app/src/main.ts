import { createApp, h } from 'vue';
import { intlayer } from 'vue-intlayer';
import App from './App.vue';
import { router } from './routes';
import './style.css';
import { intlayerHTML } from 'vue-intlayer/html';
import { intlayerMarkdown } from 'vue-intlayer/markdown';

const app = createApp(App);

// Add the router to the app
app.use(router);

// Inject the provider at the top level
app.use(intlayer); // provide the singleton instance

// Use the new framework-agnostic markdown compiler from vue-intlayer/markdown
// This uses the core @intlayer/core markdown processor with Vue-specific runtime
app.use(intlayerMarkdown, {
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

app.use(intlayerHTML, {
  components: {
    bold: (props) => h('strong', props),
  },
});

// Mount the app
app.mount('#app');
