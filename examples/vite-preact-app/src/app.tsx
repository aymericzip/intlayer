import type { FunctionalComponent } from 'preact';
import { Suspense } from 'preact/compat';
import { useState } from 'preact/hooks';
import { useIntlayer } from 'preact-intlayer';
import './app.css';
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
} from 'preact-intlayer/format';
import { HTMLProvider } from 'preact-intlayer/html';
import { MarkdownProvider, MarkdownRenderer } from 'preact-intlayer/markdown';
import viteLogo from '/vite.svg';
import preactLogo from './assets/preact.svg';
import { LocaleSwitcher } from './components/LocaleSwitcher';
import { useI18nHTMLAttributes } from './hooks/useI18nHTMLAttributes';
import { LocaleRouter } from './Router';

const AppContent: FunctionalComponent = () => {
  useI18nHTMLAttributes();
  const [count, setCount] = useState(0);
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

  const formattedCurrency = new intl.NumberFormat({
    style: 'currency',
    currency: 'USD',
  }).format(12345.67);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank" rel="noopener">
          <img src={preactLogo} class="logo preact" alt="Preact logo" />
        </a>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          margin: '20px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          textAlign: 'left',
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

      <div>
        <MarkdownRenderer
          components={{
            h2: (props: any) => (
              <h2 style={{ color: 'blue' }} {...props}>
                {props.children}
              </h2>
            ),
          }}
          wrapper={({ children }: any) => (
            <div style={{ background: 'red', padding: '30px' }}>{children}</div>
          )}
        >
          ## Hello World
        </MarkdownRenderer>

        {/* Should use provider is possible, or default option if not */}
        {content.markdown}

        {/* Should use first the overrides, then the provider if possible, or default option if not */}
        {content.markdown.use({
          h1: (props: any) => (
            <h1 style={{ color: 'green' }} {...props}>
              tetst
            </h1>
          ),
          ComponentDemo: () => <div style={{ background: 'pink' }}>DEMO2</div>,
        })}
      </div>

      <div>
        <h1>{content.title}</h1>

        {content.insertion({ count: 2 })}

        {content.html}

        {content.html.use({
          b: (props: any) => <h1 {...props} />,
        })}

        {content.html.use({
          'custom-component': (props: any) => (
            <h1 style={{ color: 'red' }} {...props}>
              Custom 1
            </h1>
          ),

          CustomComponent2: (props: any) => (
            <h1 style={{ color: 'green' }} {...props}>
              {props.children}
            </h1>
          ),
        })}
      </div>

      <div className="enumeration">
        <p>{content.enumeration({ count: 0 })(0)}</p>
        <p>{content.enumeration({ count: 1 })(1)}</p>
        <p>{content.enumeration({ count: 2 })(2)}</p>
      </div>

      <button
        type="button"
        onClick={() => setCount((count: number) => count + 1)}
      >
        {content.count}
        {count}
      </button>
      <p>{content.edit}</p>
      <p class="read-the-docs">{content.readTheDocs}</p>
      <LocaleSwitcher />
    </>
  );
};

export const App: FunctionalComponent = () => (
  <LocaleRouter>
    <Suspense fallback={<div>loading dynamic dictionaries...</div>}>
      <MarkdownProvider
        components={{
          h1: (props: any) => (
            <h1 style={{ color: 'orange' }} {...props}>
              {props.children}
            </h1>
          ),
          ComponentDemo: () => <div style={{ background: 'grey' }}>DEMO</div>,
        }}
      >
        <HTMLProvider
          components={{
            CustomComponent: (props: any) => (
              <h1 style={{ color: 'blue' }} {...props}>
                Custom 2l
              </h1>
            ),
          }}
        >
          <AppContent />
        </HTMLProvider>
      </MarkdownProvider>
    </Suspense>
  </LocaleRouter>
);
