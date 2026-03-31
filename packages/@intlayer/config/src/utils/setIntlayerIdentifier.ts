type Meta = {
  enabled: true;
};

export type WindowsWithIntlayer = typeof window & {
  intlayer?: Meta;
};

/**
 * Sets the version of Intlayer in the window object.
 * This is used for Intlayer detection in the browser.
 */
export const setIntlayerIdentifier = (): void => {
  if (typeof window !== 'undefined') {
    (window as WindowsWithIntlayer).intlayer = {
      enabled: true,
    };
  }
};
