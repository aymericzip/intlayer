import './App.css';
import { useIntlayer } from 'react-intlayer';
import { LocaleSwitcher } from './components/LangSwitcherDropDown';
import logo from './logo.svg';
import { LocaleRouter } from './Router';

const AppContent = () => {
  const content = useIntlayer('app');

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </header>
  );
};

const App = () => (
  <LocaleRouter>
    <div className="App">
      {/* To use the useIntlayer hook properly, you should access your data in a children component */}
      <AppContent />
    </div>
    <div className="absolute bottom-5 right-5 z-50">
      <LocaleSwitcher />
    </div>
  </LocaleRouter>
);

export default App;
