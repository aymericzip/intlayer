import { A, Route, useLocation, useNavigate } from '@solidjs/router';
import { getLocalizedUrl, localeMap } from 'intlayer';
import { IntlayerProvider, useIntlayer, useLocale } from 'solid-intlayer';
import {
  useCompact,
  useCurrency,
  useDate,
  useIntl,
  useList,
  useNumber,
  usePercentage,
  useRelativeTime,
  useUnit,
} from 'solid-intlayer/format';
import { MarkdownProvider } from 'solid-intlayer/markdown';
import { createSignal, For, type ParentComponent } from 'solid-js';
import './App.css';

import viteLogo from '/vite.svg';
import solidLogo from './assets/solid.svg';

const LocaleSwitcher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (locale) => {
      const pathWithLocale = getLocalizedUrl(location.pathname, locale);

      navigate(pathWithLocale);
    },
  });

  return (
    <select
      value={locale()}
      onChange={(e) => setLocale(e.currentTarget.value)}
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
  const { locale } = useLocale();

  return (
    <>
      <nav>
        <A href={getLocalizedUrl('/', locale())} end activeClass="active">
          Home
        </A>
        <A href={getLocalizedUrl('/tests', locale())} activeClass="active">
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

  const formattedCurrency = new (intl().NumberFormat)({
    style: 'currency',
    currency: 'USD',
  }).format(12345.67);

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

      <div
        style={{
          display: 'flex',
          'flex-direction': 'column',
          gap: '10px',
          margin: '20px',
          padding: '20px',
          border: '1px solid #ccc',
          'border-radius': '8px',
          'text-align': 'left',
        }}
      >
        <h2>Formatters</h2>
        <p>Number: {number(123456.789)}</p>
        <p>Percentage: {percentage(0.25)}</p>
        <p>Currency: {currency(1234.5, { currency: 'EUR' })}</p>
        <p>Date: {date(now, 'short')}</p>
        <p>Relative Time: {relativeTime(now, in3Days, { unit: 'day' })}</p>
        <p>Unit: {unit(5, { unit: 'kilometer', unitDisplay: 'long' })}</p>
        <p>Compact: {compact(1200)}</p>
        <p>List: {list(['apple', 'banana', 'orange'])}</p>
        <p>Intl (Manual): {formattedCurrency}</p>
      </div>

      <h1>{content().viteAndSolid}</h1>
      <div class="card">
        <button type="button" onClick={() => setCount((c) => c + 1)}>
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
        <p>0: {content().enumerationTest({ count: 0 })(0)}</p>
        <p>1: {content().enumerationTest({ count: 1 })(1)}</p>
        <p>10: {content().enumerationTest({ count: 10 })(10)}</p>
      </div>
    </div>
  );
};

export const App = () => (
  <IntlayerProvider>
    {localeMap(({ locale, urlPrefix }) => (
      <Route
        path={urlPrefix}
        component={(props) => (
          <IntlayerProvider locale={locale}>
            <MarkdownProvider
              renderMarkdown={async (md) => {
                const { compileMarkdown } = await import(
                  'solid-intlayer/markdown'
                );
                return compileMarkdown(md);
              }}
            >
              <Layout>{props.children}</Layout>
            </MarkdownProvider>
          </IntlayerProvider>
        )}
      >
        <Route path="/" component={Home} />
        {/* Use the localized route path so client-side navigation works with
            solidRouterRewrite pretty URLs (e.g. /fr/essais instead of /fr/tests). */}
        <Route
          path={
            getLocalizedUrl('/tests', locale).slice(urlPrefix.length) || '/'
          }
          component={Tests}
        />
      </Route>
    ))}
  </IntlayerProvider>
);
