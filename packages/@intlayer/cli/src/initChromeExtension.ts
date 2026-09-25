import { loadPrompts } from './loadPrompts';
import { openBrowser } from './utils/openBrowser';

export const CHROME_EXTENSION_URL =
  'https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc';

export const MOZILLA_EXTENSION_URL =
  'https://addons.mozilla.org/en-US/firefox/addon/intlayer-i18n-scanner/';

export const BROWSER_EXTENSION_OPTIONS = [
  {
    value: CHROME_EXTENSION_URL,
    label: 'Chrome',
    hint: CHROME_EXTENSION_URL,
  },
  {
    value: MOZILLA_EXTENSION_URL,
    label: 'Mozilla Firefox',
    hint: MOZILLA_EXTENSION_URL,
  },
];

export const initChromeExtension = async () => {
  const p = await loadPrompts();

  const selectedUrls = await p.multiselect({
    message: 'Select browser extension(s) to install:',
    options: BROWSER_EXTENSION_OPTIONS,
    required: false,
  });

  if (p.isCancel(selectedUrls)) {
    return;
  }

  if (Array.isArray(selectedUrls) && selectedUrls.length > 0) {
    for (const url of selectedUrls) {
      p.log.info(`Opening ${url} in your browser...`);
      openBrowser(url);
    }
  }
};
