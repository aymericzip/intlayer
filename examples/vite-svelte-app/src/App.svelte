<script lang="ts">
import {
  setIntlayerMarkdown,
  useIntlayer,
  useIntlayerEditor,
} from 'svelte-intlayer';
import viteLogo from '/vite.svg';
import svelteLogo from './assets/svelte.svg';
import Counter from './lib/Counter.svelte';
import LocaleSwitcher from './lib/LocaleSwitcher.svelte';
import Test from './Test.svelte';

useIntlayerEditor();

const content = useIntlayer('app');

$: console.log($content.markdownContent.metadata);
</script>


<main>
  <div class="locale-switcher-container">
    <LocaleSwitcher />
  </div>
  
  <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt={$content.viteLogo} />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt={$content.svelteLogo} />
    </a>
  </div>
  <h1><svelte:component this={$content.title} /></h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    <svelte:component this={$content.checkOut[0]} /> <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, <svelte:component this={$content.checkOut[1]} />
  </p>

  <p class="read-the-docs">
    <svelte:component this={$content.readTheDocs} />
  </p>

  <div>
    <h2>Markdown content</h2>
    <svelte:component this={$content.markdown} />

    <h2>Markdown with overrides</h2>
    <svelte:component
      this={$content.markdown.use({
        h1: (props) => {
          const h1 = document.createElement('h1');
          h1.style.color = 'green';
          h1.textContent = 'tetst';
          return h1;
        },
        ComponentDemo: () => {
          const div = document.createElement('div');
          div.style.background = 'pink';
          div.textContent = 'DEMO2';
          return div;
        },
      })}
    />

    <h2>HTML content</h2>
    {@html $content.html.toString()}

    <h2>HTML with overrides</h2>
    {@html $content.html
      .use({
        b: (props) => {
          const h1 = document.createElement('h1');
          for (const [key, val] of Object.entries(props)) {
            if (key !== 'children') h1.setAttribute(key, String(val));
          }
          return h1;
        },
        'custom-component': (props) => {
          const h1 = document.createElement('h1');
          h1.style.color = 'red';
          for (const [key, val] of Object.entries(props)) {
            if (key !== 'children') h1.setAttribute(key, String(val));
          }
          h1.textContent = 'Custom 1';
          return h1;
        },
        CustomComponent2: (props) => {
          const h1 = document.createElement('h1');
          h1.style.color = 'green';
          for (const [key, val] of Object.entries(props)) {
            if (key !== 'children') h1.setAttribute(key, String(val));
          }
          h1.textContent = props.children;
          return h1;
        },
      })
      .toString()}
  </div>

  <div>
    <h2>Old Markdown content</h2>
    <!-- render the markdown content as a string -->
    {@html $content.markdownContent}
    <h2>Old Markdown component</h2>
    <!-- render the markdown content as a component -->
    <svelte:component this={$content.markdownContent} />
    <h2>Old Markdown Metadata</h2>
    <!-- render the metadata of the markdown content -->
    {$content.markdownContent.metadata.title}
  </div>
  <Test />
</main>

<style>
  .locale-switcher-container {
    position: absolute;
    top: 1em;
    right: 1em;
  }

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
