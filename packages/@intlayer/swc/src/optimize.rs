//! The optimize transform: replaces the dictionary-key argument of every
//! recognised caller with a pre-imported dictionary object and re-points the
//! import specifier at the matching `*Dictionary` helper.
//!
//! Only the native `useIntlayer` / `getIntlayer` / `getIntlayerAsync` rewrite
//! lives here. Compat adapters plug in through [`ExtraCallerContext`], held as
//! an `Option`: with no `extraCallers` configured it is `None`, every branch
//! guarded by it is skipped, and the native rewrite runs exactly as if the
//! adapters did not exist.

use crate::{
    ast::{
        callee_ident_name, imported_specifier_name, make_ident, make_ident_arg, read_static_string,
    },
    dictionary_imports::{ImportKind, InjectedImports},
    extra_caller::ExtraCallerContext,
    packages::{GET_INTLAYER_ASYNC, PACKAGE_LIST, PACKAGE_LIST_DYNAMIC},
    pre_pass::CallerMap,
};
use std::collections::{BTreeMap, HashSet};
use swc_core::ecma::{
    ast::*,
    visit::{VisitMut, VisitMutWith},
};

pub struct TransformVisitor<'a> {
    import_mode: ImportKind,
    dictionary_mode_map: &'a BTreeMap<String, String>,
    caller_map: &'a CallerMap,
    /// Packages with at least one native call resolving a dictionary overridden
    /// to the `dynamic` import mode.
    packages_with_dynamic_call: &'a HashSet<String>,
    /// Packages with at least one native call resolving a dictionary overridden
    /// to the `fetch` import mode.
    packages_with_fetch_call: &'a HashSet<String>,
    /// Compat adapters, when any were configured for this build.
    extra: Option<ExtraCallerContext<'a>>,
    /// Imports collected during the traversal, injected afterwards.
    pub injected_imports: InjectedImports,
}

impl<'a> TransformVisitor<'a> {
    pub fn new(
        import_mode: ImportKind,
        dictionary_mode_map: &'a BTreeMap<String, String>,
        caller_map: &'a CallerMap,
        packages_with_dynamic_call: &'a HashSet<String>,
        packages_with_fetch_call: &'a HashSet<String>,
        extra: Option<ExtraCallerContext<'a>>,
    ) -> Self {
        Self {
            import_mode,
            dictionary_mode_map,
            caller_map,
            packages_with_dynamic_call,
            packages_with_fetch_call,
            extra,
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

    /// Per-dictionary import mode override, when one is configured.
    fn dictionary_override(&self, dictionary_key: &str) -> Option<ImportKind> {
        ImportKind::from_option(
            self.dictionary_mode_map
                .get(dictionary_key)
                .map(String::as_str),
        )
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

        let ident = self
            .injected_imports
            .ident_for(&dictionary_key, import_kind);

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

    /// Re-points the native caller specifiers of one import declaration at
    /// their `*Dictionary` helper, keeping the local alias intact.
    fn rewrite_native_import_specifier(
        &self,
        named: &mut ImportNamedSpecifier,
        should_use_dynamic_helpers: bool,
    ) {
        let imported_name = imported_specifier_name(named);

        let replacement = match imported_name.as_str() {
            "useIntlayer" if should_use_dynamic_helpers => "useDictionaryDynamic",
            "useIntlayer" => "useDictionary",
            "getIntlayer" => "getDictionary",
            GET_INTLAYER_ASYNC => "getDictionaryAsync",
            _ => return,
        };

        named.imported = Some(ModuleExportName::Ident(make_ident(replacement)));
    }
}

impl VisitMut for TransformVisitor<'_> {
    fn visit_mut_expr(&mut self, expr: &mut Expr) {
        expr.visit_mut_children_with(self);

        let Expr::Call(call) = expr else {
            return;
        };

        // Owned so the immutable borrow of `call.callee` ends before the
        // rewrites below take it mutably.
        let Some(callee_name) = callee_ident_name(&call.callee).map(str::to_string) else {
            return;
        };

        let Some(meta) = self.caller_map.get(&callee_name) else {
            return;
        };
        let extra_index = meta.extra_index;
        let caller_name = meta.original_name.clone();
        let caller_package = meta.package.clone();

        match extra_index {
            Some(extra_index) => {
                if let Some(extra) = self.extra.as_ref() {
                    extra.rewrite_call(call, extra_index, &mut self.injected_imports);
                }
            }
            None => self.rewrite_native_call(call, &caller_name, caller_package.as_deref()),
        }
    }

    fn visit_mut_import_decl(&mut self, import: &mut ImportDecl) {
        import.visit_mut_children_with(self);

        let package_specifier = import.src.value.as_str().unwrap_or_default().to_string();

        let is_native_package = PACKAGE_LIST.contains(&package_specifier.as_str());
        let is_extra_package = self
            .extra
            .as_ref()
            .is_some_and(|extra| extra.owns_import_source(&package_specifier));

        if !is_native_package && !is_extra_package {
            return;
        }

        let should_use_dynamic_helpers =
            is_native_package && self.package_uses_dynamic_helpers(&package_specifier);

        for specifier in &mut import.specifiers {
            let ImportSpecifier::Named(named) = specifier else {
                continue;
            };

            if is_native_package {
                self.rewrite_native_import_specifier(named, should_use_dynamic_helpers);
            }

            if let Some(extra) = self.extra.as_ref() {
                extra.rewrite_import_specifier(named, &package_specifier, self.caller_map);
            }
        }
    }
}
