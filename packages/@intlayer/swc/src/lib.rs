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


static DEBUG_LOG: bool = false;


// ─────────────────────────────────────────────────────────────────────────────
//  GLOBAL REGISTRY (optional – you can delete if you don't need it)
// ─────────────────────────────────────────────────────────────────────────────
static INTLAYER_KEYS: LazyLock<Mutex<HashSet<String>>> =
    LazyLock::new(|| Mutex::new(HashSet::new()));

// ─────────────────────────────────────────────────────────────────────────────
//  PLUGIN OPTIONS
// ─────────────────────────────────────────────────────────────────────────────
#[derive(Debug, Deserialize)]
struct PluginConfig {
    /// Directory that contains `<key>.json` files for static imports
    #[serde(rename = "dictionariesDir")]
    dictionaries_dir: String,

    /// Path to the dictionaries entry file
    #[serde(rename = "dictionariesEntryPath")]
    dictionaries_entry_path: String,

    /// Directory that contains `<key>.mjs` files for dynamic imports
    #[serde(rename = "dynamicDictionariesDir")]
    dynamic_dictionaries_dir: String,

    /// Path to the dynamic dictionaries entry file
    #[serde(rename = "dynamicDictionariesEntryPath")]
    dynamic_dictionaries_entry_path: String,

    /// Import mode for the plugin: "static", "dynamic", or "async"
    #[serde(rename = "importMode")]
    import_mode: Option<String>,

    /// If true, the plugin will replace the dictionary entry file with `export default {}`.
    #[serde(rename = "replaceDictionaryEntry")]
    replace_dictionary_entry: Option<bool>,

    /// Files list to traverse
    #[serde(rename = "filesList")]
    files_list: Vec<String>,

    /// If true, activate live sync: import from virtual entry instead of JSON file
    #[serde(rename = "liveSync")]
    live_sync: Option<bool>,
}

// ─────────────────────────────────────────────────────────────────────────────
//  AST VISITOR
// ─────────────────────────────────────────────────────────────────────────────
struct TransformVisitor<'a> {
    dictionaries_dir: &'a str,
    dynamic_dictionaries_dir: &'a str,
    import_mode: String,
    /// Per-file cache: key → imported ident for static imports
    new_static_imports: BTreeMap<String, Ident>,
    /// Per-file cache: key → imported ident for dynamic imports
    new_dynamic_imports: BTreeMap<String, Ident>,
    /// Track if current file imports from packages supporting dynamic imports
    use_dynamic_helpers: bool,
    /// Track if current file imports from packages supporting async imports
    use_async_helpers: bool,
}

impl<'a> TransformVisitor<'a> {
    fn new(dictionaries_dir: &'a str, dynamic_dictionaries_dir: &'a str, import_mode: String) -> Self {
        Self {
            dictionaries_dir,
            dynamic_dictionaries_dir,
            import_mode,
            new_static_imports: BTreeMap::new(),
            new_dynamic_imports: BTreeMap::new(),
            use_dynamic_helpers: false,
            use_async_helpers: false,
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

        // 3) prepend "_" so the ident never begins with a digit
        encoded.insert(0, '_');

        Ident::new(
            Atom::from(encoded),
            DUMMY_SP,
            SyntaxContext::empty(),
        )
    }

    /// Create a dynamic import identifier (with _dyn suffix)
    fn make_dynamic_ident(&self, key: &str) -> Ident {
        // 1) hash the key
        let mut hasher = BuildHasherDefault::<XxHash64>::default().build_hasher();
        hasher.write(key.as_bytes());
        let hash = hasher.finish();          // u64

        // 2) base-62-encode the 64-bit number ⇒ up to 11 chars
        let mut encoded = base62_encode(hash);

        // 3) prepend "_" and append "_dyn" for dynamic imports
        encoded.insert(0, '_');
        encoded.push_str("_dyn");

        Ident::new(
            Atom::from(encoded),
            DUMMY_SP,
            SyntaxContext::empty(),
        )
    }
}

static PACKAGE_LIST: LazyLock<Vec<Atom>> = LazyLock::new(|| {
    [
        "intlayer",
        "@intlayer/core",
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

static PACKAGE_LIST_DYNAMIC: LazyLock<Vec<Atom>> = LazyLock::new(|| {
    [
        "react-intlayer",
        "react-intlayer/client",
        "react-intlayer/server",
        "next-intlayer",
        "next-intlayer/client",
        "next-intlayer/server",
    ]
    .into_iter()
    .map(|s| Atom::from(s))
    .collect()
});

impl<'a> VisitMut for TransformVisitor<'a> {
    // ── 0.  handle expression-level transformations (like await wrapping)  ──
    fn visit_mut_expr(&mut self, expr: &mut Expr) {
        // First visit children
        expr.visit_mut_children_with(self);

        // Then handle our specific transformations
        if let Expr::Call(call) = expr {
            // Check if this is a useIntlayer or getIntlayer call
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
            
            if callee_ident != "useIntlayer" && callee_ident != "getIntlayer" {
                return;
            }

            // First argument must be a string literal
            let Some(first_arg) = call.args.first_mut() else { return };
            let Expr::Lit(Lit::Str(Str { value, .. })) = &*first_arg.expr else { return };
            
            let key = value.to_string();

            // Remember the key globally (optional)
            if let Ok(mut set) = INTLAYER_KEYS.lock() {
                set.insert(key.clone());
            }

            // Determine if this specific call should use dynamic imports
            let should_use_dynamic_for_this_call = callee_ident == "useIntlayer" && self.use_dynamic_helpers;
            // Determine if this specific call should use async imports
            let should_use_async_for_this_call = callee_ident == "useIntlayer" && self.use_async_helpers;

            if should_use_async_for_this_call {
                // Use dynamic imports for useIntlayer when async helpers are enabled
                let ident = if let Some(id) = self.new_dynamic_imports.get(&key) {
                    id.clone()
                } else {
                    let id = self.make_dynamic_ident(&key);
                    self.new_dynamic_imports.insert(key.clone(), id.clone());
                    id
                };

                // Async helper: first argument is the dictionary promise
                first_arg.expr = Box::new(Expr::Ident(ident));

                // Wrap the call with await for async helpers
                let call_expr = Expr::Call(call.clone());
                *expr = Expr::Await(AwaitExpr {
                    span: DUMMY_SP,
                    arg: Box::new(call_expr),
                });
            } else if should_use_dynamic_for_this_call {
                // Use dynamic imports for useIntlayer when dynamic helpers are enabled
                let ident = if let Some(id) = self.new_dynamic_imports.get(&key) {
                    id.clone()
                } else {
                    let id = self.make_dynamic_ident(&key);
                    self.new_dynamic_imports.insert(key.clone(), id.clone());
                    id
                };

                // Dynamic helper: first argument is the dictionary, second is the original key
                call.args.insert(0, ExprOrSpread {
                    spread: None,
                    expr: Box::new(Expr::Ident(ident)),
                });
                // Keep the original string literal as the second argument
            } else {
                // Use static imports for getIntlayer or useIntlayer when not using dynamic helpers
                let ident = if let Some(id) = self.new_static_imports.get(&key) {
                    id.clone()
                } else {
                    let id = self.make_ident(&key);
                    self.new_static_imports.insert(key.clone(), id.clone());
                    id
                };

                // Static helper: replace the string argument with the identifier
                first_arg.expr = Box::new(Expr::Ident(ident));
            }
        }
    }

    // ── 1.  patch  import { useIntlayer }  ──────────────────────────────────
    fn visit_mut_import_decl(&mut self, import: &mut ImportDecl) {
        import.visit_mut_children_with(self);

        let pkg = import.src.value.clone();
        if !PACKAGE_LIST.iter().any(|a| a == &pkg) {
            return;
        }

        // Determine if this package supports dynamic imports
        let package_supports_dynamic = PACKAGE_LIST_DYNAMIC.iter().any(|a| a == &pkg);
        let should_use_dynamic_helpers = self.import_mode == "dynamic" && package_supports_dynamic;
        let should_use_async_helpers = self.import_mode == "async" && package_supports_dynamic;
        
        if should_use_dynamic_helpers {
            self.use_dynamic_helpers = true;
        }

        if should_use_async_helpers {
            self.use_async_helpers = true;
        }

        for spec in &mut import.specifiers {
            if let ImportSpecifier::Named(named) = spec {
                match named.local.sym.as_ref() {
                    "useIntlayer" => {
                        if should_use_async_helpers {
                            // Use async helper for useIntlayer when async mode is enabled
                            named.imported = Some(ModuleExportName::Ident(Ident::new(
                                Atom::from("useDictionaryAsync"),
                                DUMMY_SP,
                                SyntaxContext::empty(),
                            )));
                        } else if should_use_dynamic_helpers {
                            // Use dynamic helper for useIntlayer when dynamic mode is enabled
                            named.imported = Some(ModuleExportName::Ident(Ident::new(
                                Atom::from("useDictionaryDynamic"),
                                DUMMY_SP,
                                SyntaxContext::empty(),
                            )));
                        } else {
                            // Use static helper
                            named.imported = Some(ModuleExportName::Ident(Ident::new(
                                Atom::from("useDictionary"),
                                DUMMY_SP,
                                SyntaxContext::empty(),
                            )));
                        }
                    }
                    "getIntlayer" => {
                        // getIntlayer always uses static imports
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

    // ── 2.a  skip file if not in files_list (when files_list is not empty)  ──
    if !cfg.files_list.is_empty() && !cfg.files_list.contains(&filename) {
        return program; // skip processing this file
    }

    // ── 2.b  short-circuit the dictionaries entry file  ─────────────────────
    if cfg.replace_dictionary_entry.unwrap_or(false) && filename == cfg.dictionaries_entry_path {
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
    let import_mode = cfg.import_mode.unwrap_or("static".to_string());
    let mut visitor = TransformVisitor::new(&cfg.dictionaries_dir, &cfg.dynamic_dictionaries_dir, import_mode);
    program.visit_mut_with(&mut visitor);

    // ── 4) inject JSON/MJS imports (if any) ───────────────────────────────────
    if let Program::Module(Module { body, .. }) = &mut program {

        // save the strings so we don't need `visitor` inside the loop
        let dictionaries_dir = visitor.dictionaries_dir.to_owned();
        let dynamic_dictionaries_dir = visitor.dynamic_dictionaries_dir.to_owned();

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

        // 4.b  inject static imports after the directives  ─────────────────────
        for (key, ident) in visitor.new_static_imports.clone().into_iter().rev() {
            // When liveSync is enabled, import from the virtual dictionaries entry
            // instead of the JSON file path, mirroring the Babel plugin behavior.
            let import_path = if cfg.live_sync.unwrap_or(false) {
                format!("@intlayer/dictionaries-entry/{}", key)
            } else {
                let file_path = Path::new(&filename);
                let dict_file = Path::new(&dictionaries_dir).join(format!("{}.json", key));

                // Compute a relative path FROM the source file's directory TO the JSON file
                let relative = diff_paths(&dict_file, file_path.parent().unwrap())
                    .unwrap_or_else(|| PathBuf::from(&dict_file));

                // If it doesn't start with "./" or "../", add "./"
                let s = relative.to_string_lossy();
                if s.starts_with("./") || s.starts_with("../") {
                    s.into_owned()
                } else {
                    format!("./{}", s)
                }
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
                        props: vec![
                            PropOrSpread::Prop(Box::new(Prop::KeyValue(KeyValueProp {
                                key: PropName::Ident(Ident::new(
                                    Atom::from("type"),
                                    DUMMY_SP,
                                    SyntaxContext::empty()
                                ).into()),
                                value: Box::new(Expr::Lit(Lit::Str(Str {
                                    span: DUMMY_SP,
                                    value: Atom::from("json"),
                                    raw: None,
                                }))),
                            })))
                        ],
                    })),
                    phase: ImportPhase::Evaluation,
                })),
            );
            
            insert_pos += 1;                 // keep later injected imports in order
        }

        // 4.c  inject dynamic imports after the static imports  ─────────────────
        for (key, ident) in visitor.new_dynamic_imports.clone().into_iter().rev() {
            let file_path = Path::new(&filename);
            let dict_file = Path::new(&dynamic_dictionaries_dir).join(format!("{}.mjs", key));

            // Compute a relative path FROM the source file's directory TO the MJS file
            let relative = diff_paths(&dict_file, file_path.parent().unwrap())
                .unwrap_or_else(|| PathBuf::from(&dict_file));

            // If it doesn't start with "./" or "../", add "./"
            let import_path = {
                let s = relative.to_string_lossy();
                if s.starts_with("./") || s.starts_with("../") {
                    s.into_owned()
                } else {
                    format!("./{}", s)
                }
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
