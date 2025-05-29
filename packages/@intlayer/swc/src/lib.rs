//! intlayer-swc-plugin – fixed for swc_core 26 / swc 11

use serde::Deserialize;
use std::{
    collections::{BTreeMap, HashSet},
    sync::{LazyLock, Mutex},
    path::{Path, PathBuf},
    hash::{Hasher, BuildHasherDefault, BuildHasher}
};
use swc_core::{
    common::{SyntaxContext, DUMMY_SP},
    ecma::{
        ast::*,
        atoms::Atom,
        visit::{VisitMut, VisitMutWith},
    },
    plugin::{
        metadata::{TransformPluginMetadataContextKind, TransformPluginProgramMetadata},
        plugin_transform,
    },
    common::{sync::Lrc, SourceMap}, // used for debug log
    ecma::codegen::{text_writer::JsWriter, Emitter}, // used for debug log
};
use pathdiff::diff_paths;
use base62::encode as base62_encode;
use twox_hash::XxHash64;


static DEBUG_LOG: bool = true;


// ─────────────────────────────────────────────────────────────────────────────
//  GLOBAL REGISTRY (optional – you can delete if you don’t need it)
// ─────────────────────────────────────────────────────────────────────────────
static INTLAYER_KEYS: LazyLock<Mutex<HashSet<String>>> =
    LazyLock::new(|| Mutex::new(HashSet::new()));

// ─────────────────────────────────────────────────────────────────────────────
//  PLUGIN OPTIONS
// ─────────────────────────────────────────────────────────────────────────────
#[derive(Debug, Deserialize)]
struct PluginConfig {
    /// Directory that contains `<key>.json` files
    dictionaries_dir: String,

    // Path to the dictionaries entry file
    dictionaries_entry_path: String,
 
}

// ─────────────────────────────────────────────────────────────────────────────
//  AST VISITOR
// ─────────────────────────────────────────────────────────────────────────────
struct TransformVisitor<'a> {
    dictionaries_dir: &'a str,
    /// Per-file cache: key → imported ident
    new_imports: BTreeMap<String, Ident>,
}

impl<'a> TransformVisitor<'a> {
    fn new(dictionaries_dir: &'a str) -> Self {
        Self {
            dictionaries_dir,
            new_imports: BTreeMap::new(),
        }
    }


    /// Turn an i18n key into a short, opaque identifier, e.g.
    ///   "locale-switcher" ➜ "_eEmT39vss4n4"
    fn make_ident(&self, key: &str) -> Ident {
        // 1) hash the key
        let mut hasher = BuildHasherDefault::<XxHash64>::default().build_hasher();
        hasher.write(key.as_bytes());
        let hash = hasher.finish();          // u64

        // 2) base-62-encode the 64-bit number ⇒ up to 11 chars
        let mut encoded = base62_encode(hash);

        // 3) prepend “_” so the ident never begins with a digit
        encoded.insert(0, '_');

        Ident::new(
            Atom::from(encoded),
            DUMMY_SP,
            SyntaxContext::empty(),
        )
    }
}


static PACKAGE_LIST: LazyLock<Vec<Atom>> = LazyLock::new(|| {
    [
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
    .map(|s| Atom::from(s))
    .collect()
});


impl<'a> VisitMut for TransformVisitor<'a> {
    // ── 1.  patch  import { useIntlayer }  ──────────────────────────────────
    fn visit_mut_import_decl(&mut self, import: &mut ImportDecl) {
        import.visit_mut_children_with(self);

        let pkg = import.src.value.clone();
        if !PACKAGE_LIST.iter().any(|a| a == &pkg) {
            return;
        }

        for spec in &mut import.specifiers {
            if let ImportSpecifier::Named(named) = spec {
                match named.local.sym.as_ref() {
                    "useIntlayer" => {
                        // keep local alias, swap the imported name
                        named.imported = Some(ModuleExportName::Ident(Ident::new(
                            Atom::from("useDictionary"),
                            DUMMY_SP,
                            SyntaxContext::empty(),
                        )));
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
        }
    }

    // ── 2.  replace useIntlayer("foo")  ─────────────────────────────────────
    fn visit_mut_call_expr(&mut self, call: &mut CallExpr) {
        call.visit_mut_children_with(self);

        // is callee the bare identifier `useIntlayer` ?
        let callee_ident = match &call.callee {
            Callee::Expr(expr) => {
                if let Expr::Ident(id) = &**expr {
                    id.sym.as_ref()
                } else {
                    return;
                }
            }
            _ => return,
        };
        if callee_ident != "useIntlayer" {
            return;
        }

        // first argument must be a string literal
        let Some(first_arg) = call.args.first_mut() else { return };
        let Expr::Lit(Lit::Str(Str { value, .. })) = &*first_arg.expr else { return };
        
        let key = value.to_string();

        // remember the key globally (optional)
        if let Ok(mut set) = INTLAYER_KEYS.lock() {
            set.insert(key.clone());
        }

        // get/create per-file ident
        let ident = if let Some(id) = self.new_imports.get(&key) {
            id.clone()
        } else {
            let id = self.make_ident(&key);
            self.new_imports.insert(key.clone(), id.clone());
            id
        };

        // replace the argument
        first_arg.expr = Box::new(Expr::Ident(ident));
    }
}

// ─────────────────────────────────────────────────────────────────────────────
//  ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────
#[plugin_transform]
pub fn transform(mut program: Program, metadata: TransformPluginProgramMetadata) -> Program {
    // 1) read and parse plugin options
    let cfg: PluginConfig = match metadata
        .get_transform_plugin_config()
        .and_then(|raw| serde_json::from_str(&raw).ok())
    {
        Some(c) => c,
        None => return program, // no / bad config ⇒ noop
    };

    // 2) skip files outside the configured roots
    let filename = match metadata.get_context(&TransformPluginMetadataContextKind::Filename) {
        Some(f) => f,
        None => return program,
    };

    // ── 2.a  short-circuit the dictionaries entry file  ─────────────────────
    if filename == cfg.dictionaries_entry_path {
        return Program::Module(Module {
            span: DUMMY_SP,
            body: vec![ModuleItem::ModuleDecl(ModuleDecl::ExportDefaultExpr(
                ExportDefaultExpr {
                    span: DUMMY_SP,
                    expr: Box::new(Expr::Object(ObjectLit {
                        span: DUMMY_SP,
                        props: Vec::new(),   // `{}`  ➜  export default {}
                    })),
                },
            ))],
            shebang: None,
        });
    }

    // 3) run visitor
    let mut visitor = TransformVisitor::new(&cfg.dictionaries_dir);
    program.visit_mut_with(&mut visitor);

    // ── 4) inject JSON imports (if any) ───────────────────────────────────────
    if let Program::Module(Module { body, .. }) = &mut program {
        // save the string so we don’t need `visitor` inside the loop
        // take ownership of the map, then iterate
        let dictionaries_dir = visitor.dictionaries_dir.to_owned();

        // 4.a  where should we inject?  ─────────────────────────────────────
        //     keep all leading `'use …'` strings at the top
        let mut insert_pos = 0;
        for item in body.iter() {
            match item {
                ModuleItem::Stmt(Stmt::Expr(ExprStmt { expr, .. })) => {
                    if let Expr::Lit(Lit::Str(Str { value, .. })) = &**expr {
                        let v = value.as_ref();
                        if v == "use client" || v == "use server" {
                            insert_pos = 1;
                            continue;        // still inside the directive block
                        }
                    }
                }
                _ => {}
            }
            break;                           // first non-directive stmt reached
        }

        // 4.b  inject imports after the directives  ─────────────────────────
        for (key, ident) in visitor.new_imports.clone().into_iter().rev() {
            // `filename` comes from your metadata.get_context(Filename)
        
            let file_path = Path::new(&filename);
            let dict_file = Path::new(&dictionaries_dir).join(format!("{}.json", key));

            // Compute a relative path FROM the source file’s directory TO the JSON file
            let relative = diff_paths(&dict_file, file_path.parent().unwrap())
                .unwrap_or_else(|| PathBuf::from(&dict_file));

            // If it doesn’t start with “./” or “../”, add “./”
            let import_path = {
                let s = relative.to_string_lossy();
                if s.starts_with("./") || s.starts_with("../") {
                    s.into_owned()
                } else {
                    format!("./{}", s)
                }
            };

            let import_src = import_path; // now relative
            
            
            body.insert(
                insert_pos,
                ModuleItem::ModuleDecl(ModuleDecl::Import(ImportDecl {
                    span: DUMMY_SP,
                    specifiers: vec![ImportSpecifier::Default(ImportDefaultSpecifier {
                        span: DUMMY_SP,
                        local: ident,
                    })],
                    src: Box::new(Str::from(import_src)),
                    type_only: false,
                    with: None,
                    phase: ImportPhase::Evaluation,
                })),
            );
            
            insert_pos += 1;                 // keep later injected imports in order
        }


        if DEBUG_LOG {

            // ── 5) print entire transformed file as JS ──────────────────────────
            {
                // Create a fresh SourceMap just for codegen (no real sourcemaps needed here)
                let cm: Lrc<SourceMap> = Default::default();
                let mut buf = Vec::new();
                {
                    let mut emitter = Emitter {
                        cfg: Default::default(),
                        cm: cm.clone(),
                        comments: None, // or `metadata.comments.as_ref().map(|c| &**c)`
                        wr: JsWriter::new(cm.clone(), "\n", &mut buf, None),
                    };
                    // Emit either Module or Script
                    emitter.emit_program(&program)
                        .expect("swc-intlayer: failed to emit code");
                }
                let code = String::from_utf8(buf)
                    .expect("swc-intlayer: emitted code was not valid UTF-8");
                
                    println!("\n[swc-intlayer] final code for {}:\n{}\n", filename, code);
            }
        }

    }


    program
}
