import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  BROWSER_EXTENSION_OPTIONS,
  CHROME_EXTENSION_URL,
  initChromeExtension,
  MOZILLA_EXTENSION_URL,
} from './initChromeExtension';

const openBrowserMock = vi.fn();
const multiselectMock = vi.fn();
const logInfoMock = vi.fn();

vi.mock('./utils/openBrowser', () => ({
  openBrowser: (...args: any[]) => openBrowserMock(...args),
}));

vi.mock('./loadPrompts', () => ({
  loadPrompts: async () => ({
    multiselect: multiselectMock,
    isCancel: (val: any) => typeof val === 'symbol' || val === null,
    log: {
      info: logInfoMock,
    },
  }),
}));

describe('initChromeExtension', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('provides correct extension options and URLs', () => {
    expect(CHROME_EXTENSION_URL).toBe(
      'https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc'
    );
    expect(MOZILLA_EXTENSION_URL).toBe(
      'https://addons.mozilla.org/en-US/firefox/addon/intlayer-i18n-scanner/'
    );
    expect(BROWSER_EXTENSION_OPTIONS).toEqual([
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
    ]);
  });

  it('opens selected browser URLs when chosen', async () => {
    multiselectMock.mockResolvedValueOnce([
      CHROME_EXTENSION_URL,
      MOZILLA_EXTENSION_URL,
    ]);

    await initChromeExtension();

    expect(openBrowserMock).toHaveBeenCalledTimes(2);
    expect(openBrowserMock).toHaveBeenCalledWith(CHROME_EXTENSION_URL);
    expect(openBrowserMock).toHaveBeenCalledWith(MOZILLA_EXTENSION_URL);
  });

  it('does nothing when cancelled', async () => {
    multiselectMock.mockResolvedValueOnce(null);

    await initChromeExtension();

    expect(openBrowserMock).not.toHaveBeenCalled();
  });

  it('does nothing when empty selection', async () => {
    multiselectMock.mockResolvedValueOnce([]);

    await initChromeExtension();

    expect(openBrowserMock).not.toHaveBeenCalled();
  });
});
