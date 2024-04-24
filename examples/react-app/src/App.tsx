import logo from './logo.svg';
import './App.css';
import {
  getBrowserLocale,
  IntlayerClientProvider,
  useIntlayer,
} from 'react-intlayer';

function App() {
  const locale = getBrowserLocale();
  const content = useIntlayer('app', locale);

  return (
    <IntlayerClientProvider locale={locale}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          {/* <p>{[content.getStarted] as ReactNode}</p> */}
          <a
            className="App-link"
            href={content.reactLink.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.reactLink.content}
          </a>
        </header>
      </div>
    </IntlayerClientProvider>
  );
}

export default App;
