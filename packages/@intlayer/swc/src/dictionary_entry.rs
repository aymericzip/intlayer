//! Replacement of the generated dictionaries entry module.

use crate::ast::make_ident;
use swc_core::{
    common::{SyntaxContext, DUMMY_SP},
    ecma::ast::*,
};

/// Name of the named export the entry module exposes alongside its default one.
const GET_DICTIONARIES_EXPORT_NAME: &str = "getDictionaries";

/// Builds the empty stand-in for the generated dictionaries entry module:
///
/// ```js
/// export default {};
/// export const getDictionaries = () => ({});
/// ```
///
/// Every `useIntlayer('key')` call has already been rewritten to read from a
/// direct import, so the global registry the entry module used to hold is dead
/// weight — emptying it lets the bundler drop every dictionary that is not
/// actually referenced.
pub fn build_empty_dictionaries_entry() -> Program {
    let empty_object = || {
        Box::new(Expr::Object(ObjectLit {
            span: DUMMY_SP,
            props: Vec::new(),
        }))
    };

    let default_export = ModuleItem::ModuleDecl(ModuleDecl::ExportDefaultExpr(ExportDefaultExpr {
        span: DUMMY_SP,
        expr: empty_object(),
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
                    id: make_ident(GET_DICTIONARIES_EXPORT_NAME),
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
                    body: Box::new(BlockStmtOrExpr::Expr(empty_object())),
                }))),
                definite: false,
            }],
        })),
    }));

    Program::Module(Module {
        span: DUMMY_SP,
        body: vec![default_export, named_export],
        shebang: None,
    })
}
