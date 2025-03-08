export const intlayerPolyfill = () => {
  export const intlayerPolyfill = () => {
    if (typeof global.structuredClone !== 'function') {
      global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
    }

    if (typeof window !== 'undefined') {
      if (typeof window.addEventListener !== 'function') {
        window.addEventListener = () => null;
      }
      if (typeof window.removeEventListener !== 'function') {
        window.removeEventListener = () => null;
      }
      if (typeof window.postMessage !== 'function') {
        window.postMessage = () => null;
      }
    }
  };

  intlayerPolyfill();
};
