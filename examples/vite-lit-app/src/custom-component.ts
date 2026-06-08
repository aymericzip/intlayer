import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('custom-component')
export class CustomComponent extends LitElement {
  @property({ type: String })
  name = 'Custom Component';

  static override styles = css`
    :host {
      display: inline-block;
      padding: 4px 8px;
      background: #f0f0f0;
      border: 1px solid #ccc;
      border-radius: 4px;
      color: #333;
      font-weight: bold;
    }
  `;

  override render() {
    return html`<span>[${this.name}]</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'custom-component': CustomComponent;
  }
}
