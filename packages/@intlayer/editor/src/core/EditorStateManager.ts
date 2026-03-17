import {
  editDictionaryByKeyPath,
  getContentNodeByKeyPath,
  renameContentNodeByKeyPath,
} from '@intlayer/core/dictionaryManipulator';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type {
  ContentNode,
  Dictionary,
  LocalDictionaryId,
} from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import { NodeType } from '@intlayer/types/nodeType';
import { MessageKey } from '../messagesKeys';
import {
  CrossFrameMessenger,
  type MessengerConfig,
} from './CrossFrameMessenger';
import { CrossFrameStateManager } from './CrossFrameStateManager';
import { IframeClickInterceptor } from './IframeClickInterceptor';
import { UrlStateManager } from './UrlStateManager';

export type DictionaryContent = Record<LocalDictionaryId, Dictionary>;

export type FileContent = {
  dictionaryKey: string;
  dictionaryLocalId?: LocalDictionaryId;
  keyPath?: KeyPath[];
};

export type EditorStateManagerConfig = {
  /** 'client' = the app running inside the iframe; 'editor' = the editor wrapping the app */
  mode: 'editor' | 'client';
  /** Cross-frame messaging configuration */
  messenger: MessengerConfig;
  /** Optional initial Intlayer configuration to broadcast */
  configuration?: IntlayerConfig;
};

/**
 * EditorStateManager is the single entry point for all Intlayer editor state.
 * It is framework-agnostic: instantiate one instance at the root of the application
 * and subscribe to its EventTarget-based events from any framework adapter.
 *
 * Replaces all context providers, hooks and store files across React, Preact,
 * Solid, Svelte, and Vue integrations.
 */
export class EditorStateManager {
  readonly messenger: CrossFrameMessenger;
  readonly editorEnabled: CrossFrameStateManager<boolean>;
  readonly focusedContent: CrossFrameStateManager<FileContent | null>;
  readonly localeDictionaries: CrossFrameStateManager<DictionaryContent>;
  readonly editedContent: CrossFrameStateManager<DictionaryContent>;
  readonly configuration: CrossFrameStateManager<IntlayerConfig>;
  readonly currentLocale: CrossFrameStateManager<Locale>;

  private readonly _urlManager: UrlStateManager;
  private readonly _iframeInterceptor: IframeClickInterceptor;
  private readonly _mode: 'editor' | 'client';

  constructor(config: EditorStateManagerConfig) {
    this._mode = config.mode;

    this.messenger = new CrossFrameMessenger(config.messenger);

    this.editorEnabled = new CrossFrameStateManager<boolean>(
      MessageKey.INTLAYER_EDITOR_ENABLED,
      this.messenger,
      { emit: false, receive: true, initialValue: false }
    );

    this.focusedContent = new CrossFrameStateManager<FileContent | null>(
      MessageKey.INTLAYER_FOCUSED_CONTENT_CHANGED,
      this.messenger,
      { emit: true, receive: true, initialValue: null }
    );

    this.localeDictionaries = new CrossFrameStateManager<DictionaryContent>(
      MessageKey.INTLAYER_LOCALE_DICTIONARIES_CHANGED,
      this.messenger
    );

    this.editedContent = new CrossFrameStateManager<DictionaryContent>(
      MessageKey.INTLAYER_EDITED_CONTENT_CHANGED,
      this.messenger
    );

    this.configuration = new CrossFrameStateManager<IntlayerConfig>(
      MessageKey.INTLAYER_CONFIGURATION,
      this.messenger,
      {
        emit: true,
        receive: false,
        ...(config.configuration ? { initialValue: config.configuration } : {}),
      }
    );

    this.currentLocale = new CrossFrameStateManager<Locale>(
      MessageKey.INTLAYER_CURRENT_LOCALE,
      this.messenger,
      { emit: false, receive: true }
    );

    this._urlManager = new UrlStateManager(this.messenger);
    this._iframeInterceptor = new IframeClickInterceptor(this.messenger);
  }

  start(): void {
    this.messenger.start();
    this.editorEnabled.start();
    this.focusedContent.start();
    this.localeDictionaries.start();
    this.editedContent.start();
    this.configuration.start();
    this.currentLocale.start();

    if (this._mode === 'client') {
      this._urlManager.start();
      this._iframeInterceptor.startInterceptor();
      this._loadDictionaries();
      // Request current edited content from the editor
      this.messenger.send(`${MessageKey.INTLAYER_EDITED_CONTENT_CHANGED}/get`);
    } else {
      this._iframeInterceptor.startMerger();
    }
  }

  stop(): void {
    this.messenger.stop();
    this.editorEnabled.stop();
    this.focusedContent.stop();
    this.localeDictionaries.stop();
    this.editedContent.stop();
    this.configuration.stop();
    this.currentLocale.stop();
    this._urlManager.stop();
    this._iframeInterceptor.stopInterceptor();
    this._iframeInterceptor.stopMerger();
  }

  // ─── Focus helpers ──────────────────────────────────────────────────────────

  setFocusedContentKeyPath(keyPath: KeyPath[]): void {
    const filtered = keyPath.filter((key) => key.type !== NodeType.Translation);
    const prev = this.focusedContent.value;
    if (!prev) return;
    this.focusedContent.set({ ...prev, keyPath: filtered });
  }

  // ─── Dictionary record helpers ───────────────────────────────────────────

  setLocaleDictionary(dictionary: Dictionary): void {
    if (!dictionary.localId) return;
    const current = this.localeDictionaries.value ?? {};
    this.localeDictionaries.set({
      ...current,
      [dictionary.localId as LocalDictionaryId]: dictionary,
    });
  }

  // ─── Edited content helpers ───────────────────────────────────────────────

  setEditedDictionary(newDict: Dictionary): void {
    if (!newDict.localId) {
      console.error('setEditedDictionary: missing localId', newDict);
      return;
    }
    const current = this.editedContent.value ?? {};
    this.editedContent.set({
      ...current,
      [newDict.localId as LocalDictionaryId]: newDict,
    });
  }

  setEditedContent(
    localDictionaryId: LocalDictionaryId,
    newValue: Dictionary['content']
  ): void {
    const current = this.editedContent.value ?? {};
    this.editedContent.set({
      ...current,
      [localDictionaryId]: {
        ...current[localDictionaryId],
        content: newValue,
      },
    });
  }

  addContent(
    localDictionaryId: LocalDictionaryId,
    newValue: ContentNode,
    keyPath: KeyPath[] = [],
    overwrite = true
  ): void {
    const current = this.editedContent.value ?? {};
    const localeDicts = this.localeDictionaries.value ?? {};
    const originalContent = localeDicts[localDictionaryId]?.content;
    const currentContent = structuredClone(
      current[localDictionaryId]?.content ?? originalContent
    );

    let newKeyPath = keyPath;
    if (!overwrite) {
      let index = 0;
      const otherKeyPath = keyPath.slice(0, -1);
      const lastKeyPath = keyPath[keyPath.length - 1];
      let finalKey = lastKeyPath.key;
      while (
        typeof getContentNodeByKeyPath(currentContent, newKeyPath) !==
        'undefined'
      ) {
        index++;
        finalKey =
          index === 0 ? lastKeyPath.key : `${lastKeyPath.key} (${index})`;
        newKeyPath = [
          ...otherKeyPath,
          { ...lastKeyPath, key: finalKey } as KeyPath,
        ];
      }
    }

    const updatedContent = editDictionaryByKeyPath(
      currentContent,
      newKeyPath,
      newValue
    );
    this.editedContent.set({
      ...current,
      [localDictionaryId]: {
        ...current[localDictionaryId],
        content: updatedContent as Dictionary['content'],
      },
    });
  }

  renameContent(
    localDictionaryId: LocalDictionaryId,
    newKey: KeyPath['key'],
    keyPath: KeyPath[] = []
  ): void {
    const current = this.editedContent.value ?? {};
    const localeDicts = this.localeDictionaries.value ?? {};
    const originalContent = localeDicts[localDictionaryId]?.content;
    const currentContent = structuredClone(
      current[localDictionaryId]?.content ?? originalContent
    );
    const updated = renameContentNodeByKeyPath(currentContent, newKey, keyPath);
    this.editedContent.set({
      ...current,
      [localDictionaryId]: {
        ...current[localDictionaryId],
        content: updated as Dictionary['content'],
      },
    });
  }

  removeContent(
    localDictionaryId: LocalDictionaryId,
    keyPath: KeyPath[]
  ): void {
    const current = this.editedContent.value ?? {};
    const localeDicts = this.localeDictionaries.value ?? {};
    const originalContent = localeDicts[localDictionaryId]?.content;
    const currentContent = structuredClone(
      current[localDictionaryId]?.content ?? originalContent
    );
    const initialContent = getContentNodeByKeyPath(originalContent, keyPath);
    const restored = editDictionaryByKeyPath(
      currentContent,
      keyPath,
      initialContent
    );
    this.editedContent.set({
      ...current,
      [localDictionaryId]: {
        ...current[localDictionaryId],
        content: restored as Dictionary['content'],
      },
    });
  }

  restoreContent(localDictionaryId: LocalDictionaryId): void {
    const current = this.editedContent.value ?? {};
    const updated = { ...current };
    delete updated[localDictionaryId];
    this.editedContent.set(updated);
  }

  clearContent(localDictionaryId: LocalDictionaryId): void {
    const current = this.editedContent.value ?? {};
    const filtered = { ...current };
    delete filtered[localDictionaryId];
    this.editedContent.set(filtered);
  }

  clearAllContent(): void {
    this.editedContent.set({});
  }

  getContentValue(
    localDictionaryIdOrKey: LocalDictionaryId | string,
    keyPath: KeyPath[]
  ): ContentNode | undefined {
    const edited = this.editedContent.value;
    if (!edited) return undefined;

    const filteredKeyPath = keyPath.filter(
      (key) => key.type !== NodeType.Translation
    );

    const isDictionaryId =
      localDictionaryIdOrKey.includes(':local:') ||
      localDictionaryIdOrKey.includes(':remote:');

    if (isDictionaryId) {
      const content =
        edited[localDictionaryIdOrKey as LocalDictionaryId]?.content ?? {};
      return getContentNodeByKeyPath(
        content,
        filteredKeyPath,
        this.currentLocale.value
      );
    }

    const matchingIds = Object.keys(edited).filter((key) =>
      key.startsWith(`${localDictionaryIdOrKey}:`)
    );
    for (const localId of matchingIds) {
      const content = edited[localId as LocalDictionaryId]?.content ?? {};
      const node = getContentNodeByKeyPath(
        content,
        filteredKeyPath,
        this.currentLocale.value
      );
      if (node) return node;
    }

    return undefined;
  }

  private async _loadDictionaries(): Promise<void> {
    try {
      const mod = await import('@intlayer/unmerged-dictionaries-entry');
      const unmergedDictionaries = mod.getUnmergedDictionaries();
      const dictionariesList = Object.fromEntries(
        Object.values(unmergedDictionaries)
          .flat()
          .map((dictionary) => [dictionary.localId, dictionary])
      ) as DictionaryContent;
      this.localeDictionaries.set(dictionariesList);
    } catch {
      // Dynamic entry not available (expected in editor mode or when not configured)
    }
  }
}
