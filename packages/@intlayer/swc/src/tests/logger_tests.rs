//! Log-level parsing and the transform summary the logger reports on.

use crate::{
    logger::{Logger, TransformSummary},
    LogLevel,
};

#[test]
fn log_level_defaults_to_off() {
    assert_eq!(LogLevel::from_option(None), LogLevel::Off);
    assert_eq!(LogLevel::from_option(Some("off")), LogLevel::Off);
    assert_eq!(LogLevel::from_option(Some("nonsense")), LogLevel::Off);
}

#[test]
fn log_level_parses_known_values() {
    assert_eq!(LogLevel::from_option(Some("info")), LogLevel::Info);
    assert_eq!(LogLevel::from_option(Some("debug")), LogLevel::Debug);
    assert_eq!(LogLevel::from_option(Some("verbose")), LogLevel::Debug);
}

#[test]
fn logger_reports_nothing_when_off() {
    let logger = Logger::new(LogLevel::Off);
    assert!(!logger.is_enabled());
    assert!(!logger.is_debug());
}

#[test]
fn logger_at_info_is_enabled_but_not_debug() {
    let logger = Logger::new(LogLevel::Info);
    assert!(logger.is_enabled());
    assert!(!logger.is_debug());
}

#[test]
fn summary_is_unchanged_until_something_is_rewritten() {
    let mut summary = TransformSummary::default();
    assert!(!summary.changed_anything());

    summary.renamed_fields = 1;
    assert!(summary.changed_anything());
}
