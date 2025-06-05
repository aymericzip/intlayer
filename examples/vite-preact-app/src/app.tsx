import type { FunctionalComponent } from 'preact';
import { useIntlayer } from 'preact-intlayer';
import { useState } from 'preact/hooks';
import './app.css';
import preactLogo from './assets/preact.svg';
import { LocaleSwitcher } from './components/LocaleSwitcher';
import { useI18nHTMLAttributes } from './hooks/useI18nHTMLAttributes';
import { LocaleRouter } from './Router';
import viteLogo from '/vite.svg';

const AppContent: FunctionalComponent = () => {
  useI18nHTMLAttributes();
  const [count, setCount] = useState(0);
  const content = useIntlayer('app');

  return (
    <div className="flex flex-col items-center gap-6 w-xl">
      <div class="flex justify-evenly w-full my-5">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="h-28" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="h-28 preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        {content.count}
        {count}
      </button>
      <p>{content.edit}</p>
      <p class="read-the-docs">{content.readTheDocs}</p>
      <LocaleSwitcher />
    </div>
  );
};

export const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
