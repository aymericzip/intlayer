import { installIntlayer, installIntlayerMarkdown } from 'lit-intlayer';

// Install the Intlayer singleton before any elements are connected.
// Reads the default locale from intlayer.config.ts at build time.
installIntlayer();

// Install the markdown renderer with default options.
// Components rendered via <intlayer-markdown-renderer> will use this.
installIntlayerMarkdown();

// Import and register all custom elements.
import './my-element.js';
import './locale-switcher.js';
