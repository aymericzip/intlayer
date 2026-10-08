import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { isSelectionClick } from '../core/selectionClick';
import { defineIntlayerElements } from './ContentSelector';

// The real module graph loads esbuild, which cannot run under jsdom
vi.mock('@intlayer/core/utils', () => ({ isSameKeyPath: () => false }));

/**
 * Renders `markup` in the document; its `intlayer-content-selector` elements
 * record their presses.
 */
const renderContent = (markup: string) => {
  document.body.innerHTML = markup;
  const pressedSelectors: Element[] = [];

  document.body.addEventListener('intlayer:press', (event) => {
    pressedSelectors.push(event.target as Element);
  });

  return pressedSelectors;
};

/** Clicks `target`, reporting whether the click reached the document. */
const click = (target: Element, init: MouseEventInit = {}) => {
  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    composed: true,
    ...init,
  });
  let hasReachedDocument = false;
  const listener = () => {
    hasReachedDocument = true;
  };

  document.addEventListener('click', listener);
  target.dispatchEvent(event);
  document.removeEventListener('click', listener);

  return { event, hasReachedDocument };
};

const getElement = (selector: string) =>
  document.querySelector(selector) as HTMLElement;

describe('intlayer-content-selector click selection', () => {
  beforeAll(() => {
    defineIntlayerElements();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('selects plain content on a click, leaving it to the app', () => {
    const pressedSelectors = renderContent(
      '<intlayer-content-selector><p id="text">Hello</p></intlayer-content-selector>'
    );

    const { event, hasReachedDocument } = click(getElement('#text'));

    expect(pressedSelectors).toHaveLength(1);
    expect(isSelectionClick(event)).toBe(true);
    expect(event.defaultPrevented).toBe(false);
    expect(hasReachedDocument).toBe(true);
  });

  it('keeps the click of a link wrapping the content', () => {
    const pressedSelectors = renderContent(
      '<a href="#next"><intlayer-content-selector><span id="text">Next</span></intlayer-content-selector></a>'
    );

    const { event } = click(getElement('#text'));

    expect(pressedSelectors).toHaveLength(0);
    expect(event.defaultPrevented).toBe(false);
  });

  it('keeps the click of a button inside the content', () => {
    const pressedSelectors = renderContent(
      '<intlayer-content-selector><button id="action" type="button">Go</button></intlayer-content-selector>'
    );
    const onButtonClick = vi.fn();
    getElement('#action').addEventListener('click', onButtonClick);

    click(getElement('#action'));

    expect(onButtonClick).toHaveBeenCalledOnce();
    expect(pressedSelectors).toHaveLength(0);
  });

  it('keeps the click of an ancestor rendered as clickable', () => {
    const pressedSelectors = renderContent(
      '<div style="cursor: pointer"><intlayer-content-selector><span id="text">Card</span></intlayer-content-selector></div>'
    );

    click(getElement('#text'));

    expect(pressedSelectors).toHaveLength(0);
  });

  it.each([
    ['⌘', { metaKey: true }],
    ['Ctrl', { ctrlKey: true }],
  ])(
    'selects a link content on %s + click, cancelling the link',
    (_modifier, modifierInit) => {
      const pressedSelectors = renderContent(
        '<a href="#next"><intlayer-content-selector><span id="text">Next</span></intlayer-content-selector></a>'
      );

      const { event, hasReachedDocument } = click(
        getElement('#text'),
        modifierInit
      );

      expect(pressedSelectors).toHaveLength(1);
      expect(event.defaultPrevented).toBe(true);
      expect(hasReachedDocument).toBe(false);
    }
  );

  it('selects only the innermost content of nested selectors', () => {
    const pressedSelectors = renderContent(
      '<intlayer-content-selector id="outer"><intlayer-content-selector id="inner"><span id="text">Nested</span></intlayer-content-selector></intlayer-content-selector>'
    );

    click(getElement('#text'));

    expect(pressedSelectors.map((selector) => selector.id)).toEqual(['inner']);
  });

  it('focuses an element on long press and deselects on click outside', () => {
    vi.useFakeTimers();
    try {
      const pressedSelectors = renderContent(
        '<intlayer-content-selector id="selector"><span id="text">Long press me</span></intlayer-content-selector>'
      );
      const selector = getElement('#selector');
      const innerWrapper = selector.shadowRoot?.querySelector('.wrapper');
      let clickOutsideFired = false;

      selector.addEventListener('intlayer:click-outside', () => {
        clickOutsideFired = true;
      });

      // Start long press
      innerWrapper?.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true })
      );
      expect(pressedSelectors).toHaveLength(0);

      // Advance timers to trigger long press
      vi.advanceTimersByTime(250);

      expect(pressedSelectors).toHaveLength(1);
      expect(innerWrapper?.hasAttribute('data-active')).toBe(true);

      // Click outside
      document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

      expect(clickOutsideFired).toBe(true);
      expect(innerWrapper?.hasAttribute('data-active')).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });

  it('deselects on touchstart outside', () => {
    vi.useFakeTimers();
    try {
      renderContent(
        '<intlayer-content-selector id="selector"><span id="text">Touch me</span></intlayer-content-selector>'
      );
      const selector = getElement('#selector');
      const innerWrapper = selector.shadowRoot?.querySelector('.wrapper');
      let clickOutsideFired = false;

      selector.addEventListener('intlayer:click-outside', () => {
        clickOutsideFired = true;
      });

      // Start touch long press
      innerWrapper?.dispatchEvent(new Event('touchstart', { bubbles: true }));
      vi.advanceTimersByTime(250);

      expect(innerWrapper?.hasAttribute('data-active')).toBe(true);

      // Touch outside
      document.dispatchEvent(new Event('touchstart', { bubbles: true }));

      expect(clickOutsideFired).toBe(true);
      expect(innerWrapper?.hasAttribute('data-active')).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not deselect when clicking inside the selected element', () => {
    vi.useFakeTimers();
    try {
      renderContent(
        '<intlayer-content-selector id="selector"><span id="text">Click inside</span></intlayer-content-selector>'
      );
      const selector = getElement('#selector');
      const innerWrapper = selector.shadowRoot?.querySelector('.wrapper');
      let clickOutsideFired = false;

      selector.addEventListener('intlayer:click-outside', () => {
        clickOutsideFired = true;
      });

      innerWrapper?.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true })
      );
      vi.advanceTimersByTime(250);
      expect(innerWrapper?.hasAttribute('data-active')).toBe(true);

      // Click inside
      innerWrapper?.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true })
      );

      expect(clickOutsideFired).toBe(false);
      expect(innerWrapper?.hasAttribute('data-active')).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });
});
