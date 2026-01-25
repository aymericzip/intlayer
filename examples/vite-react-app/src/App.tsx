import { getIntlayer } from 'intlayer';
import {
  type DetailedHTMLProps,
  type FC,
  type ImgHTMLAttributes,
  useState,
} from 'react';
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
  const content = useIntlayer('app');

  const content2 = getIntlayer('app');

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
            h2: (props) => (
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

      <h1>{content.title}</h1>

      <div>
        <h2>HTML:</h2>
        {content.insertion({ count: <p>200</p> })}
        {content.html}
        {content.html.use({
          b: (props) => <h1 {...props} style={{ background: 'blue' }} />,
          div: (props) => <div {...props} style={{ background: 'yellow' }} />,
          CustomComponent2: (props) => (
            <div {...props} style={{ background: 'green' }} />
          ),
        })}
        {content.html.use({
          div: (props) => <div {...props} style={{ background: 'yellow' }} />,

          'custom-component': (props) => (
            <h1 style={{ color: 'red' }} {...props}>
              Custom 1
            </h1>
          ),

          CustomComponent2: (props) => (
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
        h1: (props) => (
          <h1 style={{ color: 'orange' }} {...props}>
            {props.children}
          </h1>
        ),
        img: (
          props: DetailedHTMLProps<
            ImgHTMLAttributes<HTMLImageElement>,
            HTMLImageElement
          >
        ) => <img {...props} style={{ background: 'grey' }} alt={props.alt} />,
        code: (props) => <code {...props} style={{ background: 'grey' }} />,
        a: (props) => <a {...props} style={{ color: 'blue' }} />,
        ComponentDemo: (props) => (
          <div style={{ background: 'grey' }} {...props}>
            DEMO
          </div>
        ),
      }}
    >
      <HTMLProvider
        components={{
          CustomComponent: (props) => (
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
