import { A, Route, useLocation, useNavigate } from '@solidjs/router';
import { getLocalizedUrl, localeMap } from 'intlayer';
import {
  IntlayerProvider,
  MarkdownProvider,
  useIntlayer,
  useLocale,
} from 'solid-intlayer';
import { createSignal, For, type ParentComponent } from 'solid-js';
import './App.css';
import viteLogo from '/vite.svg';
import solidLogo from './assets/solid.svg';

const LocaleSwitcher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (loc) => {
      const pathWithLocale = getLocalizedUrl(location.pathname, loc);
      navigate(pathWithLocale);
    },
  });

  return (
    <select
      value={locale()}
      onChange={(e) => setLocale(e.currentTarget.value as any)}
      class="locale-switcher"
    >
      <For each={availableLocales}>
        {(loc) => (
          <option value={loc} selected={loc === locale()}>
            {loc}
          </option>
        )}
      </For>
    </select>
  );
};

const Layout: ParentComponent = (props) => {
  return (
    <>
      <nav>
        <A href="/" end activeClass="active">
          Home
        </A>
        <A href="/tests" activeClass="active">
          Tests
        </A>
        <LocaleSwitcher />
      </nav>
      {props.children}
    </>
  );
};

const Home = () => {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer('app');

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener">
          <img
            src={viteLogo}
            class="logo"
            alt={content().viteLogoLabel.value}
          />
        </a>
        <a href="https://solidjs.com" target="_blank" rel="noopener">
          <img
            src={solidLogo}
            class="logo solid"
            alt={content().solidLogoLabel.value}
          />
        </a>
      </div>
      <h1>{content().viteAndSolid}</h1>
      <div class="card">
        <button onClick={() => setCount((c) => c + 1)}>
          {content().countIs({ count: count() })}
        </button>
        <p>{content().editSrcAppTsx}</p>
      </div>
      <p class="read-the-docs">{content().readTheDocs}</p>
    </>
  );
};

const Tests = () => {
  const content = useIntlayer('test');

  return (
    <div class="tests">
      <h2>{content().title}</h2>
      <div class="test-item">
        <h3>HTML Test</h3>
        <p>{content().htmlTest}</p>
      </div>
      <div class="test-item">
        <h3>Markdown Test</h3>
        <div class="markdown-body">{content().markdownTest}</div>
      </div>
      <div class="test-item">
        <h3>Enumeration Test</h3>
        <p>0: {content().enumerationTest({ count: 0 })}</p>
        <p>1: {content().enumerationTest({ count: 1 })}</p>
        <p>10: {content().enumerationTest({ count: 10 })}</p>
      </div>
    </div>
  );
};

export const App = () => (
  <IntlayerProvider>
    {localeMap(({ locale, urlPrefix }) => (
      <Route
        path={urlPrefix || '/'}
        component={(props: any) => (
          <IntlayerProvider locale={locale}>
            <MarkdownProvider>
              <Layout>{props.children}</Layout>
            </MarkdownProvider>
          </IntlayerProvider>
        )}
      >
        <Route path="/" component={Home} />
        <Route path="/tests" component={Tests} />
      </Route>
    ))}
  </IntlayerProvider>
);
