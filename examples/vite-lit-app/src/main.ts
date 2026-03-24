import { installIntlayer } from 'lit-intlayer';
import { installIntlayerMarkdown } from 'lit-intlayer/markdown';

// Install the Intlayer singleton before any elements are connected.
// Reads the default locale from intlayer.config.ts at build time.
installIntlayer();

// Install the markdown renderer with default options.
// Components rendered via <intlayer-markdown-renderer> will use this.
installIntlayerMarkdown({
  renderMarkdown: async (md) => {
    const { compileMarkdown } = await import('lit-intlayer/markdown');
    return compileMarkdown(md);
  },
});

// Import and register all custom elements.
import './my-element.js';
import './locale-switcher.js';
