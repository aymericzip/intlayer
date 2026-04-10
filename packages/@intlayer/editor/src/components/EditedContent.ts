import { getBasePlugins, getContent } from '@intlayer/core/interpreter';
import type { KeyPath } from '@intlayer/types/keyPath';
import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { EditorStateManager } from '../core/EditorStateManager';
import {
  getGlobalEditorManager,
  onGlobalEditorManagerChange,
} from '../core/globalManager';

/**
 * <intlayer-edited-content>
 *
 * Framework-agnostic Lit element that displays edited content from the Intlayer
 * editor. When the editor has an edited value for the given dictionary key and
 * key path, it renders the edited value; otherwise it renders the original
 * content via a slot.
 *
 * Always wraps content in <intlayer-content-selector-wrapper> for selection UI.
 *
 * @attr {string} dictionary-key  - The dictionary key owning this content node
 * @attr {string} key-path        - JSON-serialized KeyPath[] for this content node
 * @attr {string} locale          - The current locale string
 */
export class IntlayerEditedContentElement extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }
  `;

  @property({ type: String, attribute: 'dictionary-key' }) dictionaryKey = '';
  @property({ type: String, attribute: 'key-path' }) keyPathJson = '[]';
  @property({ type: String, attribute: 'locale' }) locale = '';

  @state() private _editedText: string | null = null;

  private _unsubManager: (() => void) | null = null;
  private _unsubEditedContent: (() => void) | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this._subscribeToManager();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._teardown();
  }

  private _teardown(): void {
    this._unsubManager?.();
    this._unsubEditedContent?.();
    this._unsubManager = null;
    this._unsubEditedContent = null;
  }

  private _getKeyPath(): KeyPath[] {
    try {
      return JSON.parse(this.keyPathJson);
    } catch {
      return [];
    }
  }

  private _resolveEditedText(manager: EditorStateManager): void {
    const keyPath = this._getKeyPath();
    const editedValue = manager.getContentValue(this.dictionaryKey, keyPath);

    if (editedValue === undefined || editedValue === null) {
      this._editedText = null;
      return;
    }

    if (typeof editedValue === 'string' || typeof editedValue === 'number') {
      this._editedText = String(editedValue);
      return;
    }

    if (typeof editedValue === 'object') {
      const locale = this.locale || undefined;
      const transformed = getContent(
        editedValue,
        {
          locale: locale as any,
          dictionaryKey: this.dictionaryKey,
          keyPath,
        },
        getBasePlugins(locale)
      );
      if (typeof transformed === 'string' || typeof transformed === 'number') {
        this._editedText = String(transformed);
      } else {
        console.error(
          `[intlayer-edited-content] Incorrect edited content format. Expected string. Value: ${JSON.stringify(transformed)}`
        );
        this._editedText = null;
      }
      return;
    }

    this._editedText = null;
  }

  private _setupManagerSubscriptions(manager: EditorStateManager): void {
    this._resolveEditedText(manager);

    const handleChange = () => this._resolveEditedText(manager);
    manager.editedContent.addEventListener('change', handleChange);

    this._unsubEditedContent = () =>
      manager.editedContent.removeEventListener('change', handleChange);
  }

  private _subscribeToManager(): void {
    const manager = getGlobalEditorManager();
    if (manager) {
      this._setupManagerSubscriptions(manager);
    }

    this._unsubManager = onGlobalEditorManagerChange((m) => {
      this._unsubEditedContent?.();
      this._unsubEditedContent = null;
      if (m) {
        this._setupManagerSubscriptions(m);
      } else {
        this._editedText = null;
      }
    });
  }

  render() {
    return html`
      <intlayer-content-selector-wrapper
        key-path=${this.keyPathJson}
        dictionary-key=${this.dictionaryKey}
      >
        ${this._editedText !== null ? this._editedText : html`<slot></slot>`}
      </intlayer-content-selector-wrapper>
    `;
  }
}

export const defineIntlayerEditedContent = (): void => {
  if (typeof customElements === 'undefined') return;

  if (!customElements.get('intlayer-edited-content')) {
    customElements.define(
      'intlayer-edited-content',
      IntlayerEditedContentElement
    );
  }
};
