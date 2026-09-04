import { getLocaleName, getLocalizedUrl, type LocalesValues } from 'intlayer';
import { html, LitElement } from 'lit';
import { installIntlayer, useIntlayer, useLocale } from 'lit-intlayer';

class LitDemo extends LitElement {
  static properties = {
    locale: { type: String },
    _count: { state: true },
  };

  locale: LocalesValues = 'en' as LocalesValues;
  _count = 0;

  private _content = useIntlayer('lit-demo').observe(this);
  private _localeCtrl = useLocale(this, {
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  constructor() {
    super();
    // Initialize intlayer with the locale once it's available
    // Note: Lit might set the property after the constructor
  }

  override connectedCallback() {
    super.connectedCallback();
    installIntlayer({ locale: this.locale as any });
  }

  override render() {
    const { greeting, description, counter, increment } = this._content;
    const {
      locale: currentLocale,
      availableLocales,
      setLocale,
    } = this._localeCtrl;

    return html`
      <div class="demo-container">
        <h2 class="greeting">${greeting}</h2>
        <p class="description">${description}</p>
        <div class="counter-section">
          <p class="counter-text">${counter({ count: this._count })}</p>
          <button class="btn-primary" @click=${() => this._count++}>
            ${increment}
          </button>
        </div>
        <div class="locale-switcher">
          <span class="switcher-label">Switch locale:</span>
          <div class="locale-buttons">
            ${availableLocales.map(
              (localeItem) => html`
                <button
                  class="locale-btn ${
                    localeItem === currentLocale ? 'active' : ''
                  }"
                  @click=${() => {
                    setLocale(localeItem);
                  }}
                >
                  <div class="ls-item-left">
                    <span class="ls-own-name"
                      >${getLocaleName(localeItem)}</span
                    >
                    <span class="ls-current-name"
                      >${getLocaleName(localeItem, currentLocale)}</span
                    >
                  </div>
                  <span class="ls-code">${localeItem.toUpperCase()}</span>
                </button>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('lit-demo', LitDemo);

declare global {
  interface HTMLElementTagNameMap {
    'lit-demo': LitDemo;
  }
}
