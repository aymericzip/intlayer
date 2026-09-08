//! Namespace resolution for compat-adapter callers (`useTranslation`,
//! `useI18n`, `useLingui`, …) described by [`ExtraCallerConfig`].

use crate::{
    ast::{
        imported_specifier_name, make_ident, make_ident_arg, make_str, make_string_arg,
        prop_name_matches, read_static_string, split_namespace,
    },
    config::ExtraCallerConfig,
    dictionary_imports::{ImportKind, InjectedImports},
    pre_pass::CallerMap,
};
use std::collections::BTreeMap;
use swc_core::ecma::ast::*;

/// How the namespace of an extra caller call-site was statically matched.
#[derive(Debug)]
pub enum ExtraNamespaceMatch {
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
    /// The matched namespace, including any `dictionaryKey.keyPrefix` suffix.
    pub fn full_namespace(&self) -> &str {
        match self {
            ExtraNamespaceMatch::Argument { full_namespace, .. }
            | ExtraNamespaceMatch::Option { full_namespace, .. }
            | ExtraNamespaceMatch::Fixed { full_namespace } => full_namespace,
        }
    }
}

/// Statically resolves the namespace of an extra caller call-site from its
/// config (positional argument, then fixed constant, then options-object
/// property). Returns `None` when the namespace is absent or dynamic — the
/// call is then left untouched and resolves through the runtime registry.
pub fn resolve_extra_namespace(
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
pub fn rewrite_namespace_option(
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
                    *value = Box::new(Expr::Lit(Lit::Str(make_str(key_prefix))));
                }
            }
        }
    }
}

/// Everything the optimize transform needs to rewrite an extra-caller call
/// site, gathered so no adapter-specific decision is taken in `optimize.rs`.
///
/// A build with no `extraCallers` configured never constructs one — the
/// optimize transform holds `Option<ExtraCallerContext>` and skips every branch
/// guarded by it, so the base intlayer rewrite is untouched by the adapters.
pub struct ExtraCallerContext<'a> {
    /// Descriptors injected by the compat packages' bundler plugins.
    pub extra_callers: &'a [ExtraCallerConfig],
    /// Per-dictionary import mode overrides.
    pub dictionary_mode_map: &'a BTreeMap<String, String>,
    /// The file's global import mode.
    pub import_mode: ImportKind,
    /// File-level dynamic decision: one import specifier serves every call, so
    /// a global dynamic/fetch mode or any per-dictionary override flips all
    /// rewritten compat calls to the dynamic helper.
    pub use_dynamic_helpers: bool,
}

impl<'a> ExtraCallerContext<'a> {
    /// Import kind an extra-caller call site resolves to for `dictionary_key`.
    pub fn import_kind(&self, dictionary_key: &str) -> ImportKind {
        if !self.use_dynamic_helpers {
            return ImportKind::Static;
        }

        ImportKind::from_option(
            self.dictionary_mode_map
                .get(dictionary_key)
                .map(String::as_str),
        )
        .filter(|kind| kind.is_dynamic_helper())
        .unwrap_or(match self.import_mode {
            ImportKind::Fetch => ImportKind::Fetch,
            _ => ImportKind::Dynamic,
        })
    }

    /// Rewrites an extra-caller call site: the namespace is replaced by (or
    /// prefixed with) a pre-imported dictionary, plus the dictionary key and
    /// nested key prefix the helper needs.
    pub fn rewrite_call(
        &self,
        call: &mut CallExpr,
        extra_index: usize,
        imports: &mut InjectedImports,
    ) {
        let extra_caller = &self.extra_callers[extra_index];

        let Some(namespace_match) = resolve_extra_namespace(extra_caller, &call.args) else {
            return; // filtered by the pre-pass — stay safe
        };

        let (dictionary_key, key_prefix) = {
            let (dictionary_key, key_prefix) = split_namespace(namespace_match.full_namespace());
            (dictionary_key.to_string(), key_prefix.to_string())
        };

        let namespace_option_property: Option<String> = extra_caller
            .namespace_option
            .as_ref()
            .map(|option| option.property.clone());

        let import_kind = self.import_kind(&dictionary_key);
        let ident = imports.ident_for(&dictionary_key, import_kind);
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

    /// Whether `package_specifier` exports at least one extra caller, so the
    /// optimize transform knows the import is worth inspecting even though it
    /// is not a native intlayer package.
    pub fn owns_import_source(&self, package_specifier: &str) -> bool {
        self.extra_callers.iter().any(|extra_caller| {
            extra_caller
                .import_sources
                .iter()
                .any(|source| source == package_specifier)
        })
    }

    /// Re-points one import specifier at the dictionary-accepting replacement
    /// its descriptor declares, keeping the local alias so call sites read
    /// unchanged. Specifiers whose local name is not a registered extra caller
    /// — dropped by the pre-pass because a call site was unresolvable — keep
    /// their original import.
    pub fn rewrite_import_specifier(
        &self,
        named: &mut ImportNamedSpecifier,
        package_specifier: &str,
        caller_map: &CallerMap,
    ) {
        let imported_name = imported_specifier_name(named);
        let local_name = named.local.sym.to_string();

        let is_registered_extra = caller_map
            .get(&local_name)
            .is_some_and(|meta| meta.extra_index.is_some());
        if !is_registered_extra {
            return;
        }

        let Some(extra_caller) = self.extra_callers.iter().find(|extra_caller| {
            extra_caller
                .import_sources
                .iter()
                .any(|source| source == package_specifier)
                && extra_caller.caller_name == imported_name
        }) else {
            return;
        };

        let replacement_name = if self.use_dynamic_helpers {
            &extra_caller.dynamic_replacement
        } else {
            &extra_caller.static_replacement
        };

        named.imported = Some(ModuleExportName::Ident(make_ident(replacement_name)));
    }
}
