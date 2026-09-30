import { loadPrompts } from './loadPrompts';
import { isInteractiveTerminal } from './utils/isInteractiveTerminal';
import { openBrowser } from './utils/openBrowser';
import { parseChoice } from './utils/parseChoice';

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

/** Browsers the Intlayer extension is published for. */
export type ExtensionBrowser = 'chrome' | 'firefox';

/** Browsers accepted by `intlayer init extension --browser`. */
export const EXTENSION_BROWSERS: ExtensionBrowser[] = ['chrome', 'firefox'];

/** Store page of the Intlayer extension, per browser. */
export const EXTENSION_URL_BY_BROWSER: Record<ExtensionBrowser, string> = {
  chrome: CHROME_EXTENSION_URL,
  firefox: MOZILLA_EXTENSION_URL,
};

/** Validates the `--browser` values, ignoring case. */
export const parseExtensionBrowsers = (values: string[]): ExtensionBrowser[] =>
  values
    .flatMap((value) => value.split(','))
    .filter((value) => value.trim() !== '')
    .map((value) => parseChoice(value, EXTENSION_BROWSERS, '--browser'));

/** Options of {@link initChromeExtension}. */
export type InitChromeExtensionOptions = {
  /** Browsers to open the store page for, skipping the prompt. */
  browsers?: ExtensionBrowser[];
};

/**
 * Opens the store page of the Intlayer browser extension. The browsers are
 * prompted for unless given; without a terminal (AI agents, CI) the store
 * links are only printed, since the install needs a person anyway.
 */
export const initChromeExtension = async (
  options: InitChromeExtensionOptions = {}
) => {
  const p = await loadPrompts();

  if (!options.browsers && !isInteractiveTerminal()) {
    p.log.info(
      `Install the Intlayer browser extension:\n${BROWSER_EXTENSION_OPTIONS.map(
        ({ label, value }) => `  ${label}: ${value}`
      ).join('\n')}`
    );
    return;
  }

  const selectedUrls = options.browsers
    ? options.browsers.map((browser) => EXTENSION_URL_BY_BROWSER[browser])
    : await p.multiselect({
        message: 'Select browser extension(s) to install:',
        options: BROWSER_EXTENSION_OPTIONS,
        required: false,
      });

  if (p.isCancel(selectedUrls)) {
    return;
  }

  for (const url of selectedUrls) {
    p.log.info(`Opening ${url} in your browser...`);
    openBrowser(url);
  }
};
