import type { FunctionalComponent } from 'preact';
import { Suspense } from 'preact/compat';
import { useState } from 'preact/hooks';
import { useIntlayer } from 'preact-intlayer';
import './app.css';
import viteLogo from '/vite.svg';
import preactLogo from './assets/preact.svg';
import { LocaleSwitcher } from './components/LocaleSwitcher';
import { useI18nHTMLAttributes } from './hooks/useI18nHTMLAttributes';
import { LocaleRouter } from './Router';

const AppContent: FunctionalComponent = () => {
  useI18nHTMLAttributes();
  const [count, setCount] = useState(0);
  const content = useIntlayer('app');

  return (
    <div className="flex w-xl flex-col items-center gap-6">
      <div class="my-5 flex w-full justify-evenly">
        <a href="https://vitejs.dev" target="_blank" rel="noopener">
          <img src={viteLogo} class="h-28" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank" rel="noopener">
          <img
            src={preactLogo}
            class="preact h-28"
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
    <Suspense fallback={<div>loading dynamic dictionaries...</div>}>
      <AppContent />
    </Suspense>
  </LocaleRouter>
);
