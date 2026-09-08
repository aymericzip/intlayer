//! Path normalisation and relative-specifier computation.

use crate::paths::{normalize_path, relative_import_path};
use std::{borrow::Cow, path::Path};

#[test]
fn windows_path_resolution() {
    let base_raw = "C:/Users/User/Project/frontend/src/misc";
    let target_raw = "C:\\Users\\User\\Project\\frontend\\.intlayer\\dictionary\\portal-page.json";

    let base_normalized = normalize_path(base_raw);
    let target_normalized = normalize_path(target_raw);

    assert_eq!(
        relative_import_path(
            Path::new(target_normalized.as_ref()),
            Path::new(base_normalized.as_ref())
        ),
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

#[test]
fn an_already_normalized_path_is_borrowed() {
    // The allowlist is re-scanned for every compiled file, so a POSIX path must
    // not cost an allocation per entry per file.
    assert!(matches!(
        normalize_path("/app/src/page.tsx"),
        Cow::Borrowed(_)
    ));
    assert!(matches!(
        normalize_path("c:/app/src/page.tsx"),
        Cow::Borrowed(_)
    ));
}

#[test]
fn a_path_needing_normalization_is_owned() {
    assert!(matches!(
        normalize_path("C:/app/src/page.tsx"),
        Cow::Owned(_)
    ));
    assert!(matches!(
        normalize_path("/app\\src/page.tsx"),
        Cow::Owned(_)
    ));
}
