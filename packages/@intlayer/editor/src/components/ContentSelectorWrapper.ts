import { isSameKeyPath } from '@intlayer/core/utils';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import { NodeType, type TypedNodeModel } from '@intlayer/types/nodeType';
import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import type {
  EditorStateManager,
  FileContent,
} from '../core/EditorStateManager';
import {
  getGlobalEditorManager,
  onGlobalEditorManagerChange,
} from '../core/globalManager';
import { MessageKey } from '../messageKey';

/**
 * <intlayer-content-selector-wrapper>
 *
 * Framework-agnostic Lit element that wraps content with the Intlayer editor
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
export class IntlayerContentSelectorWrapperElement extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }
  `;

  @property({ type: String, attribute: 'key-path' }) keyPathJson = '[]';
  @property({ type: String, attribute: 'dictionary-key' }) dictionaryKey = '';

  @state() private _editorEnabled = false;
  @state() private _isInIframe = false;
  @state() private _isSelected = false;
  @state() private _editedValue: ContentNode | undefined = undefined;

  private _unsubManager: (() => void) | null = null;
  private _unsubEnabled: (() => void) | null = null;
  private _unsubFocused: (() => void) | null = null;
  private _unsubEditedContent: (() => void) | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    if (typeof window !== 'undefined') {
      this._isInIframe = window.self !== window.top;
    }
    this._subscribeToManager();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._teardown();
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (
      changedProperties.has('keyPathJson') ||
      changedProperties.has('dictionaryKey')
    ) {
      const manager = getGlobalEditorManager();
      if (manager) this._updateEditedValue(manager);
    }
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
      }
    });
  }

  private _setupManagerSubscriptions(manager: EditorStateManager): void {
    this._editorEnabled = manager.editorEnabled.value ?? false;
    this._updateIsSelected(manager.focusedContent.value);
    this._updateEditedValue(manager);

    const handleEnabledChange = (e: Event) => {
      this._editorEnabled = (e as CustomEvent<boolean>).detail;
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

  private _getRawKeyPath(): KeyPath[] {
    try {
      return JSON.parse(this.keyPathJson) as KeyPath[];
    } catch {
      return [];
    }
  }

  private _getFilteredKeyPath(): KeyPath[] {
    return this._getRawKeyPath().filter((k) => k.type !== NodeType.Translation);
  }

  private _updateEditedValue(manager: EditorStateManager): void {
    const filteredKeyPath = this._getFilteredKeyPath();
    if (!this.dictionaryKey || filteredKeyPath.length === 0) {
      this._editedValue = undefined;
      return;
    }

    // Node types whose display requires framework-level rendering (markdown,
    // HTML, insertion, file): do not override the slot — the framework handles
    // those. Only plain / translated strings can be substituted here.
    const rawKeyPath = this._getRawKeyPath();
    const lastStepType = rawKeyPath[rawKeyPath.length - 1]?.type;
    if (
      lastStepType === NodeType.Markdown ||
      lastStepType === NodeType.HTML ||
      lastStepType === NodeType.Insertion ||
      lastStepType === NodeType.File
    ) {
      this._editedValue = undefined;
      return;
    }

    let value = manager.getContentValue(this.dictionaryKey, filteredKeyPath);

    // getContentNodeByKeyPath resolves translation nodes only at intermediate
    // steps, not the final leaf. Resolve manually when the returned value is
    // still a translation object (happens when Translation steps are filtered
    // out and the leaf IS the translation object).
    if (
      value !== null &&
      value !== undefined &&
      typeof value === 'object' &&
      value.nodeType === NodeType.Translation
    ) {
      const locale = manager.currentLocale.value as string | undefined;
      // TypedNodeModel<Translation, …> structurally satisfies TypedNode<BaseNode>
      // (both have nodeType), so this narrowing cast is sound.
      const node = value as TypedNodeModel<
        typeof NodeType.Translation,
        Record<string, ContentNode>
      >;
      value = locale ? node[NodeType.Translation][locale] : undefined;
    }

    this._editedValue = value;
  }

  private _updateIsSelected(
    focusedContent: FileContent | null | undefined
  ): void {
    if (!focusedContent) {
      this._isSelected = false;
      return;
    }
    const keyPath = this._getFilteredKeyPath();
    this._isSelected =
      focusedContent.dictionaryKey === this.dictionaryKey &&
      (focusedContent.keyPath?.length ?? 0) > 0 &&
      isSameKeyPath(focusedContent.keyPath ?? [], keyPath);
  }

  private _handlePress(e: Event): void {
    // Stop propagation so nested wrappers don't also fire (composed + bubbles)
    e.stopPropagation();
    const manager = getGlobalEditorManager();
    if (!manager) return;
    manager.focusedContent.set({
      dictionaryKey: this.dictionaryKey,
      keyPath: this._getFilteredKeyPath(),
    });
  }

  private _handleHover(e: Event): void {
    e.stopPropagation();
    getGlobalEditorManager()?.messenger.send(
      `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
      { dictionaryKey: this.dictionaryKey, keyPath: this._getFilteredKeyPath() }
    );
  }

  private _handleUnhover(e: Event): void {
    e.stopPropagation();
    getGlobalEditorManager()?.messenger.send(
      `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
      null
    );
  }

  render() {
    if (!this._isInIframe || !this._editorEnabled) {
      return html`<slot></slot>`;
    }

    const editedValue = this._editedValue;
    const displayedContent =
      typeof editedValue === 'string' ||
      typeof editedValue === 'number' ||
      typeof editedValue === 'boolean'
        ? editedValue
        : html`<slot></slot>`;

    return html`
      <intlayer-content-selector
        ?is-selecting=${this._isSelected}
        @intlayer:press=${this._handlePress}
        @intlayer:hover=${this._handleHover}
        @intlayer:unhover=${this._handleUnhover}
      >
        ${displayedContent}
      </intlayer-content-selector>
    `;
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
