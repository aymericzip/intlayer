import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import {
  getGlobalEditorManager,
  onGlobalEditorManagerChange,
} from '../core/globalManager';
import { initEditorClient, stopEditorClient } from '../core/initEditorClient';

const _HTMLElement =
  typeof HTMLElement !== 'undefined'
    ? HTMLElement
    : (class {} as unknown as typeof HTMLElement);

/**
 * <intlayer-editor>
 *
 * A framework-agnostic web component that manages the Intlayer editor singleton
 * lifecycle and keeps the current locale in sync with the EditorStateManager.
 *
 * Drop this element once at the root of your application to activate the editor.
 * It renders no UI.
 *
 * @prop {IntlayerConfig} configuration  - The Intlayer config (required; set as JS property, not attribute)
 * @prop {string}         locale         - The active application locale (attribute/property)
 *
 * @example
 * // Svelte
 * <intlayer-editor .configuration={config} locale={$locale} />
 *
 * // Vue
 * <intlayer-editor :configuration="config" :locale="currentLocale" />
 */
export class IntlayerEditorElement extends _HTMLElement {
  private _configuration: IntlayerConfig | undefined = undefined;
  private _locale: string | undefined = undefined;
  private _initialized = false;
  private _unsubManager: (() => void) | null = null;

  static get observedAttributes(): string[] {
    return ['locale'];
  }

  get configuration(): IntlayerConfig | undefined {
    return this._configuration;
  }
  set configuration(v: IntlayerConfig | undefined) {
    this._configuration = v;
    if (!this._initialized) this._init();
  }

  get locale(): string | undefined {
    return this._locale;
  }
  set locale(v: string | undefined) {
    this._locale = v;
    if (v && this._initialized) this._syncLocale(v);
  }

  attributeChangedCallback(
    name: string,
    _oldVal: string | null,
    newVal: string | null
  ): void {
    if (name === 'locale' && newVal !== null) {
      this._locale = newVal;
      if (this._initialized) this._syncLocale(newVal);
    }
  }

  connectedCallback(): void {
    this._init();
  }

  disconnectedCallback(): void {
    this._unsubManager?.();
    this._unsubManager = null;
    if (this._initialized) {
      stopEditorClient();
      this._initialized = false;
    }
  }

  private _init(): void {
    if (this._initialized) return;
    initEditorClient();
    this._initialized = true;
    if (this._locale) this._syncLocale(this._locale);
  }

  private _syncLocale(locale: string): void {
    const manager = getGlobalEditorManager();
    if (manager) {
      manager.currentLocale.set(locale as Locale);
    } else {
      // Manager may not be ready yet — wait for it
      this._unsubManager?.();
      this._unsubManager = onGlobalEditorManagerChange((m) => {
        if (m) {
          this._unsubManager?.();
          this._unsubManager = null;
          m.currentLocale.set(locale as Locale);
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
