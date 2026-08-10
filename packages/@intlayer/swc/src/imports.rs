//! Injection of the dictionary import declarations collected by the optimize
//! transform.

use crate::{
    ast::{make_ident, make_str},
    optimize::InjectedImports,
    packages::NESTED_DICTIONARIES_SUBDIR,
    paths::relative_import_path,
};
use std::{collections::HashSet, path::Path};
use swc_core::{common::DUMMY_SP, ecma::ast::*};

/// Absolute directories the generated dictionary modules live in.
pub struct DictionaryDirs<'a> {
    /// `<key>.json` compiled dictionaries (and their `nested/<key>.mjs` companions).
    pub dictionaries_dir: &'a str,
    /// `<key>.mjs` per-locale dynamic loaders.
    pub dynamic_dictionaries_dir: &'a str,
    /// `<key>.mjs` live/fetch loaders.
    pub fetch_dictionaries_dir: &'a str,
}

/// Builds the `with { type: "json" }` import attribute.
fn json_import_attributes() -> Box<ObjectLit> {
    Box::new(ObjectLit {
        span: DUMMY_SP,
        props: vec![PropOrSpread::Prop(Box::new(Prop::KeyValue(KeyValueProp {
            key: PropName::Ident(make_ident("type").into()),
            value: Box::new(Expr::Lit(Lit::Str(make_str("json")))),
        })))],
    })
}

/// Builds `import <local> from "<specifier>"`, optionally carrying the JSON
/// import attribute.
fn default_import(local: Ident, specifier: String, with_json_attribute: bool) -> ModuleItem {
    ModuleItem::ModuleDecl(ModuleDecl::Import(ImportDecl {
        span: DUMMY_SP,
        specifiers: vec![ImportSpecifier::Default(ImportDefaultSpecifier {
            span: DUMMY_SP,
            local,
        })],
        src: Box::new(Str::from(specifier)),
        type_only: false,
        with: with_json_attribute.then(json_import_attributes),
        phase: ImportPhase::Evaluation,
    }))
}

/// Returns the index at which injected imports must be inserted so the leading
/// directive prologue (`'use client'`, `'use server'`, `'use strict'`, …) stays
/// at the top of the module.
///
/// Every leading string-literal statement counts, mirroring the Babel pass:
/// a bundler that lowers an `import` to a string statement is the one exception
/// it makes, since inserting before that would reorder module evaluation.
fn import_insert_position(body: &[ModuleItem]) -> usize {
    let mut insert_position = 0;

    for item in body {
        let ModuleItem::Stmt(Stmt::Expr(ExprStmt { expr, .. })) = item else {
            break;
        };
        let Expr::Lit(Lit::Str(Str { value, .. })) = &**expr else {
            break;
        };
        let Some(directive) = value.as_str() else {
            break;
        };
        if directive.starts_with("import") || directive.starts_with("require") {
            break;
        }

        insert_position += 1;
    }

    insert_position
}

/// Inserts the collected dictionary imports at the top of `program`.
///
/// Static imports point at the compiled JSON — or at the `nested/<key>.mjs`
/// companion module for dictionaries holding `nest()` references, which
/// re-exports the dictionary with its nest targets attached (an ES module, so
/// no `with { type: "json" }` attribute). Dynamic imports point at the
/// per-locale loader in either the dynamic or the fetch directory, chosen by
/// the identifier suffix the optimize transform assigned.
pub fn inject_dictionary_imports(
    program: &mut Program,
    injected_imports: &InjectedImports,
    dirs: &DictionaryDirs<'_>,
    nesting_dictionary_keys: &HashSet<&str>,
    source_file_path: &str,
) {
    let Program::Module(Module { body, .. }) = program else {
        return;
    };

    let file_dir_abs = Path::new(source_file_path)
        .parent()
        .unwrap_or_else(|| Path::new("/"));

    let mut insert_position = import_insert_position(body);

    for (key, ident) in injected_imports.static_imports.iter().rev() {
        let has_nested_dictionaries = nesting_dictionary_keys.contains(key.as_str());
        let dictionary_file_abs = if has_nested_dictionaries {
            Path::new(dirs.dictionaries_dir)
                .join(NESTED_DICTIONARIES_SUBDIR)
                .join(format!("{}.mjs", key))
        } else {
            Path::new(dirs.dictionaries_dir).join(format!("{}.json", key))
        };

        body.insert(
            insert_position,
            default_import(
                ident.clone(),
                relative_import_path(&dictionary_file_abs, file_dir_abs),
                !has_nested_dictionaries,
            ),
        );

        insert_position += 1;
    }

    for (key, ident) in injected_imports.dynamic_imports.iter().rev() {
        let is_fetch_loader = ident.sym.as_ref().ends_with("_fetch");
        let target_dir = if is_fetch_loader {
            dirs.fetch_dictionaries_dir
        } else {
            dirs.dynamic_dictionaries_dir
        };
        let dictionary_file_abs = Path::new(target_dir).join(format!("{}.mjs", key));

        body.insert(
            insert_position,
            default_import(
                ident.clone(),
                relative_import_path(&dictionary_file_abs, file_dir_abs),
                false,
            ),
        );

        insert_position += 1;
    }
}
