//! intlayer-swc-plugin – fixed for swc_core 53+ (Next.js 16.1+)

use base62::encode as base62_encode;
use pathdiff::diff_paths;
use serde::Deserialize;
use std::{
    collections::{BTreeMap, HashSet},
    hash::{BuildHasher, BuildHasherDefault, Hasher},
    path::Path,
    sync::{LazyLock, Mutex},
};
use swc_core::{
    common::{sync::Lrc, SourceMap}, // used for debug log
    common::{SyntaxContext, DUMMY_SP},
    ecma::codegen::{text_writer::JsWriter, Emitter}, // used for debug log
    ecma::{
        ast::*,
        atoms::Atom,
        visit::{VisitMut, VisitMutWith},
    },
    plugin::{
        metadata::{TransformPluginMetadataContextKind, TransformPluginProgramMetadata},
        plugin_transform,
    },
};
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
#[derive(Debug, Deserialize, Clone)]
struct PluginConfig {
    // Directory that contains `<key>.json` files for static imports
    #[serde(rename = "dictionariesDir")]
    dictionaries_dir: String,

    // Path to the dictionaries entry file
    #[serde(rename = "dictionariesEntryPath")]
    dictionaries_entry_path: String,

    // Directory that contains `<key>.mjs` files for dynamic imports
    #[serde(rename = "dynamicDictionariesDir")]
    dynamic_dictionaries_dir: String,

    // Directory that contains `<key>.mjs` files for live/fetch imports
    #[serde(rename = "fetchDictionariesDir")]
    fetch_dictionaries_dir: String,

    // Import mode for the plugin: "static", "dynamic", or "fetch"
    #[serde(rename = "importMode")]
    import_mode: Option<String>,

    // If true, the plugin will replace the dictionary entry file with `export default {}`.
    #[serde(rename = "replaceDictionaryEntry")]
    replace_dictionary_entry: Option<bool>,

    // Files list to traverse
    #[serde(rename = "filesList")]
    files_list: Vec<String>,

    // Map of dictionary keys to their specific import mode.
    #[serde(rename = "dictionaryModeMap")]
    dictionary_mode_map: Option<BTreeMap<String, String>>,
}

// ─────────────────────────────────────────────────────────────────────────────
//  AST VISITOR
// ─────────────────────────────────────────────────────────────────────────────
struct PrePassVisitor<'a> {
    dictionary_mode_map: &'a BTreeMap<String, String>,
    has_dynamic_call: bool,
    caller_map: BTreeMap<String, String>,
}

impl<'a> VisitMut for PrePassVisitor<'a> {
    fn visit_mut_import_decl(&mut self, import: &mut ImportDecl) {
        let pkg_atom = &import.src.value;
        let pkg_str = pkg_atom.as_str().unwrap_or_default();

        if !PACKAGE_LIST.iter().any(|a| a.as_str() == pkg_str) {
            import.visit_mut_children_with(self);
            return;
        }

        for spec in &import.specifiers {
            if let ImportSpecifier::Named(named) = spec {
                let imported_name = if let Some(ModuleExportName::Ident(id)) = &named.imported {
                    id.sym.to_string()
                } else if let Some(ModuleExportName::Str(str)) = &named.imported {
                    str.value.to_string_lossy().into_owned()
                } else {
                    named.local.sym.to_string()
                };

                if imported_name == "useIntlayer" || imported_name == "getIntlayer" {
                    self.caller_map.insert(
                        named.local.sym.to_string(),
                        imported_name,
                    );
                }
            }
        }
        import.visit_mut_children_with(self);
    }

    fn visit_mut_call_expr(&mut self, call: &mut CallExpr) {
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

        let original_caller = self.caller_map.get(callee_ident);

        if let Some(caller) = original_caller {
            if caller == "useIntlayer" {
                if let Some(first_arg) = call.args.first() {
                    let mut key_opt = None;
                    if let Expr::Lit(Lit::Str(Str { value, .. })) = &*first_arg.expr {
                        key_opt = Some(value.to_string_lossy().into_owned());
                    } else if let Expr::Tpl(Tpl { exprs, quasis, .. }) = &*first_arg.expr {
                        if exprs.is_empty() && quasis.len() == 1 {
                            key_opt = Some(quasis[0].raw.to_string());
                        }
                    }

                    if let Some(key) = key_opt {
                        if let Some(mode) = self.dictionary_mode_map.get(&key) {
                            if mode == "dynamic" || mode == "fetch" {
                                self.has_dynamic_call = true;
                            }
                        }
                    }
                }
            }
        }
        call.visit_mut_children_with(self);
    }
}

struct TransformVisitor<'a> {
    dictionaries_dir: &'a str,
    dynamic_dictionaries_dir: &'a str,
    import_mode: String,
    dictionary_mode_map: &'a BTreeMap<String, String>,
    // Per-file cache: key → imported ident for static imports
    new_static_imports: BTreeMap<String, Ident>,
    // Per-file cache: key → imported ident for dynamic imports
    new_dynamic_imports: BTreeMap<String, Ident>,
    // Track if current file imports from packages supporting dynamic imports
    use_dynamic_helpers: bool,
    // Track if file has any dynamic/live call detected in pre-pass
    file_has_dynamic_call: bool,
    // Caller map mapped from pre-pass
    caller_map: BTreeMap<String, String>,
}

impl<'a> TransformVisitor<'a> {
    fn new(
        dictionaries_dir: &'a str,
        dynamic_dictionaries_dir: &'a str,
        import_mode: String,
        dictionary_mode_map: &'a BTreeMap<String, String>,
        file_has_dynamic_call: bool,
        caller_map: BTreeMap<String, String>,
    ) -> Self {
        Self {
            dictionaries_dir,
            dynamic_dictionaries_dir,
            import_mode,
            dictionary_mode_map,
            new_static_imports: BTreeMap::new(),
            new_dynamic_imports: BTreeMap::new(),
            use_dynamic_helpers: false,
            file_has_dynamic_call,
            caller_map,
        }
    }

    // Turn an i18n key into a short, opaque identifier, e.g.
    //    "locale-switcher" ➜ "_eEmT39vss4n4"
    fn make_ident(&self, key: &str) -> Ident {
        // Hash the key
        let mut hasher = BuildHasherDefault::<XxHash64>::default().build_hasher();
        hasher.write(key.as_bytes());
        let hash = hasher.finish(); // u64

        // Base-62-encode the 64-bit number ⇒ up to 11 chars
        let mut encoded = base62_encode(hash);

        // Prepend "_" so the ident never begins with a digit
        encoded.insert(0, '_');

        Ident::new(Atom::from(encoded), DUMMY_SP, SyntaxContext::empty())
    }

    // Create a dynamic import identifier (with _dyn suffix)
    fn make_dynamic_ident(&self, key: &str) -> Ident {
        // Hash the key
        let mut hasher = BuildHasherDefault::<XxHash64>::default().build_hasher();
        hasher.write(key.as_bytes());
        let hash = hasher.finish(); // u64

        // Base-62-encode the 64-bit number ⇒ up to 11 chars
        let mut encoded = base62_encode(hash);

        // Prepend "_" and append "_dyn" for dynamic imports
        encoded.insert(0, '_');
        encoded.push_str("_dyn");

        Ident::new(Atom::from(encoded), DUMMY_SP, SyntaxContext::empty())
    }

    // Create a live/fetch import identifier (with _fetch suffix)
    fn make_fetch_ident(&self, key: &str) -> Ident {
        let mut hasher = BuildHasherDefault::<XxHash64>::default().build_hasher();
        hasher.write(key.as_bytes());
        let hash = hasher.finish();

        let mut encoded = base62_encode(hash);
        encoded.insert(0, '_');
        encoded.push_str("_fetch");

        Ident::new(Atom::from(encoded), DUMMY_SP, SyntaxContext::empty())
    }
}

static PACKAGE_LIST: LazyLock<Vec<Atom>> = LazyLock::new(|| {
    [
        "intlayer",
        "@intlayer/core",
        "@intlayer/core/interpreter",
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
        "preact-intlayer",
        "vue-intlayer",
        "solid-intlayer",
        "svelte-intlayer",
        "angular-intlayer",
    ]
    .into_iter()
    .map(|s| Atom::from(s))
    .collect()
});

impl<'a> VisitMut for TransformVisitor<'a> {
    // Handle expression-level transformations
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

            let original_caller = self.caller_map.get(callee_ident);
            if original_caller.is_none() {
                return;
            }
            let original_caller = original_caller.unwrap();

            let Some(first_arg) = call.args.first_mut() else {
                return;
            };

            let mut key_opt = None;
            if let Expr::Lit(Lit::Str(Str { value, .. })) = &*first_arg.expr {
                key_opt = Some(value.to_string_lossy().into_owned());
            } else if let Expr::Tpl(Tpl { exprs, quasis, .. }) = &*first_arg.expr {
                if exprs.is_empty() && quasis.len() == 1 {
                    key_opt = Some(quasis[0].raw.to_string());
                }
            }

            let Some(key) = key_opt else {
                return;
            };

            // Remember the key globally (optional)
            if let Ok(mut set) = INTLAYER_KEYS.lock() {
                set.insert(key.clone());
            }

            // Determine if this specific call should use live or dynamic imports (per-key in live mode)
            let mut per_call_mode = "static".to_string();
            let dictionary_override_mode = self.dictionary_mode_map.get(&key);

            if original_caller == "useIntlayer" && self.use_dynamic_helpers {
                if let Some(mode) = dictionary_override_mode {
                    per_call_mode = mode.clone();
                } else {
                    per_call_mode = self.import_mode.clone();
                }
            } else if original_caller == "useIntlayer" && !self.use_dynamic_helpers {
                // If dynamic helpers are NOT active (global mode is static),
                // we STILL might want to force dynamic/live for this specific call
                if let Some(mode) = dictionary_override_mode {
                    if mode == "dynamic" || mode == "fetch" {
                        per_call_mode = mode.clone();
                    }
                }
            }

            if per_call_mode == "fetch" {
                // Live helper: first argument is the live dictionary, second is the original key
                let ident = if let Some(id) = self.new_dynamic_imports.get(&key) {
                    id.clone()
                } else {
                    let id = self.make_fetch_ident(&key);
                    self.new_dynamic_imports.insert(key.clone(), id.clone());
                    id
                };
                call.args.insert(
                    0,
                    ExprOrSpread {
                        spread: None,
                        expr: Box::new(Expr::Ident(ident)),
                    },
                );
            } else if per_call_mode == "dynamic" {
                // Use dynamic imports for useIntlayer when dynamic helpers are enabled
                let ident = if let Some(id) = self.new_dynamic_imports.get(&key) {
                    id.clone()
                } else {
                    let id = self.make_dynamic_ident(&key);
                    self.new_dynamic_imports.insert(key.clone(), id.clone());
                    id
                };

                // Dynamic helper: first argument is the dictionary, second is the original key
                call.args.insert(
                    0,
                    ExprOrSpread {
                        spread: None,
                        expr: Box::new(Expr::Ident(ident)),
                    },
                );
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

    // Patch  import { useIntlayer }
    fn visit_mut_import_decl(&mut self, import: &mut ImportDecl) {
        import.visit_mut_children_with(self);

        let pkg_atom = &import.src.value;
        let pkg_str = pkg_atom.as_str().unwrap_or_default();

        // FIX: Compare the unpacked string slice against the static Atom string
        if !PACKAGE_LIST.iter().any(|a| a.as_str() == pkg_str) {
            return;
        }

        // Determine if this package supports dynamic imports
        let package_supports_dynamic = PACKAGE_LIST_DYNAMIC.iter().any(|a| a.as_str() == pkg_str);
        let should_use_dynamic_helpers = (self.import_mode == "dynamic"
            || self.import_mode == "fetch"
            || self.file_has_dynamic_call)
            && package_supports_dynamic;

        if should_use_dynamic_helpers {
            self.use_dynamic_helpers = true;
        }

        for spec in &mut import.specifiers {
            if let ImportSpecifier::Named(named) = spec {
                let imported_name = if let Some(ModuleExportName::Ident(id)) = &named.imported {
                    id.sym.to_string()
                } else if let Some(ModuleExportName::Str(str)) = &named.imported {
                    str.value.to_string_lossy().into_owned()
                } else {
                    named.local.sym.to_string()
                };

                match imported_name.as_str() {
                    "useIntlayer" => {
                        if should_use_dynamic_helpers {
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
//  PROCESS TRANSFORM
// ─────────────────────────────────────────────────────────────────────────────

/// Normalize a path string to use forward slashes and consistent drive casing (on Windows-like paths).
/// This ensures consistent behavior for `diff_paths` across platforms/WASM.
fn normalize_path(path: &str) -> String {
    // 1. Replace backslashes with forward slashes
    let mut s = path.replace("\\", "/");

    // 2. If it looks like a Windows absolute path (e.g. "C:/..."), lower-case the drive letter
    // Regex eq: ^[a-zA-Z]:/
    if s.len() >= 2 {
        let bytes = s.as_bytes();
        if bytes[1] == b':' {
            // It has a colon at index 1. Check index 0 for letter.
            let first_char = s.chars().next().unwrap();
            if first_char.is_ascii_alphabetic() {
                // If checking for "C:/" or "C:" (root relative?) - usually absolute paths have / after :
                // But just normalizing the drive letter is enough.
                let lower_drive = first_char.to_ascii_lowercase();
                if first_char != lower_drive {
                    s.replace_range(0..1, &lower_drive.to_string());
                }
            }
        }
    }
    s
}

pub(crate) fn process_transform(
    mut program: Program,
    mut cfg: PluginConfig,
    filename_raw: String,
) -> Program {
    // Normalize config directories
    cfg.dictionaries_dir = normalize_path(&cfg.dictionaries_dir);
    cfg.dynamic_dictionaries_dir = normalize_path(&cfg.dynamic_dictionaries_dir);
    cfg.fetch_dictionaries_dir = normalize_path(&cfg.fetch_dictionaries_dir);
    cfg.dictionaries_entry_path = normalize_path(&cfg.dictionaries_entry_path);

    // skip file if not in files_list (when files_list is not empty) ──
    let absolute_filename_opt: Option<String> = if !cfg.files_list.is_empty() {
        // Find if this filename is in the allowed list AND get its absolute path
        let matched = cfg
            .files_list
            .iter()
            .find(|target| filename_raw.ends_with(*target) || target.ends_with(&filename_raw));

        if let Some(target) = matched {
            if DEBUG_LOG {
                println!(
                    "[swc-intlayer] processing file: {} (matched absolute: {})",
                    filename_raw, target
                );
            }
            Some(target.clone())
        } else {
            if DEBUG_LOG {
                // Log exactly what comparison failed
                println!(
                    "[swc-intlayer] skipping: {} (not in files_list)",
                    filename_raw
                );
            }
            return program;
        }
    } else {
        if DEBUG_LOG {
            println!(
                "[swc-intlayer] processing file: {} (files_list empty)",
                filename_raw
            );
        }
        // Fallback: assume filename_raw is absolute if list is empty (rare in this context)
        Some(filename_raw.clone())
    };

    // Determine the working file path to use for relative calc
    let working_filename = normalize_path(&absolute_filename_opt.unwrap_or(filename_raw.clone()));

    // Short-circuit the dictionaries entry file  ─────────────────────
    if cfg.replace_dictionary_entry.unwrap_or(false) {
        let is_main_entry = working_filename == cfg.dictionaries_entry_path
            || normalize_path(&filename_raw) == cfg.dictionaries_entry_path;

        if is_main_entry {
            let func_name = "getDictionaries";

            // Create: export default {}
            let default_export =
                ModuleItem::ModuleDecl(ModuleDecl::ExportDefaultExpr(ExportDefaultExpr {
                    span: DUMMY_SP,
                    expr: Box::new(Expr::Object(ObjectLit {
                        span: DUMMY_SP,
                        props: Vec::new(),
                    })),
                }));

            // Create: export const getDictionaries = () => ({});
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
                            id: Ident::new(Atom::from(func_name), DUMMY_SP, SyntaxContext::empty()),
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
                            // body is: () => ({})
                            body: Box::new(BlockStmtOrExpr::Expr(Box::new(Expr::Object(
                                ObjectLit {
                                    span: DUMMY_SP,
                                    props: Vec::new(),
                                },
                            )))),
                        }))),
                        definite: false,
                    }],
                })),
            }));

            // Return a new module containing both exports
            return Program::Module(Module {
                span: DUMMY_SP,
                body: vec![default_export, named_export],
                shebang: None,
            });
        }
    }

    // Run visitor
    if DEBUG_LOG {
        println!(
            "[swc-intlayer] [{}] step 3: running visitor...",
            working_filename
        );
    }
    let import_mode = cfg.import_mode.unwrap_or("static".to_string());
    let dictionary_mode_map = cfg.dictionary_mode_map.unwrap_or_default();

    // Run pre-pass to detect dynamic calls
    let mut pre_pass = PrePassVisitor {
        dictionary_mode_map: &dictionary_mode_map,
        has_dynamic_call: false,
        caller_map: BTreeMap::new(),
    };
    program.visit_mut_with(&mut pre_pass);

    let mut visitor = TransformVisitor::new(
        &cfg.dictionaries_dir,
        &cfg.dynamic_dictionaries_dir,
        import_mode.clone(),
        &dictionary_mode_map,
        pre_pass.has_dynamic_call,
        pre_pass.caller_map,
    );
    program.visit_mut_with(&mut visitor);
    if DEBUG_LOG {
        println!(
            "[swc-intlayer] [{}] step 3: visitor done. static_imports={}, dynamic_imports={}",
            working_filename,
            visitor.new_static_imports.len(),
            visitor.new_dynamic_imports.len()
        );
    }

    // Inject JSON/MJS imports (if any)
    if let Program::Module(Module { body, .. }) = &mut program {
        if DEBUG_LOG {
            println!(
                "[swc-intlayer] [{}] step 4: injecting imports...",
                working_filename
            );
        }

        // Save the strings so we don't need `visitor` inside the loop
        let dictionaries_dir = visitor.dictionaries_dir.to_owned();
        let dynamic_dictionaries_dir = visitor.dynamic_dictionaries_dir.to_owned();
        let fetch_dictionaries_dir = cfg.fetch_dictionaries_dir.to_owned();

        // Prepare paths for diffing
        let file_path_abs = Path::new(&working_filename);
        let file_dir_abs = file_path_abs.parent().unwrap_or_else(|| Path::new("/"));

        // Keep all leading `'use …'` strings at the top
        let mut insert_pos = 0;
        for item in body.iter() {
            match item {
                ModuleItem::Stmt(Stmt::Expr(ExprStmt { expr, .. })) => {
                    if let Expr::Lit(Lit::Str(Str { value, .. })) = &**expr {
                        // FIX: handle Option<&str>
                        let v = value.as_str();
                        if v == Some("use client") || v == Some("use server") {
                            insert_pos = 1;
                            continue; // still inside the directive block
                        }
                    }
                }
                _ => {}
            }
            break; // first non-directive stmt reached
        }
        if DEBUG_LOG {
            println!(
                "[swc-intlayer] [{}] step 4a: insert_pos={}",
                working_filename, insert_pos
            );
        }

        // Inject static imports after the directives  ─────────────────────
        if DEBUG_LOG {
            println!(
                "[swc-intlayer] [{}] step 4b: injecting {} static imports...",
                working_filename,
                visitor.new_static_imports.len()
            );
        }
        for (key, ident) in visitor.new_static_imports.clone().into_iter().rev() {
            let dict_file_abs = Path::new(&dictionaries_dir).join(format!("{}.json", key));

            // Compute a relative path
            // We expect both file_dir_abs and dict_file_abs to be absolute here
            let import_path = if let Some(rel) = diff_paths(&dict_file_abs, file_dir_abs) {
                let s = rel.to_string_lossy().replace("\\", "/");
                if s.starts_with('.') {
                    s
                } else {
                    format!("./{}", s)
                }
            } else {
                // Fallback (should not happen if both are absolute)
                dict_file_abs.to_string_lossy().replace("\\", "/")
            };

            // Now inject using `import_path`
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
                        props: vec![PropOrSpread::Prop(Box::new(Prop::KeyValue(KeyValueProp {
                            key: PropName::Ident(
                                Ident::new(Atom::from("type"), DUMMY_SP, SyntaxContext::empty())
                                    .into(),
                            ),
                            value: Box::new(Expr::Lit(Lit::Str(Str {
                                span: DUMMY_SP,
                                value: Atom::from("json").into(),
                                raw: None,
                            }))),
                        })))],
                    })),
                    phase: ImportPhase::Evaluation,
                })),
            );

            insert_pos += 1; // keep later injected imports in order
        }

        if DEBUG_LOG {
            println!("[swc-intlayer] [{}] step 4b: done", working_filename);
        }

        // Inject dynamic/fetch imports after the static imports  ──────────
        if DEBUG_LOG {
            println!(
                "[swc-intlayer] [{}] step 4c: injecting {} dynamic imports...",
                working_filename,
                visitor.new_dynamic_imports.len()
            );
        }
        for (key, ident) in visitor.new_dynamic_imports.clone().into_iter().rev() {
            let ident_name: &str = ident.sym.as_ref();
            let is_live_ident = ident_name.ends_with("_fetch");
            let target_dir = if is_live_ident {
                &fetch_dictionaries_dir
            } else {
                &dynamic_dictionaries_dir
            };
            let dict_file_abs = Path::new(target_dir).join(format!("{}.mjs", key));

            // Compute a relative path
            let import_path = if let Some(rel) = diff_paths(&dict_file_abs, file_dir_abs) {
                let s = rel.to_string_lossy().replace("\\", "/");
                if s.starts_with('.') {
                    s
                } else {
                    format!("./{}", s)
                }
            } else {
                // Fallback
                dict_file_abs.to_string_lossy().replace("\\", "/")
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

            insert_pos += 1; // keep later injected imports in order
        }

        if DEBUG_LOG {
            println!("[swc-intlayer] [{}] step 4c: done", working_filename);
            println!(
                "[swc-intlayer] [{}] step 5: emitting code for debug...",
                working_filename
            );
            // Print entire transformed file as JS
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
                    emitter
                        .emit_program(&program)
                        .expect("swc-intlayer: failed to emit code");
                }
                let code =
                    String::from_utf8(buf).expect("swc-intlayer: emitted code was not valid UTF-8");

                println!(
                    "\n[swc-intlayer] final code for {}:\n{}\n",
                    working_filename, code
                );
            }
            println!("[swc-intlayer] [{}] step 5: done", working_filename);
        }
    }

    if DEBUG_LOG {
        println!("[swc-intlayer] [{}] transform complete", working_filename);
    }
    program
}

// ─────────────────────────────────────────────────────────────────────────────
//  ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────
#[plugin_transform]
pub fn transform(program: Program, metadata: TransformPluginProgramMetadata) -> Program {
    // Read and parse plugin options
    let cfg: PluginConfig = match metadata
        .get_transform_plugin_config()
        .and_then(|raw| serde_json::from_str::<PluginConfig>(&raw).ok())
    {
        Some(c) => {
            if DEBUG_LOG {
                println!(
                    "[swc-intlayer] Config parsed successfull(files_list count: {})",
                    c.files_list.len()
                );
            }
            c
        }
        None => {
            if DEBUG_LOG {
                println!("[swc-intlayer] Warning: No config found or failed to parsNoop.");
            }
            return program;
        }
    };

    // skip files outside the configured roots
    let filename_raw = match metadata.get_context(&TransformPluginMetadataContextKind::Filename) {
        Some(f) => f,
        None => return program,
    };

    process_transform(program, cfg, filename_raw)
}

#[cfg(test)]
mod tests {
    use super::*;
    use swc_core::ecma::ast::Pass;
    use swc_core::ecma::parser::Syntax;
    use swc_core::ecma::transforms::testing::test_transform;
    use swc_core::ecma::visit::Fold;

    fn get_config(mode: &str) -> PluginConfig {
        PluginConfig {
            dictionaries_dir: "/app/.intlayer/dictionaries".to_string(),
            dictionaries_entry_path: "/app/.intlayer/dictionaries.mjs".to_string(),
            dynamic_dictionaries_dir: "/app/.intlayer/dynamic_dictionaries".to_string(),
            fetch_dictionaries_dir: "/app/.intlayer/fetch_dictionaries".to_string(),
            import_mode: Some(mode.to_string()),
            replace_dictionary_entry: Some(false),
            files_list: vec![],
            dictionary_mode_map: None,
        }
    }

    struct TestFolder {
        cfg: PluginConfig,
        filename: String,
    }

    impl Fold for TestFolder {
        fn fold_program(&mut self, p: Program) -> Program {
            process_transform(p, self.cfg.clone(), self.filename.clone())
        }
    }

    impl Pass for TestFolder {
        fn process(&mut self, program: &mut Program) {
            let p = std::mem::replace(
                program,
                Program::Module(Module {
                    span: DUMMY_SP,
                    body: vec![],
                    shebang: None,
                }),
            );
            let new_p = self.fold_program(p);
            *program = new_p;
        }
    }

    #[test]
    fn static_import() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config("static"),
                filename: "/app/src/page.tsx".to_string(),
            },
            r#"
            import { useIntlayer } from "react-intlayer";
            const t = useIntlayer("locale-switcher");
            "#,
            r#"
            import _FsHhNfuhm85 from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };
            import { useDictionary as useIntlayer } from "react-intlayer";
            const t = useIntlayer(_FsHhNfuhm85);
            "#,
        );
    }

    #[test]
    fn dynamic_import() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config("dynamic"),
                filename: "/app/src/page.tsx".to_string(),
            },
            r#"
            import { useIntlayer } from "react-intlayer";
            const t = useIntlayer("locale-switcher");
            "#,
            r#"
            import _FsHhNfuhm85_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";
            import { useDictionaryDynamic as useIntlayer } from "react-intlayer";
            const t = useIntlayer(_FsHhNfuhm85_dyn, "locale-switcher");
            "#,
        );
    }

    #[test]
    fn fetch_import() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config("fetch"),
                filename: "/app/src/page.tsx".to_string(),
            },
            r#"
            import { useIntlayer } from "react-intlayer";
            const t = useIntlayer("locale-switcher");
            "#,
            r#"
            import _FsHhNfuhm85_fetch from "../.intlayer/fetch_dictionaries/locale-switcher.mjs";
            import { useDictionaryDynamic as useIntlayer } from "react-intlayer";
            const t = useIntlayer(_FsHhNfuhm85_fetch, "locale-switcher");
            "#,
        );
    }

    #[test]
    fn svelte_static_import() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config("static"),
                filename: "/app/src/page.svelte".to_string(),
            },
            r#"
            import { useIntlayer } from "svelte-intlayer";
            const t = useIntlayer("locale-switcher");
            "#,
            r#"
            import _FsHhNfuhm85 from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };
            import { useDictionary as useIntlayer } from "svelte-intlayer";
            const t = useIntlayer(_FsHhNfuhm85);
            "#,
        );
    }

    #[test]
    fn svelte_dynamic_import() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config("dynamic"),
                filename: "/app/src/page.svelte".to_string(),
            },
            r#"
            import { useIntlayer } from "svelte-intlayer";
            const t = useIntlayer("locale-switcher");
            "#,
            r#"
            import _FsHhNfuhm85_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";
            import { useDictionaryDynamic as useIntlayer } from "svelte-intlayer";
            const t = useIntlayer(_FsHhNfuhm85_dyn, "locale-switcher");
            "#,
        );
    }

    #[test]
    fn vue_static_import() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config("static"),
                filename: "/app/src/page.vue".to_string(),
            },
            r#"
            import { useIntlayer } from "vue-intlayer";
            const t = useIntlayer("locale-switcher");
            "#,
            r#"
            import _FsHhNfuhm85 from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };
            import { useDictionary as useIntlayer } from "vue-intlayer";
            const t = useIntlayer(_FsHhNfuhm85);
            "#,
        );
    }

    #[test]
    fn vue_dynamic_import() {
        test_transform(
            Syntax::default(),
            None,
            |_| TestFolder {
                cfg: get_config("dynamic"),
                filename: "/app/src/page.vue".to_string(),
            },
            r#"
            import { useIntlayer } from "vue-intlayer";
            const t = useIntlayer("locale-switcher");
            "#,
            r#"
            import _FsHhNfuhm85_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";
            import { useDictionaryDynamic as useIntlayer } from "vue-intlayer";
            const t = useIntlayer(_FsHhNfuhm85_dyn, "locale-switcher");
            "#,
        );
    }

    #[test]
    fn windows_path_resolution() {
        use super::normalize_path;
        use pathdiff::diff_paths;
        use std::path::Path;

        // Simulate the issue where SWC provides paths with forward slashes (common in JS tools)
        // but config/user provides paths with backslashes (Windows standard),
        // AND the environment treats backslash as a character (WASM/Unix).

        // Base: File in src (Unix separators)
        let base_raw = "C:/Users/User/Project/frontend/src/misc";
        // Target: Dictionary (Windows separators)
        let target_raw =
            "C:\\Users\\User\\Project\\frontend\\.intlayer\\dictionary\\portal-page.json";

        // 1. Verify the issue exists without normalization (on Unix/WASM simulation)
        // On Unix/WASM, "C:\\Users..." is treated as one filename, so diff_paths fails to find common root
        // and creates a path like "../../../../../C:/Users..." if interpreted literally
        // Note: The exact output of diff_paths depends on implementation details, but we know it fails to find the correct relative path.

        // 2. Verify normalization fixes it
        let base_norm = normalize_path(base_raw);
        let target_norm = normalize_path(target_raw);

        // base_norm should be "c:/users/user/project/frontend/src/misc"
        // target_norm should be "c:/users/user/project/frontend/.intlayer/dictionary/portal-page.json"

        let diff_norm = diff_paths(Path::new(&target_norm), Path::new(&base_norm));

        if let Some(d) = diff_norm {
            let s = d.to_string_lossy().replace("\\", "/");
            // Should be ../../.intlayer/dictionary/portal-page.json
            assert_eq!(s, "../../.intlayer/dictionary/portal-page.json");
        } else {
            panic!("Normalized diff returned None");
        }
    }
}
