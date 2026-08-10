//! Path normalisation and relative-specifier computation.

use crate::paths::{normalize_path, relative_import_path};
use std::path::Path;

#[test]
fn windows_path_resolution() {
    let base_raw = "C:/Users/User/Project/frontend/src/misc";
    let target_raw = "C:\\Users\\User\\Project\\frontend\\.intlayer\\dictionary\\portal-page.json";

    let base_normalized = normalize_path(base_raw);
    let target_normalized = normalize_path(target_raw);

    assert_eq!(
        relative_import_path(Path::new(&target_normalized), Path::new(&base_normalized)),
        "../../.intlayer/dictionary/portal-page.json"
    );
}

#[test]
fn sibling_directory_specifier_keeps_explicit_relative_prefix() {
    assert_eq!(
        relative_import_path(
            Path::new("/app/.intlayer/dictionaries/about.json"),
            Path::new("/app/.intlayer/dictionaries")
        ),
        "./about.json"
    );
}

#[test]
fn drive_letter_is_lowercased() {
    assert_eq!(normalize_path("C:\\app\\src"), "c:/app/src");
    assert_eq!(normalize_path("/app/src"), "/app/src");
}
