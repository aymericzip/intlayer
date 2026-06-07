import { IntlayerContentSelectorElement } from './ContentSelector';
import { defineIntlayerContentSelectorWrapper } from './ContentSelectorWrapper';
import { defineIntlayerEditedContent } from './EditedContent';
import { IntlayerEditorElement } from './IntlayerEditorElement';

export const defineIntlayerEditorElement = (): void => {
  if (typeof customElements === 'undefined') return;
  if (!customElements.get('intlayer-editor')) {
    customElements.define('intlayer-editor', IntlayerEditorElement);
  }
};

/**
 * Register all Intlayer custom elements.
 * Call this once at application startup (inside IntlayerEditorProvider or similar).
 * Safe to call multiple times — only registers elements that are not yet defined.
 */
export const defineIntlayerElements = (): void => {
  if (typeof customElements === 'undefined') return;
  if (!customElements.get('intlayer-content-selector')) {
    customElements.define(
      'intlayer-content-selector',
      IntlayerContentSelectorElement
    );
  }
  defineIntlayerContentSelectorWrapper();
  defineIntlayerEditedContent();
  defineIntlayerEditorElement();
};
