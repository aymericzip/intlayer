//! Shared fixtures and helpers for the test suite.

use crate::{
    config::{ExtraCallerConfig, FieldRenameMap, FieldRenameNode, NamespaceOptionConfig},
    field_rename::rename_field_accesses,
    process_transform, PluginConfig,
};
use std::collections::BTreeMap;
use swc_core::{
    common::DUMMY_SP,
    ecma::{
        ast::{Module, Pass, Program},
        visit::Fold,
    },
};

/// Baseline config pointing at a `/app` project, for the given global import mode.
pub fn get_config(mode: &str) -> PluginConfig {
    PluginConfig {
        dictionaries_dir: "/app/.intlayer/dictionaries".to_string(),
        dictionaries_entry_path: "/app/.intlayer/dictionaries.mjs".to_string(),
        dynamic_dictionaries_dir: "/app/.intlayer/dynamic_dictionaries".to_string(),
        fetch_dictionaries_dir: "/app/.intlayer/fetch_dictionaries".to_string(),
        import_mode: Some(mode.to_string()),
        replace_dictionary_entry: Some(false),
        ..PluginConfig::default()
    }
}

/// Baseline config extended with compat-adapter callers.
pub fn get_config_with_extra_callers(
    mode: &str,
    extra_callers: Vec<ExtraCallerConfig>,
) -> PluginConfig {
    PluginConfig {
        extra_callers,
        ..get_config(mode)
    }
}

/// react-i18next-style extra caller: positional namespace at index 0.
pub fn use_translation_caller() -> ExtraCallerConfig {
    ExtraCallerConfig {
        caller_name: "useTranslation".to_string(),
        import_sources: vec![
            "react-i18next".to_string(),
            "@intlayer/react-i18next".to_string(),
        ],
        namespace_arg_index: Some(0),
        fixed_namespace: None,
        namespace_option: None,
        static_replacement: "useDictionary".to_string(),
        dynamic_replacement: "useDictionaryDynamic".to_string(),
    }
}

/// vue-i18n-style extra caller: namespace read from an options property.
pub fn use_i18n_caller() -> ExtraCallerConfig {
    ExtraCallerConfig {
        caller_name: "useI18n".to_string(),
        import_sources: vec!["vue-i18n".to_string(), "@intlayer/vue-i18n".to_string()],
        namespace_arg_index: None,
        fixed_namespace: None,
        namespace_option: Some(NamespaceOptionConfig {
            argument_index: 0,
            property: "namespace".to_string(),
        }),
        static_replacement: "useDictionary".to_string(),
        dynamic_replacement: "useDictionaryDynamic".to_string(),
    }
}

/// lingui-style extra caller: fixed single-catalog namespace.
pub fn use_lingui_caller() -> ExtraCallerConfig {
    ExtraCallerConfig {
        caller_name: "useLingui".to_string(),
        import_sources: vec!["@lingui/react".to_string(), "@intlayer/lingui".to_string()],
        namespace_arg_index: None,
        fixed_namespace: Some("messages".to_string()),
        namespace_option: None,
        static_replacement: "useDictionary".to_string(),
        dynamic_replacement: "useDictionaryDynamic".to_string(),
    }
}

// ── Field-rename fixtures ─────────────────────────────────────────────────────

/// A leaf rename entry: the field is aliased, its value has no renamed children.
pub fn leaf(short_name: &str) -> FieldRenameNode {
    FieldRenameNode {
        short_name: short_name.to_string(),
        children: FieldRenameMap::new(),
    }
}

/// A rename entry whose value holds further renamed fields.
pub fn branch(short_name: &str, children: Vec<(&str, FieldRenameNode)>) -> FieldRenameNode {
    FieldRenameNode {
        short_name: short_name.to_string(),
        children: rename_map(children),
    }
}

/// Builds a rename table for one nesting level.
pub fn rename_map(entries: Vec<(&str, FieldRenameNode)>) -> FieldRenameMap {
    entries
        .into_iter()
        .map(|(field_name, node)| (field_name.to_string(), node))
        .collect()
}

/// Builds the `fieldRenameMap` option for a single dictionary key.
pub fn field_rename_map_for(
    dictionary_key: &str,
    entries: Vec<(&str, FieldRenameNode)>,
) -> BTreeMap<String, FieldRenameMap> {
    let mut map = BTreeMap::new();
    map.insert(dictionary_key.to_string(), rename_map(entries));
    map
}

// ── Transform drivers ─────────────────────────────────────────────────────────

/// Replaces `program` with an empty module and hands the old value to `fold`,
/// the shape `Pass` requires from an owned-AST transform.
fn replace_program(program: &mut Program, fold: impl FnOnce(Program) -> Program) {
    let previous = std::mem::replace(
        program,
        Program::Module(Module {
            span: DUMMY_SP,
            body: vec![],
            shebang: None,
        }),
    );
    *program = fold(previous);
}

/// Runs the full plugin pipeline.
pub struct TestFolder {
    pub cfg: PluginConfig,
    pub filename: String,
}

impl Fold for TestFolder {
    fn fold_program(&mut self, program: Program) -> Program {
        process_transform(program, self.cfg.clone(), self.filename.clone())
    }
}

impl Pass for TestFolder {
    fn process(&mut self, program: &mut Program) {
        let cfg = self.cfg.clone();
        let filename = self.filename.clone();
        replace_program(program, |previous| {
            process_transform(previous, cfg, filename)
        });
    }
}

/// Runs the field-rename pass on its own, so the expected output stays free of
/// the optimize transform's injected imports.
pub struct FieldRenameFolder {
    pub field_rename_map: BTreeMap<String, FieldRenameMap>,
}

impl Pass for FieldRenameFolder {
    fn process(&mut self, program: &mut Program) {
        rename_field_accesses(program, &self.field_rename_map);
    }
}
