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
//!     };
//!     process_transform(program, config, "/project/src/page.tsx".into())
//! }
//! ```

use base62::encode as base62_encode;
use pathdiff::diff_paths;
use serde::Deserialize;
use twox_hash::XxHash64;
use std::{
    collections::{BTreeMap, HashSet},
    hash::{BuildHasher, BuildHasherDefault, Hasher},
    path::Path,
    sync::{LazyLock, Mutex},
};
use swc_core::{
    common::{SourceMap, SyntaxContext, DUMMY_SP},
    ecma::{
        ast::*,
        atoms::Atom,
        codegen::{
            text_writer::JsWriter,
            Emitter,
        },
        visit::{VisitMut, VisitMutWith},
    },
};

#[cfg(feature = "plugin")]
use swc_core::plugin::{
    metadata::{TransformPluginMetadataContextKind, TransformPluginProgramMetadata},
    plugin_transform,
};

static DEBUG_LOG: bool = false;

// ─────────────────────────────────────────────────────────────────────────────
//  GLOBAL REGISTRY
// ─────────────────────────────────────────────────────────────────────────────
static INTLAYER_KEYS: LazyLock<Mutex<HashSet<String>>> =
    LazyLock::new(|| Mutex::new(HashSet::new()));

// ─────────────────────────────────────────────────────────────────────────────
//  PLUGIN OPTIONS
// ─────────────────────────────────────────────────────────────────────────────

/// Descriptor for a compat-adapter caller that the SWC plugin should recognise
/// and rewrite in the same way as the native `useIntlayer` / `getIntlayer`
/// calls (i.e. replace the string-key argument with a pre-imported dictionary
/// object and swap the function name for a `*Dictionary` variant).
///
/// These are supplied entirely by the compat adapter plugins (e.g.
/// `createNextI18nPlugin`) and are forwarded into the SWC config; no compat
/// names are hard-coded inside this crate.
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
    #[serde(rename = "namespaceArgIndex")]
    pub namespace_arg_index: usize,

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

// ─────────────────────────────────────────────────────────────────────────────
//  AST VISITOR
// ─────────────────────────────────────────────────────────────────────────────

/// Metadata stored in the pre-pass caller map value.
/// For native callers this is always the original name; for extra callers we
/// also need to know the namespace arg index so the pre-pass can look it up.
#[derive(Clone, Debug)]
struct CallerMeta {
    /// Original function name (e.g. `"useIntlayer"` or `"useTranslation"`).
    original_name: String,
    /// Positional index of the namespace/key argument (0 for native callers).
    namespace_arg_index: usize,
}

struct PrePassVisitor<'a> {
    dictionary_mode_map: &'a BTreeMap<String, String>,
    extra_callers: &'a Vec<ExtraCallerConfig>,
    has_dynamic_call: bool,
    /// Maps local identifier -> CallerMeta.
    caller_map: BTreeMap<String, CallerMeta>,
}

impl<'a> VisitMut for PrePassVisitor<'a> {
    fn visit_mut_import_decl(&mut self, import: &mut ImportDecl) {
        let pkg_atom = &import.src.value;
        let pkg_str = pkg_atom.as_str().unwrap_or_default();

        let is_native_pkg = PACKAGE_LIST.iter().any(|a| a.as_str() == pkg_str);
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
                            namespace_arg_index: 0,
                        },
                    );
                }

                // Register extra callers from matching import sources
                if let Some(ec) = self.extra_callers.iter().find(|ec| {
                    ec.import_sources.iter().any(|s| s == pkg_str)
                        && ec.caller_name == imported_name
                }) {
                    self.caller_map.insert(
                        named.local.sym.to_string(),
                        CallerMeta {
                            original_name: imported_name.clone(),
                            namespace_arg_index: ec.namespace_arg_index,
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

        let meta = self.caller_map.get(callee_ident);

        if let Some(meta) = meta {
            let is_use_intlayer = meta.original_name == "useIntlayer";
            let is_extra_caller = !is_use_intlayer && meta.original_name != "getIntlayer";
            let should_check = is_use_intlayer || is_extra_caller;

            if should_check {
                let arg_index = meta.namespace_arg_index;
                if let Some(arg) = call.args.get(arg_index) {
                    let mut key_opt: Option<String> = None;
                    if let Expr::Lit(Lit::Str(Str { value, .. })) = &*arg.expr {
                        let full = value.to_string_lossy().into_owned();
                        let (dict_key, _prefix) = split_namespace(&full);
                        key_opt = Some(dict_key.to_string());
                    } else if let Expr::Tpl(Tpl { exprs, quasis, .. }) = &*arg.expr {
                        if exprs.is_empty() && quasis.len() == 1 {
                            let full = quasis[0].raw.to_string();
                            let (dict_key, _prefix) = split_namespace(&full);
                            key_opt = Some(dict_key.to_string());
                        }
                    }

                    if let Some(key) = key_opt {
                        if let Some(mode) = self.dictionary_mode_map.get(&key) {
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
    extra_callers: &'a Vec<ExtraCallerConfig>,
    new_static_imports: BTreeMap<String, Ident>,
    new_dynamic_imports: BTreeMap<String, Ident>,
    use_dynamic_helpers: bool,
    file_has_dynamic_call: bool,
    caller_map: BTreeMap<String, CallerMeta>,
}

impl<'a> TransformVisitor<'a> {
    fn new(
        dictionaries_dir: &'a str,
        dynamic_dictionaries_dir: &'a str,
        import_mode: String,
        dictionary_mode_map: &'a BTreeMap<String, String>,
        extra_callers: &'a Vec<ExtraCallerConfig>,
        file_has_dynamic_call: bool,
        caller_map: BTreeMap<String, CallerMeta>,
    ) -> Self {
        Self {
            dictionaries_dir,
            dynamic_dictionaries_dir,
            import_mode,
            dictionary_mode_map,
            extra_callers,
            new_static_imports: BTreeMap::new(),
            new_dynamic_imports: BTreeMap::new(),
            use_dynamic_helpers: false,
            file_has_dynamic_call,
            caller_map,
        }
    }

    /// Derives a short, stable identifier from a dictionary key using xxHash64 + base62.
    /// Example: `"locale-switcher"` → `"_eEmT39vss4n4"`.
    fn make_ident(&self, key: &str) -> Ident {
        let mut hasher = BuildHasherDefault::<XxHash64>::default().build_hasher();
        hasher.write(key.as_bytes());
        let hash = hasher.finish();
        let mut encoded = base62_encode(hash);
        encoded.insert(0, '_');
        Ident::new(Atom::from(encoded), DUMMY_SP, SyntaxContext::empty())
    }

    /// Like [`make_ident`] but appends `_dyn` for dynamic-import identifiers.
    fn make_dynamic_ident(&self, key: &str) -> Ident {
        let mut hasher = BuildHasherDefault::<XxHash64>::default().build_hasher();
        hasher.write(key.as_bytes());
        let hash = hasher.finish();
        let mut encoded = base62_encode(hash);
        encoded.insert(0, '_');
        encoded.push_str("_dyn");
        Ident::new(Atom::from(encoded), DUMMY_SP, SyntaxContext::empty())
    }

    /// Like [`make_ident`] but appends `_fetch` for fetch/live-import identifiers.
    fn make_fetch_ident(&self, key: &str) -> Ident {
        let mut hasher = BuildHasherDefault::<XxHash64>::default().build_hasher();
        hasher.write(key.as_bytes());
        let hash = hasher.finish();
        let mut encoded = base62_encode(hash);
        encoded.insert(0, '_');
        encoded.push_str("_fetch");
        Ident::new(Atom::from(encoded), DUMMY_SP, SyntaxContext::empty())
    }
}

static PACKAGE_LIST: LazyLock<Vec<Atom>> = LazyLock::new(|| {
    [
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
    ]
    .into_iter()
    .map(Atom::from)
    .collect()
});

static PACKAGE_LIST_DYNAMIC: LazyLock<Vec<Atom>> = LazyLock::new(|| {
    [
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
    ]
    .into_iter()
    .map(Atom::from)
    .collect()
});

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

            let meta = self.caller_map.get(callee_ident);
            if meta.is_none() {
                return;
            }
            let meta = meta.unwrap().clone();
            let original_caller = &meta.original_name;
            let namespace_arg_index = meta.namespace_arg_index;

            // For extra callers, determine the namespace string from the configured arg index.
            let is_extra_caller = original_caller != "useIntlayer" && original_caller != "getIntlayer";

            let Some(arg) = call.args.get(namespace_arg_index) else {
                return;
            };

            let mut key_opt: Option<String> = None;
            if let Expr::Lit(Lit::Str(Str { value, .. })) = &*arg.expr {
                key_opt = Some(value.to_string_lossy().into_owned());
            } else if let Expr::Tpl(Tpl { exprs, quasis, .. }) = &*arg.expr {
                if exprs.is_empty() && quasis.len() == 1 {
                    key_opt = Some(quasis[0].raw.to_string());
                }
            }

            let Some(full_namespace) = key_opt else {
                return;
            };

            // For nested namespaces (e.g. "about.counter"), the dictionary key is only
            // the first segment; the rest becomes a keyPrefix second argument.
            let (dict_key, key_prefix) = split_namespace(&full_namespace);
            let dict_key = dict_key.to_string();
            let key_prefix = key_prefix.to_string();

            if let Ok(mut set) = INTLAYER_KEYS.lock() {
                set.insert(dict_key.clone());
            }

            let mut per_call_mode = "static".to_string();
            let dictionary_override_mode = self.dictionary_mode_map.get(&dict_key);

            if (original_caller == "useIntlayer" || is_extra_caller) && self.use_dynamic_helpers {
                if let Some(mode) = dictionary_override_mode {
                    per_call_mode = mode.clone();
                } else {
                    per_call_mode = self.import_mode.clone();
                }
            } else if (original_caller == "useIntlayer" || is_extra_caller) && !self.use_dynamic_helpers {
                if let Some(mode) = dictionary_override_mode {
                    if mode == "dynamic" || mode == "fetch" {
                        per_call_mode = mode.clone();
                    }
                }
            }

            if is_extra_caller {
                // ── Extra caller rewrite ──────────────────────────────────────
                // Replace the namespace string argument with a pre-imported dict
                // ident, and append keyPrefix as a new string argument (if any).
                if per_call_mode == "fetch" {
                    let ident = if let Some(id) = self.new_dynamic_imports.get(&dict_key) {
                        id.clone()
                    } else {
                        let id = self.make_fetch_ident(&dict_key);
                        self.new_dynamic_imports.insert(dict_key.clone(), id.clone());
                        id
                    };
                    // Replace namespace arg with dict ident
                    call.args[namespace_arg_index].expr = Box::new(Expr::Ident(ident.clone()));
                    // For dynamic mode, also insert key as second arg (after dict) for
                    // *DictionaryDynamic variant, then optional prefix as third
                    // Insert key arg: insert AFTER the dict arg
                    call.args.insert(
                        namespace_arg_index + 1,
                        ExprOrSpread {
                            spread: None,
                            expr: Box::new(Expr::Lit(Lit::Str(Str {
                                span: DUMMY_SP,
                                value: Atom::from(dict_key.as_str()).into(),
                                raw: None,
                            }))),
                        },
                    );
                    // Append keyPrefix as third arg if non-empty
                    if !key_prefix.is_empty() {
                        call.args.insert(
                            namespace_arg_index + 2,
                            ExprOrSpread {
                                spread: None,
                                expr: Box::new(Expr::Lit(Lit::Str(Str {
                                    span: DUMMY_SP,
                                    value: Atom::from(key_prefix.as_str()).into(),
                                    raw: None,
                                }))),
                            },
                        );
                    }
                } else if per_call_mode == "dynamic" {
                    let ident = if let Some(id) = self.new_dynamic_imports.get(&dict_key) {
                        id.clone()
                    } else {
                        let id = self.make_dynamic_ident(&dict_key);
                        self.new_dynamic_imports.insert(dict_key.clone(), id.clone());
                        id
                    };
                    call.args[namespace_arg_index].expr = Box::new(Expr::Ident(ident));
                    call.args.insert(
                        namespace_arg_index + 1,
                        ExprOrSpread {
                            spread: None,
                            expr: Box::new(Expr::Lit(Lit::Str(Str {
                                span: DUMMY_SP,
                                value: Atom::from(dict_key.as_str()).into(),
                                raw: None,
                            }))),
                        },
                    );
                    if !key_prefix.is_empty() {
                        call.args.insert(
                            namespace_arg_index + 2,
                            ExprOrSpread {
                                spread: None,
                                expr: Box::new(Expr::Lit(Lit::Str(Str {
                                    span: DUMMY_SP,
                                    value: Atom::from(key_prefix.as_str()).into(),
                                    raw: None,
                                }))),
                            },
                        );
                    }
                } else {
                    // static mode
                    let ident = if let Some(id) = self.new_static_imports.get(&dict_key) {
                        id.clone()
                    } else {
                        let id = self.make_ident(&dict_key);
                        self.new_static_imports.insert(dict_key.clone(), id.clone());
                        id
                    };
                    call.args[namespace_arg_index].expr = Box::new(Expr::Ident(ident));
                    // Append keyPrefix as a new second argument if the namespace was nested
                    if !key_prefix.is_empty() {
                        call.args.insert(
                            namespace_arg_index + 1,
                            ExprOrSpread {
                                spread: None,
                                expr: Box::new(Expr::Lit(Lit::Str(Str {
                                    span: DUMMY_SP,
                                    value: Atom::from(key_prefix.as_str()).into(),
                                    raw: None,
                                }))),
                            },
                        );
                    }
                }
            } else {
                // ── Native caller rewrite (useIntlayer / getIntlayer) ────────
                let Some(first_arg) = call.args.first_mut() else {
                    return;
                };

                if per_call_mode == "fetch" {
                    let ident = if let Some(id) = self.new_dynamic_imports.get(&dict_key) {
                        id.clone()
                    } else {
                        let id = self.make_fetch_ident(&dict_key);
                        self.new_dynamic_imports.insert(dict_key.clone(), id.clone());
                        id
                    };
                    call.args.insert(
                        0,
                        ExprOrSpread {
                            spread: None,
                            expr: Box::new(Expr::Ident(ident)),
                        },
                    );
                } else if per_call_mode == "dynamic" {
                    let ident = if let Some(id) = self.new_dynamic_imports.get(&dict_key) {
                        id.clone()
                    } else {
                        let id = self.make_dynamic_ident(&dict_key);
                        self.new_dynamic_imports.insert(dict_key.clone(), id.clone());
                        id
                    };
                    call.args.insert(
                        0,
                        ExprOrSpread {
                            spread: None,
                            expr: Box::new(Expr::Ident(ident)),
                        },
                    );
                } else {
                    let ident = if let Some(id) = self.new_static_imports.get(&dict_key) {
                        id.clone()
                    } else {
                        let id = self.make_ident(&dict_key);
                        self.new_static_imports.insert(dict_key.clone(), id.clone());
                        id
                    };
                    first_arg.expr = Box::new(Expr::Ident(ident));
                }
            }
        }
    }

    fn visit_mut_import_decl(&mut self, import: &mut ImportDecl) {
        import.visit_mut_children_with(self);

        let pkg_atom = &import.src.value;
        let pkg_str = pkg_atom.as_str().unwrap_or_default();

        let is_native_pkg = PACKAGE_LIST.iter().any(|a| a.as_str() == pkg_str);
        let extra_caller_for_pkg: Option<&ExtraCallerConfig> = self
            .extra_callers
            .iter()
            .find(|ec| ec.import_sources.iter().any(|s| s == pkg_str));

        if !is_native_pkg && extra_caller_for_pkg.is_none() {
            return;
        }

        let package_supports_dynamic =
            is_native_pkg && PACKAGE_LIST_DYNAMIC.iter().any(|a| a.as_str() == pkg_str);
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

                // Rewrite extra caller imports to their *Dictionary replacement
                if let Some(ec) = self.extra_callers.iter().find(|ec| {
                    ec.import_sources.iter().any(|s| s == pkg_str)
                        && ec.caller_name == imported_name
                }) {
                    let replacement_name = if self.file_has_dynamic_call
                        || self.import_mode == "dynamic"
                        || self.import_mode == "fetch"
                    {
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

    let absolute_filename_opt: Option<String> = if !cfg.files_list.is_empty() {
        let matched = cfg
            .files_list
            .iter()
            .find(|target| filename_raw.ends_with(*target) || target.ends_with(&filename_raw));

        if let Some(target) = matched {
            if DEBUG_LOG {
                println!(
                    "[swc-intlayer] processing file: {} (matched absolute: {})",
                    filename_raw, target
                );
            }
            Some(target.clone())
        } else {
            if DEBUG_LOG {
                println!(
                    "[swc-intlayer] skipping: {} (not in files_list)",
                    filename_raw
                );
            }
            return program;
        }
    } else {
        if DEBUG_LOG {
            println!(
                "[swc-intlayer] processing file: {} (files_list empty)",
                filename_raw
            );
        }
        Some(filename_raw.clone())
    };

    let working_filename =
        normalize_path(&absolute_filename_opt.unwrap_or(filename_raw.clone()));

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
                            id: Ident::new(
                                Atom::from(func_name),
                                DUMMY_SP,
                                SyntaxContext::empty(),
                            ),
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
        caller_map: BTreeMap::new(),
    };
    program.visit_mut_with(&mut pre_pass);

    let mut visitor = TransformVisitor::new(
        &cfg.dictionaries_dir,
        &cfg.dynamic_dictionaries_dir,
        import_mode.clone(),
        &dictionary_mode_map,
        &cfg.extra_callers,
        pre_pass.has_dynamic_call,
        pre_pass.caller_map,
    );
    program.visit_mut_with(&mut visitor);

    if let Program::Module(Module { body, .. }) = &mut program {
        let dictionaries_dir = visitor.dictionaries_dir.to_owned();
        let dynamic_dictionaries_dir = visitor.dynamic_dictionaries_dir.to_owned();
        let fetch_dictionaries_dir = cfg.fetch_dictionaries_dir.to_owned();

        let file_path_abs = Path::new(&working_filename);
        let file_dir_abs = file_path_abs.parent().unwrap_or_else(|| Path::new("/"));

        // Keep all leading `'use …'` directives at the top of the module.
        let mut insert_pos = 0;
        for item in body.iter() {
            match item {
                ModuleItem::Stmt(Stmt::Expr(ExprStmt { expr, .. })) => {
                    if let Expr::Lit(Lit::Str(Str { value, .. })) = &**expr {
                        let v = value.as_str();
                        if v == Some("use client") || v == Some("use server") {
                            insert_pos = 1;
                            continue;
                        }
                    }
                }
                _ => {}
            }
            break;
        }

        for (key, ident) in visitor.new_static_imports.clone().into_iter().rev() {
            let dict_file_abs = Path::new(&dictionaries_dir).join(format!("{}.json", key));

            let import_path = if let Some(rel) = diff_paths(&dict_file_abs, file_dir_abs) {
                let s = rel.to_string_lossy().replace('\\', "/");
                if s.starts_with('.') {
                    s
                } else {
                    format!("./{}", s)
                }
            } else {
                dict_file_abs.to_string_lossy().replace('\\', "/")
            };

            body.insert(
                insert_pos,
                ModuleItem::ModuleDecl(ModuleDecl::Import(ImportDecl {
                    span: DUMMY_SP,
                    specifiers: vec![ImportSpecifier::Default(ImportDefaultSpecifier {
                        span: DUMMY_SP,
                        local: ident,
                    })],
                    src: Box::new(Str::from(import_path)),
                    type_only: false,
                    with: Some(Box::new(ObjectLit {
                        span: DUMMY_SP,
                        props: vec![PropOrSpread::Prop(Box::new(Prop::KeyValue(
                            KeyValueProp {
                                key: PropName::Ident(
                                    Ident::new(
                                        Atom::from("type"),
                                        DUMMY_SP,
                                        SyntaxContext::empty(),
                                    )
                                    .into(),
                                ),
                                value: Box::new(Expr::Lit(Lit::Str(Str {
                                    span: DUMMY_SP,
                                    value: Atom::from("json").into(),
                                    raw: None,
                                }))),
                            },
                        )))],
                    })),
                    phase: ImportPhase::Evaluation,
                })),
            );

            insert_pos += 1;
        }

        for (key, ident) in visitor.new_dynamic_imports.clone().into_iter().rev() {
            let ident_name: &str = ident.sym.as_ref();
            let is_live_ident = ident_name.ends_with("_fetch");
            let target_dir = if is_live_ident {
                &fetch_dictionaries_dir
            } else {
                &dynamic_dictionaries_dir
            };
            let dict_file_abs = Path::new(target_dir).join(format!("{}.mjs", key));

            let import_path = if let Some(rel) = diff_paths(&dict_file_abs, file_dir_abs) {
                let s = rel.to_string_lossy().replace('\\', "/");
                if s.starts_with('.') {
                    s
                } else {
                    format!("./{}", s)
                }
            } else {
                dict_file_abs.to_string_lossy().replace('\\', "/")
            };

            body.insert(
                insert_pos,
                ModuleItem::ModuleDecl(ModuleDecl::Import(ImportDecl {
                    span: DUMMY_SP,
                    specifiers: vec![ImportSpecifier::Default(ImportDefaultSpecifier {
                        span: DUMMY_SP,
                        local: ident,
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
            m.body.iter().filter(|item| {
                matches!(item, ModuleItem::ModuleDecl(ModuleDecl::Import(_)))
            }).count()
        } else {
            0
        };
        let was_transformed = !visitor.new_static_imports.is_empty()
            || !visitor.new_dynamic_imports.is_empty();
        let label = if was_transformed { "transformed" } else { "unchanged" };
        let code = program_to_code(&program);
        println!(
            "[swc-intlayer] {} output for {} ({} total imports):\n{}\n",
            label,
            filename_raw,
            static_count,
            code
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
