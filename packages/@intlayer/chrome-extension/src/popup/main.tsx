import { ThemeProvider } from '@intlayer/design-system/providers';
import { getBrowserLocale } from 'intlayer';
import { render } from 'preact';
import { IntlayerProvider } from 'preact-intlayer';
import { App } from './App';
import './popup.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  render(
    // A locale picked in the popup is persisted and wins over the browser one.
    <IntlayerProvider defaultLocale={getBrowserLocale()}>
      <ThemeProvider hasBootstrapScript={false}>
        <App />
      </ThemeProvider>
    </IntlayerProvider>,
    rootElement
  );
}
