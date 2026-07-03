import type { FilePathPattern } from './filePathPattern';
import type {
  DeclaredLocales,
  LocalesValues,
  Schema,
  SchemaKeys,
} from './module_augmentation';
import type { NodeType } from './nodeType';

type BaseNode = number | string | boolean | null | undefined;

type TypedNodeBase = {
  nodeType: NodeType;
};

export interface TypedNode<_NodeType = undefined> extends TypedNodeBase {}

type FetchableContentNode<NodeType> = (
  args?: any
) => ContentNode<NodeType> | Promise<ContentNode<NodeType>>;

export type ContentNode<
  T = undefined,
  FetchableNode = false,
  NodeType = T extends undefined ? BaseNode : T,
> =
  | NodeType
  | TypedNode<NodeType>
  | ((args?: any) => ContentNode<NodeType>)
  | (FetchableNode extends true ? FetchableContentNode<NodeType> : undefined);

// Utility types (unchanged)
type IsArray<T> = T extends any[] ? true : false;

type ReplaceContentValueArray<T, FetchableNode> = T extends (infer U)[]
  ? // Allow either a *single* typed node returning the entire array
    // or an array of typed nodes (or scalar nodes).
    ContentNode<T, FetchableNode> | ReplaceContentValue<U, FetchableNode>[]
  : never;

type ReplaceContentValueObject<T, FetchableNode> = {
  [K in keyof T]: ReplaceContentValue<T[K], FetchableNode>;
};

// Modified: allow a full ContentNode wrapper OR an object shape when T is an object
type ReplaceContentValue<
  NodeType,
  FetchableNode = true,
> = NodeType extends object
  ? IsArray<NodeType> extends true
    ? ReplaceContentValueArray<NodeType, FetchableNode>
    :
        | ContentNode<NodeType, FetchableNode>
        | ReplaceContentValueObject<NodeType, FetchableNode>
  : ContentNode<NodeType, FetchableNode>;

/**
 * Indicate how the dictionary should be filled using AI.
 *
 * Default: `true`
 *
 * - If `true`, will consider the `compiler.output` field.
 * - If `false`, will skip the fill process.
 *
 * - `./` paths are resolved relative to the component directory.
 * - `/` paths are resolved relative to the project root (`baseDir`).
 *
 * - If includes `{{locale}}` variable in the path, will trigger the generation of separate dictionaries per locale.
 *
 * Example:
 * ```ts
 * {
 *   // Create Multilingual .content.ts files close to the component
 *   fill: ({ fileName, extension }) => `./${fileName}${extension}`,
 *
 *   // fill: './{{fileName}}{{extension}}', // Equivalent using template string
 * }
 * ```
 *
 * ```ts
 * {
 *   // Create centralize per-locale JSON at the root of the project
 *   fill: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
 *
 *   // fill: '/locales/{{locale}}/{{key}}.content.json', // Equivalent using template string
 * }
 * ```
 *
 * ```ts
 * {
 *   // Create custom output based on the locale
 *   fill: {
 *     en: ({ key }) => `/locales/en/${key}.content.json`,
 *     fr: '/locales/fr/{{key}}.content.json',
 *     es: false,
 *     de: true,
 *   },
 * }
 * ```
 *
 *
 * Variable list:
 *   - `fileName`: The name of the file.
 *   - `key`: The key of the content.
 *   - `locale`: The locale of the content.
 *   - `extension`: The extension of the file.
 *   - `componentFileName`: The name of the component file.
 *   - `componentExtension`: The extension of the component file.
 *   - `format`: The format of the dictionary.
 *   - `componentFormat`: The format of the component dictionary.
 *   - `componentDirPath`: The directory path of the component.
 */
export type Fill =
  | boolean
  | FilePathPattern
  | Partial<Record<DeclaredLocales, boolean | FilePathPattern>>;

export type DictionaryId = string;
export type DictionaryKey = string;

/**
 * A dimension used to discriminate sibling dictionaries sharing the same key.
 *
 * - 'variant': named or structured alternative content (A/B testing, seasonal
 *   banners, CMS records, user-specific copy…). The variant value is a string
 *   (named) or an object (structured discriminator).
 * - 'item': ordered collection items (blog posts, FAQs…)
 *
 * A key may declare BOTH dimensions at once (e.g. a collection whose items also
 * have variants). They are always ordered canonically as `variant → item`,
 * with `item` as the innermost / collection axis.
 */
export type DictionaryQualifierType = 'variant' | 'item';

/**
 * A single variant value declared on a dictionary:
 *
 * - a **string** — a named alternative (`'black-friday'`)
 * - an **object** — a structured discriminator whose canonical serialization
 *   (sorted `key=value` pairs joined by `&`) is the variant identity
 *
 * The `variant` field of a dictionary accepts one value or an **array** of
 * values — an array registers the same content under every listed variant id.
 */
export type DictionaryVariantValue = string | Record<string, string | number>;

/**
 * Output of the merge step for a key whose dictionaries declare one or more
 * qualifier dimensions (`variant`, `item`).
 *
 * Sibling dictionaries sharing the same qualifier coordinates are merged
 * together (locale completion / priority overrides preserved). Sibling
 * dictionaries without any qualifier act as shared base content merged into
 * every entry as fallback.
 *
 * `content` is keyed by the composite id — the per-dimension ids joined in
 * canonical order with `/` (e.g. `"promo/2"` for a variant × item key). For an
 * object variant the variant segment is the canonical serialization of the
 * object (e.g. `"id=abc&userId=123"`). Each value is the resolved content node
 * directly: the qualifier coordinates are decoded from the composite id, not
 * duplicated on a per-entry wrapper.
 *
 * Example (`.intlayer/dictionaries/faq.json`):
 * ```json
 * {
 *   "key": "faq",
 *   "qualifierTypes": ["item"],
 *   "content": {
 *     "1": { "nodeType": "translation", "translation": { ... } },
 *     "2": { "nodeType": "translation", "translation": { ... } }
 *   }
 * }
 * ```
 */
export type QualifiedDictionaryGroup = {
  $schema?: 'https://intlayer.org/schema.json';
  key: DictionaryKey;
  qualifierTypes: DictionaryQualifierType[];
  /**
   * Maps each composite id to its resolved content node. Replaces the former
   * per-entry `Dictionary` wrapper — coordinates live in the key, not the value.
   */
  content: Record<string, unknown>;
  /** Import mode shared by the group (collected from its qualified entries). */
  importMode?: ImportMode;
  localIds?: LocalDictionaryId[];
};

/**
 * Selector accepted as second argument of `useIntlayer` / `getIntlayer` (and
 * forwarded by the build-time transform to `useDictionary` / `getDictionary`).
 *
 * - `{ item: 2 }` selects a collection item (1-based index)
 * - `{ variant: 'black-friday' }` selects a named variant
 * - `{ variant: { id: 'prod_abc', userId: '123' } }` selects a structured
 *   variant; the object must equal the variant declared on the dictionary
 * - `locale` composes with any of the above and overrides the context locale
 */
export type DictionarySelector = {
  locale?: LocalesValues;
  item?: number;
  variant?: DictionaryVariantValue;
};

type QualifiedEntryContent<Entry> = Entry extends { content: infer Content }
  ? Content
  : unknown;

/** Splits a composite id literal (`"a/b/c"`) into its ordered segments. */
type SplitCompositeId<Id extends string> =
  Id extends `${infer Head}/${infer Tail}`
    ? [Head, ...SplitCompositeId<Tail>]
    : [Id];

/**
 * Zips the declared qualifier dimensions with the segments decoded from a
 * composite id into a coordinate record (e.g. `['variant', 'item']` +
 * `['promo', '2']` → `{ variant: 'promo'; item: '2' }`).
 */
type ZipQualifierCoordinates<
  QualifierTypes extends readonly DictionaryQualifierType[],
  Segments extends readonly string[],
> = {
  [Index in keyof QualifierTypes as QualifierTypes[Index] extends DictionaryQualifierType
    ? QualifierTypes[Index]
    : never]: Index extends keyof Segments ? Segments[Index] : never;
};

/**
 * Rebuilds the per-entry shape (`{ variant; item; content }`) from the
 * `content` map keyed by composite id, so the coordinate-comparison helpers can
 * be reused unchanged. Coordinates are decoded from each key.
 */
type ReconstructedEntries<
  ContentMap,
  QualifierTypes extends readonly DictionaryQualifierType[],
> = {
  [Key in keyof ContentMap & string]: ZipQualifierCoordinates<
    QualifierTypes,
    SplitCompositeId<Key>
  > extends infer Coordinates
    ? { content: ContentMap[Key] } & (Coordinates extends { variant: infer V }
        ? { variant: V }
        : unknown) &
        (Coordinates extends { item: infer Item } ? { item: Item } : unknown)
    : never;
};

/** Stringifies a literal coordinate for comparison. */
type StringifyCoordinate<Value> = Value extends string | number
  ? `${Value}`
  : never;

/** Literal equality between two coordinate values. */
type CoordinateEquals<Left, Right> = [StringifyCoordinate<Left>] extends [
  StringifyCoordinate<Right>,
]
  ? true
  : false;

/**
 * The variant coordinate a selector pins. A string variant is matched
 * precisely; an object variant broadens to `string` (it matches any declared
 * variant entry, since the object identity is not reconstructable at the type
 * level). An absent selector defaults to the `'default'` variant.
 */
type SelectorVariant<Selector> = Selector extends { variant: infer Variant }
  ? Variant extends string
    ? Variant
    : string
  : 'default';
type SelectorItem<Selector> = Selector extends { item: infer Item }
  ? Item
  : undefined;

/**
 * Whether a single group entry matches the selector across every declared
 * dimension. The `item` dimension matches any value when the selector leaves it
 * open (collection axis).
 */
type EntryMatchesSelector<
  Entry,
  QualifierTypes extends readonly DictionaryQualifierType[],
  Selector,
> = (
  'variant' extends QualifierTypes[number]
    ? Entry extends { variant: infer Variant }
      ? CoordinateEquals<Variant, SelectorVariant<Selector>>
      : false
    : true
) extends true
  ? 'item' extends QualifierTypes[number]
    ? [SelectorItem<Selector>] extends [undefined]
      ? true
      : Entry extends { item: infer Item }
        ? CoordinateEquals<Item, SelectorItem<Selector>>
        : false
    : true
  : false;

/** Entries that match the selector. */
type MatchingEntries<
  Entries,
  QualifierTypes extends readonly DictionaryQualifierType[],
  Selector,
> = {
  [Key in keyof Entries as EntryMatchesSelector<
    Entries[Key],
    QualifierTypes,
    Selector
  > extends true
    ? Key
    : never]: Entries[Key];
};

/** Whether the collection (`item`) axis is left open (→ array result). */
type IsItemAxisOpen<
  QualifierTypes extends readonly DictionaryQualifierType[],
  Selector,
> = 'item' extends QualifierTypes[number]
  ? [SelectorItem<Selector>] extends [undefined]
    ? true
    : false
  : false;

/**
 * Computes the content type returned by `getIntlayer` / `getDictionary` for a
 * dictionary (or qualified dictionary group) `T` given the selector argument
 * `Selector`.
 *
 * The result is resolved against the **specific** entries the selector targets
 * (matched across variant / item coordinates), never the union of every
 * entry:
 * - `item` left open → array of the matching entries' content
 * - all dimensions pinned → that single entry's content (or `null` if none match)
 * - plain dictionary → its `content` (selector ignored)
 */
export type ResolveQualifiedDictionaryContent<
  T,
  Selector = undefined,
> = T extends {
  qualifierTypes: infer QualifierTypes extends
    readonly DictionaryQualifierType[];
  content: infer ContentMap extends Record<string, any>;
}
  ? ReconstructedEntries<ContentMap, QualifierTypes> extends infer Entries
    ? IsItemAxisOpen<QualifierTypes, Selector> extends true
      ? QualifiedEntryContent<
          MatchingEntries<
            Entries,
            QualifierTypes,
            Selector
          >[keyof MatchingEntries<Entries, QualifierTypes, Selector>]
        >[]
      : [keyof MatchingEntries<Entries, QualifierTypes, Selector>] extends [
            never,
          ]
        ? null
        : QualifiedEntryContent<
            MatchingEntries<
              Entries,
              QualifierTypes,
              Selector
            >[keyof MatchingEntries<Entries, QualifierTypes, Selector>]
          >
    : never
  : T extends { content: infer Content }
    ? Content
    : never;

/** Distributes over the union of a group's entries. */
type GroupEntryUnion<T> = T extends {
  qualifierTypes: infer QualifierTypes extends
    readonly DictionaryQualifierType[];
  content: infer ContentMap;
}
  ? ReconstructedEntries<ContentMap, QualifierTypes>[keyof ReconstructedEntries<
      ContentMap,
      QualifierTypes
    >]
  : never;

type EntryVariant<Entry> = Entry extends { variant: infer Variant }
  ? Variant
  : never;
type EntryItem<Entry> = Entry extends { item: infer Item } ? Item : never;

/**
 * The selector accepted for a specific qualified dictionary group `T`: each
 * dimension is constrained to the coordinates that actually exist, so an unknown
 * `item` is a compile-time error. Named (string) variants are suggested for
 * autocomplete; object variants are accepted via the loose `Record` form. Plain
 * dictionaries (no `entries`) fall back to the loose {@link DictionarySelector}.
 */
export type DictionarySelectorForGroup<T> = [GroupEntryUnion<T>] extends [never]
  ? DictionarySelector
  : { locale?: LocalesValues } & ([EntryVariant<GroupEntryUnion<T>>] extends [
      never,
    ]
      ? unknown
      : {
          variant?:
            | EntryVariant<GroupEntryUnion<T>>
            | (string & {})
            | Record<string, string | number>;
        }) &
      ([EntryItem<GroupEntryUnion<T>>] extends [never]
        ? unknown
        : { item?: EntryItem<GroupEntryUnion<T>> | number | (string & {}) });
export type DictionaryLocation =
  | 'remote'
  | 'local'
  | 'hybrid'
  | 'plugin'
  | (string & {});

export type LocalDictionaryId =
  `${DictionaryKey}::${Dictionary['location']}::${Dictionary['filePath'] | DictionaryId}`;

export type DictionaryFormat =
  | 'intlayer'
  | 'icu'
  | 'i18next'
  | 'vue-i18n'
  | 'po';

/**
 * Indicates the mode of import to use for the dictionary.
 *
 * Available modes:
 * - "static": The dictionaries are imported statically.
 *   In that case, Intlayer will replace all calls to `useIntlayer` with `useDictionary`.
 * - "dynamic": The dictionaries are imported dynamically in a synchronous component using the suspense API.
 *   In that case, Intlayer will replace all calls to `useIntlayer` with `useDictionaryDynamic`.
 * - "live": The dictionaries are imported dynamically using the live sync API.
 *   In that case, Intlayer will replace all calls to `useIntlayer` with `useDictionaryDynamic`.
 *   Live mode will use the live sync API to fetch the dictionaries. If the API call fails, the dictionaries will be imported dynamically as "dynamic" mode.
 *
 * Default: "static"
 */
export type ImportMode = 'static' | 'dynamic' | 'fetch';

export type ContentAutoTransformation =
  | boolean
  | {
      /**
       * Indicates if the content should be automatically transformed to a markdown node.
       * Default: true
       */
      markdown?: boolean;
      /**
       * Indicates if the content should be automatically transformed to an HTML node.
       * Default: true
       */
      html?: boolean;
      /**
       * Indicates if the content should be automatically transformed to an insertion node.
       * Default: true
       */
      insertion?: boolean;
    };
/**
 * Common properties shared by all Dictionary variants.
 */
type DictionaryBase = {
  /**
   * _Auto generated by the intlayer, do not modify it_
   *
   * The schema of the dictionary, used for JSON validation
   */
  $schema?: 'https://intlayer.org/schema.json';

  /**
   * _Auto generated by the intlayer, do not modify it_
   *
   * For remote dictionaries, the id is the id of the dictionary in the remote server
   */
  id?: DictionaryId;

  /**
   * _Auto generated by the intlayer, do not modify it_
   *
   * For remote dictionaries, the projectIds is the ids of the projects that can use this dictionary
   * A remote dictionary can be shared between multiple projects
   */
  projectIds?: string[];

  /**
   * _Auto generated by the intlayer, do not modify it_
   *
   * Unique Identifier for the dictionaries. Auto generated by the intlayer, it helps to identify the dictionary and know if it is a local or remote dictionary, and his location.
   */
  localId?: LocalDictionaryId;

  /**
   * _Auto generated by the intlayer, do not modify it_
   *
   * For merged dictionaries, the localIds is the ids of the dictionaries that are merged
   */
  localIds?: LocalDictionaryId[];

  /**
   * The formatter to use for the dictionary.
   *
   * Default: 'intlayer'
   *
   * The formatter to use for the dictionary content.
   */
  format?: DictionaryFormat;

  /**
   * The key of the dictionary. If multiple dictionaries have the same key, intlayer will merge them.
   *
   * As convention, use '-' to separate the words in the key.
   *
   * Example:
   * ```json
   * {
   *   "key": "about-page-meta",
   *   "content": { ... }
   * }
   * ```
   */
  key: DictionaryKey;

  /**
   * The title of the dictionary. Helps to identify the dictionary in the editor, and the CMS.
   *
   * Example:
   * ```json
   * {
   *   "key": "about-page-meta",
   *   "title": "About Page",
   *   "content": { ... }
   * }
   * ```
   */
  title?: string;

  /**
   * The description of the dictionary. Helps to understand the purpose of the dictionary in the editor, and the CMS.
   * The description is also used as context for translations generation.
   *
   * Example:
   * ```ts
   * {
   *   "key": "about-page-meta",
   *   "description":[
   *     "This dictionary is manage the metadata of the About Page",
   *     "Consider good practices for SEO:",
   *     "- The title should be between 50 and 60 characters",
   *     "- The description should be between 150 and 160 characters",
   *   ].join('\n'),
   *   "content": { ... }
   * }
   * ```
   */
  description?: string;

  /**
   * _Auto generated by the intlayer, do not modify it_
   *
   * The available versions of the remote dictionary. Helps to know the versions of the dictionary that are available.
   */
  versions?: string[];

  /**
   * _Managable on the CMS, do not modify it locally_
   *
   * The version of the remote dictionary. Helps to know the version of the dictionary that is currently used.
   */
  version?: string;

  /**
   * _Auto generated by the intlayer, do not modify it_
   *
   * The file path of the local dictionary. Helps to know from what .content file the dictionary has been generated.
   */
  filePath?: string;

  /**
   * Helps to categorize the dictionaries. The tags can provide more context and instructions for the dictionary.
   *
   * Example:
   * ```json
   * {
   *   "key": "about-page-meta",
   *   "tags": ["metadata","about-page"]
   * }
   * ```
   */
  tags?: string[];

  /**
   * Collection item index (1-based) of this dictionary inside the collection
   * identified by `key`.
   *
   * Sibling dictionaries sharing the same key but different `item` values form
   * an ordered collection:
   *
   * ```ts
   * // faq.1.content.ts → { key: 'faq', item: 1, content: { ... } }
   * // faq.2.content.ts → { key: 'faq', item: 2, content: { ... } }
   *
   * const allFaqs = useIntlayer('faq');          // → every item, ordered
   * const faq2 = useIntlayer('faq', { item: 2 }); // → single item
   * ```
   *
   * A sibling dictionary without any qualifier acts as shared base content
   * merged into every item as fallback.
   */
  item?: number;

  /**
   * Variant of this dictionary inside the variant set identified by `key`.
   *
   * A variant can be declared in two equivalent forms:
   *
   * - **A string** — a single named alternative (A/B testing, seasonal banners,
   *   feature flags…). Omitting `variant` (or using `'default'`) marks the
   *   fallback variant.
   *
   *   ```ts
   *   // hero.content.ts     → { key: 'hero-banner', variant: 'default', content: { ... } }
   *   // hero.bf.content.ts  → { key: 'hero-banner', variant: 'black-friday', content: { ... } }
   *
   *   const hero = useIntlayer('hero-banner');                                 // → 'default' variant
   *   const heroBf = useIntlayer('hero-banner', { variant: 'black-friday' });  // → named variant
   *   ```
   *
   * - **An object** — a structured discriminator (CMS records, user-specific
   *   copy, any content keyed by a set of fields). The whole object is the
   *   identity: the selector must provide an equal object to resolve the entry.
   *
   *   ```ts
   *   // product.abc.content.ts → { key: 'product', variant: { id: 'abc', userId: '123' }, content: { ... } }
   *
   *   const product = useIntlayer('product', { variant: { id: 'abc', userId: '123' } });
   *   ```
   *
   * - **An array** of the above — registers the same content under every
   *   listed variant id (the declaration fans out into one entry per id).
   *   Selecting any of the ids resolves this content:
   *
   *   ```ts
   *   // hero.sales.content.ts → { key: 'hero-banner', variant: ['black-friday', 'cyber-monday'], content: { ... } }
   *
   *   const heroBf = useIntlayer('hero-banner', { variant: 'black-friday' });  // → this content
   *   const heroCm = useIntlayer('hero-banner', { variant: 'cyber-monday' });  // → same content
   *   ```
   *
   * Sibling dictionaries sharing the same key but different `variant` values
   * form the variant set. A sibling without any qualifier acts as shared base
   * content merged into every variant as fallback.
   */
  variant?: DictionaryVariantValue | DictionaryVariantValue[];

  /**
   * Transform the dictionary in a per-locale dictionary.
   * Each field declared in a per-locale dictionary will be transformed in a translation node.
   * If missing, the dictionary will be treated as a multilingual dictionary.
   * If declared, do not use translation nodes in the content.
   *
   * Example:
   * ```json
   * {
   *   "key": "about-page",
   *   "locale": "en",
   *   "content": {
   *     "multilingualContent": "English content"
   *   }
   * }
   * ```
   */
  locale?: LocalesValues;

  /**
   * Indicators if the content of the dictionary should be automatically transformed.
   * If true, the content will be transformed to the corresponding node type.
   * - Markdown: `### Title` -> `md('### Title')`
   * - HTML: `<div>Title</div>` -> `html('<div>Title</div>')`
   * - Insertion: `Hello {{name}}` -> `insert('Hello {{name}}')`
   *
   * If an object is provided, you can specify which transformations should be enabled.
   *
   * Default: false
   */
  contentAutoTransformation?: ContentAutoTransformation;

  /**
   * Indicate how the dictionary should be filled using AI.
   *
   * Default: `true`
   *
   * - If `true`, will consider the `compiler.output` field.
   * - If `false`, will skip the fill process.
   *
   * - `./` paths are resolved relative to the component directory.
   * - `/` paths are resolved relative to the project root (`baseDir`).
   *
   * - If includes `{{locale}}` variable in the path, will trigger the generation of separate dictionaries per locale.
   *
   * Example:
   * ```ts
   * {
   *   // Create Multilingual .content.ts files close to the component
   *   fill: ({ fileName, extension }) => `./${fileName}${extension}`,
   *
   *   // fill: './{{fileName}}{{extension}}', // Equivalent using template string
   * }
   * ```
   *
   * ```ts
   * {
   *   // Create centralize per-locale JSON at the root of the project
   *   fill: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
   *
   *   // fill: '/locales/{{locale}}/{{key}}.content.json', // Equivalent using template string
   * }
   * ```
   *
   * ```ts
   * {
   *   // Create custom output based on the locale
   *   fill: {
   *     en: ({ key }) => `/locales/en/${key}.content.json`,
   *     fr: '/locales/fr/{{key}}.content.json',
   *     es: false,
   *     de: true,
   *   },
   * }
   * ```
   *
   *
   * Variable list:
   *   - `fileName`: The name of the file.
   *   - `key`: The key of the content.
   *   - `locale`: The locale of the content.
   *   - `extension`: The extension of the file.
   *   - `componentFileName`: The name of the component file.
   *   - `componentExtension`: The extension of the component file.
   *   - `format`: The format of the dictionary.
   *   - `componentFormat`: The format of the component dictionary.
   *   - `componentDirPath`: The directory path of the component.
   */
  fill?: Fill;

  /**
   * _Auto generated by the intlayer, do not modify it_
   *
   * Indicates if the dictionary has been auto filled.
   * In the case of conflicts, base dictionaryed will override auto filled dictionary.
   */
  filled?: true;

  /**
   * Indicates the priority of the dictionary.
   * In the case of conflicts, the dictionary with the highest priority will override the other dictionaries.
   */
  priority?: number;

  /**
   * Indicates the mode of import to use for the dictionary.
   *
   * Available modes:
   * - "static": The dictionaries are imported statically.
   *   In that case, Intlayer will replace all calls to `useIntlayer` with `useDictionary`.
   * - "dynamic": The dictionaries are imported dynamically in a synchronous component using the suspense API.
   *   In that case, Intlayer will replace all calls to `useIntlayer` with `useDictionaryDynamic`.
   * - "live": The dictionaries are imported dynamically using the live sync API.
   *   In that case, Intlayer will replace all calls to `useIntlayer` with `useDictionaryDynamic`.
   *   Live mode will use the live sync API to fetch the dictionaries. If the API call fails, the dictionaries will be imported dynamically as "dynamic" mode.
   *
   * Default: "static"
   */
  importMode?: ImportMode;

  /**
   * Indicates the location of the dictionary and controls how it synchronizes with the CMS.
   *
   * - 'hybrid': The dictionary is managed locally and remotely. Once pushed on the CMS, it will be synchronized from the local one. The local dictionary will be pulled from the CMS.
   * - 'remote': The dictionary is managed remotely only. Once pushed on the CMS, it will be detached from the local one. At content load time, the remote dictionary will be pulled from the CMS. A '.content' file with remote location will be ignored.
   * - 'local': The dictionary is managed locally. It will not be pushed to the remote CMS.
   * - 'plugin' (or any custom string): The dictionary is managed by a plugin, or a custom source. When you will try to push it, the system will ask an action to the user.
   */
  location?: DictionaryLocation;
};

/**
 * Strict Schema Branch:
 * If a schema is provided, it MUST be one of the SchemaKeys.
 */
type DictionaryWithSchema<
  ContentType,
  FetchableNode,
  K extends SchemaKeys = SchemaKeys,
> = K extends any
  ? {
      schema: K;
      content: ContentType extends undefined
        ? ReplaceContentValue<Schema<K>, FetchableNode> | Schema<K>
        :
            | ReplaceContentValue<ContentType & Schema<K>, FetchableNode>
            | (ContentType & Schema<K>);
    }
  : never;

/**
 * Strict Discrimination Branch
 */
type DictionaryWithoutSchema<ContentType, FetchableNode> = {
  schema?: never;
  content: ContentType extends undefined
    ? any
    : ReplaceContentValue<ContentType, FetchableNode> | ContentType;
};

/**
 * The Final Dictionary Type
 */
export type Dictionary<
  ContentType = undefined,
  SchemaKey extends SchemaKeys | undefined = undefined,
  FetchableNode = false,
> = DictionaryBase &
  (SchemaKey extends SchemaKeys
    ? DictionaryWithSchema<ContentType, FetchableNode, SchemaKey>
    : undefined extends SchemaKey
      ?
          | DictionaryWithoutSchema<ContentType, FetchableNode>
          | DictionaryWithSchema<ContentType, FetchableNode>
      : never);

export type GetSubPath<T, P> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? GetSubPath<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : T;
