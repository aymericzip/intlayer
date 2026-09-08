//! Plugin configuration types.
//!
//! These mirror the option objects produced on the JavaScript side
//! (`withIntlayer` in `next-intlayer`, `toSwcExtraCallers` in
//! `@intlayer/config/callers`, `serializeFieldRenameMap` in `@intlayer/babel`).
//! Both sides must stay in sync.

use serde::Deserialize;
use std::collections::BTreeMap;

// ─────────────────────────────────────────────────────────────────────────────
//  EXTRA CALLERS
// ─────────────────────────────────────────────────────────────────────────────

/// Location of a namespace read from a property of an options-object
/// argument, e.g. vue-i18n's `useI18n({ namespace: 'about' })`.
///
/// Field names mirror `SwcExtraCallerConfig['namespaceOption']` in
/// `@intlayer/config/callers` — both sides must stay in sync.
#[derive(Debug, Deserialize, Clone)]
pub struct NamespaceOptionConfig {
    /// Zero-based index of the options-object argument.
    #[serde(rename = "argumentIndex")]
    pub argument_index: usize,

    /// Name of the property holding the namespace string.
    #[serde(rename = "property")]
    pub property: String,
}

/// Descriptor for a compat-adapter caller that the SWC plugin should recognise
/// and rewrite in the same way as the native `useIntlayer` / `getIntlayer`
/// calls (i.e. replace the string-key argument with a pre-imported dictionary
/// object and swap the function name for a `*Dictionary` variant).
///
/// These are supplied entirely by the compat adapter plugins (e.g.
/// `createNextI18nPlugin`) and are forwarded into the SWC config; no compat
/// names are hard-coded inside this crate. The wire format is produced by
/// `toSwcExtraCallers` in `@intlayer/config/callers` — both sides must stay
/// in sync.
///
/// Exactly one of `namespace_arg_index`, `fixed_namespace` or
/// `namespace_option` describes where the namespace (dictionary key) is read
/// from; they are tried in that order.
#[derive(Debug, Deserialize, Clone)]
pub struct ExtraCallerConfig {
    /// The function name the user calls, e.g. `"useTranslation"`.
    #[serde(rename = "callerName")]
    pub caller_name: String,

    /// The import package specifiers that can export this function,
    /// e.g. `["react-i18next", "@intlayer/react-i18next"]`.
    #[serde(rename = "importSources")]
    pub import_sources: Vec<String>,

    /// Zero-based index of the positional argument that holds the namespace
    /// (dictionary key) string, e.g. `0` for `useTranslation('about')`.
    #[serde(rename = "namespaceArgIndex", default)]
    pub namespace_arg_index: Option<usize>,

    /// Compile-time constant namespace — every call site reads the same
    /// dictionary; the dictionary ident is inserted as a new first argument
    /// (lingui's `useLingui()` → `useDictionary(_messages)`).
    #[serde(rename = "fixedNamespace", default)]
    pub fixed_namespace: Option<String>,

    /// Namespace read from a property of an options-object argument; the
    /// dictionary ident is inserted as a new first argument and the property
    /// is rewritten to the key-prefix remainder (or removed).
    #[serde(rename = "namespaceOption", default)]
    pub namespace_option: Option<NamespaceOptionConfig>,

    /// Name of the replacement function for static-import mode,
    /// e.g. `"useTranslationDictionary"`.
    #[serde(rename = "staticReplacement")]
    pub static_replacement: String,

    /// Name of the replacement function for dynamic/fetch import mode,
    /// e.g. `"useTranslationDictionaryDynamic"`.
    #[serde(rename = "dynamicReplacement")]
    pub dynamic_replacement: String,
}

// ─────────────────────────────────────────────────────────────────────────────
//  FIELD RENAME (MINIFY)
// ─────────────────────────────────────────────────────────────────────────────

/// Rename table for one nesting level of a dictionary's content: original
/// field name → its short alias and the rename table of its own children.
pub type FieldRenameMap = BTreeMap<String, FieldRenameNode>;

/// A single entry of a [`FieldRenameMap`].
///
/// Mirrors `NestedRenameEntry` in
/// `@intlayer/babel/babel-plugin-intlayer-usage-analyzer`, serialised by
/// `serializeFieldRenameMap`. The short names are assigned on the JavaScript
/// side (alphabetically, from the full compiled dictionary) and applied to the
/// dictionary JSON there too, so this crate only has to rewrite the matching
/// source-code accesses.
#[derive(Debug, Deserialize, Clone, Default)]
pub struct FieldRenameNode {
    /// Short alphabetic alias the field is renamed to (`"a"`, `"b"`, …).
    #[serde(rename = "shortName")]
    pub short_name: String,

    /// Rename table for the fields nested inside this one. Empty when the
    /// value is a leaf, an array, or an opaquely-consumed value whose children
    /// must keep their original names.
    #[serde(rename = "children", default)]
    pub children: FieldRenameMap,
}

// ─────────────────────────────────────────────────────────────────────────────
//  LOG LEVEL
// ─────────────────────────────────────────────────────────────────────────────

/// Verbosity of the plugin's build-time reporting.
#[derive(Debug, Clone, Copy, Default, PartialEq, Eq, PartialOrd, Ord)]
pub enum LogLevel {
    /// No output at all (default).
    #[default]
    Off,
    /// One line per transformed file summarising what changed.
    Info,
    /// Everything `Info` reports, plus skipped files and the emitted code.
    Debug,
}

impl LogLevel {
    /// Parses the wire value of the `logLevel` option.
    ///
    /// Unknown values fall back to [`LogLevel::Off`] rather than failing the
    /// whole config deserialisation, which would silently disable the plugin.
    pub fn from_option(raw: Option<&str>) -> Self {
        match raw {
            Some("info") => LogLevel::Info,
            Some("debug" | "verbose") => LogLevel::Debug,
            _ => LogLevel::Off,
        }
    }
}

// ─────────────────────────────────────────────────────────────────────────────
//  PLUGIN CONFIG
// ─────────────────────────────────────────────────────────────────────────────

/// Configuration passed to the plugin via SWC transform options or constructed
/// directly when using [`crate::process_transform`] from native Rust.
#[derive(Debug, Deserialize, Clone, Default)]
pub struct PluginConfig {
    /// Absolute path to the directory containing `<key>.json` compiled dictionaries.
    #[serde(rename = "dictionariesDir")]
    pub dictionaries_dir: String,

    /// Absolute path to the generated dictionaries entry file (e.g. `.intlayer/dictionaries.mjs`).
    #[serde(rename = "dictionariesEntryPath")]
    pub dictionaries_entry_path: String,

    /// Absolute path to the directory containing `<key>.mjs` dynamic dictionary modules.
    #[serde(rename = "dynamicDictionariesDir")]
    pub dynamic_dictionaries_dir: String,

    /// Absolute path to the directory containing `<key>.mjs` fetch/live dictionary modules.
    #[serde(rename = "fetchDictionariesDir")]
    pub fetch_dictionaries_dir: String,

    /// Global import mode for all dictionaries: `"static"` (default), `"dynamic"`, or `"fetch"`.
    #[serde(rename = "importMode")]
    pub import_mode: Option<String>,

    /// When `true`, the dictionaries entry file is replaced with `export default {}` and
    /// `export const getDictionaries = () => ({})`.
    #[serde(rename = "replaceDictionaryEntry")]
    pub replace_dictionary_entry: Option<bool>,

    /// Keys of the dictionaries that reference other dictionaries through `nest()`.
    ///
    /// For those, the injected static import points at the generated companion
    /// module (`<dictionariesDir>/nested/<key>.mjs`) instead of the raw JSON.
    /// The companion re-exports the dictionary with its nest targets attached,
    /// so `getNesting` resolves them from that local reference rather than from
    /// the global registry this plugin empties — and each target lands in the
    /// chunk of the dictionary referencing it.
    ///
    /// Dynamic and fetch modes need nothing here: their generated loaders
    /// already attach the same targets per locale.
    #[serde(rename = "nestingDictionaryKeys", default)]
    pub nesting_dictionary_keys: Vec<String>,

    /// Allowlist of absolute file paths to transform. When empty, all files are processed.
    #[serde(rename = "filesList", default)]
    pub files_list: Vec<String>,

    /// Per-dictionary import mode overrides, keyed by dictionary key.
    /// Values are `"static"`, `"dynamic"`, or `"fetch"`.
    #[serde(rename = "dictionaryModeMap")]
    pub dictionary_mode_map: Option<BTreeMap<String, String>>,

    /// Extra caller descriptors injected by compat adapter plugins.
    ///
    /// Each entry teaches the plugin to recognise a compat-adapter function
    /// (e.g. `useTranslation` from `react-i18next`) and rewrite its call site
    /// to a `*Dictionary` variant that accepts a pre-imported dictionary object
    /// instead of a string key.
    #[serde(rename = "extraCallers", default)]
    pub extra_callers: Vec<ExtraCallerConfig>,

    /// Field-rename tables keyed by dictionary key, produced by the
    /// `build.minify` pipeline on the JavaScript side.
    ///
    /// When a dictionary is listed here, its compiled JSON has already been
    /// rewritten with the short aliases, so every source-code access to its
    /// content must be rewritten to match (`content.title` → `content.a`).
    /// Dictionaries whose JSON was left untouched (edge cases, fetch mode,
    /// opaque consumers) are simply absent from the map.
    ///
    /// The whole map arrives empty when the visual editor is enabled: renaming
    /// rewrites the content keys the `keyPath` is built from, and the editor
    /// resolves every edit by `keyPath` against the unmerged dictionaries.
    /// Purging still happens, so the dictionaries are still smaller.
    #[serde(rename = "fieldRenameMap", default)]
    pub field_rename_map: BTreeMap<String, FieldRenameMap>,

    /// Verbosity of the plugin's build-time reporting: `"off"` (default),
    /// `"info"`, or `"debug"`.
    #[serde(rename = "logLevel", default)]
    pub log_level: Option<String>,
}
