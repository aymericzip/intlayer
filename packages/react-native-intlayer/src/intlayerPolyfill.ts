export const intlayerPolyfill = () => {
  if (typeof global.structuredClone !== 'function') {
    global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
    window.addEventListener = () => null;
    window.removeEventListener = () => null;
    window.postMessage = () => null;
  }
};
