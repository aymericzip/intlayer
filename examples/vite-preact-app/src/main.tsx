import { render } from 'preact';
import { IntlayerProvider } from 'preact-intlayer';
import { App } from './app.tsx';
import './index.css';

render(
  <IntlayerProvider>
    <App />
  </IntlayerProvider>,
  document.getElementById('app')!
);
