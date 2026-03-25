<script lang="ts">
import {
  useIntlayer,
  setupIntlayer,
} from 'svelte-intlayer';
import {
  useNumber,
  usePercentage,
  useCurrency,
  useDate,
  useRelativeTime,
  useUnit,
  useCompact,
  useList,
  useIntl,
} from 'svelte-intlayer/format';
import { setIntlayerMarkdown } from 'svelte-intlayer/markdown';
import viteLogo from '/vite.svg';
import svelteLogo from './assets/svelte.svg';
import Counter from './lib/Counter.svelte';
import LocaleSwitcher from './lib/LocaleSwitcher.svelte';
import Test from './Test.svelte';


setupIntlayer()

const content = useIntlayer('app');

const number = useNumber();
const percentage = usePercentage();
const currency = useCurrency();
const date = useDate();
const relativeTime = useRelativeTime();
const unit = useUnit();
const compact = useCompact();
const list = useList();
const intl = useIntl();

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);

$: formattedCurrency = new ($intl.NumberFormat)({
  style: 'currency',
  currency: 'USD',
}).format(12345.67);


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

  <div
    style="display: flex; flex-direction: column; gap: 10px; margin: 20px; padding: 20px; border: 1px solid #ccc; border-radius: 8px; text-align: left;"
  >
    <h2>Formatters</h2>
    <p>Number: {$number(123456.789)}</p>
    <p>Percentage: {$percentage(0.25)}</p>
    <p>Currency: {$currency(1234.5, { currency: 'EUR' })}</p>
    <p>Date: {$date(now, 'short')}</p>
    <p>Relative Time: {$relativeTime(now, in3Days, { unit: 'day' })}</p>
    <p>Unit: {$unit(5, { unit: 'kilometer', unitDisplay: 'long' })}</p>
    <p>Compact: {$compact(1200)}</p>
    <p>List: {$list(['apple', 'banana', 'orange'])}</p>
    <p>Intl (Manual): {formattedCurrency}</p>
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
  <div>
    <h2>Enumeration</h2>
    <p>{$content.enumeration({ count: 0 })(0)}</p>
    <p>{$content.enumeration({ count: 1 })(1)}</p>
    <p>{$content.enumeration({ count: 2 })(2)}</p>

    <h2>Insertion</h2>
    <p>{$content.insertion({ count: 42 })}</p>
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
