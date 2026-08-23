//! The optimize transform: replaces the dictionary-key argument of every
//! recognised caller with a pre-imported dictionary object and re-points the
//! import specifier at the matching `*Dictionary` helper.

use crate::{
    ast::{
        callee_ident_name, imported_specifier_name, make_hashed_ident, make_ident, make_ident_arg,
        make_string_arg, read_static_string, split_namespace,
    },
    config::ExtraCallerConfig,
    extra_caller::{resolve_extra_namespace, rewrite_namespace_option, ExtraNamespaceMatch},
    packages::{GET_INTLAYER_ASYNC, PACKAGE_LIST, PACKAGE_LIST_DYNAMIC},
    pre_pass::CallerMap,
};
use std::collections::{BTreeMap, HashSet};
use swc_core::ecma::{
    ast::*,
    visit::{VisitMut, VisitMutWith},
};

/// Per-call import mode. Dynamic and fetch resolve to the same helper but to
/// different generated loader directories.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ImportKind {
    Static,
    Dynamic,
    Fetch,
}

impl ImportKind {
    /// Parses the wire value of `importMode` / `dictionaryModeMap`.
    /// Unrecognised values are treated as `"static"` so a typo never silently
    /// promotes a dictionary to a dynamic loader.
    pub fn from_option(raw: Option<&str>) -> Option<Self> {
        match raw {
            Some("dynamic") => Some(ImportKind::Dynamic),
            Some("fetch") => Some(ImportKind::Fetch),
            Some(_) => Some(ImportKind::Static),
            None => None,
        }
    }

    /// Suffix appended to the generated import identifier, which also tells the
    /// import-injection step which directory the loader lives in.
    fn ident_suffix(self) -> &'static str {
        match self {
            ImportKind::Static => "",
            ImportKind::Dynamic => "_dyn",
            ImportKind::Fetch => "_fetch",
        }
    }

    /// Whether the call site receives a loader plus its dictionary key rather
    /// than a plain dictionary object.
    pub fn is_dynamic_helper(self) -> bool {
        !matches!(self, ImportKind::Static)
    }
}

/// Dictionary imports the transform decided to inject, in insertion order.
#[derive(Default)]
pub struct InjectedImports {
    /// Dictionary key → identifier of the static JSON (or nested companion) import.
    pub static_imports: BTreeMap<String, Ident>,
    /// Dictionary key → identifier of the dynamic / fetch loader import.
    pub dynamic_imports: BTreeMap<String, Ident>,
}

pub struct TransformVisitor<'a> {
    import_mode: ImportKind,
    dictionary_mode_map: &'a BTreeMap<String, String>,
    extra_callers: &'a [ExtraCallerConfig],
    caller_map: &'a CallerMap,
    /// Packages with at least one native call resolving a dictionary overridden
    /// to the `dynamic` import mode.
    packages_with_dynamic_call: &'a HashSet<String>,
    /// Packages with at least one native call resolving a dictionary overridden
    /// to the `fetch` import mode.
    packages_with_fetch_call: &'a HashSet<String>,
    /// File-level dynamic decision for extra (compat) callers: one import
    /// specifier serves every call, so a global dynamic/fetch mode or any
    /// per-dictionary override flips all rewritten compat calls to the
    /// dynamic helper.
    extra_use_dynamic_helpers: bool,
    /// Imports collected during the traversal, injected afterwards.
    pub injected_imports: InjectedImports,
}

impl<'a> TransformVisitor<'a> {
    pub fn new(
        import_mode: ImportKind,
        dictionary_mode_map: &'a BTreeMap<String, String>,
        extra_callers: &'a [ExtraCallerConfig],
        caller_map: &'a CallerMap,
        packages_with_dynamic_call: &'a HashSet<String>,
        packages_with_fetch_call: &'a HashSet<String>,
        extra_use_dynamic_helpers: bool,
    ) -> Self {
        Self {
            import_mode,
            dictionary_mode_map,
            extra_callers,
            caller_map,
            packages_with_dynamic_call,
            packages_with_fetch_call,
            extra_use_dynamic_helpers,
            injected_imports: InjectedImports::default(),
        }
    }

    /// Helper family every native call importing from `package` resolves to.
    ///
    /// The decision is taken once per package and drives both the import
    /// rewrite and the call rewrite, so the emitted helper and its argument
    /// shape can never diverge. A package without a `useDictionaryDynamic`
    /// export always keeps the static helper, even when a sibling import in the
    /// same file goes dynamic.
    fn package_uses_dynamic_helpers(&self, package_specifier: &str) -> bool {
        if !PACKAGE_LIST_DYNAMIC.contains(&package_specifier) {
            return false;
        }

        self.import_mode.is_dynamic_helper()
            || self.packages_with_dynamic_call.contains(package_specifier)
            || self.packages_with_fetch_call.contains(package_specifier)
    }

    /// Returns the cached identifier for `key` in the map matching
    /// `import_kind`, creating and registering it on first use. Dynamic and
    /// fetch identifiers share one map because they resolve to the same import
    /// slot, distinguished only by their `_dyn` / `_fetch` suffix.
    fn import_ident(&mut self, key: &str, import_kind: ImportKind) -> Ident {
        let map = match import_kind {
            ImportKind::Static => &mut self.injected_imports.static_imports,
            ImportKind::Dynamic | ImportKind::Fetch => &mut self.injected_imports.dynamic_imports,
        };

        if let Some(ident) = map.get(key) {
            return ident.clone();
        }
        let ident = make_hashed_ident(key, import_kind.ident_suffix());
        map.insert(key.to_string(), ident.clone());
        ident
    }

    /// Per-dictionary import mode override, when one is configured.
    fn dictionary_override(&self, dictionary_key: &str) -> Option<ImportKind> {
        ImportKind::from_option(
            self.dictionary_mode_map
                .get(dictionary_key)
                .map(String::as_str),
        )
    }

    /// Rewrites a compat-adapter call site: the namespace is replaced by (or
    /// prefixed with) a pre-imported dictionary, plus the dictionary key and
    /// nested key prefix the helper needs.
    fn rewrite_extra_caller_call(&mut self, call: &mut CallExpr, extra_index: usize) {
        let extra_caller = &self.extra_callers[extra_index];

        let Some(namespace_match) = resolve_extra_namespace(extra_caller, &call.args) else {
            return; // filtered by the pre-pass — stay safe
        };

        let (dictionary_key, key_prefix) = {
            let (dictionary_key, key_prefix) = split_namespace(namespace_match.full_namespace());
            (dictionary_key.to_string(), key_prefix.to_string())
        };

        // Extracted before `import_ident` takes `&mut self`, ending the
        // `extra_caller` borrow.
        let namespace_option_property: Option<String> = extra_caller
            .namespace_option
            .as_ref()
            .map(|option| option.property.clone());

        // The import specifier serves every call in the file, so a dynamic
        // file receives a dynamic loader for every call.
        let import_kind = if self.extra_use_dynamic_helpers {
            self.dictionary_override(&dictionary_key)
                .filter(|kind| kind.is_dynamic_helper())
                .unwrap_or(match self.import_mode {
                    ImportKind::Fetch => ImportKind::Fetch,
                    _ => ImportKind::Dynamic,
                })
        } else {
            ImportKind::Static
        };

        let ident = self.import_ident(&dictionary_key, import_kind);
        let is_dynamic_helper = import_kind.is_dynamic_helper();

        match &namespace_match {
            ExtraNamespaceMatch::Argument { index, .. } => {
                // Positional namespace: replace the string with the dictionary,
                // then (dynamic) key and (nested) prefix.
                call.args[*index].expr = Box::new(Expr::Ident(ident));
                let mut insert_at = index + 1;
                if is_dynamic_helper {
                    call.args
                        .insert(insert_at, make_string_arg(&dictionary_key));
                    insert_at += 1;
                }
                if !key_prefix.is_empty() {
                    call.args.insert(insert_at, make_string_arg(&key_prefix));
                }
            }
            ExtraNamespaceMatch::Fixed { .. } | ExtraNamespaceMatch::Option { .. } => {
                // Fixed / option namespace: prepend the dictionary (and the key
                // for the dynamic helper).
                if is_dynamic_helper {
                    call.args.insert(0, make_string_arg(&dictionary_key));
                }
                call.args.insert(0, make_ident_arg(ident));
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
    }

    /// Rewrites a native `useIntlayer` / `getIntlayer` / `getIntlayerAsync`
    /// call site.
    ///
    /// `caller_package` is the package the callee was imported from; `None`
    /// keeps the static helper, matching the Babel pass for a caller reaching
    /// the file through a re-export.
    fn rewrite_native_call(
        &mut self,
        call: &mut CallExpr,
        caller_name: &str,
        caller_package: Option<&str>,
    ) {
        let Some(arg) = call.args.first() else {
            return;
        };

        // The dictionary key is the whole first argument: native callers look
        // the dictionary up in the registry by that exact key, so a key holding
        // a `.` must not be split the way a compat namespace is.
        let Some(dictionary_key) = read_static_string(&arg.expr) else {
            return;
        };

        let dictionary_override = self.dictionary_override(&dictionary_key);

        let uses_dynamic_helpers =
            caller_package.is_some_and(|package| self.package_uses_dynamic_helpers(package));

        let import_kind = if caller_name == GET_INTLAYER_ASYNC {
            // Loading a single locale is the whole point of the async getter,
            // so it reads a per-locale loader whatever the file's import mode
            // is — the fetch loader when the dictionary is remote, the dynamic
            // one otherwise.
            match dictionary_override {
                Some(ImportKind::Fetch) => ImportKind::Fetch,
                _ => ImportKind::Dynamic,
            }
        } else if caller_name != "useIntlayer" {
            ImportKind::Static
        } else if uses_dynamic_helpers {
            dictionary_override.unwrap_or(self.import_mode)
        } else {
            // A per-dictionary override still wins when the caller's package
            // stayed on the static helper.
            dictionary_override
                .filter(|kind| kind.is_dynamic_helper())
                .unwrap_or(ImportKind::Static)
        };

        let ident = self.import_ident(&dictionary_key, import_kind);

        if import_kind.is_dynamic_helper() {
            // Dynamic helper: first argument is the loader, second the key.
            call.args.insert(0, make_ident_arg(ident));
        } else {
            // Static helper (useDictionary / getDictionary): replace the key
            // argument with the imported dictionary object.
            let Some(first_arg) = call.args.first_mut() else {
                return;
            };
            first_arg.expr = Box::new(Expr::Ident(ident));
        }
    }
}

impl VisitMut for TransformVisitor<'_> {
    fn visit_mut_expr(&mut self, expr: &mut Expr) {
        expr.visit_mut_children_with(self);

        let Expr::Call(call) = expr else {
            return;
        };

        let Some(callee_name) = callee_ident_name(&call.callee) else {
            return;
        };

        let Some(meta) = self.caller_map.get(callee_name) else {
            return;
        };
        let extra_index = meta.extra_index;
        let caller_name = meta.original_name.clone();
        let caller_package = meta.package.clone();

        match extra_index {
            Some(extra_index) => self.rewrite_extra_caller_call(call, extra_index),
            None => self.rewrite_native_call(call, &caller_name, caller_package.as_deref()),
        }
    }

    fn visit_mut_import_decl(&mut self, import: &mut ImportDecl) {
        import.visit_mut_children_with(self);

        let package_specifier = import.src.value.as_str().unwrap_or_default();

        let is_native_package = PACKAGE_LIST.contains(&package_specifier);
        let has_extra_caller_for_package = self.extra_callers.iter().any(|extra_caller| {
            extra_caller
                .import_sources
                .iter()
                .any(|source| source == package_specifier)
        });

        if !is_native_package && !has_extra_caller_for_package {
            return;
        }

        let should_use_dynamic_helpers =
            is_native_package && self.package_uses_dynamic_helpers(package_specifier);

        for specifier in &mut import.specifiers {
            let ImportSpecifier::Named(named) = specifier else {
                continue;
            };
            let imported_name = imported_specifier_name(named);

            if is_native_package {
                match imported_name.as_str() {
                    "useIntlayer" => {
                        let replacement = if should_use_dynamic_helpers {
                            "useDictionaryDynamic"
                        } else {
                            "useDictionary"
                        };
                        named.imported = Some(ModuleExportName::Ident(make_ident(replacement)));
                    }
                    "getIntlayer" => {
                        named.imported = Some(ModuleExportName::Ident(make_ident("getDictionary")));
                    }
                    GET_INTLAYER_ASYNC => {
                        named.imported =
                            Some(ModuleExportName::Ident(make_ident("getDictionaryAsync")));
                    }
                    _ => {}
                }
            }

            // Rewrite extra caller imports to their *Dictionary replacement.
            // Locals with unresolvable call sites were dropped from the caller
            // map and keep the original import.
            let local_name = named.local.sym.to_string();
            let is_registered_extra = self
                .caller_map
                .get(&local_name)
                .is_some_and(|meta| meta.extra_index.is_some());

            if !is_registered_extra {
                continue;
            }

            if let Some(extra_caller) = self.extra_callers.iter().find(|extra_caller| {
                extra_caller
                    .import_sources
                    .iter()
                    .any(|source| source == package_specifier)
                    && extra_caller.caller_name == imported_name
            }) {
                let replacement_name = if self.extra_use_dynamic_helpers {
                    &extra_caller.dynamic_replacement
                } else {
                    &extra_caller.static_replacement
                };

                named.imported = Some(ModuleExportName::Ident(make_ident(replacement_name)));
            }
        }
    }
}
