//! # intlayer-swc-plugin
//!
//! An SWC transform plugin for [Intlayer](https://intlayer.org) that replaces
//! `useIntlayer` / `getIntlayer` / `useTranslations` call arguments with
//! pre-loaded dictionary imports at compile time.
//!
//! ## What it does
//!
//! Given source code like:
//!
//! ```js
//! import { useIntlayer } from "react-intlayer";
//! const t = useIntlayer("locale-switcher");
//! ```
//!
//! The plugin rewrites it to:
//!
//! ```js
//! import _abc123 from "../../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };
//! import { useDictionary as useIntlayer } from "react-intlayer";
//! const t = useIntlayer(_abc123);
//! ```
//!
//! This eliminates the runtime registry lookup and enables tree-shaking for
//! per-locale bundles.
//!
//! ## Usage as an SWC / Next.js Wasm plugin
//!
//! The crate is distributed on npm as
//! [`@intlayer/swc`](https://www.npmjs.com/package/@intlayer/swc).
//! Configure it in your `next.config.*`:
//!
//! ```js
//! const nextConfig = {
//!   experimental: {
//!     swcPlugins: [["@intlayer/swc", { /* PluginConfig fields */ }]],
//!   },
//! };
//! ```
//!
//! ## Usage as a native Rust library
//!
//! Add to `Cargo.toml`:
//!
//! ```toml
//! [dependencies]
//! intlayer-swc-plugin = "7"
//! ```
//!
//! Then call [`process_transform`] directly:
//!
//! ```rust,no_run
//! use intlayer_swc_plugin::{PluginConfig, process_transform};
//! use swc_core::ecma::ast::Program;
//!
//! fn my_transform(program: Program) -> Program {
//!     let config = PluginConfig {
//!         dictionaries_dir: "/project/.intlayer/dictionaries".into(),
//!         dictionaries_entry_path: "/project/.intlayer/dictionaries.mjs".into(),
//!         dynamic_dictionaries_dir: "/project/.intlayer/dynamic_dictionaries".into(),
//!         fetch_dictionaries_dir: "/project/.intlayer/fetch_dictionaries".into(),
//!         import_mode: Some("static".into()),
//!         replace_dictionary_entry: Some(false),
//!         files_list: vec![],
//!         dictionary_mode_map: None,
//!         extra_callers: vec![],
//!     };
//!     process_transform(program, config, "/project/src/page.tsx".into())
//! }
//! ```

use base62::encode as base62_encode;
use pathdiff::diff_paths;
use serde::Deserialize;
use std::{
    collections::{BTreeMap, HashSet},
    hash::{BuildHasher, BuildHasherDefault, Hasher},
    path::Path,
};
use swc_core::{
    common::{SourceMap, SyntaxContext, DUMMY_SP},
    ecma::{
        ast::*,
        atoms::Atom,
        codegen::{text_writer::JsWriter, Emitter},
        visit::{VisitMut, VisitMutWith},
    },
};
use twox_hash::XxHash64;

#[cfg(feature = "plugin")]
use swc_core::plugin::{
    metadata::{TransformPluginMetadataContextKind, TransformPluginProgramMetadata},
    plugin_transform,
};

static DEBUG_LOG: bool = false;

// ─────────────────────────────────────────────────────────────────────────────
//  PLUGIN OPTIONS
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

/// Configuration passed to the plugin via SWC transform options or constructed
/// directly when using [`process_transform`] from native Rust.
#[derive(Debug, Deserialize, Clone)]
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

    /// Allowlist of absolute file paths to transform. When empty, all files are processed.
    #[serde(rename = "filesList")]
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
}

// ─────────────────────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/// Splits a namespace string at the first `.` to separate the dictionary key
/// from an optional key prefix for nested namespaces.
///
/// Examples:
/// - `"about"` -> `("about", "")`
/// - `"about.counter"` -> `("about", "counter")`
/// - `"about.section.title"` -> `("about", "section.title")`
fn split_namespace(namespace: &str) -> (&str, &str) {
    if let Some(dot_pos) = namespace.find('.') {
        (&namespace[..dot_pos], &namespace[dot_pos + 1..])
    } else {
        (namespace, "")
    }
}

/// Reads a fully-static string from an expression: a string literal, or a
/// template literal with a single quasi and no interpolations.
fn read_static_string(expr: &Expr) -> Option<String> {
    match expr {
        Expr::Lit(Lit::Str(Str { value, .. })) => Some(value.to_string_lossy().into_owned()),
        Expr::Tpl(Tpl { exprs, quasis, .. }) if exprs.is_empty() && quasis.len() == 1 => {
            Some(quasis[0].raw.to_string())
        }
        _ => None,
    }
}

/// How the namespace of an extra caller call-site was statically matched.
#[derive(Debug)]
enum ExtraNamespaceMatch {
    /// Positional argument at `index` held the namespace string.
    Argument {
        index: usize,
        full_namespace: String,
    },
    /// The namespace was read from a property of the options-object argument.
    Option {
        argument_index: usize,
        full_namespace: String,
    },
    /// The namespace is a compile-time constant.
    Fixed { full_namespace: String },
}

impl ExtraNamespaceMatch {
    fn full_namespace(&self) -> &str {
        match self {
            ExtraNamespaceMatch::Argument { full_namespace, .. }
            | ExtraNamespaceMatch::Option { full_namespace, .. }
            | ExtraNamespaceMatch::Fixed { full_namespace } => full_namespace,
        }
    }
}

/// Returns `true` when the object property name matches `property`.
fn prop_name_matches(key: &PropName, property: &str) -> bool {
    match key {
        PropName::Ident(ident) => ident.sym.as_str() == property,
        PropName::Str(string_key) => string_key.value.to_string_lossy() == property,
        _ => false,
    }
}

/// Statically resolves the namespace of an extra caller call-site from its
/// config (positional argument, then fixed constant, then options-object
/// property). Returns `None` when the namespace is absent or dynamic — the
/// call is then left untouched and resolves through the runtime registry.
fn resolve_extra_namespace(
    extra_caller: &ExtraCallerConfig,
    args: &[ExprOrSpread],
) -> Option<ExtraNamespaceMatch> {
    if let Some(index) = extra_caller.namespace_arg_index {
        if let Some(arg) = args.get(index) {
            if let Some(full_namespace) = read_static_string(&arg.expr) {
                return Some(ExtraNamespaceMatch::Argument {
                    index,
                    full_namespace,
                });
            }
        }
    }

    if let Some(fixed_namespace) = &extra_caller.fixed_namespace {
        return Some(ExtraNamespaceMatch::Fixed {
            full_namespace: fixed_namespace.clone(),
        });
    }

    if let Some(option) = &extra_caller.namespace_option {
        if let Some(arg) = args.get(option.argument_index) {
            if let Expr::Object(object_lit) = &*arg.expr {
                for object_prop in &object_lit.props {
                    if let PropOrSpread::Prop(prop) = object_prop {
                        if let Prop::KeyValue(KeyValueProp { key, value }) = &**prop {
                            if prop_name_matches(key, &option.property) {
                                if let Some(full_namespace) = read_static_string(value) {
                                    return Some(ExtraNamespaceMatch::Option {
                                        argument_index: option.argument_index,
                                        full_namespace,
                                    });
                                }
                                return None; // property present but dynamic
                            }
                        }
                    }
                }
            }
        }
    }

    None
}

/// Rewrites the namespace property of the options object at `argument_index`
/// to the key-prefix remainder, or removes it entirely when the namespace had
/// no nested part — so the runtime helper does not re-apply the dictionary key
/// as a lookup prefix.
fn rewrite_namespace_option(
    args: &mut [ExprOrSpread],
    argument_index: usize,
    property: &str,
    key_prefix: &str,
) {
    let Some(arg) = args.get_mut(argument_index) else {
        return;
    };
    let Expr::Object(object_lit) = &mut *arg.expr else {
        return;
    };

    if key_prefix.is_empty() {
        object_lit.props.retain(|object_prop| {
            if let PropOrSpread::Prop(prop) = object_prop {
                if let Prop::KeyValue(KeyValueProp { key, .. }) = &**prop {
                    return !prop_name_matches(key, property);
                }
            }
            true
        });
        return;
    }

    for object_prop in &mut object_lit.props {
        if let PropOrSpread::Prop(prop) = object_prop {
            if let Prop::KeyValue(KeyValueProp { key, value }) = &mut **prop {
                if prop_name_matches(key, property) {
                    *value = Box::new(Expr::Lit(Lit::Str(Str {
                        span: DUMMY_SP,
                        value: Atom::from(key_prefix).into(),
                        raw: None,
                    })));
                }
            }
        }
    }
}

// ─────────────────────────────────────────────────────────────────────────────
//  AST VISITOR
// ─────────────────────────────────────────────────────────────────────────────

/// Metadata stored in the pre-pass caller map value.
/// For native callers this is always the original name; for extra callers we
/// also keep the index of the matching [`ExtraCallerConfig`].
#[derive(Clone, Debug)]
struct CallerMeta {
    /// Original function name (e.g. `"useIntlayer"` or `"useTranslation"`).
    original_name: String,
    /// Index of the matching extra caller config (`None` for native callers).
    extra_index: Option<usize>,
}

struct PrePassVisitor<'a> {
    dictionary_mode_map: &'a BTreeMap<String, String>,
    extra_callers: &'a [ExtraCallerConfig],
    /// A native `useIntlayer` call resolves to a dynamic/fetch dictionary.
    has_dynamic_call: bool,
    /// An extra (compat) caller resolves to a dynamic/fetch dictionary.
    extra_has_dynamic_call: bool,
    /// Local extra-caller names with at least one unresolvable call site —
    /// rewriting the shared import while leaving those calls untouched would
    /// hand a raw namespace string to the dictionary-accepting helper.
    unresolvable_extra_locals: HashSet<String>,
    /// Maps local identifier -> CallerMeta.
    caller_map: BTreeMap<String, CallerMeta>,
}

impl<'a> VisitMut for PrePassVisitor<'a> {
    fn visit_mut_import_decl(&mut self, import: &mut ImportDecl) {
        let pkg_str = import.src.value.as_str().unwrap_or_default();

        let is_native_pkg = PACKAGE_LIST.contains(&pkg_str);
        let has_extra_caller_for_pkg = self
            .extra_callers
            .iter()
            .any(|ec| ec.import_sources.iter().any(|s| s == pkg_str));

        if !is_native_pkg && !has_extra_caller_for_pkg {
            import.visit_mut_children_with(self);
            return;
        }

        for spec in &import.specifiers {
            if let ImportSpecifier::Named(named) = spec {
                let imported_name = if let Some(ModuleExportName::Ident(id)) = &named.imported {
                    id.sym.to_string()
                } else if let Some(ModuleExportName::Str(str)) = &named.imported {
                    str.value.to_string_lossy().into_owned()
                } else {
                    named.local.sym.to_string()
                };

                if is_native_pkg
                    && (imported_name == "useIntlayer" || imported_name == "getIntlayer")
                {
                    self.caller_map.insert(
                        named.local.sym.to_string(),
                        CallerMeta {
                            original_name: imported_name.clone(),
                            extra_index: None,
                        },
                    );
                }

                // Register extra callers from matching import sources
                if let Some(extra_index) = self.extra_callers.iter().position(|ec| {
                    ec.import_sources.iter().any(|s| s == pkg_str)
                        && ec.caller_name == imported_name
                }) {
                    self.caller_map.insert(
                        named.local.sym.to_string(),
                        CallerMeta {
                            original_name: imported_name.clone(),
                            extra_index: Some(extra_index),
                        },
                    );
                }
            }
        }
        import.visit_mut_children_with(self);
    }

    fn visit_mut_call_expr(&mut self, call: &mut CallExpr) {
        let callee_ident = match &call.callee {
            Callee::Expr(callee_expr) => {
                if let Expr::Ident(id) = &**callee_expr {
                    id.sym.as_ref()
                } else {
                    return;
                }
            }
            _ => return,
        };

        let meta = self.caller_map.get(callee_ident).cloned();

        if let Some(meta) = meta {
            if let Some(extra_index) = meta.extra_index {
                // Extra (compat) caller: resolve the namespace through its
                // config; unresolvable call sites disable the rewrite for the
                // whole local name (the import specifier is shared).
                let extra_caller = &self.extra_callers[extra_index];

                match resolve_extra_namespace(extra_caller, &call.args) {
                    Some(namespace_match) => {
                        let (dict_key, _prefix) = split_namespace(namespace_match.full_namespace());
                        if let Some(mode) = self.dictionary_mode_map.get(dict_key) {
                            if mode == "dynamic" || mode == "fetch" {
                                self.extra_has_dynamic_call = true;
                            }
                        }
                    }
                    None => {
                        self.unresolvable_extra_locals
                            .insert(callee_ident.to_string());
                    }
                }
            } else if meta.original_name == "useIntlayer" {
                if let Some(arg) = call.args.first() {
                    if let Some(full) = read_static_string(&arg.expr) {
                        let (dict_key, _prefix) = split_namespace(&full);
                        if let Some(mode) = self.dictionary_mode_map.get(dict_key) {
                            if mode == "dynamic" || mode == "fetch" {
                                self.has_dynamic_call = true;
                            }
                        }
                    }
                }
            }
        }
        call.visit_mut_children_with(self);
    }
}

struct TransformVisitor<'a> {
    dictionaries_dir: &'a str,
    dynamic_dictionaries_dir: &'a str,
    import_mode: String,
    dictionary_mode_map: &'a BTreeMap<String, String>,
    extra_callers: &'a [ExtraCallerConfig],
    new_static_imports: BTreeMap<String, Ident>,
    new_dynamic_imports: BTreeMap<String, Ident>,
    use_dynamic_helpers: bool,
    file_has_dynamic_call: bool,
    /// File-level dynamic decision for extra (compat) callers: one import
    /// specifier serves every call, so a global dynamic/fetch mode or any
    /// per-dictionary override flips all rewritten compat calls to the
    /// dynamic helper.
    extra_use_dynamic_helpers: bool,
    caller_map: BTreeMap<String, CallerMeta>,
}

impl<'a> TransformVisitor<'a> {
    /// Returns the cached identifier for `key` in the map matching
    /// `per_call_mode` (`"static"`, `"dynamic"` or `"fetch"`), creating and
    /// registering it on first use. Dynamic and fetch identifiers share one
    /// map because they resolve to the same import slot, distinguished only
    /// by their `_dyn` / `_fetch` suffix.
    fn import_ident(&mut self, key: &str, per_call_mode: &str) -> Ident {
        let (map, suffix) = match per_call_mode {
            "fetch" => (&mut self.new_dynamic_imports, "_fetch"),
            "dynamic" => (&mut self.new_dynamic_imports, "_dyn"),
            _ => (&mut self.new_static_imports, ""),
        };

        if let Some(ident) = map.get(key) {
            return ident.clone();
        }
        let ident = make_hashed_ident(key, suffix);
        map.insert(key.to_string(), ident.clone());
        ident
    }
}

/// Derives a short, stable identifier from a dictionary key using
/// xxHash64 + base62, prefixed with `_` and followed by `suffix`.
/// Example: `"locale-switcher"` → `"_eEmT39vss4n4"` (empty suffix).
fn make_hashed_ident(key: &str, suffix: &str) -> Ident {
    let mut hasher = BuildHasherDefault::<XxHash64>::default().build_hasher();
    hasher.write(key.as_bytes());
    let hash = hasher.finish();
    let mut encoded = base62_encode(hash);
    encoded.insert(0, '_');
    encoded.push_str(suffix);
    Ident::new(Atom::from(encoded), DUMMY_SP, SyntaxContext::empty())
}

/// Packages whose named imports (`useIntlayer` / `getIntlayer`) are rewritten.
const PACKAGE_LIST: &[&str] = &[
    "intlayer",
    "@intlayer/core",
    "@intlayer/core/interpreter",
    "react-intlayer",
    "react-intlayer/client",
    "react-intlayer/server",
    "next-intlayer",
    "next-intlayer/client",
    "next-intlayer/server",
    "svelte-intlayer",
    "vue-intlayer",
    "angular-intlayer",
    "preact-intlayer",
    "solid-intlayer",
];

/// Subset of [`PACKAGE_LIST`] that exports a `useDictionaryDynamic` helper.
const PACKAGE_LIST_DYNAMIC: &[&str] = &[
    "react-intlayer",
    "react-intlayer/client",
    "react-intlayer/server",
    "next-intlayer",
    "next-intlayer/client",
    "next-intlayer/server",
    "preact-intlayer",
    "vue-intlayer",
    "solid-intlayer",
    "svelte-intlayer",
    "angular-intlayer",
];

impl<'a> VisitMut for TransformVisitor<'a> {
    fn visit_mut_expr(&mut self, expr: &mut Expr) {
        expr.visit_mut_children_with(self);

        if let Expr::Call(call) = expr {
            let callee_ident = match &call.callee {
                Callee::Expr(callee_expr) => {
                    if let Expr::Ident(id) = &**callee_expr {
                        id.sym.as_ref()
                    } else {
                        return;
                    }
                }
                _ => return,
            };

            let Some(meta) = self.caller_map.get(callee_ident) else {
                return;
            };
            let extra_index = meta.extra_index;
            let is_use_intlayer = meta.original_name == "useIntlayer";

            if let Some(extra_index) = extra_index {
                // ── Extra (compat) caller rewrite ─────────────────────────────
                // Replace the namespace with a pre-imported dictionary ident
                // (or prepend it for fixed/option namespaces), inserting the
                // dictionary key and nested key prefix for the dynamic helper.
                let extra_caller = &self.extra_callers[extra_index];

                let Some(namespace_match) = resolve_extra_namespace(extra_caller, &call.args)
                else {
                    return; // filtered by the pre-pass — stay safe
                };

                let (dict_key, key_prefix) = {
                    let (dict_key, key_prefix) = split_namespace(namespace_match.full_namespace());
                    (dict_key.to_string(), key_prefix.to_string())
                };

                // Extracted before `import_ident` takes `&mut self`, ending
                // the `extra_caller` borrow.
                let namespace_option_property: Option<String> = extra_caller
                    .namespace_option
                    .as_ref()
                    .map(|option| option.property.clone());

                // The import specifier serves every call in the file, so a
                // dynamic file receives a dynamic loader for every call.
                let mut per_call_mode = "static";
                if self.extra_use_dynamic_helpers {
                    per_call_mode =
                        match self.dictionary_mode_map.get(&dict_key).map(String::as_str) {
                            Some("dynamic") => "dynamic",
                            Some("fetch") => "fetch",
                            _ if self.import_mode == "fetch" => "fetch",
                            _ => "dynamic",
                        };
                }

                let ident = self.import_ident(&dict_key, per_call_mode);

                let make_string_arg = |value: &str| ExprOrSpread {
                    spread: None,
                    expr: Box::new(Expr::Lit(Lit::Str(Str {
                        span: DUMMY_SP,
                        value: Atom::from(value).into(),
                        raw: None,
                    }))),
                };

                let is_dynamic_helper = per_call_mode == "dynamic" || per_call_mode == "fetch";

                match &namespace_match {
                    ExtraNamespaceMatch::Argument { index, .. } => {
                        // Positional namespace: replace the string with the
                        // dictionary, then (dynamic) key and (nested) prefix.
                        call.args[*index].expr = Box::new(Expr::Ident(ident));
                        let mut insert_at = index + 1;
                        if is_dynamic_helper {
                            call.args.insert(insert_at, make_string_arg(&dict_key));
                            insert_at += 1;
                        }
                        if !key_prefix.is_empty() {
                            call.args.insert(insert_at, make_string_arg(&key_prefix));
                        }
                    }
                    ExtraNamespaceMatch::Fixed { .. } | ExtraNamespaceMatch::Option { .. } => {
                        // Fixed / option namespace: prepend the dictionary
                        // (and the key for the dynamic helper).
                        if is_dynamic_helper {
                            call.args.insert(0, make_string_arg(&dict_key));
                        }
                        call.args.insert(
                            0,
                            ExprOrSpread {
                                spread: None,
                                expr: Box::new(Expr::Ident(ident)),
                            },
                        );
                    }
                }

                if let ExtraNamespaceMatch::Option { argument_index, .. } = &namespace_match {
                    // The options object shifted right by the prepended args.
                    let shifted_index = argument_index + if is_dynamic_helper { 2 } else { 1 };
                    rewrite_namespace_option(
                        &mut call.args,
                        shifted_index,
                        namespace_option_property.as_deref().unwrap_or_default(),
                        &key_prefix,
                    );
                }

                return;
            }

            let Some(arg) = call.args.first() else {
                return;
            };

            let Some(full_namespace) = read_static_string(&arg.expr) else {
                return;
            };

            let (dict_key, _key_prefix) = split_namespace(&full_namespace);
            let dict_key = dict_key.to_string();

            // Normalise to `'static` strings so the mode does not hold a
            // borrow of the visitor while `import_ident` mutates it.
            let dictionary_override_mode =
                match self.dictionary_mode_map.get(&dict_key).map(String::as_str) {
                    Some("dynamic") => Some("dynamic"),
                    Some("fetch") => Some("fetch"),
                    Some(_) => Some("static"),
                    None => None,
                };

            let mut per_call_mode = "static";
            if is_use_intlayer {
                if self.use_dynamic_helpers {
                    per_call_mode =
                        dictionary_override_mode.unwrap_or(match self.import_mode.as_str() {
                            "dynamic" => "dynamic",
                            "fetch" => "fetch",
                            _ => "static",
                        });
                } else if let Some(mode @ ("dynamic" | "fetch")) = dictionary_override_mode {
                    per_call_mode = mode;
                }
            }

            // ── Native caller rewrite (useIntlayer / getIntlayer) ────────────
            let ident = self.import_ident(&dict_key, per_call_mode);

            if per_call_mode == "dynamic" || per_call_mode == "fetch" {
                // Dynamic helper: first argument is the loader, second the key.
                call.args.insert(
                    0,
                    ExprOrSpread {
                        spread: None,
                        expr: Box::new(Expr::Ident(ident)),
                    },
                );
            } else {
                // Static helper (useDictionary / getDictionary): replace the
                // key argument with the imported dictionary object.
                let Some(first_arg) = call.args.first_mut() else {
                    return;
                };
                first_arg.expr = Box::new(Expr::Ident(ident));
            }
        }
    }

    fn visit_mut_import_decl(&mut self, import: &mut ImportDecl) {
        import.visit_mut_children_with(self);

        let pkg_str = import.src.value.as_str().unwrap_or_default();

        let is_native_pkg = PACKAGE_LIST.contains(&pkg_str);
        let has_extra_caller_for_pkg = self
            .extra_callers
            .iter()
            .any(|ec| ec.import_sources.iter().any(|s| s == pkg_str));

        if !is_native_pkg && !has_extra_caller_for_pkg {
            return;
        }

        let package_supports_dynamic = is_native_pkg && PACKAGE_LIST_DYNAMIC.contains(&pkg_str);
        let should_use_dynamic_helpers = (self.import_mode == "dynamic"
            || self.import_mode == "fetch"
            || self.file_has_dynamic_call)
            && package_supports_dynamic;

        if should_use_dynamic_helpers {
            self.use_dynamic_helpers = true;
        }

        for spec in &mut import.specifiers {
            if let ImportSpecifier::Named(named) = spec {
                let imported_name = if let Some(ModuleExportName::Ident(id)) = &named.imported {
                    id.sym.to_string()
                } else if let Some(ModuleExportName::Str(str)) = &named.imported {
                    str.value.to_string_lossy().into_owned()
                } else {
                    named.local.sym.to_string()
                };

                if is_native_pkg {
                    match imported_name.as_str() {
                        "useIntlayer" => {
                            if should_use_dynamic_helpers {
                                named.imported = Some(ModuleExportName::Ident(Ident::new(
                                    Atom::from("useDictionaryDynamic"),
                                    DUMMY_SP,
                                    SyntaxContext::empty(),
                                )));
                            } else {
                                named.imported = Some(ModuleExportName::Ident(Ident::new(
                                    Atom::from("useDictionary"),
                                    DUMMY_SP,
                                    SyntaxContext::empty(),
                                )));
                            }
                        }
                        "getIntlayer" => {
                            named.imported = Some(ModuleExportName::Ident(Ident::new(
                                Atom::from("getDictionary"),
                                DUMMY_SP,
                                SyntaxContext::empty(),
                            )));
                        }
                        _ => {}
                    }
                }

                // Rewrite extra caller imports to their *Dictionary
                // replacement. Locals with unresolvable call sites were
                // dropped from the caller map and keep the original import.
                let local_name = named.local.sym.to_string();
                let is_registered_extra = self
                    .caller_map
                    .get(&local_name)
                    .is_some_and(|meta| meta.extra_index.is_some());

                if is_registered_extra {
                    if let Some(ec) = self.extra_callers.iter().find(|ec| {
                        ec.import_sources.iter().any(|s| s == pkg_str)
                            && ec.caller_name == imported_name
                    }) {
                        let replacement_name = if self.extra_use_dynamic_helpers {
                            &ec.dynamic_replacement
                        } else {
                            &ec.static_replacement
                        };

                        named.imported = Some(ModuleExportName::Ident(Ident::new(
                            Atom::from(replacement_name.as_str()),
                            DUMMY_SP,
                            SyntaxContext::empty(),
                        )));
                    }
                }
            }
        }
    }
}

// ─────────────────────────────────────────────────────────────────────────────
//  PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────

/// Emits a `Program` AST back to JavaScript/TypeScript source code as a `String`.
/// Used exclusively for debug logging.
fn program_to_code(program: &Program) -> String {
    use swc_core::common::sync::Lrc;
    let cm = Lrc::new(SourceMap::default());
    let mut buf = vec![];
    {
        let writer = JsWriter::new(cm.clone(), "\n", &mut buf, None);
        let mut emitter = Emitter {
            cfg: swc_core::ecma::codegen::Config::default(),
            cm: cm.clone(),
            comments: None,
            wr: writer,
        };
        let _ = emitter.emit_program(program);
    }
    String::from_utf8_lossy(&buf).into_owned()
}

/// Computes the module specifier for an injected dictionary import: the path
/// of `dict_file_abs` relative to `from_dir_abs`, using forward slashes and a
/// leading `./` when the path is not already relative. Falls back to the
/// absolute path when no relative path exists (e.g. different drives).
fn relative_import_path(dict_file_abs: &Path, from_dir_abs: &Path) -> String {
    if let Some(relative) = diff_paths(dict_file_abs, from_dir_abs) {
        let path = relative.to_string_lossy().replace('\\', "/");
        if path.starts_with('.') {
            path
        } else {
            format!("./{}", path)
        }
    } else {
        dict_file_abs.to_string_lossy().replace('\\', "/")
    }
}

/// Normalises a path string to use forward slashes and consistent drive-letter
/// casing so that [`pathdiff::diff_paths`] works correctly in Wasm / cross-platform
/// contexts where Windows-style paths may arrive from the JS host.
pub fn normalize_path(path: &str) -> String {
    let mut s = path.replace('\\', "/");

    if s.len() >= 2 {
        let bytes = s.as_bytes();
        if bytes[1] == b':' {
            let first_char = s.chars().next().unwrap();
            if first_char.is_ascii_alphabetic() {
                let lower_drive = first_char.to_ascii_lowercase();
                if first_char != lower_drive {
                    s.replace_range(0..1, &lower_drive.to_string());
                }
            }
        }
    }
    s
}

/// Applies the Intlayer SWC transform to `program`.
///
/// This is the core transformation function exposed as a native Rust API.
/// The Wasm plugin entry point ([`transform`]) delegates directly to this
/// function after deserialising the JSON plugin config.
///
/// # Arguments
///
/// * `program` – The parsed SWC AST to transform.
/// * `cfg` – Plugin configuration (see [`PluginConfig`]).
/// * `filename_raw` – Absolute path of the file being compiled, as provided
///   by the build tool. Used to compute relative import paths for injected
///   dictionary imports.
///
/// # Returns
///
/// The transformed AST.
pub fn process_transform(
    mut program: Program,
    mut cfg: PluginConfig,
    filename_raw: String,
) -> Program {
    cfg.dictionaries_dir = normalize_path(&cfg.dictionaries_dir);
    cfg.dynamic_dictionaries_dir = normalize_path(&cfg.dynamic_dictionaries_dir);
    cfg.fetch_dictionaries_dir = normalize_path(&cfg.fetch_dictionaries_dir);
    cfg.dictionaries_entry_path = normalize_path(&cfg.dictionaries_entry_path);

    // Resolve the file to process: when a `files_list` allowlist is given the
    // matched entry wins (it carries the absolute path), otherwise the raw
    // build-tool filename is used as-is.
    let matched_filename: &str = if cfg.files_list.is_empty() {
        if DEBUG_LOG {
            println!(
                "[swc-intlayer] processing file: {} (files_list empty)",
                filename_raw
            );
        }
        &filename_raw
    } else {
        let matched = cfg
            .files_list
            .iter()
            .find(|target| filename_raw.ends_with(*target) || target.ends_with(&filename_raw));

        let Some(target) = matched else {
            if DEBUG_LOG {
                println!(
                    "[swc-intlayer] skipping: {} (not in files_list)",
                    filename_raw
                );
            }
            return program;
        };

        if DEBUG_LOG {
            println!(
                "[swc-intlayer] processing file: {} (matched absolute: {})",
                filename_raw, target
            );
        }
        target
    };

    let working_filename = normalize_path(matched_filename);

    if cfg.replace_dictionary_entry.unwrap_or(false) {
        let is_main_entry = working_filename == cfg.dictionaries_entry_path
            || normalize_path(&filename_raw) == cfg.dictionaries_entry_path;

        if is_main_entry {
            let func_name = "getDictionaries";

            let default_export =
                ModuleItem::ModuleDecl(ModuleDecl::ExportDefaultExpr(ExportDefaultExpr {
                    span: DUMMY_SP,
                    expr: Box::new(Expr::Object(ObjectLit {
                        span: DUMMY_SP,
                        props: Vec::new(),
                    })),
                }));

            let named_export = ModuleItem::ModuleDecl(ModuleDecl::ExportDecl(ExportDecl {
                span: DUMMY_SP,
                decl: Decl::Var(Box::new(VarDecl {
                    span: DUMMY_SP,
                    ctxt: SyntaxContext::empty(),
                    kind: VarDeclKind::Const,
                    declare: false,
                    decls: vec![VarDeclarator {
                        span: DUMMY_SP,
                        name: Pat::Ident(BindingIdent {
                            id: Ident::new(Atom::from(func_name), DUMMY_SP, SyntaxContext::empty()),
                            type_ann: None,
                        }),
                        init: Some(Box::new(Expr::Arrow(ArrowExpr {
                            span: DUMMY_SP,
                            ctxt: SyntaxContext::empty(),
                            params: vec![],
                            is_async: false,
                            is_generator: false,
                            type_params: None,
                            return_type: None,
                            body: Box::new(BlockStmtOrExpr::Expr(Box::new(Expr::Object(
                                ObjectLit {
                                    span: DUMMY_SP,
                                    props: Vec::new(),
                                },
                            )))),
                        }))),
                        definite: false,
                    }],
                })),
            }));

            return Program::Module(Module {
                span: DUMMY_SP,
                body: vec![default_export, named_export],
                shebang: None,
            });
        }
    }

    let import_mode = cfg.import_mode.unwrap_or_else(|| "static".to_string());
    let dictionary_mode_map = cfg.dictionary_mode_map.unwrap_or_default();

    let mut pre_pass = PrePassVisitor {
        dictionary_mode_map: &dictionary_mode_map,
        extra_callers: &cfg.extra_callers,
        has_dynamic_call: false,
        extra_has_dynamic_call: false,
        unresolvable_extra_locals: HashSet::new(),
        caller_map: BTreeMap::new(),
    };
    program.visit_mut_with(&mut pre_pass);

    // Extra callers with an unresolvable call site keep their original
    // implementation: rewriting the shared import while leaving those calls
    // untouched would hand a raw namespace string to the dictionary helper.
    let mut caller_map = pre_pass.caller_map;
    caller_map.retain(|local_name, meta| {
        meta.extra_index.is_none() || !pre_pass.unresolvable_extra_locals.contains(local_name)
    });

    let extra_use_dynamic_helpers =
        import_mode == "dynamic" || import_mode == "fetch" || pre_pass.extra_has_dynamic_call;

    let mut visitor = TransformVisitor {
        dictionaries_dir: &cfg.dictionaries_dir,
        dynamic_dictionaries_dir: &cfg.dynamic_dictionaries_dir,
        import_mode,
        dictionary_mode_map: &dictionary_mode_map,
        extra_callers: &cfg.extra_callers,
        new_static_imports: BTreeMap::new(),
        new_dynamic_imports: BTreeMap::new(),
        use_dynamic_helpers: false,
        file_has_dynamic_call: pre_pass.has_dynamic_call,
        extra_use_dynamic_helpers,
        caller_map,
    };
    program.visit_mut_with(&mut visitor);

    if let Program::Module(Module { body, .. }) = &mut program {
        let dictionaries_dir = visitor.dictionaries_dir;
        let dynamic_dictionaries_dir = visitor.dynamic_dictionaries_dir;
        let fetch_dictionaries_dir = cfg.fetch_dictionaries_dir.as_str();

        let file_path_abs = Path::new(&working_filename);
        let file_dir_abs = file_path_abs.parent().unwrap_or_else(|| Path::new("/"));

        // Keep a leading `'use client'` / `'use server'` directive at the top
        // of the module by inserting the imports after it.
        let mut insert_pos = 0;
        if let Some(ModuleItem::Stmt(Stmt::Expr(ExprStmt { expr, .. }))) = body.first() {
            if let Expr::Lit(Lit::Str(Str { value, .. })) = &**expr {
                let directive = value.as_str();
                if directive == Some("use client") || directive == Some("use server") {
                    insert_pos = 1;
                }
            }
        }

        for (key, ident) in visitor.new_static_imports.iter().rev() {
            let dict_file_abs = Path::new(dictionaries_dir).join(format!("{}.json", key));
            let import_path = relative_import_path(&dict_file_abs, file_dir_abs);

            body.insert(
                insert_pos,
                ModuleItem::ModuleDecl(ModuleDecl::Import(ImportDecl {
                    span: DUMMY_SP,
                    specifiers: vec![ImportSpecifier::Default(ImportDefaultSpecifier {
                        span: DUMMY_SP,
                        local: ident.clone(),
                    })],
                    src: Box::new(Str::from(import_path)),
                    type_only: false,
                    with: Some(Box::new(ObjectLit {
                        span: DUMMY_SP,
                        props: vec![PropOrSpread::Prop(Box::new(Prop::KeyValue(KeyValueProp {
                            key: PropName::Ident(
                                Ident::new(Atom::from("type"), DUMMY_SP, SyntaxContext::empty())
                                    .into(),
                            ),
                            value: Box::new(Expr::Lit(Lit::Str(Str {
                                span: DUMMY_SP,
                                value: Atom::from("json").into(),
                                raw: None,
                            }))),
                        })))],
                    })),
                    phase: ImportPhase::Evaluation,
                })),
            );

            insert_pos += 1;
        }

        for (key, ident) in visitor.new_dynamic_imports.iter().rev() {
            let ident_name: &str = ident.sym.as_ref();
            let is_live_ident = ident_name.ends_with("_fetch");
            let target_dir = if is_live_ident {
                fetch_dictionaries_dir
            } else {
                dynamic_dictionaries_dir
            };
            let dict_file_abs = Path::new(target_dir).join(format!("{}.mjs", key));
            let import_path = relative_import_path(&dict_file_abs, file_dir_abs);

            body.insert(
                insert_pos,
                ModuleItem::ModuleDecl(ModuleDecl::Import(ImportDecl {
                    span: DUMMY_SP,
                    specifiers: vec![ImportSpecifier::Default(ImportDefaultSpecifier {
                        span: DUMMY_SP,
                        local: ident.clone(),
                    })],
                    src: Box::new(Str::from(import_path)),
                    type_only: false,
                    with: None,
                    phase: ImportPhase::Evaluation,
                })),
            );

            insert_pos += 1;
        }
    }

    if DEBUG_LOG {
        let static_count = if let Program::Module(m) = &program {
            m.body
                .iter()
                .filter(|item| matches!(item, ModuleItem::ModuleDecl(ModuleDecl::Import(_))))
                .count()
        } else {
            0
        };
        let was_transformed =
            !visitor.new_static_imports.is_empty() || !visitor.new_dynamic_imports.is_empty();
        let label = if was_transformed {
            "transformed"
        } else {
            "unchanged"
        };
        let code = program_to_code(&program);
        println!(
            "[swc-intlayer] {} output for {} ({} total imports):\n{}\n",
            label, filename_raw, static_count, code
        );
    }

    program
}

// ─────────────────────────────────────────────────────────────────────────────
//  WASM PLUGIN ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────

/// SWC Wasm plugin entry point.
///
/// This function is only compiled when the `plugin` feature is enabled
/// (i.e. when building for `wasm32-wasip1` / `wasm32-unknown-unknown`).
/// Native Rust consumers should call [`process_transform`] directly instead.
#[cfg(feature = "plugin")]
#[plugin_transform]
pub fn transform(program: Program, metadata: TransformPluginProgramMetadata) -> Program {
    let cfg: PluginConfig = match metadata
        .get_transform_plugin_config()
        .and_then(|raw| serde_json::from_str::<PluginConfig>(&raw).ok())
    {
        Some(c) => c,
        None => return program,
    };

    let filename_raw = match metadata.get_context(&TransformPluginMetadataContextKind::Filename) {
        Some(f) => f,
        None => return program,
    };

    process_transform(program, cfg, filename_raw)
}

#[cfg(test)]
mod tests {
    use super::*;
    use swc_core::ecma::ast::Pass;
    use swc_core::ecma::parser::Syntax;
    use swc_core::ecma::transforms::testing::test_transform;
    use swc_core::ecma::visit::Fold;

    fn get_config(mode: &str) -> PluginConfig {
        PluginConfig {
            dictionaries_dir: "/app/.intlayer/dictionaries".to_string(),
            dictionaries_entry_path: "/app/.intlayer/dictionaries.mjs".to_string(),
            dynamic_dictionaries_dir: "/app/.intlayer/dynamic_dictionaries".to_string(),
            fetch_dictionaries_dir: "/app/.intlayer/fetch_dictionaries".to_string(),
            import_mode: Some(mode.to_string()),
            replace_dictionary_entry: Some(false),
            files_list: vec![],
            dictionary_mode_map: None,
            extra_callers: vec![],
        }
    }

    /// react-i18next-style extra caller: positional namespace at index 0.
    fn use_translation_caller() -> ExtraCallerConfig {
        ExtraCallerConfig {
            caller_name: "useTranslation".to_string(),
            import_sources: vec![
                "react-i18next".to_string(),
                "@intlayer/react-i18next".to_string(),
            ],
            namespace_arg_index: Some(0),
            fixed_namespace: None,
            namespace_option: None,
            static_replacement: "useDictionary".to_string(),
            dynamic_replacement: "useDictionaryDynamic".to_string(),
        }
    }

    /// vue-i18n-style extra caller: namespace read from an options property.
    fn use_i18n_caller() -> ExtraCallerConfig {
        ExtraCallerConfig {
            caller_name: "useI18n".to_string(),
            import_sources: vec!["vue-i18n".to_string(), "@intlayer/vue-i18n".to_string()],
            namespace_arg_index: None,
            fixed_namespace: None,
            namespace_option: Some(NamespaceOptionConfig {
                argument_index: 0,
                property: "namespace".to_string(),
            }),
            static_replacement: "useDictionary".to_string(),
            dynamic_replacement: "useDictionaryDynamic".to_string(),
        }
    }

    /// lingui-style extra caller: fixed single-catalog namespace.
    fn use_lingui_caller() -> ExtraCallerConfig {
        ExtraCallerConfig {
            caller_name: "useLingui".to_string(),
            import_sources: vec!["@lingui/react".to_string(), "@intlayer/lingui".to_string()],
            namespace_arg_index: None,
            fixed_namespace: Some("messages".to_string()),
            namespace_option: None,
            static_replacement: "useDictionary".to_string(),
            dynamic_replacement: "useDictionaryDynamic".to_string(),
        }
    }

    fn get_config_with_extra_callers(
        mode: &str,
        extra_callers: Vec<ExtraCallerConfig>,
    ) -> PluginConfig {
        PluginConfig {
            extra_callers,
            ..get_config(mode)
        }
    }

    struct TestFolder {
        cfg: PluginConfig,
        filename: String,
    }

    impl Fold for TestFolder {
        fn fold_program(&mut self, p: Program) -> Program {
            process_transform(p, self.cfg.clone(), self.filename.clone())
        }
    }

    impl Pass for TestFolder {
        fn process(&mut self, program: &mut Program) {
            let p = std::mem::replace(
                program,
                Program::Module(Module {
                    span: DUMMY_SP,
                    body: vec![],
                    shebang: None,
                }),
            );
            let new_p = self.fold_program(p);
            *program = new_p;
        }
    }

    #[test]
    fn static_import() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config("static"),
                filename: "/app/src/page.tsx".to_string(),
            },
            r#"
            import { useIntlayer } from "react-intlayer";
            const t = useIntlayer("locale-switcher");
            "#,
            r#"
            import _FsHhNfuhm85 from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };
            import { useDictionary as useIntlayer } from "react-intlayer";
            const t = useIntlayer(_FsHhNfuhm85);
            "#,
        );
    }

    #[test]
    fn dynamic_import() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config("dynamic"),
                filename: "/app/src/page.tsx".to_string(),
            },
            r#"
            import { useIntlayer } from "react-intlayer";
            const t = useIntlayer("locale-switcher");
            "#,
            r#"
            import _FsHhNfuhm85_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";
            import { useDictionaryDynamic as useIntlayer } from "react-intlayer";
            const t = useIntlayer(_FsHhNfuhm85_dyn, "locale-switcher");
            "#,
        );
    }

    #[test]
    fn fetch_import() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config("fetch"),
                filename: "/app/src/page.tsx".to_string(),
            },
            r#"
            import { useIntlayer } from "react-intlayer";
            const t = useIntlayer("locale-switcher");
            "#,
            r#"
            import _FsHhNfuhm85_fetch from "../.intlayer/fetch_dictionaries/locale-switcher.mjs";
            import { useDictionaryDynamic as useIntlayer } from "react-intlayer";
            const t = useIntlayer(_FsHhNfuhm85_fetch, "locale-switcher");
            "#,
        );
    }

    #[test]
    fn svelte_static_import() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config("static"),
                filename: "/app/src/page.svelte".to_string(),
            },
            r#"
            import { useIntlayer } from "svelte-intlayer";
            const t = useIntlayer("locale-switcher");
            "#,
            r#"
            import _FsHhNfuhm85 from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };
            import { useDictionary as useIntlayer } from "svelte-intlayer";
            const t = useIntlayer(_FsHhNfuhm85);
            "#,
        );
    }

    #[test]
    fn svelte_dynamic_import() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config("dynamic"),
                filename: "/app/src/page.svelte".to_string(),
            },
            r#"
            import { useIntlayer } from "svelte-intlayer";
            const t = useIntlayer("locale-switcher");
            "#,
            r#"
            import _FsHhNfuhm85_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";
            import { useDictionaryDynamic as useIntlayer } from "svelte-intlayer";
            const t = useIntlayer(_FsHhNfuhm85_dyn, "locale-switcher");
            "#,
        );
    }

    #[test]
    fn extra_caller_positional_static() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config_with_extra_callers("static", vec![use_translation_caller()]),
                filename: "/app/src/page.tsx".to_string(),
            },
            r#"
            import { useTranslation } from "react-i18next";
            const { t } = useTranslation("about", { keyPrefix: "counter" });
            "#,
            r#"
            import _5sczV2UpZbQ from "../.intlayer/dictionaries/about.json" with { type: "json" };
            import { useDictionary as useTranslation } from "react-i18next";
            const { t } = useTranslation(_5sczV2UpZbQ, { keyPrefix: "counter" });
            "#,
        );
    }

    #[test]
    fn extra_caller_nested_namespace_static() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config_with_extra_callers("static", vec![use_translation_caller()]),
                filename: "/app/src/page.tsx".to_string(),
            },
            r#"
            import { useTranslation } from "react-i18next";
            const { t } = useTranslation("about.counter");
            "#,
            r#"
            import _5sczV2UpZbQ from "../.intlayer/dictionaries/about.json" with { type: "json" };
            import { useDictionary as useTranslation } from "react-i18next";
            const { t } = useTranslation(_5sczV2UpZbQ, "counter");
            "#,
        );
    }

    #[test]
    fn extra_caller_positional_dynamic() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config_with_extra_callers("dynamic", vec![use_translation_caller()]),
                filename: "/app/src/page.tsx".to_string(),
            },
            r#"
            import { useTranslation } from "react-i18next";
            const { t } = useTranslation("about.counter");
            "#,
            r#"
            import _5sczV2UpZbQ_dyn from "../.intlayer/dynamic_dictionaries/about.mjs";
            import { useDictionaryDynamic as useTranslation } from "react-i18next";
            const { t } = useTranslation(_5sczV2UpZbQ_dyn, "about", "counter");
            "#,
        );
    }

    #[test]
    fn extra_caller_option_namespace_static() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config_with_extra_callers("static", vec![use_i18n_caller()]),
                filename: "/app/src/page.tsx".to_string(),
            },
            r#"
            import { useI18n } from "vue-i18n";
            const { t } = useI18n({ namespace: "about.counter", useScope: "global" });
            "#,
            r#"
            import _5sczV2UpZbQ from "../.intlayer/dictionaries/about.json" with { type: "json" };
            import { useDictionary as useI18n } from "vue-i18n";
            const { t } = useI18n(_5sczV2UpZbQ, { namespace: "counter", useScope: "global" });
            "#,
        );
    }

    #[test]
    fn extra_caller_option_namespace_dropped_when_plain() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config_with_extra_callers("static", vec![use_i18n_caller()]),
                filename: "/app/src/page.tsx".to_string(),
            },
            r#"
            import { useI18n } from "vue-i18n";
            const { t } = useI18n({ namespace: "about" });
            "#,
            r#"
            import _5sczV2UpZbQ from "../.intlayer/dictionaries/about.json" with { type: "json" };
            import { useDictionary as useI18n } from "vue-i18n";
            const { t } = useI18n(_5sczV2UpZbQ, {});
            "#,
        );
    }

    #[test]
    fn extra_caller_fixed_namespace_static() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config_with_extra_callers("static", vec![use_lingui_caller()]),
                filename: "/app/src/page.tsx".to_string(),
            },
            r#"
            import { useLingui } from "@lingui/react";
            const { t } = useLingui();
            "#,
            r#"
            import _7f0actFUfv4 from "../.intlayer/dictionaries/messages.json" with { type: "json" };
            import { useDictionary as useLingui } from "@lingui/react";
            const { t } = useLingui(_7f0actFUfv4);
            "#,
        );
    }

    #[test]
    fn extra_caller_unresolvable_namespace_keeps_original() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config_with_extra_callers("static", vec![use_translation_caller()]),
                filename: "/app/src/page.tsx".to_string(),
            },
            r#"
            import { useTranslation } from "react-i18next";
            const { t } = useTranslation("about");
            const { t: tDynamic } = useTranslation(namespace);
            "#,
            r#"
            import { useTranslation } from "react-i18next";
            const { t } = useTranslation("about");
            const { t: tDynamic } = useTranslation(namespace);
            "#,
        );
    }

    #[test]
    fn vue_static_import() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config("static"),
                filename: "/app/src/page.vue".to_string(),
            },
            r#"
            import { useIntlayer } from "vue-intlayer";
            const t = useIntlayer("locale-switcher");
            "#,
            r#"
            import _FsHhNfuhm85 from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };
            import { useDictionary as useIntlayer } from "vue-intlayer";
            const t = useIntlayer(_FsHhNfuhm85);
            "#,
        );
    }

    #[test]
    fn vue_dynamic_import() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config("dynamic"),
                filename: "/app/src/page.vue".to_string(),
            },
            r#"
            import { useIntlayer } from "vue-intlayer";
            const t = useIntlayer("locale-switcher");
            "#,
            r#"
            import _FsHhNfuhm85_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";
            import { useDictionaryDynamic as useIntlayer } from "vue-intlayer";
            const t = useIntlayer(_FsHhNfuhm85_dyn, "locale-switcher");
            "#,
        );
    }

    #[test]
    fn windows_path_resolution() {
        use super::normalize_path;
        use pathdiff::diff_paths;
        use std::path::Path;

        let base_raw = "C:/Users/User/Project/frontend/src/misc";
        let target_raw =
            "C:\\Users\\User\\Project\\frontend\\.intlayer\\dictionary\\portal-page.json";

        let base_norm = normalize_path(base_raw);
        let target_norm = normalize_path(target_raw);

        let diff_norm = diff_paths(Path::new(&target_norm), Path::new(&base_norm));

        if let Some(d) = diff_norm {
            let s = d.to_string_lossy().replace('\\', "/");
            assert_eq!(s, "../../.intlayer/dictionary/portal-page.json");
        } else {
            panic!("Normalized diff returned None");
        }
    }
}
