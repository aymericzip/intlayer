import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { compileMarkdown } from 'react-intlayer/markdown';
import './App.css';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';
import { LocaleSwitcher } from './components/LangSwitcherDropDown';
import { LocaleRouter } from './Router';
import HelloWorld from './Test';

// Default markdown for demo
const DEFAULT_MARKDOWN = `## Hello World

This is **bold** and this is *italic*.

- List item 1
- List item 2
- List item 3

\`inline code\` example

> A blockquote

[Link to intlayer](https://intlayer.org)`;

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'source' | 'rendered'>('rendered');
  const [markdownSource, setMarkdownSource] = useState(DEFAULT_MARKDOWN);
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
      <h1>{content.title}</h1>

      {/* Markdown Demo with Tabs */}
      <div
        style={{ textAlign: 'left', margin: '1rem auto', maxWidth: '600px' }}
      >
        <h3 style={{ marginBottom: '0.5rem' }}>
          Markdown Demo (react-intlayer/markdown)
        </h3>
        <p
          style={{ fontSize: '0.85rem', color: '#888', margin: '0 0 0.5rem 0' }}
        >
          Edit the markdown source and switch tabs to see the rendered output
        </p>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '0' }}>
          <button
            onClick={() => setActiveTab('source')}
            style={{
              padding: '0.5rem 1rem',
              background: activeTab === 'source' ? '#646cff' : '#2a2a2a',
              color: 'white',
              border: 'none',
              borderRadius: '8px 0 0 0',
              cursor: 'pointer',
              fontWeight: activeTab === 'source' ? 'bold' : 'normal',
            }}
          >
            Markdown Source
          </button>
          <button
            onClick={() => setActiveTab('rendered')}
            style={{
              padding: '0.5rem 1rem',
              background: activeTab === 'rendered' ? '#646cff' : '#2a2a2a',
              color: 'white',
              border: 'none',
              borderRadius: '0 8px 0 0',
              cursor: 'pointer',
              fontWeight: activeTab === 'rendered' ? 'bold' : 'normal',
            }}
          >
            Rendered Output
          </button>
        </div>

        {/* Tab Content */}
        <div
          style={{
            padding: '1rem',
            background: '#1a1a1a',
            borderRadius: '0 8px 8px 8px',
            minHeight: '200px',
          }}
        >
          {activeTab === 'source' ? (
            <textarea
              value={markdownSource}
              onChange={(e) => setMarkdownSource(e.target.value)}
              style={{
                width: '100%',
                minHeight: '200px',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'monospace',
                color: '#98c379',
                fontSize: '14px',
                lineHeight: '1.5',
              }}
              placeholder="Type your markdown here..."
            />
          ) : (
            <div style={{ color: '#fff' }}>
              {compileMarkdown(markdownSource)}
            </div>
          )}
        </div>
      </div>

      {/* <p>{content.test('male')}</p> */}
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
    <AppContent />
    <HelloWorld />
  </LocaleRouter>
);

export default App;
