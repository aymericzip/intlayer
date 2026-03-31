import packageJSON from '@intlayer/types/package.json' with { type: 'json' };

export type WindowsWithIntlayer = typeof window & {
  intlayer?: string;
};

/**
 * Sets the version of Intlayer in the window object.
 * This is used for Intlayer detection in the browser.
 */
export const setIntlayerIdentifier = (): void => {
  if (typeof window !== 'undefined') {
    (window as WindowsWithIntlayer).intlayer = packageJSON.version;
  }
};
