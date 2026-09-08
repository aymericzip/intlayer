//! Path helpers used to build the module specifiers of the injected
//! dictionary imports.

use pathdiff::diff_paths;
use std::{borrow::Cow, path::Path};

/// Computes the module specifier for an injected dictionary import: the path
/// of `dict_file_abs` relative to `from_dir_abs`, using forward slashes and a
/// leading `./` when the path is not already relative. Falls back to the
/// absolute path when no relative path exists (e.g. different drives).
pub fn relative_import_path(dict_file_abs: &Path, from_dir_abs: &Path) -> String {
    if let Some(relative) = diff_paths(dict_file_abs, from_dir_abs) {
        let path = relative.to_string_lossy().replace('\\', "/");
        if path.starts_with('.') {
            path
        } else {
            format!("./{}", path)
        }
    } else {
        dict_file_abs.to_string_lossy().replace('\\', "/")
    }
}

/// Whether `path` is already normalised: forward slashes throughout and, if it
/// carries a drive letter, a lower-case one.
fn is_normalized(path: &str) -> bool {
    if path.as_bytes().contains(&b'\\') {
        return false;
    }

    !has_upper_case_drive_letter(path)
}

/// Whether `path` starts with an upper-case Windows drive letter (`C:`).
fn has_upper_case_drive_letter(path: &str) -> bool {
    let bytes = path.as_bytes();

    bytes.len() >= 2 && bytes[1] == b':' && bytes[0].is_ascii_uppercase()
}

/// Normalises a path string to use forward slashes and consistent drive-letter
/// casing so that [`pathdiff::diff_paths`] works correctly in Wasm / cross-platform
/// contexts where Windows-style paths may arrive from the JS host.
///
/// Borrows when the path is already normalised — the case for every POSIX path,
/// and the allowlist is re-scanned for each compiled file, so allocating there
/// would cost one `String` per entry per file.
pub fn normalize_path(path: &str) -> Cow<'_, str> {
    if is_normalized(path) {
        return Cow::Borrowed(path);
    }

    let mut normalized = path.replace('\\', "/");

    if has_upper_case_drive_letter(&normalized) {
        normalized[0..1].make_ascii_lowercase();
    }

    Cow::Owned(normalized)
}
