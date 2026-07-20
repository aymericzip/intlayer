import { intlayerPolyfill } from './intlayerPolyfill';

/**
 * Side-effect module that installs the React Native polyfills as soon as it is
 * imported.
 *
 * It exists so the polyfills can be applied *before* `react-intlayer` (and its
 * transitive dependencies) are evaluated. ES module imports are hoisted, so a
 * top-level `intlayerPolyfill()` call inside a module that also imports
 * `react-intlayer` would run too late: the dependency's module scope is
 * executed first, and any module-scope access to `window.location` there
 * crashes with `Cannot read property 'href' of undefined` before a single
 * component renders.
 *
 * Import this module with a bare `import './applyIntlayerPolyfill';` placed
 * above every other import.
 */
intlayerPolyfill();
