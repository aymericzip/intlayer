import { isSameKeyPath } from '@intlayer/core/utils';

import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import type { TypedNodeModel } from '@intlayer/types/nodeType';
import * as NodeTypes from '@intlayer/types/nodeType';
import type {
  EditorStateManager,
  FileContent,
} from '../core/EditorStateManager';
import {
  getGlobalEditorManager,
  onGlobalEditorManagerChange,
} from '../core/globalManager';
import { MessageKey } from '../messageKey';

type RenderState = 'simple' | 'wrapped-slot' | 'wrapped-text';

/**
 * Share of the viewport height left above content scrolled into view (30vh),
 * keeping it clear of fixed navbars.
 */
const SCROLL_TOP_OFFSET_RATIO = 0.3;

/** Parent in the flattened tree, crossing shadow roots up to their host. */
const getComposedParent = (element: Element): Element | null =>
  element.parentElement ??
  ((element.getRootNode() as ShadowRoot).host as Element | undefined) ??
  null;

/** Vertical translation applied to an element, by `transform` or `translate`. */
const getTranslateY = (style: CSSStyleDeclaration): number => {
  const transformOffset =
    style.transform && style.transform !== 'none'
      ? new DOMMatrixReadOnly(style.transform).m42
      : 0;
  // `translate: <x> <y>` — a single value only moves along x
  const translateOffset = Number.parseFloat(
    style.translate?.split(' ')[1] ?? ''
  );

  return (
    transformOffset + (Number.isNaN(translateOffset) ? 0 : translateOffset)
  );
};

/**
 * Vertical offset the element will lose once its reveal animations end.
 *
 * Scroll-reveal effects (`whileInView`, AOS…) keep off-screen content
 * transparent and shifted until it enters the viewport, then slide it into
 * place: measuring it as-is would scroll too far by that shift. Only
 * translucent ancestors are counted, so permanent transforms (centering…)
 * stay part of the position.
 */
const getPendingRevealOffset = (element: Element): number => {
  let offset = 0;

  for (
    let ancestor: Element | null = element;
    ancestor;
    ancestor = getComposedParent(ancestor)
  ) {
    const style = getComputedStyle(ancestor);

    if (Number.parseFloat(style.opacity) < 1) offset += getTranslateY(style);
  }

  return offset;
};

const _HTMLElement =
  typeof HTMLElement !== 'undefined'
    ? HTMLElement
    : (class {} as unknown as typeof HTMLElement);

/**
 * <intlayer-content-selector-wrapper>
 *
 * Framework-agnostic web component that wraps content with the Intlayer editor
 * selection UI. It replaces the per-framework ContentSelectorWrapper components
 * (Vue, Svelte, Solid, Preact).
 *
 * It reads from the global EditorStateManager singleton (set by initEditorClient)
 * and conditionally renders <intlayer-content-selector> around its slot content
 * when the editor is active and the app is running inside an iframe.
 *
 * @attr {string} key-path        - JSON-serialized KeyPath[] for this content node
 * @attr {string} dictionary-key  - The dictionary key owning this content node
 */
export class IntlayerContentSelectorWrapperElement extends _HTMLElement {
  private _keyPathJson = '[]';
  private _dictionaryKey = '';
  private _editorEnabled = false;
  private _isInIframe = false;
  private _isSelected = false;
  private _editedValue: ContentNode | undefined = undefined;

  private _renderState: RenderState | null = null;
  private _selector: HTMLElement | null = null;

  private _unsubManager: (() => void) | null = null;
  /** Removes the listeners attached to the current manager's states */
  private _unsubManagerState: (() => void) | null = null;

  static get observedAttributes(): string[] {
    return ['key-path', 'dictionary-key'];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = ':host { display: contents; }';
    shadow.appendChild(style);
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null
  ): void {
    if (name === 'key-path') {
      this._keyPathJson = newValue ?? '[]';
    } else {
      this._dictionaryKey = newValue ?? '';
    }

    const manager = getGlobalEditorManager();
    if (manager) this._updateEditedValue(manager);
  }

  connectedCallback(): void {
    if (typeof window !== 'undefined') {
      this._isInIframe = window.self !== window.top;
    }
    this._subscribeToManager();
    this._render();
  }

  disconnectedCallback(): void {
    this._unsubManager?.();
    this._unsubManager = null;
    this._unsubManagerState?.();
    this._unsubManagerState = null;
  }

  private _getRawKeyPath(): KeyPath[] {
    try {
      return JSON.parse(this._keyPathJson) as KeyPath[];
    } catch {
      return [];
    }
  }

  private _getFilteredKeyPath(): KeyPath[] {
    return this._getRawKeyPath().filter(
      (keyPath) => keyPath.type !== NodeTypes.TRANSLATION
    );
  }

  private _updateEditedValue(manager: EditorStateManager): void {
    const filteredKeyPath = this._getFilteredKeyPath();
    if (!this._dictionaryKey || filteredKeyPath.length === 0) {
      this._editedValue = undefined;
      this._render();
      return;
    }

    // Node types whose display requires framework-level rendering (markdown,
    // HTML, insertion, file): do not override the slot — the framework handles
    // those. Only plain / translated strings can be substituted here.
    const rawKeyPath = this._getRawKeyPath();
    const lastStepType = rawKeyPath[rawKeyPath.length - 1]?.type;
    if (
      lastStepType === NodeTypes.MARKDOWN ||
      lastStepType === NodeTypes.HTML ||
      lastStepType === NodeTypes.INSERTION ||
      lastStepType === NodeTypes.FILE
    ) {
      this._editedValue = undefined;
      this._render();
      return;
    }

    let value = manager.getContentValue(this._dictionaryKey, filteredKeyPath);

    // getContentNodeByKeyPath resolves translation nodes only at intermediate
    // steps, not the final leaf. Resolve manually when the returned value is
    // still a translation object (happens when Translation steps are filtered
    // out and the leaf IS the translation object).
    if (
      value !== null &&
      value !== undefined &&
      typeof value === 'object' &&
      (value as { nodeType?: unknown }).nodeType === NodeTypes.TRANSLATION
    ) {
      const locale = manager.currentLocale.value as string | undefined;
      // TypedNodeModel<Translation, …> structurally satisfies TypedNode<BaseNode>
      // (both have nodeType), so this narrowing cast is sound.
      const node = value as TypedNodeModel<
        typeof NodeTypes.TRANSLATION,
        Record<string, ContentNode>
      >;
      value = locale ? node[NodeTypes.TRANSLATION][locale] : undefined;
    }

    this._editedValue = value;
    this._render();
  }

  private _updateIsSelected(
    focusedContent: FileContent | null | undefined
  ): void {
    if (!focusedContent) {
      this._isSelected = false;
      this._updateSelectorAttr();
      return;
    }
    const keyPath = this._getFilteredKeyPath();
    const wasSelected = this._isSelected;
    this._isSelected =
      focusedContent.dictionaryKey === this._dictionaryKey &&
      (focusedContent.keyPath?.length ?? 0) > 0 &&
      isSameKeyPath(focusedContent.keyPath ?? [], keyPath);
    this._updateSelectorAttr();

    // Reveal content the editor focuses while it is off-screen in the app
    if (this._isSelected && !wasSelected) {
      this._scrollIntoViewIfNeeded();
    }
  }

  /**
   * Scrolls the selected content to 30vh, unless it is already fully visible
   * in this frame's viewport.
   */
  private _scrollIntoViewIfNeeded(): void {
    // `.wrapper` is the only real box: this host and the selector are
    // `display: contents`. No selector means the editor UI is inactive.
    const target = this._selector?.shadowRoot?.querySelector('.wrapper');
    if (!target) return;

    const rect = target.getBoundingClientRect();
    // Where the content settles once revealed
    const top = rect.top - getPendingRevealOffset(target);
    const bottom = top + rect.height;

    const isFullyVisible = top >= 0 && bottom <= window.innerHeight;
    if (
      isFullyVisible &&
      !this._isCoveredAt((rect.left + rect.right) / 2, top + 1)
    ) {
      return;
    }

    window.scrollBy({
      top: top - window.innerHeight * SCROLL_TOP_OFFSET_RATIO,
      behavior: 'smooth',
    });
  }

  /**
   * Whether another element (a fixed navbar, a sticky header…) is painted over
   * this content at the given viewport point.
   */
  private _isCoveredAt(x: number, y: number): boolean {
    // Query from this element's own root so apps rendered in a shadow root
    // (Lit…) don't get their outer host back
    const root = this.getRootNode() as Document | ShadowRoot;
    if (typeof root.elementFromPoint !== 'function') return false;

    const topElement = root.elementFromPoint(x, y);

    return Boolean(topElement) && !this.contains(topElement);
  }

  private _updateSelectorAttr(): void {
    if (!this._selector) return;
    if (this._isSelected) {
      this._selector.setAttribute('is-selecting', '');
    } else {
      this._selector.removeAttribute('is-selecting');
    }
  }

  private _subscribeToManager(): void {
    const manager = getGlobalEditorManager();
    if (manager) {
      this._setupManagerSubscriptions(manager);
    }
    // Keep listening for manager changes (handles stop + re-init cycles)
    this._unsubManager = onGlobalEditorManagerChange((nextManager) => {
      this._unsubManagerState?.();
      this._unsubManagerState = null;
      if (nextManager) {
        this._setupManagerSubscriptions(nextManager);
      } else {
        this._editorEnabled = false;
        this._isSelected = false;
        this._editedValue = undefined;
        this._render();
      }
    });
  }

  private _setupManagerSubscriptions(manager: EditorStateManager): void {
    this._editorEnabled = manager.editorEnabled.value ?? false;
    this._updateIsSelected(manager.focusedContent.value);
    this._updateEditedValue(manager);

    const handleEnabledChange = (e: Event) => {
      this._editorEnabled = (e as CustomEvent<boolean>).detail;
      this._render();
    };
    const handleFocusedChange = (e: Event) => {
      this._updateIsSelected((e as CustomEvent<FileContent | null>).detail);
    };
    const handleEditedContentChange = () => {
      this._updateEditedValue(manager);
    };

    manager.editorEnabled.addEventListener('change', handleEnabledChange);
    manager.focusedContent.addEventListener('change', handleFocusedChange);
    manager.editedContent.addEventListener('change', handleEditedContentChange);

    this._unsubManagerState = () => {
      manager.editorEnabled.removeEventListener('change', handleEnabledChange);
      manager.focusedContent.removeEventListener('change', handleFocusedChange);
      manager.editedContent.removeEventListener(
        'change',
        handleEditedContentChange
      );
    };
  }

  private _handlePress(e: Event): void {
    // Stop propagation so nested wrappers don't also fire (composed + bubbles)
    e.stopPropagation();
    const manager = getGlobalEditorManager();
    if (!manager) return;
    manager.focusedContent.set({
      dictionaryKey: this._dictionaryKey,
      keyPath: this._getFilteredKeyPath(),
    });
  }

  private _handleHover(e: Event): void {
    e.stopPropagation();
    getGlobalEditorManager()?.messenger.send(
      `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
      {
        dictionaryKey: this._dictionaryKey,
        keyPath: this._getFilteredKeyPath(),
      }
    );
  }

  private _handleUnhover(e: Event): void {
    e.stopPropagation();
    getGlobalEditorManager()?.messenger.send(
      `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
      null
    );
  }

  private _render(): void {
    const useWrapper = this._isInIframe && this._editorEnabled;
    const editedValue = this._editedValue;
    const isSimpleValue =
      typeof editedValue === 'string' ||
      typeof editedValue === 'number' ||
      typeof editedValue === 'boolean';

    const newState: RenderState = !useWrapper
      ? 'simple'
      : isSimpleValue
        ? 'wrapped-text'
        : 'wrapped-slot';

    if (this._renderState !== newState) {
      this._rebuildContent(newState);
      return;
    }

    // Structure unchanged — update only dynamic parts
    if (newState !== 'simple' && this._selector) {
      this._updateSelectorAttr();
      if (
        newState === 'wrapped-text' &&
        this._selector.firstChild?.nodeType === Node.TEXT_NODE
      ) {
        (this._selector.firstChild as Text).data = String(editedValue);
      }
    }
  }

  private _rebuildContent(state: RenderState): void {
    const shadow = this.shadowRoot!;
    // Remove all nodes except the style element (first child)
    while (shadow.childNodes.length > 1) {
      shadow.removeChild(shadow.lastChild!);
    }
    this._selector = null;

    if (state === 'simple') {
      shadow.appendChild(document.createElement('slot'));
    } else {
      const selector = document.createElement('intlayer-content-selector');
      this._selector = selector;
      if (this._isSelected) selector.setAttribute('is-selecting', '');
      selector.addEventListener('intlayer:press', (e) => this._handlePress(e));
      selector.addEventListener('intlayer:hover', (e) => this._handleHover(e));
      selector.addEventListener('intlayer:unhover', (e) =>
        this._handleUnhover(e)
      );

      if (state === 'wrapped-text') {
        selector.appendChild(
          document.createTextNode(String(this._editedValue))
        );
      } else {
        selector.appendChild(document.createElement('slot'));
      }
      shadow.appendChild(selector);
    }

    this._renderState = state;
  }
}

export const defineIntlayerContentSelectorWrapper = (): void => {
  if (typeof customElements === 'undefined') return;

  if (!customElements.get('intlayer-content-selector-wrapper')) {
    customElements.define(
      'intlayer-content-selector-wrapper',
      IntlayerContentSelectorWrapperElement
    );
  }
};
