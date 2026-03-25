import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { useIntlayer } from 'lit-intlayer';
import {
  useCompact,
  useCurrency,
  useDate,
  useIntl,
  useList,
  useNumber,
  usePercentage,
  useRelativeTime,
  useUnit,
} from 'lit-intlayer/format';
import heroImg from './assets/hero.png';
import litLogo from './assets/lit.svg';
import viteLogo from './assets/vite.svg';

/**
 * Root demo element for the Vite + Lit + Intlayer example.
 *
 * Demonstrates:
 * - `useIntlayer` ReactiveController for reactive translations
 * - `insert()` template strings (countIs)
 * - `md()` markdown content rendered via compileMarkdown + unsafeHTML
 * - Locale switching via the `<locale-switcher>` element
 */
@customElement('my-element')
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;

  // useIntlayer adds itself as a ReactiveController — the element
  // automatically re-renders when the locale changes
  private content = useIntlayer('app').observe(this);

  private _onClick() {
    this.count++;
  }

  private number = useNumber(this);
  private percentage = usePercentage(this);
  private currency = useCurrency(this);
  private date = useDate(this);
  private relativeTime = useRelativeTime(this);
  private unit = useUnit(this);
  private compact = useCompact(this);
  private list = useList(this);
  private intl = useIntl(this);

  private get formattedCurrency() {
    return new this.intl.value.NumberFormat({
      style: 'currency',
      currency: 'USD',
    }).format(12345.67);
  }

  private now = new Date();
  private in3Days = new Date(this.now.getTime() + 3 * 864e5);

  override render() {
    const { content } = this;

    return html`
      <section id="center">
        <div class="hero">
          <img src=${heroImg} class="base" width="170" height="179" alt="" />
          <img src=${litLogo} class="framework" alt=${content.litLogoLabel.value} />
          <img src=${viteLogo} class="vite" alt=${content.viteLogoLabel.value} />
        </div>

        <div>
          <locale-switcher></locale-switcher>
          <slot></slot>
        </div>

        <div
          style="display: flex; flex-direction: column; gap: 10px; margin: 20px; padding: 20px; border: 1px solid var(--border); border-radius: 8px; text-align: left;"
        >
          <h2>Formatters</h2>
          <p>Number: ${this.number.value(123456.789)}</p>
          <p>Percentage: ${this.percentage.value(0.25)}</p>
          <p>Currency: ${this.currency.value(1234.5, { currency: 'EUR' })}</p>
          <p>Date: ${this.date.value(this.now, 'short')}</p>
          <p>Relative Time: ${this.relativeTime.value(this.now, this.in3Days, {
            unit: 'day',
          })}</p>
          <p>Unit: ${this.unit.value(5, {
            unit: 'kilometer',
            unitDisplay: 'long',
          })}</p>
          <p>Compact: ${this.compact.value(1200)}</p>
          <p>List: ${this.list.value(['apple', 'banana', 'orange'])}</p>
          <p>Intl (Manual): ${this.formattedCurrency}</p>
        </div>

        <h1>${content.title}</h1>

        <button class="counter" @click=${this._onClick} part="button">
          ${content.countIs({ count: this.count })}
        </button>

        <div class="enumeration">
          <p>${content.enumeration({ count: this.count })(this.count)}</p>
        </div>

        <div class="html-content">
          ${content.htmlContent}
        </div>

        <div class="edit-note">
          ${content.editNote}
        </div>
      </section>

      <div class="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg class="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>${content.documentation}</h2>
          <p>${content.yourQuestionsAnswered}</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img class="logo" src=${viteLogo} alt="" />
                ${content.exploreVite}
              </a>
            </li>
            <li>
              <a href="https://lit.dev/" target="_blank">
                <img class="button-icon" src=${litLogo} alt="" />
                ${content.learnMore}
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg class="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>${content.connectWithUs}</h2>
          <p>${content.joinCommunity}</p>
          <ul>
            <li>
              <a href="https://github.com/lit/lit" target="_blank">
                <svg class="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://discord.gg/buildWithLit" target="_blank">
                <svg class="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div class="ticks"></div>
      <section id="spacer"></section>

      <footer class="read-the-docs">
        ${content.readTheDocs}
      </footer>
    `;
  }

  static override styles = css`
    :host {
      --text: #6b6375;
      --text-h: #08060d;
      --bg: #fff;
      --border: #e5e4e7;
      --code-bg: #f4f3ec;
      --accent: #aa3bff;
      --accent-bg: rgba(170, 59, 255, 0.1);
      --accent-border: rgba(170, 59, 255, 0.5);
      --social-bg: rgba(244, 243, 236, 0.5);
      --shadow:
        rgba(0, 0, 0, 0.1) 0 10px 15px -3px,
        rgba(0, 0, 0, 0.05) 0 4px 6px -2px;

      --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
      --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
      --mono: ui-monospace, Consolas, monospace;

      font: 18px/145% var(--sans);
      letter-spacing: 0.18px;

      width: 1126px;
      max-width: 100%;
      margin: 0 auto;
      text-align: center;
      border-inline: 1px solid var(--border);
      min-height: 100svh;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      color: var(--text);
    }

    @media (prefers-color-scheme: dark) {
      :host {
        --text: #9ca3af;
        --text-h: #f3f4f6;
        --bg: #16171d;
        --border: #2e303a;
        --code-bg: #1f2028;
        --accent: #c084fc;
        --accent-bg: rgba(192, 132, 252, 0.15);
        --accent-border: rgba(192, 132, 252, 0.5);
        --social-bg: rgba(47, 48, 58, 0.5);
        --shadow:
          rgba(0, 0, 0, 0.4) 0 10px 15px -3px,
          rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
      }

      #social .button-icon {
        filter: invert(1) brightness(2);
      }
    }

    h1,
    h2,
    ::slotted(h1),
    ::slotted(h2) {
      font-family: var(--heading);
      font-weight: 500;
      color: var(--text-h);
    }

    h1,
    ::slotted(h1) {
      font-size: 56px;
      letter-spacing: -1.68px;
      margin: 32px 0;
    }

    h2 {
      font-size: 24px;
      line-height: 118%;
      letter-spacing: -0.24px;
      margin: 0 0 8px;
    }

    p {
      margin: 0;
    }

    code {
      font-family: var(--mono);
      font-size: 15px;
      line-height: 135%;
      display: inline-flex;
      padding: 4px 8px;
      border-radius: 4px;
      color: var(--text-h);
      background: var(--code-bg);
    }

    .counter {
      font-family: var(--mono);
      font-size: 16px;
      display: inline-flex;
      padding: 5px 10px;
      border-radius: 5px;
      color: var(--accent);
      background: var(--accent-bg);
      border: 2px solid transparent;
      transition: border-color 0.3s;
      margin-bottom: 24px;
      cursor: pointer;
    }

    .counter:hover {
      border-color: var(--accent-border);
    }

    .counter:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }

    .edit-note {
      font-size: 0.95em;
      color: var(--text);
    }

    .edit-note code {
      font-size: 14px;
    }

    .read-the-docs {
      padding: 16px;
      font-size: 0.9em;
      border-top: 1px solid var(--border);
    }

    .hero {
      position: relative;
    }

    .hero .base,
    .hero .framework,
    .hero .vite {
      inset-inline: 0;
      margin: 0 auto;
    }

    .hero .base {
      width: 170px;
      position: relative;
      z-index: 0;
    }

    .hero .framework,
    .hero .vite {
      position: absolute;
    }

    .hero .framework {
      z-index: 1;
      top: 34px;
      height: 28px;
      transform: perspective(2000px) rotateZ(300deg) rotateX(44deg)
        rotateY(39deg) scale(1.4);
    }

    .hero .vite {
      z-index: 0;
      top: 107px;
      height: 26px;
      width: auto;
      color: var(--vite-logo);
      transform: perspective(2000px) rotateZ(300deg) rotateX(40deg)
        rotateY(39deg) scale(0.8);
    }

    #center {
      display: flex;
      flex-direction: column;
      gap: 25px;
      place-content: center;
      place-items: center;
      flex-grow: 1;
    }

    #next-steps {
      display: flex;
      border-top: 1px solid var(--border);
      text-align: left;
    }

    #next-steps > div {
      flex: 1 1 0;
      padding: 32px;
    }

    #next-steps .icon {
      margin-bottom: 16px;
      width: 22px;
      height: 22px;
    }

    #docs {
      border-right: 1px solid var(--border);
    }

    #next-steps ul {
      list-style: none;
      padding: 0;
      display: flex;
      gap: 8px;
      margin: 32px 0 0;
    }

    #next-steps ul .logo {
      height: 18px;
    }

    #next-steps ul a {
      color: var(--text-h);
      font-size: 16px;
      border-radius: 6px;
      background: var(--social-bg);
      display: flex;
      padding: 6px 12px;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      transition: box-shadow 0.3s;
    }

    #next-steps ul a:hover {
      box-shadow: var(--shadow);
    }

    #next-steps ul .button-icon {
      height: 18px;
      width: 18px;
    }

    #spacer {
      height: 88px;
      border-top: 1px solid var(--border);
    }

    .ticks {
      position: relative;
      width: 100%;
    }

    .ticks::before,
    .ticks::after {
      content: '';
      position: absolute;
      top: -4.5px;
      border: 5px solid transparent;
    }

    .ticks::before {
      left: 0;
      border-left-color: var(--border);
    }

    .ticks::after {
      right: 0;
      border-right-color: var(--border);
    }

    @media (max-width: 1024px) {
      :host {
        font-size: 16px;
        width: 100%;
        max-width: 100%;
      }

      h1,
      ::slotted(h1) {
        font-size: 36px;
        margin: 20px 0;
      }

      h2,
      ::slotted(h2) {
        font-size: 20px;
      }

      #center {
        padding: 32px 20px 24px;
        gap: 18px;
      }

      #next-steps {
        flex-direction: column;
        text-align: center;
      }

      #next-steps > div {
        padding: 24px 20px;
      }

      #docs {
        border-right: none;
        border-bottom: 1px solid var(--border);
      }

      #next-steps ul {
        margin-top: 20px;
        flex-wrap: wrap;
        justify-content: center;
      }

      #next-steps ul li {
        flex: 1 1 calc(50% - 8px);
      }

      #next-steps ul a {
        width: 100%;
        justify-content: center;
        box-sizing: border-box;
      }

      #spacer {
        height: 48px;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
