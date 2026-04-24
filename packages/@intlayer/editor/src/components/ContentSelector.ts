import { defineIntlayerContentSelectorWrapper } from './ContentSelectorWrapper';
import { defineIntlayerEditedContent } from './EditedContent';
import { defineIntlayerEditorElement } from './IntlayerEditor';

const DEFAULT_PRESS_DURATION = 250;

const STYLES = `
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

/**
 * <intlayer-content-selector>
 *
 * A framework-agnostic web component that wraps content with Intlayer editor
 * selection UI (hover outline, long-press to select, click-outside to deselect).
 *
 * @fires intlayer:press     - Fired after a long press (pressDuration ms). Bubbles.
 * @fires intlayer:hover     - Fired on mouseenter. Bubbles.
 * @fires intlayer:unhover   - Fired on mouseleave / mouseup. Bubbles.
 * @fires intlayer:click-outside - Fired when a click occurs outside the element. Bubbles.
 *
 * @prop {boolean} isSelecting   - Whether this element is currently selected (external state)
 * @prop {number}  pressDuration - Long-press threshold in ms. Default: 250
 */
export class IntlayerContentSelectorElement extends HTMLElement {
  private _isSelecting = false;
  private _pressDuration = DEFAULT_PRESS_DURATION;
  private _isHovered = false;
  private _isSelectingState = false;
  private _wrapper: HTMLSpanElement;
  private _pressTimer: ReturnType<typeof setTimeout> | null = null;
  private _clickOutsideHandler: ((e: MouseEvent) => void) | null = null;

  static get observedAttributes(): string[] {
    return ['is-selecting', 'press-duration'];
  }

  get isSelecting(): boolean {
    return this._isSelecting;
  }
  set isSelecting(v: boolean) {
    this._isSelecting = v;
    this._updateActiveState();
  }

  get pressDuration(): number {
    return this._pressDuration;
  }
  set pressDuration(v: number) {
    this._pressDuration = v;
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = STYLES;
    shadow.appendChild(style);

    const wrapper = document.createElement('span');
    wrapper.className = 'wrapper';
    wrapper.setAttribute('role', 'button');
    wrapper.setAttribute('tabindex', '0');
    wrapper.appendChild(document.createElement('slot'));
    shadow.appendChild(wrapper);
    this._wrapper = wrapper;

    wrapper.addEventListener('mousedown', () => this._handleMouseDown());
    wrapper.addEventListener('mouseup', () => this._handleMouseUpOrLeave());
    wrapper.addEventListener('mouseleave', () => this._handleMouseUpOrLeave());
    wrapper.addEventListener('mouseenter', () => this._handleMouseEnter());
    wrapper.addEventListener('click', (e) => this._handleClick(e));
    wrapper.addEventListener('touchstart', () => this._handleMouseDown());
    wrapper.addEventListener('touchend', () => this._handleMouseUpOrLeave());
    wrapper.addEventListener('touchcancel', () => this._handleMouseUpOrLeave());
    wrapper.addEventListener('blur', () => this._handleBlur());
  }

  attributeChangedCallback(
    name: string,
    _oldVal: string | null,
    newVal: string | null
  ): void {
    if (name === 'is-selecting') {
      this._isSelecting = newVal !== null;
      this._updateActiveState();
    } else if (name === 'press-duration') {
      this._pressDuration =
        newVal !== null ? parseInt(newVal, 10) : DEFAULT_PRESS_DURATION;
    }
  }

  connectedCallback(): void {
    this._clickOutsideHandler = (e: MouseEvent) => {
      // composedPath() pierces shadow boundaries
      if (!e.composedPath().includes(this)) {
        this._isSelectingState = false;
        this._dispatch('intlayer:click-outside');
        this._updateActiveState();
      }
    };
    document.addEventListener('mousedown', this._clickOutsideHandler);
  }

  disconnectedCallback(): void {
    if (this._clickOutsideHandler) {
      document.removeEventListener('mousedown', this._clickOutsideHandler);
      this._clickOutsideHandler = null;
    }
    this._clearPressTimer();
  }

  private _updateActiveState(): void {
    const isActive =
      this._isSelecting || this._isSelectingState || this._isHovered;
    if (isActive) {
      this._wrapper.setAttribute('data-active', '');
    } else {
      this._wrapper.removeAttribute('data-active');
    }
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
      this._updateActiveState();
      this._dispatch('intlayer:press');
    }, this._pressDuration);
  }

  private _handleMouseEnter(): void {
    this._isHovered = true;
    this._updateActiveState();
    this._dispatch('intlayer:hover');
  }

  private _handleMouseUpOrLeave(): void {
    if (this._isHovered) {
      this._isHovered = false;
      this._dispatch('intlayer:unhover');
    }
    this._clearPressTimer();
    this._updateActiveState();
  }

  private _handleClick(e: MouseEvent): void {
    if (this._isSelecting || this._isSelectingState) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  private _handleBlur(): void {
    this._isSelectingState = false;
    this._updateActiveState();
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
