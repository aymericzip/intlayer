import { getLocaleName } from 'intlayer';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { useLocale } from 'lit-intlayer';

/**
 * `<locale-switcher>` — dropdown to switch the application locale.
 *
 * Uses `useLocale` ReactiveController so the element re-renders whenever
 * the locale changes anywhere in the app.
 */
@customElement('locale-switcher')
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select
        aria-label="Language"
        @change=${this._onChange}
      >
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }

  static override styles = css`
    :host {
      display: inline-block;
    }

    select {
      font: inherit;
      font-size: 14px;
      padding: 4px 8px;
      border-radius: 6px;
      border: 1px solid var(--border, #e5e4e7);
      background: transparent;
      color: inherit;
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'locale-switcher': LocaleSwitcher;
  }
}
