//! Build-time reporting.
//!
//! Mirrors what the Babel/Vite optimize pipeline prints on the JavaScript side
//! so a Next.js build driven by this plugin can be inspected the same way.
//! Output is opt-in through the `logLevel` plugin option and goes to stdout,
//! which both the Wasm host and a native embedder capture.

use crate::config::LogLevel;
use swc_core::{
    common::{sync::Lrc, SourceMap},
    ecma::{
        ast::Program,
        codegen::{text_writer::JsWriter, Config as CodegenConfig, Emitter},
    },
};

/// Prefix every line carries so plugin output is greppable in a build log.
const LOG_PREFIX: &str = "[intlayer/swc]";

/// Forces the plugin to report at [`LogLevel::Debug`] whatever the `logLevel`
/// option says, so the emitted code of every transformed file can be inspected
/// without threading a config change through the JavaScript side.
///
/// Development aid only — set back to `false` before publishing: it prints the
/// full output of every file the transform touches.
pub static DEBUG_LOG: bool = false;

/// Reports what the transform did, at the verbosity the user asked for.
#[derive(Debug, Clone, Copy)]
pub struct Logger {
    level: LogLevel,
}

impl Logger {
    /// Builds a logger for the given level.
    pub fn new(level: LogLevel) -> Self {
        Self { level }
    }

    /// Whether anything at all will be printed.
    pub fn is_enabled(&self) -> bool {
        self.level > LogLevel::Off
    }

    /// Whether the emitted code and per-file skip decisions are printed.
    pub fn is_debug(&self) -> bool {
        self.level >= LogLevel::Debug
    }

    /// Prints a line at `info` verbosity.
    pub fn info(&self, message: impl AsRef<str>) {
        if self.level >= LogLevel::Info {
            println!("{} {}", LOG_PREFIX, message.as_ref());
        }
    }

    /// Prints a line at `debug` verbosity.
    pub fn debug(&self, message: impl AsRef<str>) {
        if self.is_debug() {
            println!("{} {}", LOG_PREFIX, message.as_ref());
        }
    }

    /// Reports the outcome of a transformed file: how many dictionary imports
    /// were injected, how many call sites were rewritten, and how many content
    /// field accesses were renamed. At `debug` verbosity the emitted code
    /// follows.
    pub fn report_file(&self, file_path: &str, summary: &TransformSummary, program: &Program) {
        if !self.is_enabled() {
            return;
        }

        if !summary.changed_anything() {
            self.debug(format!("{}: unchanged", file_path));
            return;
        }

        self.info(format!(
            "{}: {} static import(s), {} dynamic import(s), {} field rename(s)",
            file_path, summary.static_imports, summary.dynamic_imports, summary.renamed_fields
        ));

        if self.is_debug() {
            self.debug(format!(
                "{}: output\n{}",
                file_path,
                program_to_code(program)
            ));
        }
    }
}

/// Counters describing what the transform changed in a single file.
#[derive(Debug, Default, Clone, Copy)]
pub struct TransformSummary {
    /// Number of injected static dictionary imports.
    pub static_imports: usize,
    /// Number of injected dynamic / fetch loader imports.
    pub dynamic_imports: usize,
    /// Number of content field accesses rewritten to their short alias.
    pub renamed_fields: usize,
}

impl TransformSummary {
    /// Whether the transform touched the file at all.
    pub fn changed_anything(&self) -> bool {
        self.static_imports > 0 || self.dynamic_imports > 0 || self.renamed_fields > 0
    }
}

/// Emits a `Program` AST back to JavaScript/TypeScript source code as a `String`.
/// Used exclusively for debug logging.
pub fn program_to_code(program: &Program) -> String {
    let source_map = Lrc::new(SourceMap::default());
    let mut buffer = vec![];
    {
        let writer = JsWriter::new(source_map.clone(), "\n", &mut buffer, None);
        let mut emitter = Emitter {
            cfg: CodegenConfig::default(),
            cm: source_map.clone(),
            comments: None,
            wr: writer,
        };
        let _ = emitter.emit_program(program);
    }
    String::from_utf8_lossy(&buffer).into_owned()
}
