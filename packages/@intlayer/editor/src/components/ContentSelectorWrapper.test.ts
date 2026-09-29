import type { KeyPath } from '@intlayer/types/keyPath';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type {
  EditorStateManager,
  FileContent,
} from '../core/EditorStateManager';
import { setGlobalEditorManager } from '../core/globalManager';
import { defineIntlayerElements } from './ContentSelector';

// The real module graph loads esbuild, which cannot run under jsdom
vi.mock('@intlayer/core/utils', () => ({
  isSameKeyPath: (keyPathA: KeyPath[], keyPathB: KeyPath[]) =>
    JSON.stringify(keyPathA) === JSON.stringify(keyPathB),
}));

type StateMock<Value> = EventTarget & { value: Value };

const createStateMock = <Value>(value: Value): StateMock<Value> =>
  Object.assign(new EventTarget(), { value });

const KEY_PATH: KeyPath[] = [{ type: 'object', key: 'title' } as KeyPath];

/** Where the selected content should land (30vh) */
const getWantedTop = () => window.innerHeight * 0.3;

/** Styles reported for the content's container, keyed by property */
type ContainerStyle = { opacity: string; transform: string };

/**
 * Selects a content measured at `contentTop`, placed inside a container
 * styled with `containerStyle`.
 */
const selectContent = (
  contentTop: number,
  containerStyle: ContainerStyle = { opacity: '1', transform: 'none' }
) => {
  const focusedContent = createStateMock<FileContent | null>(null);

  setGlobalEditorManager({
    editorEnabled: createStateMock(true),
    focusedContent,
    editedContent: createStateMock({}),
    currentLocale: createStateMock(undefined),
    getContentValue: () => undefined,
  } as unknown as EditorStateManager);

  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    top: contentTop,
    bottom: contentTop + 20,
    height: 20,
    left: 0,
    right: 100,
  } as DOMRect);

  const container = document.createElement('div');
  const getComputedStyleOriginal = window.getComputedStyle.bind(window);
  vi.spyOn(window, 'getComputedStyle').mockImplementation((element) =>
    element === container
      ? ({ ...containerStyle, translate: 'none' } as CSSStyleDeclaration)
      : getComputedStyleOriginal(element)
  );

  const wrapper = document.createElement('intlayer-content-selector-wrapper');
  wrapper.setAttribute('dictionary-key', 'home');
  wrapper.setAttribute('key-path', JSON.stringify(KEY_PATH));
  container.appendChild(wrapper);
  document.body.appendChild(container);

  focusedContent.dispatchEvent(
    new CustomEvent('change', {
      detail: { dictionaryKey: 'home', keyPath: KEY_PATH },
    })
  );
};

describe('IntlayerContentSelectorWrapperElement scroll into view', () => {
  beforeEach(() => {
    // The selection UI only renders inside the editor iframe
    vi.spyOn(window, 'top', 'get').mockReturnValue({} as Window);
    window.scrollBy = vi.fn();
    // jsdom has no DOMMatrix: only the vertical translation matters here
    vi.stubGlobal(
      'DOMMatrixReadOnly',
      class {
        readonly m42: number;

        constructor(transform: string) {
          this.m42 = Number(transform.match(/translateY\((-?\d+)px\)/)?.[1]);
        }
      }
    );
    defineIntlayerElements();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    Reflect.deleteProperty(document, 'elementFromPoint');
    setGlobalEditorManager(null);
    vi.unstubAllGlobals();
  });

  it('scrolls content below the viewport to 30vh', () => {
    const contentTop = window.innerHeight + 200;

    selectContent(contentTop);

    expect(window.scrollBy).toHaveBeenCalledWith({
      top: contentTop - getWantedTop(),
      behavior: 'smooth',
    });
  });

  it('does not scroll content fully visible in the viewport', () => {
    selectContent(100);

    expect(window.scrollBy).not.toHaveBeenCalled();
  });

  it('scrolls content only partially visible', () => {
    const contentTop = window.innerHeight - 10;

    selectContent(contentTop);

    expect(window.scrollBy).toHaveBeenCalledWith({
      top: contentTop - getWantedTop(),
      behavior: 'smooth',
    });
  });

  it('scrolls content hidden under a fixed navbar', () => {
    const navbar = document.createElement('nav');
    document.body.appendChild(navbar);
    document.elementFromPoint = () => navbar;

    selectContent(10);

    expect(window.scrollBy).toHaveBeenCalledWith({
      top: 10 - getWantedTop(),
      behavior: 'smooth',
    });
  });

  it('targets where content waiting to be revealed will settle', () => {
    const contentTop = window.innerHeight + 200;

    // Scroll-reveal: transparent and shifted 100px down until in view
    selectContent(contentTop, {
      opacity: '0',
      transform: 'translateY(100px)',
    });

    expect(window.scrollBy).toHaveBeenCalledWith({
      top: contentTop - 100 - getWantedTop(),
      behavior: 'smooth',
    });
  });

  it('keeps permanent transforms of visible content in the position', () => {
    const contentTop = window.innerHeight + 200;

    selectContent(contentTop, {
      opacity: '1',
      transform: 'translateY(100px)',
    });

    expect(window.scrollBy).toHaveBeenCalledWith({
      top: contentTop - getWantedTop(),
      behavior: 'smooth',
    });
  });
});
