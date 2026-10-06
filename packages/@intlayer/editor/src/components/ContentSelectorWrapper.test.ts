import type { KeyPath } from '@intlayer/types/keyPath';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type {
  EditorStateManager,
  FileContent,
} from '../core/EditorStateManager';
import { setGlobalEditorManager } from '../core/globalManager';
import { defineIntlayerElements } from './ContentSelector';

// The real module graph loads esbuild, which cannot run under jsdom
// Same prefix semantics as the real one: a focused list matches its items
vi.mock('@intlayer/core/utils', () => ({
  isSameKeyPath: (keyPathA: KeyPath[], keyPathB: KeyPath[]) =>
    keyPathA.every(
      (step, index) => JSON.stringify(step) === JSON.stringify(keyPathB[index])
    ),
}));

type StateMock<Value> = EventTarget & { value: Value };

const createStateMock = <Value>(value: Value): StateMock<Value> =>
  Object.assign(new EventTarget(), { value });

const KEY_PATH: KeyPath[] = [{ type: 'object', key: 'title' } as KeyPath];

/** Where the selected content should land (30vh) */
const getWantedTop = () => window.innerHeight * 0.3;

/** Styles reported for the content's container, keyed by property */
type ContainerStyle = { opacity: string; transform: string };

/** Lets the batched reveal of the selected wrappers run */
const flushReveal = () => Promise.resolve();

/**
 * Selects a content measured at `contentTop`, placed inside a container
 * styled with `containerStyle`.
 */
const selectContent = async (
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
  await flushReveal();
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

  it('scrolls content below the viewport to 30vh', async () => {
    const contentTop = window.innerHeight + 200;

    await selectContent(contentTop);

    expect(window.scrollBy).toHaveBeenCalledWith({
      top: contentTop - getWantedTop(),
      behavior: 'smooth',
    });
  });

  it('does not scroll content fully visible in the viewport', async () => {
    await selectContent(100);

    expect(window.scrollBy).not.toHaveBeenCalled();
  });

  it('scrolls content only partially visible', async () => {
    const contentTop = window.innerHeight - 10;

    await selectContent(contentTop);

    expect(window.scrollBy).toHaveBeenCalledWith({
      top: contentTop - getWantedTop(),
      behavior: 'smooth',
    });
  });

  it('scrolls content hidden under a fixed navbar', async () => {
    const navbar = document.createElement('nav');
    document.body.appendChild(navbar);
    document.elementFromPoint = () => navbar;

    await selectContent(10);

    expect(window.scrollBy).toHaveBeenCalledWith({
      top: 10 - getWantedTop(),
      behavior: 'smooth',
    });
  });

  it('targets where content waiting to be revealed will settle', async () => {
    const contentTop = window.innerHeight + 200;

    // Scroll-reveal: transparent and shifted 100px down until in view
    await selectContent(contentTop, {
      opacity: '0',
      transform: 'translateY(100px)',
    });

    expect(window.scrollBy).toHaveBeenCalledWith({
      top: contentTop - 100 - getWantedTop(),
      behavior: 'smooth',
    });
  });

  it('keeps permanent transforms of visible content in the position', async () => {
    const contentTop = window.innerHeight + 200;

    await selectContent(contentTop, {
      opacity: '1',
      transform: 'translateY(100px)',
    });

    expect(window.scrollBy).toHaveBeenCalledWith({
      top: contentTop - getWantedTop(),
      behavior: 'smooth',
    });
  });
});

describe('IntlayerContentSelectorWrapperElement with several matching wrappers', () => {
  const LIST_KEY_PATH: KeyPath[] = [
    { type: 'object', key: 'items' } as KeyPath,
  ];

  beforeEach(() => {
    vi.spyOn(window, 'top', 'get').mockReturnValue({} as Window);
    window.scrollBy = vi.fn();
    defineIntlayerElements();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    setGlobalEditorManager(null);
    vi.restoreAllMocks();
  });

  /** The wrapper hosting the selection box being measured */
  const getHostWrapper = (element: Element): Element | null => {
    let host: Element | null = element;

    while (host && host.tagName !== 'INTLAYER-CONTENT-SELECTOR-WRAPPER') {
      host = (host.getRootNode() as ShadowRoot).host ?? null;
    }

    return host;
  };

  /**
   * Renders one wrapper per entry, in document order, measured at the given
   * top, then focuses `focusedKeyPath`.
   */
  const selectAmong = async (
    wrappers: { keyPath: KeyPath[]; top: number }[],
    focusedKeyPath: KeyPath[]
  ) => {
    const focusedContent = createStateMock<FileContent | null>(null);

    setGlobalEditorManager({
      editorEnabled: createStateMock(true),
      focusedContent,
      editedContent: createStateMock({}),
      currentLocale: createStateMock(undefined),
      getContentValue: () => undefined,
    } as unknown as EditorStateManager);

    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
      function (this: HTMLElement) {
        const top = Number(getHostWrapper(this)?.getAttribute('data-top'));

        return {
          top,
          bottom: top + 20,
          height: 20,
          left: 0,
          right: 100,
        } as DOMRect;
      }
    );

    for (const { keyPath, top } of wrappers) {
      const wrapper = document.createElement(
        'intlayer-content-selector-wrapper'
      );
      wrapper.setAttribute('dictionary-key', 'home');
      wrapper.setAttribute('key-path', JSON.stringify(keyPath));
      wrapper.setAttribute('data-top', String(top));
      document.body.appendChild(wrapper);
    }

    focusedContent.dispatchEvent(
      new CustomEvent('change', {
        detail: { dictionaryKey: 'home', keyPath: focusedKeyPath },
      })
    );
    await flushReveal();
  };

  it('scrolls to the first item of a selected list', async () => {
    const firstItemTop = window.innerHeight + 200;

    await selectAmong(
      [0, 1, 2].map((index) => ({
        keyPath: [...LIST_KEY_PATH, { type: 'array', key: index } as KeyPath],
        top: firstItemTop + index * 100,
      })),
      LIST_KEY_PATH
    );

    expect(window.scrollBy).toHaveBeenCalledTimes(1);
    expect(window.scrollBy).toHaveBeenCalledWith({
      top: firstItemTop - getWantedTop(),
      behavior: 'smooth',
    });
  });

  it('scrolls to the first occurrence of content rendered twice', async () => {
    const firstOccurrenceTop = window.innerHeight + 200;

    await selectAmong(
      [
        { keyPath: KEY_PATH, top: firstOccurrenceTop },
        { keyPath: KEY_PATH, top: firstOccurrenceTop + 1000 },
      ],
      KEY_PATH
    );

    expect(window.scrollBy).toHaveBeenCalledTimes(1);
    expect(window.scrollBy).toHaveBeenCalledWith({
      top: firstOccurrenceTop - getWantedTop(),
      behavior: 'smooth',
    });
  });

  it('keeps the view when the first occurrence is already visible', async () => {
    await selectAmong(
      [
        { keyPath: KEY_PATH, top: 100 },
        { keyPath: KEY_PATH, top: window.innerHeight + 1000 },
      ],
      KEY_PATH
    );

    expect(window.scrollBy).not.toHaveBeenCalled();
  });
});
