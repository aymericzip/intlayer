import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import {
  getGlobalEditorManager,
  onGlobalEditorManagerChange,
} from '../core/globalManager';
import { initEditorClient, stopEditorClient } from '../core/initEditorClient';

/**
 * <intlayer-editor>
 *
 * A framework-agnostic Lit element that manages the Intlayer editor singleton
 * lifecycle and keeps the current locale in sync with the EditorStateManager.
 *
 * Drop this element once at the root of your application to activate the editor.
 * It renders no UI (display: contents, empty shadow root).
 *
 * @prop {IntlayerConfig} configuration  - The Intlayer config (required; set as property, not attribute)
 * @prop {string}         locale         - The active application locale (attribute/property)
 *
 * @example
 * // Svelte
 * <intlayer-editor .configuration={config} locale={$locale} />
 *
 * // Vue
 * <intlayer-editor :configuration="config" :locale="currentLocale" />
 */
export class IntlayerEditorElement extends LitElement {
  /** No visible UI — render nothing into the shadow root */
  createRenderRoot(): this {
    return this;
  }

  @property({ attribute: false }) configuration?: IntlayerConfig;

  @property({ type: String }) locale?: string;

  private _initialized = false;
  private _unsubManager: (() => void) | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this._init();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsubManager?.();
    this._unsubManager = null;

    if (this._initialized) {
      stopEditorClient();
      this._initialized = false;
    }
  }

  updated(changedProperties: Map<string | symbol, unknown>): void {
    if (changedProperties.has('configuration') && !this._initialized) {
      this._init();
    }

    if (changedProperties.has('locale') && this.locale) {
      this._syncLocale(this.locale);
    }
  }

  private _init(): void {
    if (this._initialized) return;

    initEditorClient();

    this._initialized = true;

    // Sync locale immediately after init if it is already set
    if (this.locale) {
      this._syncLocale(this.locale);
    }
  }

  private _syncLocale(locale: string): void {
    const manager = getGlobalEditorManager();

    if (manager) {
      manager.currentLocale.set(locale as Locale);
    } else {
      // Manager may not be ready yet — wait for it
      this._unsubManager?.();
      this._unsubManager = onGlobalEditorManagerChange((manager) => {
        if (manager) {
          this._unsubManager?.();
          this._unsubManager = null;

          manager.currentLocale.set(locale as Locale);
        }
      });
    }
  }
}

export const defineIntlayerEditorElement = (): void => {
  if (typeof customElements === 'undefined') return;

  if (!customElements.get('intlayer-editor')) {
    customElements.define('intlayer-editor', IntlayerEditorElement);
  }
};
