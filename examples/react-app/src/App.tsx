import logo from './logo.svg';
import './App.css';
import { IntlayerClientProvider, useIntlayer } from 'react-intlayer';
import { LocaleSwitcher } from './components/LangSwitcherDropDown';

function AppContent() {
  const content = useIntlayer('app');

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </header>
  );
}

function App() {
  return (
    <IntlayerClientProvider>
      <div className="App">
        {/* To use the useIntlayer hook properly, you should access your data in a children component */}
        <AppContent />
      </div>
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </IntlayerClientProvider>
  );
}

export default App;
