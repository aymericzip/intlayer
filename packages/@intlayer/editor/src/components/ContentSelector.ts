import { css, html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { defineIntlayerContentSelectorWrapper } from './ContentSelectorWrapper';
import { defineIntlayerEditedContent } from './EditedContent';
import { defineIntlayerEditorElement } from './IntlayerEditor';

const DEFAULT_PRESS_DURATION = 250;

/**
 * <intlayer-content-selector>
 *
 * A framework-agnostic web component that wraps content with Intlayer editor
 * selection UI (hover outline, long-press to select, click-outside to deselect).
 *
 * Replaces the per-framework ContentSelector components (React, Svelte, Vue, Solid).
 *
 * @fires intlayer:press     - Fired after a long press (pressDuration ms). Bubbles.
 * @fires intlayer:hover     - Fired on mouseenter. Bubbles.
 * @fires intlayer:unhover   - Fired on mouseleave / mouseup. Bubbles.
 * @fires intlayer:click-outside - Fired when a click occurs outside the element. Bubbles.
 *
 * @prop {boolean} isSelecting   - Whether this element is currently selected (external state)
 * @prop {number}  pressDuration - Long-press threshold in ms. Default: 250
 */
export class IntlayerContentSelectorElement extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }

    .wrapper {
      display: inline-block;
      cursor: pointer;
      user-select: none;
      border-radius: 0.375rem;
      outline-width: 2px;
      outline-offset: 4px;
      outline-style: solid;
      outline-color: transparent;
      transition: all 100ms 50ms ease-in-out;
    }

    .wrapper[data-active] {
      outline-color: inherit;
    }
  `;

  @property({ type: Boolean, attribute: 'is-selecting' })
  isSelecting = false;

  @property({ type: Number, attribute: 'press-duration' })
  pressDuration = DEFAULT_PRESS_DURATION;

  @state() private _isHovered = false;
  @state() private _isSelectingState = false;

  @query('.wrapper') private _wrapper!: HTMLSpanElement;

  private _pressTimer: ReturnType<typeof setTimeout> | null = null;
  private _clickOutsideHandler: ((e: MouseEvent) => void) | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this._clickOutsideHandler = (e: MouseEvent) => {
      // composedPath() pierces shadow boundaries
      if (!e.composedPath().includes(this)) {
        this._isSelectingState = false;
        this._dispatch('intlayer:click-outside');
      }
    };
    document.addEventListener('mousedown', this._clickOutsideHandler);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._clickOutsideHandler) {
      document.removeEventListener('mousedown', this._clickOutsideHandler);
      this._clickOutsideHandler = null;
    }
    this._clearPressTimer();
  }

  private _clearPressTimer(): void {
    if (this._pressTimer !== null) {
      clearTimeout(this._pressTimer);
      this._pressTimer = null;
    }
  }

  private _dispatch(eventName: string): void {
    this.dispatchEvent(
      new CustomEvent(eventName, { bubbles: true, composed: true })
    );
  }

  private _handleMouseDown(): void {
    this._clearPressTimer();
    this._pressTimer = setTimeout(() => {
      this._isSelectingState = true;
      this._dispatch('intlayer:press');
    }, this.pressDuration);
  }

  private _handleMouseEnter(): void {
    this._isHovered = true;
    this._dispatch('intlayer:hover');
  }

  private _handleMouseUpOrLeave(): void {
    if (this._isHovered) {
      this._isHovered = false;
      this._dispatch('intlayer:unhover');
    }
    this._clearPressTimer();
  }

  private _handleClick(e: MouseEvent): void {
    if (this.isSelecting || this._isSelectingState) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  private _handleBlur(): void {
    this._isSelectingState = false;
  }

  render() {
    const isActive =
      this.isSelecting || this._isSelectingState || this._isHovered;
    return html`
      <span
        class="wrapper"
        ?data-active=${isActive}
        role="button"
        tabindex="0"
        @mousedown=${this._handleMouseDown}
        @mouseup=${this._handleMouseUpOrLeave}
        @mouseleave=${this._handleMouseUpOrLeave}
        @mouseenter=${this._handleMouseEnter}
        @click=${this._handleClick}
        @touchstart=${this._handleMouseDown}
        @touchend=${this._handleMouseUpOrLeave}
        @touchcancel=${this._handleMouseUpOrLeave}
        @blur=${this._handleBlur}
        @keyup=${() => {}}
      >
        <slot></slot>
      </span>
    `;
  }
}

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
