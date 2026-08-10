//! Namespace resolution for compat-adapter callers (`useTranslation`,
//! `useI18n`, `useLingui`, …) described by [`ExtraCallerConfig`].

use crate::{
    ast::{make_str, prop_name_matches, read_static_string},
    config::ExtraCallerConfig,
};
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
