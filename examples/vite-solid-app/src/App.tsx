import {
  IntlayerProvider,
  MarkdownProvider,
  useIntlayer,
} from 'solid-intlayer';
import { createSignal } from 'solid-js';
import './App.css';
import viteLogo from '/vite.svg';
import solidLogo from './assets/solid.svg';

const AppContent = () => {
  const [_count, setCount] = createSignal(0);
  const content = useIntlayer('app');
  const {
    viteAndVue,
    viteLogoLabel,
    solidLogoLabel,
    countIs,
    editSrcAppTsx,
    readTheDocs,
  } = content();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener">
          <img src={viteLogo} class="logo" alt={viteLogoLabel.value} />
        </a>
        <a href="https://solidjs.com" target="_blank" rel="noopener">
          <img src={solidLogo} class="logo solid" alt={solidLogoLabel.value} />
        </a>
      </div>
      <h1>{viteAndVue}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {/* {countIs({ count: count() })} */}
        </button>
        {/* <p>{editSrcAppTsx}</p> */}
      </div>
      {/* <p class="read-the-docs">{readTheDocs}</p> */}
    </>
  );
};

export const App = () => (
  <IntlayerProvider>
    <MarkdownProvider renderMarkdown={(content) => <div>{content}</div>}>
      <AppContent />
    </MarkdownProvider>
  </IntlayerProvider>
);
