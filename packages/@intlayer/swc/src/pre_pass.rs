//! First traversal: discovers which local identifiers refer to an intlayer or
//! compat-adapter caller, which package each was imported from, and which of
//! those packages resolve a dictionary to a dynamic/fetch loader.
//!
//! The optimize transform needs every answer *before* it starts rewriting,
//! because a single import specifier serves every call site in the file — and
//! an import declaration may appear after the calls it governs.
//!
//! Adapter-specific reasoning is delegated: namespace resolution lives in
//! [`crate::extra_caller`], so a build with no `extraCallers` runs the native
//! half of this pass alone.

use crate::{
    ast::{callee_ident_name, imported_specifier_name, read_static_string, split_namespace},
    config::ExtraCallerConfig,
    dictionary_imports::ImportKind,
    extra_caller::resolve_extra_namespace,
    packages::{NATIVE_CALLER_NAMES, PACKAGE_LIST},
};
use std::collections::{BTreeMap, HashSet};
use swc_core::ecma::{
    ast::*,
    visit::{Visit, VisitWith},
};

/// Metadata stored in the pre-pass caller map value.
/// For native callers this is always the original name; for extra callers we
/// also keep the index of the matching [`ExtraCallerConfig`].
#[derive(Clone, Debug)]
pub struct CallerMeta {
    /// Original function name (e.g. `"useIntlayer"` or `"useTranslation"`).
    pub original_name: String,
    /// Index of the matching extra caller config (`None` for native callers).
    pub extra_index: Option<usize>,
    /// Package specifier the caller was imported from, e.g. `"react-intlayer"`.
    /// Only recorded for native callers, whose helper family is decided per
    /// package: `useIntlayer` imported from `intlayer` keeps the static helper
    /// even when a sibling import from `react-intlayer` goes dynamic.
    pub package: Option<String>,
}

/// Maps a local identifier name to the caller it was imported as.
pub type CallerMap = BTreeMap<String, CallerMeta>;

/// Outcome of the pre-pass.
pub struct PrePassResult {
    /// Local identifier name → caller metadata, with the extra callers that
    /// have at least one unresolvable call site already removed.
    pub caller_map: CallerMap,
    /// Packages whose native `useIntlayer` calls resolve at least one
    /// dictionary overridden to the `dynamic` import mode.
    pub packages_with_dynamic_call: HashSet<String>,
    /// Packages whose native `useIntlayer` calls resolve at least one
    /// dictionary overridden to the `fetch` import mode.
    pub packages_with_fetch_call: HashSet<String>,
    /// An extra (compat) caller resolves to a dynamic/fetch dictionary.
    pub extra_has_dynamic_call: bool,
}

struct PrePassVisitor<'a> {
    dictionary_mode_map: &'a BTreeMap<String, String>,
    extra_callers: &'a [ExtraCallerConfig],
    packages_with_dynamic_call: HashSet<String>,
    packages_with_fetch_call: HashSet<String>,
    extra_has_dynamic_call: bool,
    /// Local extra-caller names with at least one unresolvable call site —
    /// rewriting the shared import while leaving those calls untouched would
    /// hand a raw namespace string to the dictionary-accepting helper.
    unresolvable_extra_locals: HashSet<String>,
    caller_map: CallerMap,
}

impl PrePassVisitor<'_> {
    /// Per-dictionary import mode override, when one is configured.
    fn dictionary_override(&self, dictionary_key: &str) -> Option<ImportKind> {
        ImportKind::from_option(
            self.dictionary_mode_map
                .get(dictionary_key)
                .map(String::as_str),
        )
    }

    /// Returns `true` when the dictionary is overridden to a per-locale loader.
    fn is_dynamic_dictionary(&self, dictionary_key: &str) -> bool {
        self.dictionary_override(dictionary_key)
            .is_some_and(|kind| kind.is_dynamic_helper())
    }

    /// Inspects an extra (compat) caller call site: resolve its namespace, note
    /// a dynamic dictionary, or mark the local name unrewritable.
    fn visit_extra_caller_call(&mut self, callee_name: &str, call: &CallExpr, extra_index: usize) {
        let extra_caller = &self.extra_callers[extra_index];

        match resolve_extra_namespace(extra_caller, &call.args) {
            Some(namespace_match) => {
                let (dictionary_key, _prefix) = split_namespace(namespace_match.full_namespace());
                if self.is_dynamic_dictionary(dictionary_key) {
                    self.extra_has_dynamic_call = true;
                }
            }
            None => {
                self.unresolvable_extra_locals
                    .insert(callee_name.to_string());
            }
        }
    }

    /// Inspects a native `useIntlayer` call site, noting whether its package
    /// must switch to a per-locale loader.
    ///
    /// The dictionary key is the whole first argument: native callers look the
    /// dictionary up in the registry by that exact key, with no
    /// `dictionary.field` namespace convention to split on.
    fn visit_native_call(&mut self, call: &CallExpr, package: &str) {
        let Some(dictionary_key) = call
            .args
            .first()
            .and_then(|arg| read_static_string(&arg.expr))
        else {
            return;
        };

        match self.dictionary_override(&dictionary_key) {
            Some(ImportKind::Dynamic) => {
                self.packages_with_dynamic_call.insert(package.to_string());
            }
            Some(ImportKind::Fetch) => {
                self.packages_with_fetch_call.insert(package.to_string());
            }
            _ => {}
        }
    }
}

/// Collects `local identifier → caller` for every recognised caller the module
/// imports.
///
/// Import declarations only appear at the top level of a module, so the body is
/// scanned directly. Doing it before any call is inspected keeps the result
/// independent of where the imports sit relative to the calls they govern.
fn collect_caller_map(program: &Program, extra_callers: &[ExtraCallerConfig]) -> CallerMap {
    let mut caller_map = CallerMap::new();

    let Program::Module(module) = program else {
        return caller_map;
    };

    for item in &module.body {
        let ModuleItem::ModuleDecl(ModuleDecl::Import(import)) = item else {
            continue;
        };

        let package_specifier = import.src.value.as_str().unwrap_or_default();

        let is_native_package = PACKAGE_LIST.contains(&package_specifier);

        // The extra callers this package exports, matched once for the whole
        // declaration instead of re-scanning every descriptor's
        // `import_sources` for each of its specifiers.
        let extra_callers_for_package: Vec<(usize, &str)> = extra_callers
            .iter()
            .enumerate()
            .filter(|(_, extra_caller)| {
                extra_caller
                    .import_sources
                    .iter()
                    .any(|source| source == package_specifier)
            })
            .map(|(extra_index, extra_caller)| {
                (extra_index, extra_caller.caller_name.as_str())
            })
            .collect();

        if !is_native_package && extra_callers_for_package.is_empty() {
            continue;
        }

        for specifier in &import.specifiers {
            let ImportSpecifier::Named(named) = specifier else {
                continue;
            };
            let imported_name = imported_specifier_name(named);

            // An extra caller wins over a native name: a compat package
            // re-exporting an intlayer getter is still driven by its descriptor.
            let meta = extra_callers_for_package
                .iter()
                .find(|(_, caller_name)| *caller_name == imported_name)
                .map(|(extra_index, _)| CallerMeta {
                    original_name: imported_name.clone(),
                    extra_index: Some(*extra_index),
                    package: None,
                })
                .or_else(|| {
                    let is_native_caller = is_native_package
                        && NATIVE_CALLER_NAMES.contains(&imported_name.as_str());

                    is_native_caller.then(|| CallerMeta {
                        original_name: imported_name.clone(),
                        extra_index: None,
                        package: Some(package_specifier.to_string()),
                    })
                });

            if let Some(meta) = meta {
                caller_map.insert(named.local.sym.to_string(), meta);
            }
        }
    }

    caller_map
}

impl Visit for PrePassVisitor<'_> {
    fn visit_call_expr(&mut self, call: &CallExpr) {
        call.visit_children_with(self);

        let Some(callee_name) = callee_ident_name(&call.callee) else {
            return;
        };

        let Some(meta) = self.caller_map.get(callee_name).cloned() else {
            return;
        };

        match meta.extra_index {
            Some(extra_index) => self.visit_extra_caller_call(callee_name, call, extra_index),
            None if meta.original_name == "useIntlayer" => {
                if let Some(package) = meta.package.as_deref() {
                    self.visit_native_call(call, package);
                }
            }
            None => {}
        }
    }
}

/// Runs the pre-pass over `program`.
pub fn run_pre_pass(
    program: &Program,
    dictionary_mode_map: &BTreeMap<String, String>,
    extra_callers: &[ExtraCallerConfig],
) -> PrePassResult {
    let mut visitor = PrePassVisitor {
        dictionary_mode_map,
        extra_callers,
        packages_with_dynamic_call: HashSet::new(),
        packages_with_fetch_call: HashSet::new(),
        extra_has_dynamic_call: false,
        unresolvable_extra_locals: HashSet::new(),
        caller_map: collect_caller_map(program, extra_callers),
    };
    program.visit_with(&mut visitor);

    let unresolvable_extra_locals = visitor.unresolvable_extra_locals;

    // Extra callers with an unresolvable call site keep their original
    // implementation: rewriting the shared import while leaving those calls
    // untouched would hand a raw namespace string to the dictionary helper.
    let mut caller_map = visitor.caller_map;
    caller_map.retain(|local_name, meta| {
        meta.extra_index.is_none() || !unresolvable_extra_locals.contains(local_name)
    });

    PrePassResult {
        caller_map,
        packages_with_dynamic_call: visitor.packages_with_dynamic_call,
        packages_with_fetch_call: visitor.packages_with_fetch_call,
        extra_has_dynamic_call: visitor.extra_has_dynamic_call,
    }
}
