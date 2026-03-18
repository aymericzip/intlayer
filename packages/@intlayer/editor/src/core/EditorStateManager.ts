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
import { MessageKey } from '../messageKey';
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
  readonly currentLocale: CrossFrameStateManager<Locale | undefined>;

  private readonly _urlManager: UrlStateManager;
  private readonly _iframeInterceptor: IframeClickInterceptor;
  private readonly _mode: 'editor' | 'client';
  private readonly _configuration: IntlayerConfig | undefined;

  // Client-mode handshake subscribers
  private _unsubAreYouThere: (() => void) | null = null;
  private _unsubActivate: (() => void) | null = null;
  // Editor-mode handshake subscriber
  private _unsubClientReady: (() => void) | null = null;

  constructor(config: EditorStateManagerConfig) {
    this._mode = config.mode;
    this._configuration = config.configuration;

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

    // Client emits its locale to the editor; editor receives it.
    this.currentLocale = new CrossFrameStateManager<Locale>(
      MessageKey.INTLAYER_CURRENT_LOCALE,
      this.messenger,
      {
        emit: config.mode === 'client',
        receive: config.mode === 'editor',
      }
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
      // Activation handshake: only participate if editor.enabled !== false
      if (this._configuration?.editor?.enabled !== false) {
        this._setupActivationHandshake();
      }
    } else {
      this._iframeInterceptor.startMerger();
      this._setupEditorHandshake();
    }
  }

  stop(): void {
    this._unsubAreYouThere?.();
    this._unsubActivate?.();
    this._unsubClientReady?.();
    this._unsubAreYouThere = null;
    this._unsubActivate = null;
    this._unsubClientReady = null;
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

  // ─── Handshake helpers ───────────────────────────────────────────────────────

  /**
   * EDITOR mode: re-send ARE_YOU_THERE to attempt re-connection with the client.
   * Call this when the user clicks "Enable Editor" or when the iframe reloads.
   */
  pingClient(): void {
    if (this._mode !== 'editor') return;

    this.messenger.send(MessageKey.INTLAYER_ARE_YOU_THERE);
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

    // Only use edited content entries whose localId is known to this client.
    // This prevents stale edits from other apps (different framework demos) from
    // being applied when the editor sends back its stored editedContent.
    const localeDicts = this.localeDictionaries.value;

    const isDictionaryId =
      localDictionaryIdOrKey.includes(':local:') ||
      localDictionaryIdOrKey.includes(':remote:');

    if (isDictionaryId) {
      // If localeDictionaries is loaded, verify this localId belongs to us
      if (localeDicts && !(localDictionaryIdOrKey in localeDicts)) {
        return undefined;
      }
      const content =
        edited[localDictionaryIdOrKey as LocalDictionaryId]?.content ?? {};

      return getContentNodeByKeyPath(
        content,
        filteredKeyPath,
        this.currentLocale.value
      );
    }

    const matchingIds = Object.keys(edited).filter(
      (key) =>
        key.startsWith(`${localDictionaryIdOrKey}:`) &&
        // If localeDictionaries is loaded, only include known localIds
        (!localeDicts || key in localeDicts)
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

  /**
   * EDITOR mode: listen for CLIENT_READY and respond with EDITOR_ACTIVATE.
   * Also pings the client immediately in case it loaded before the editor.
   */
  private _setupEditorHandshake(): void {
    // When the client announces it is ready, activate it
    this._unsubClientReady = this.messenger.subscribe(
      MessageKey.INTLAYER_CLIENT_READY,
      () => {
        this.editorEnabled.set(true);
        this.messenger.send(MessageKey.INTLAYER_EDITOR_ACTIVATE);
      }
    );

    // Ping any already-running client (covers editor-opens-after-client scenario)
    this.messenger.send(MessageKey.INTLAYER_ARE_YOU_THERE);
  }

  private _setupActivationHandshake(): void {
    // Announce to the editor that the client is ready
    this.messenger.send(MessageKey.INTLAYER_CLIENT_READY);

    // Respond to "are you there?" pings from the editor
    this._unsubAreYouThere = this.messenger.subscribe(
      MessageKey.INTLAYER_ARE_YOU_THERE,
      () => {
        this.messenger.send(MessageKey.INTLAYER_CLIENT_READY);
      }
    );

    // When the editor activates us, enable the selector and broadcast state
    this._unsubActivate = this.messenger.subscribe(
      MessageKey.INTLAYER_EDITOR_ACTIVATE,
      () => {
        this.editorEnabled.set(true);
        this._broadcastData();
      }
    );
  }

  private _broadcastData(): void {
    const configVal = this.configuration.value;

    if (configVal) {
      this.messenger.send(
        `${MessageKey.INTLAYER_CONFIGURATION}/post`,
        configVal
      );
    }
    const localeVal = this.currentLocale.value;

    if (localeVal) {
      this.messenger.send(
        `${MessageKey.INTLAYER_CURRENT_LOCALE}/post`,
        localeVal
      );
    }
    const dicts = this.localeDictionaries.value;

    if (dicts) {
      this.messenger.send(
        `${MessageKey.INTLAYER_LOCALE_DICTIONARIES_CHANGED}/post`,
        dicts
      );
    }
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

      // If the editor already activated us before dictionaries finished loading,
      // re-broadcast now so the editor receives the dictionaries.
      if (this.editorEnabled.value) {
        this._broadcastData();
      }
    } catch (e) {
      // Dynamic entry not available (expected in editor mode or when not configured)
      console.warn('[intlayer] Failed to load unmerged dictionaries:', e);
    }
  }
}
