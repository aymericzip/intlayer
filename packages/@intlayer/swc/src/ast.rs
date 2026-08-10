//! Small, dependency-free helpers for reading and building the AST nodes the
//! transforms care about.

use base62::encode as base62_encode;
use std::hash::{BuildHasher, BuildHasherDefault, Hasher};
use swc_core::{
    common::{SyntaxContext, DUMMY_SP},
    ecma::{ast::*, atoms::Atom},
};
use twox_hash::XxHash64;

/// Aborts the transform when the host hands over an AST node this build's
/// `swc_ecma_ast` schema has no variant for.
///
/// Only reachable on a host *newer* than the schema the plugin was compiled
/// against, and only for source code using syntax that schema predates: SWC's
/// forward-compatible ABI deserialises such nodes into the `Unknown` variant
/// every AST enum carries under the `swc_ast_unknown` cfg, rather than failing
/// the whole plugin the way the older rkyv ABI did.
///
/// Skipping the node instead would leave a call site or a content field access
/// un-rewritten while `replaceDictionaryEntry` has already emptied the runtime
/// dictionary registry — a production bundle whose translations silently
/// resolve to nothing. Failing the build is the safer of the two, and is what
/// SWC recommends for these variants.
#[cfg(swc_ast_unknown)]
pub fn unsupported_ast_node(node_kind: &str) -> ! {
    panic!(
        "@intlayer/swc does not understand the `{node_kind}` node your bundler's \
         SWC produced — the plugin is older than the syntax in this file. \
         Upgrade @intlayer/swc, or set `build.optimize: false` in your Intlayer \
         configuration to build without the transform."
    )
}

/// Splits a namespace string at the first `.` to separate the dictionary key
/// from an optional key prefix for nested namespaces.
///
/// Examples:
/// - `"about"` -> `("about", "")`
/// - `"about.counter"` -> `("about", "counter")`
/// - `"about.section.title"` -> `("about", "section.title")`
pub fn split_namespace(namespace: &str) -> (&str, &str) {
    if let Some(dot_position) = namespace.find('.') {
        (&namespace[..dot_position], &namespace[dot_position + 1..])
    } else {
        (namespace, "")
    }
}

/// Reads a fully-static string from an expression: a string literal, or a
/// template literal with a single quasi and no interpolations.
pub fn read_static_string(expr: &Expr) -> Option<String> {
    match expr {
        Expr::Lit(Lit::Str(Str { value, .. })) => Some(value.to_string_lossy().into_owned()),
        Expr::Tpl(Tpl { exprs, quasis, .. }) if exprs.is_empty() && quasis.len() == 1 => {
            Some(quasis[0].raw.to_string())
        }
        _ => None,
    }
}

/// Returns `true` when the object property name matches `property`.
pub fn prop_name_matches(key: &PropName, property: &str) -> bool {
    match key {
        PropName::Ident(ident) => ident.sym.as_str() == property,
        PropName::Str(string_key) => string_key.value.to_string_lossy() == property,
        _ => false,
    }
}

/// Reads the statically-known name of an object property key, or `None` for
/// computed / dynamic keys.
pub fn read_prop_name(key: &PropName) -> Option<String> {
    match key {
        PropName::Ident(ident) => Some(ident.sym.to_string()),
        PropName::Str(string_key) => Some(string_key.value.to_string_lossy().into_owned()),
        _ => None,
    }
}

/// Reads the statically-known name of a member-expression property
/// (`obj.name` or `obj["name"]`), or `None` for dynamic computed accesses.
pub fn read_member_prop_name(prop: &MemberProp) -> Option<String> {
    match prop {
        MemberProp::Ident(ident) => Some(ident.sym.to_string()),
        MemberProp::Computed(computed) => match &*computed.expr {
            Expr::Lit(Lit::Str(Str { value, .. })) => Some(value.to_string_lossy().into_owned()),
            _ => None,
        },
        MemberProp::PrivateName(_) => None,
        #[cfg(swc_ast_unknown)]
        _ => unsupported_ast_node("MemberProp"),
    }
}

/// Overwrites the name of a statically-known member-expression property,
/// preserving its `obj.name` / `obj["name"]` shape.
pub fn write_member_prop_name(prop: &mut MemberProp, name: &str) {
    match prop {
        MemberProp::Ident(ident) => ident.sym = Atom::from(name),
        MemberProp::Computed(computed) => {
            *computed.expr = Expr::Lit(Lit::Str(make_str(name)));
        }
        MemberProp::PrivateName(_) => {}
        #[cfg(swc_ast_unknown)]
        _ => unsupported_ast_node("MemberProp"),
    }
}

/// Returns `true` for a numeric index access such as `[0]` or `[1]`.
pub fn is_numeric_index_prop(prop: &MemberProp) -> bool {
    matches!(prop, MemberProp::Computed(computed) if matches!(&*computed.expr, Expr::Lit(Lit::Num(_))))
}

/// Strips redundant parentheses and TypeScript type assertions so the wrapped
/// expression can be inspected directly.
pub fn unwrap_expr(expr: &Expr) -> &Expr {
    match expr {
        Expr::Paren(paren) => unwrap_expr(&paren.expr),
        Expr::TsAs(ts_as) => unwrap_expr(&ts_as.expr),
        Expr::TsNonNull(ts_non_null) => unwrap_expr(&ts_non_null.expr),
        Expr::TsSatisfies(ts_satisfies) => unwrap_expr(&ts_satisfies.expr),
        other => other,
    }
}

/// Builds a string literal node with no span or raw representation.
pub fn make_str(value: &str) -> Str {
    Str {
        span: DUMMY_SP,
        value: Atom::from(value).into(),
        raw: None,
    }
}

/// Builds a spanless identifier in the empty syntax context.
pub fn make_ident(name: &str) -> Ident {
    Ident::new(Atom::from(name), DUMMY_SP, SyntaxContext::empty())
}

/// Builds a plain (non-spread) string-literal call argument.
pub fn make_string_arg(value: &str) -> ExprOrSpread {
    ExprOrSpread {
        spread: None,
        expr: Box::new(Expr::Lit(Lit::Str(make_str(value)))),
    }
}

/// Builds a plain (non-spread) identifier call argument.
pub fn make_ident_arg(ident: Ident) -> ExprOrSpread {
    ExprOrSpread {
        spread: None,
        expr: Box::new(Expr::Ident(ident)),
    }
}

/// Derives a short, stable identifier from a dictionary key using
/// xxHash64 + base62, prefixed with `_` and followed by `suffix`.
/// Example: `"locale-switcher"` → `"_eEmT39vss4n4"` (empty suffix).
pub fn make_hashed_ident(key: &str, suffix: &str) -> Ident {
    let mut hasher = BuildHasherDefault::<XxHash64>::default().build_hasher();
    hasher.write(key.as_bytes());
    let hash = hasher.finish();
    let mut encoded = base62_encode(hash);
    encoded.insert(0, '_');
    encoded.push_str(suffix);
    make_ident(&encoded)
}

/// Reads the local name of a call's callee when it is a bare identifier.
pub fn callee_ident_name(callee: &Callee) -> Option<&str> {
    match callee {
        Callee::Expr(callee_expr) => match &**callee_expr {
            Expr::Ident(ident) => Some(ident.sym.as_ref()),
            _ => None,
        },
        _ => None,
    }
}

/// Reads the name an import specifier resolves to in its source module —
/// the `imported` name when aliased (`{ a as b }`), otherwise the local name.
pub fn imported_specifier_name(named: &ImportNamedSpecifier) -> String {
    match &named.imported {
        Some(ModuleExportName::Ident(ident)) => ident.sym.to_string(),
        Some(ModuleExportName::Str(string_name)) => {
            string_name.value.to_string_lossy().into_owned()
        }
        None => named.local.sym.to_string(),
        #[cfg(swc_ast_unknown)]
        Some(_) => unsupported_ast_node("ModuleExportName"),
    }
}
