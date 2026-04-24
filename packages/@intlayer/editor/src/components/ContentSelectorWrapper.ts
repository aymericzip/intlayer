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
export class IntlayerContentSelectorWrapperElement extends HTMLElement {
  private _keyPathJson = '[]';
  private _dictionaryKey = '';
  private _editorEnabled = false;
  private _isInIframe = false;
  private _isSelected = false;
  private _editedValue: ContentNode | undefined = undefined;

  private _renderState: RenderState | null = null;
  private _selector: HTMLElement | null = null;

  private _unsubManager: (() => void) | null = null;
  private _unsubEnabled: (() => void) | null = null;
  private _unsubFocused: (() => void) | null = null;
  private _unsubEditedContent: (() => void) | null = null;

  static get observedAttributes(): string[] {
    return ['key-path', 'dictionary-key'];
  }

  get keyPathJson(): string {
    return this._keyPathJson;
  }
  set keyPathJson(v: string) {
    this._keyPathJson = v;
    const manager = getGlobalEditorManager();
    if (manager) this._updateEditedValue(manager);
  }

  get dictionaryKey(): string {
    return this._dictionaryKey;
  }
  set dictionaryKey(v: string) {
    this._dictionaryKey = v;
    const manager = getGlobalEditorManager();
    if (manager) this._updateEditedValue(manager);
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
    _oldVal: string | null,
    newVal: string | null
  ): void {
    if (name === 'key-path') {
      this._keyPathJson = newVal ?? '[]';
      const manager = getGlobalEditorManager();
      if (manager) this._updateEditedValue(manager);
    } else if (name === 'dictionary-key') {
      this._dictionaryKey = newVal ?? '';
      const manager = getGlobalEditorManager();
      if (manager) this._updateEditedValue(manager);
    }
  }

  connectedCallback(): void {
    if (typeof window !== 'undefined') {
      this._isInIframe = window.self !== window.top;
    }
    this._subscribeToManager();
    this._render();
  }

  disconnectedCallback(): void {
    this._teardown();
  }

  private _teardown(): void {
    this._unsubManager?.();
    this._unsubEnabled?.();
    this._unsubFocused?.();
    this._unsubEditedContent?.();
    this._unsubManager = null;
    this._unsubEnabled = null;
    this._unsubFocused = null;
    this._unsubEditedContent = null;
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
      (k) => k.type !== NodeTypes.TRANSLATION
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
    this._isSelected =
      focusedContent.dictionaryKey === this._dictionaryKey &&
      (focusedContent.keyPath?.length ?? 0) > 0 &&
      isSameKeyPath(focusedContent.keyPath ?? [], keyPath);
    this._updateSelectorAttr();
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
    this._unsubManager = onGlobalEditorManagerChange((m) => {
      this._unsubEnabled?.();
      this._unsubFocused?.();
      this._unsubEditedContent?.();
      this._unsubEnabled = null;
      this._unsubFocused = null;
      this._unsubEditedContent = null;
      if (m) {
        this._setupManagerSubscriptions(m);
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

    this._unsubEnabled = () =>
      manager.editorEnabled.removeEventListener('change', handleEnabledChange);
    this._unsubFocused = () =>
      manager.focusedContent.removeEventListener('change', handleFocusedChange);
    this._unsubEditedContent = () =>
      manager.editedContent.removeEventListener(
        'change',
        handleEditedContentChange
      );
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
