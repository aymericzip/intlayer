//! # intlayer-swc-plugin
//!
//! An SWC transform plugin for [Intlayer](https://intlayer.org) that replaces
//! `useIntlayer` / `getIntlayer` / `useTranslations` call arguments with
//! pre-loaded dictionary imports at compile time, and rewrites content field
//! accesses to the short aliases assigned by the minification pipeline.
//!
//! ## What it does
//!
//! Given source code like:
//!
//! ```js
//! import { useIntlayer } from "react-intlayer";
//! const t = useIntlayer("locale-switcher");
//! ```
//!
//! The plugin rewrites it to:
//!
//! ```js
//! import _abc123 from "../../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };
//! import { useDictionary as useIntlayer } from "react-intlayer";
//! const t = useIntlayer(_abc123);
//! ```
//!
//! This eliminates the runtime registry lookup and enables tree-shaking for
//! per-locale bundles.
//!
//! When the `build.minify` pipeline has renamed the compiled dictionary's
//! fields, the matching source accesses are rewritten too
//! (`content.title` → `content.a`), driven by the `fieldRenameMap` option.
//!
//! ## Pipeline
//!
//! Each file goes through, in order:
//!
//! 1. [`field_rename`] – rewrite content field accesses to their short alias.
//!    Runs first because it keys off the dictionary key that step 3 erases.
//! 2. [`pre_pass`] – discover the local names of every recognised caller, the
//!    package each was imported from, and which of those packages resolve a
//!    dictionary to a dynamic/fetch loader.
//! 3. [`optimize`] – rewrite the call sites and import specifiers.
//! 4. [`imports`] – inject the dictionary imports the rewrite created.
//!
//! ## Compat adapters
//!
//! Steps 2 and 3 recognise the base intlayer getters only. The compat adapters
//! (`@intlayer/react-i18next`, `@intlayer/next-intl`, …) reach the plugin as
//! `extraCallers` descriptors injected by their own bundler plugin, and every
//! adapter-specific decision lives behind them:
//!
//! - [`extra_caller`] – matching a compat caller, resolving its namespace, and
//!   rewriting its call sites and import specifiers.
//!
//! With no `extraCallers` configured, [`optimize`] holds no
//! [`extra_caller::ExtraCallerContext`] at all, so none of that code runs and
//! the base rewrite behaves exactly as if the adapters did not exist.
//!
//! ## Division of labour with the JavaScript side
//!
//! Purging unused fields and assigning short aliases require reading every
//! component source file and rewriting the compiled dictionary JSON — file I/O
//! and cross-file state a per-file Wasm transform cannot do. That analysis runs
//! on the JavaScript side (`@intlayer/babel`, invoked from `withIntlayer`), and
//! its result reaches this crate as the `fieldRenameMap` option.
//!
//! That option comes back empty when the visual editor is enabled — the editor
//! resolves its edits by `keyPath`, which renaming would invalidate — so this
//! crate then only rewrites call sites and imports. Purging is unaffected and
//! happens on the JavaScript side either way.
//!
//! ## Usage as an SWC / Next.js Wasm plugin
//!
//! The crate is distributed on npm as
//! [`@intlayer/swc`](https://www.npmjs.com/package/@intlayer/swc).
//! Configure it in your `next.config.*`:
//!
//! ```js
//! const nextConfig = {
//!   experimental: {
//!     swcPlugins: [["@intlayer/swc", { /* PluginConfig fields */ }]],
//!   },
//! };
//! ```
//!
//! ## Usage as a native Rust library
//!
//! Add to `Cargo.toml`:
//!
//! ```toml
//! [dependencies]
//! intlayer-swc-plugin = "7"
//! ```
//!
//! Then call [`process_transform`] directly:
//!
//! ```rust,no_run
//! use intlayer_swc_plugin::{PluginConfig, process_transform};
//! use swc_core::ecma::ast::Program;
//!
//! fn my_transform(program: Program) -> Program {
//!     let config = PluginConfig {
//!         dictionaries_dir: "/project/.intlayer/dictionaries".into(),
//!         dictionaries_entry_path: "/project/.intlayer/dictionaries.mjs".into(),
//!         dynamic_dictionaries_dir: "/project/.intlayer/dynamic_dictionaries".into(),
//!         fetch_dictionaries_dir: "/project/.intlayer/fetch_dictionaries".into(),
//!         import_mode: Some("static".into()),
//!         replace_dictionary_entry: Some(false),
//!         ..PluginConfig::default()
//!     };
//!     process_transform(program, config, "/project/src/page.tsx".into())
//! }
//! ```

pub mod ast;
pub mod config;
pub mod dictionary_entry;
pub mod dictionary_imports;
pub mod extra_caller;
pub mod field_rename;
pub mod imports;
pub mod logger;
pub mod optimize;
pub mod packages;
pub mod paths;
pub mod pre_pass;

#[cfg(test)]
mod tests;

pub use config::{
    ExtraCallerConfig, FieldRenameMap, FieldRenameNode, LogLevel, NamespaceOptionConfig,
    PluginConfig,
};
pub use paths::normalize_path;

use crate::{
    dictionary_entry::build_empty_dictionaries_entry,
    dictionary_imports::ImportKind,
    extra_caller::ExtraCallerContext,
    imports::{inject_dictionary_imports, DictionaryDirs},
    logger::{Logger, TransformSummary},
    optimize::TransformVisitor,
    pre_pass::run_pre_pass,
};
use std::collections::HashSet;
use swc_core::ecma::{ast::Program, visit::VisitMutWith};

#[cfg(feature = "plugin")]
use swc_core::plugin::{
    metadata::{TransformPluginMetadataContextKind, TransformPluginProgramMetadata},
    plugin_transform,
};

/// Resolves the file this transform should work on, as a normalised path.
///
/// When `files_list` is empty every file is processed and the build-tool
/// filename is used as-is. Otherwise the matching allowlist entry wins, because
/// it carries the absolute path the relative import specifiers are computed
/// from; a file absent from the allowlist is skipped.
///
/// Both sides are normalised before being compared: the allowlist is built by
/// the JavaScript host, which may hand over Windows-style separators the
/// bundler's filename does not use.
fn resolve_working_filename(
    files_list: &[String],
    filename_raw: &str,
    logger: &Logger,
) -> Option<String> {
    let normalized_filename = normalize_path(filename_raw);

    if files_list.is_empty() {
        logger.debug(format!(
            "processing {} (no filesList allowlist configured)",
            filename_raw
        ));
        return Some(normalized_filename.into_owned());
    }

    let Some(matched) = files_list.iter().find_map(|target| {
        let normalized_target = normalize_path(target);

        let is_match = normalized_filename.ends_with(normalized_target.as_ref())
            || normalized_target.ends_with(normalized_filename.as_ref());

        is_match.then_some(normalized_target)
    }) else {
        logger.debug(format!("skipping {} (not in filesList)", filename_raw));
        return None;
    };

    logger.debug(format!(
        "processing {} (matched allowlist entry {})",
        filename_raw, matched
    ));
    Some(matched.into_owned())
}

/// Applies the Intlayer SWC transform to `program`.
///
/// This is the core transformation function exposed as a native Rust API.
/// The Wasm plugin entry point ([`transform`]) delegates directly to this
/// function after deserialising the JSON plugin config.
///
/// # Arguments
///
/// * `program` – The parsed SWC AST to transform.
/// * `cfg` – Plugin configuration (see [`PluginConfig`]).
/// * `filename_raw` – Absolute path of the file being compiled, as provided
///   by the build tool. Used to compute relative import paths for injected
///   dictionary imports.
///
/// # Returns
///
/// The transformed AST.
pub fn process_transform(
    mut program: Program,
    mut cfg: PluginConfig,
    filename_raw: String,
) -> Program {
    let logger = Logger::new(if logger::DEBUG_LOG {
        LogLevel::Debug
    } else {
        LogLevel::from_option(cfg.log_level.as_deref())
    });

    cfg.dictionaries_dir = normalize_path(&cfg.dictionaries_dir).into_owned();
    cfg.dynamic_dictionaries_dir = normalize_path(&cfg.dynamic_dictionaries_dir).into_owned();
    cfg.fetch_dictionaries_dir = normalize_path(&cfg.fetch_dictionaries_dir).into_owned();
    cfg.dictionaries_entry_path = normalize_path(&cfg.dictionaries_entry_path).into_owned();

    let Some(working_filename) = resolve_working_filename(&cfg.files_list, &filename_raw, &logger)
    else {
        return program;
    };

    // The generated dictionaries entry is emptied wholesale: every call site
    // now reads from a direct import, so keeping the registry alive would pin
    // every dictionary into the bundle.
    if cfg.replace_dictionary_entry.unwrap_or(false) {
        let is_main_entry = working_filename == cfg.dictionaries_entry_path
            || normalize_path(&filename_raw) == cfg.dictionaries_entry_path.as_str();

        if is_main_entry {
            logger.info(format!("{}: emptied dictionaries entry", filename_raw));
            return build_empty_dictionaries_entry();
        }
    }

    // Step 1 — content field renames (minify). Must run before the optimize
    // transform replaces `useIntlayer` with `useDictionary`.
    let mut summary = TransformSummary {
        renamed_fields: field_rename::rename_field_accesses(&mut program, &cfg.field_rename_map),
        ..TransformSummary::default()
    };

    let import_mode =
        ImportKind::from_option(cfg.import_mode.as_deref()).unwrap_or(ImportKind::Static);
    let dictionary_mode_map = cfg.dictionary_mode_map.take().unwrap_or_default();

    // Step 2 — discover callers and the file-level dynamic decision.
    let pre_pass = run_pre_pass(&program, &dictionary_mode_map, &cfg.extra_callers);

    // Compat adapters plug in here and nowhere else: with no `extraCallers`
    // configured the context stays `None` and the optimize transform runs the
    // base intlayer rewrite untouched.
    let extra_caller_context = (!cfg.extra_callers.is_empty()).then(|| ExtraCallerContext {
        extra_callers: &cfg.extra_callers,
        dictionary_mode_map: &dictionary_mode_map,
        import_mode,
        use_dynamic_helpers: import_mode != ImportKind::Static || pre_pass.extra_has_dynamic_call,
    });

    // Step 3 — rewrite the call sites and import specifiers.
    let mut visitor = TransformVisitor::new(
        import_mode,
        &dictionary_mode_map,
        &pre_pass.caller_map,
        &pre_pass.packages_with_dynamic_call,
        &pre_pass.packages_with_fetch_call,
        extra_caller_context,
    );
    program.visit_mut_with(&mut visitor);

    summary.static_imports = visitor.injected_imports.static_imports.len();
    summary.dynamic_imports = visitor.injected_imports.dynamic_imports.len();

    // Step 4 — inject the dictionary imports the rewrite created.
    let nesting_dictionary_keys: HashSet<&str> = cfg
        .nesting_dictionary_keys
        .iter()
        .map(String::as_str)
        .collect();

    inject_dictionary_imports(
        &mut program,
        &visitor.injected_imports,
        &DictionaryDirs {
            dictionaries_dir: &cfg.dictionaries_dir,
            dynamic_dictionaries_dir: &cfg.dynamic_dictionaries_dir,
            fetch_dictionaries_dir: &cfg.fetch_dictionaries_dir,
        },
        &nesting_dictionary_keys,
        &working_filename,
    );

    logger.report_file(&filename_raw, &summary, &program);

    program
}

// ─────────────────────────────────────────────────────────────────────────────
//  WASM PLUGIN ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────

/// SWC Wasm plugin entry point.
///
/// This function is only compiled when the `plugin` feature is enabled
/// (i.e. when building for `wasm32-wasip1` / `wasm32-unknown-unknown`).
/// Native Rust consumers should call [`process_transform`] directly instead.
#[cfg(feature = "plugin")]
#[plugin_transform]
pub fn transform(program: Program, metadata: TransformPluginProgramMetadata) -> Program {
    let cfg: PluginConfig = match metadata
        .get_transform_plugin_config()
        .and_then(|raw| serde_json::from_str::<PluginConfig>(&raw).ok())
    {
        Some(config) => config,
        None => return program,
    };

    let filename_raw = match metadata.get_context(&TransformPluginMetadataContextKind::Filename) {
        Some(filename) => filename,
        None => return program,
    };

    process_transform(program, cfg, filename_raw)
}
