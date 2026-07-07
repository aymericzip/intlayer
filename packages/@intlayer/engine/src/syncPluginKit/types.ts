import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { DictionaryFormat } from '@intlayer/types/dictionary';

/**
 * Structured dictionary content handled by sync plugins.
 */
export type SyncContent = Record<string, unknown>;

/**
 * Context handed to every {@link ContentAdapter} call.
 */
export type SyncPluginContext = {
  configuration: IntlayerConfig;
};

/**
 * One translatable resource discovered in the external system.
 */
export type ContentEntry = {
  /** Dictionary key the entry maps to. */
  key: string;
  /** Locale of the entry content. */
  locale: Locale;
  /**
   * Transport-specific identifier of the entry: an absolute file path for the
   * file adapter, a remote resource identifier for API-backed adapters.
   */
  uri: string;
  /**
   * Absolute file path when the entry lives on the local filesystem.
   * Leave undefined for remote entries (CMS, TMS…): the generated dictionary
   * then carries no `filePath` and file-based hooks are skipped for it.
   */
  filePath?: string;
};

/**
 * Identifies where content must be written back by a {@link ContentAdapter}.
 */
export type ContentTarget = {
  key: string;
  locale: Locale;
};

/**
 * Transport layer of a sync plugin: where the entries live and how to
 * enumerate, read and persist them (filesystem, TMS such as Crowdin, extra
 * CMS…). Format concerns belong to {@link FormatCodec}, orchestration to
 * `createSyncPlugin`.
 */
export type ContentAdapter = {
  /**
   * Enumerate every entry available in the external system.
   */
  list: (context: SyncPluginContext) => Promise<ContentEntry[]>;

  /**
   * Read and parse one entry.
   * Return `undefined` when the entry is missing or unreadable — the plugin
   * treats it as empty content instead of failing the build.
   */
  read: (
    entry: ContentEntry,
    context: SyncPluginContext
  ) => Promise<SyncContent | undefined>;

  /**
   * Serialize and persist the content of one key/locale back to the external
   * system. Only called for plugins created with `direction: 'both'`.
   */
  write: (
    target: ContentTarget,
    content: SyncContent,
    context: SyncPluginContext
  ) => Promise<void>;

  /**
   * Resolve the canonical URI of a key/locale.
   * Used by the plugin to verify ownership before reformatting a content
   * declaration in the `formatOutput` hook. Optional: adapters without a
   * local-file identity (remote systems) can omit it.
   */
  resolveUri?: (
    target: ContentTarget,
    context: SyncPluginContext
  ) => Promise<string>;

  /**
   * Template describing where entries live, with `{{key}}` / `{{locale}}`
   * markers kept verbatim. Used as the `fill` field of generated dictionaries
   * so Intlayer knows where translations flow back.
   */
  getFillPattern?: (context: SyncPluginContext) => Promise<string>;

  /**
   * Human-readable description of the adapter source, used in log messages
   * (e.g. the file path pattern for the file adapter).
   */
  describeSource?: (context: SyncPluginContext) => Promise<string>;

  /**
   * Default value for the `splitKeys` behavior when the plugin options do not
   * set it explicitly (e.g. the file adapter splits when the source pattern
   * has no `{{key}}` segment).
   */
  detectSplitKeys?: () => Promise<boolean>;
};

/**
 * Format layer of a sync plugin: how a raw string payload maps to structured
 * dictionary content and back (JSON, PO, XLIFF…).
 */
export type FormatCodec = {
  /**
   * Parse a raw payload into dictionary content.
   * May throw on malformed payloads — callers treat a throw as empty content.
   */
  parse: (raw: string) => SyncContent;

  /**
   * Serialize dictionary content into the target format.
   */
  serialize: (content: SyncContent, context: { locale: Locale }) => string;
};

/**
 * Direction of the synchronization:
 * - `pull`: only ingest external content as dictionaries (read-only).
 * - `both`: ingest and write the merged build output back to the source.
 */
export type SyncDirection = 'pull' | 'both';

/**
 * Options of `createSyncPlugin`.
 */
export type CreateSyncPluginOptions = {
  /** Plugin name reported to the Intlayer engine (e.g. `sync-json`). */
  name: string;

  /** Transport used to enumerate, read and write entries. */
  adapter: ContentAdapter;

  /**
   * Synchronization direction. Defaults to `'both'`.
   * With `'pull'` the plugin only implements `loadDictionaries`.
   */
  direction?: SyncDirection;

  /**
   * Identifier of the plugin instance stored on each generated dictionary.
   * Dictionaries are routed back to their owning plugin instance through this
   * value during write-back, so it must be unique per instance.
   */
  location: string;

  /**
   * Priority of the generated dictionaries when merging with other sources
   * (`.content` files have priority 0). Defaults to 0.
   */
  priority?: number;

  /** Content format of the dictionaries (e.g. `'icu'`, `'po'`). */
  format?: DictionaryFormat;

  /**
   * Whether each top-level key of an entry becomes its own dictionary instead
   * of a single dictionary holding the whole entry (the `next-intl` /
   * `react-intl` namespace model). When omitted, falls back to
   * {@link ContentAdapter.detectSplitKeys}, then to `false`.
   */
  splitKeys?: boolean;

  /**
   * Fixed locale applied to every generated dictionary, overriding the locale
   * discovered per entry.
   */
  localeOverride?: Locale;
};
