//! Path helpers used to build the module specifiers of the injected
//! dictionary imports.

use pathdiff::diff_paths;
use std::path::Path;

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

/// Normalises a path string to use forward slashes and consistent drive-letter
/// casing so that [`pathdiff::diff_paths`] works correctly in Wasm / cross-platform
/// contexts where Windows-style paths may arrive from the JS host.
pub fn normalize_path(path: &str) -> String {
    let mut normalized = path.replace('\\', "/");

    if normalized.len() >= 2 {
        let bytes = normalized.as_bytes();
        if bytes[1] == b':' {
            let first_char = normalized.chars().next().unwrap();
            if first_char.is_ascii_alphabetic() {
                let lower_drive = first_char.to_ascii_lowercase();
                if first_char != lower_drive {
                    normalized.replace_range(0..1, &lower_drive.to_string());
                }
            }
        }
    }
    normalized
}
