import { type FC, useState } from 'react';
import {
  HTMLProvider,
  MarkdownProvider,
  MarkdownRenderer,
  useIntlayer,
} from 'react-intlayer';
import './App.css';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';
import { LocaleSwitcher } from './components/LangSwitcherDropDown';
import { LocaleRouter } from './Router';
import HelloWorld from './Test';

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'source' | 'rendered'>('rendered');
  const content = useIntlayer('app');

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
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
          wrapper={({ children }) => (
            <div style={{ background: 'red', padding: '30px' }}>{children}</div>
          )}
        >
          ## Hello World
        </MarkdownRenderer>

        {/* Should use provider is possible, or default option if not */}
        {content.markdown}

        {/* Should use first the overrides, then the provider if possible, or default option if not */}
        {content.markdown.use({
          h1: (props) => (
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
          b: (props) => <h1 {...props} />,
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

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
      <div className="absolute right-5 bottom-5 z-50">
        <LocaleSwitcher />
      </div>
    </>
  );
};

const App: FC = () => (
  <LocaleRouter>
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
    <HelloWorld />
  </LocaleRouter>
);

export default App;
