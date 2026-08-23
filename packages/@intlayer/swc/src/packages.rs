//! Package specifiers and generated-file conventions shared by the transforms.

/// Subdirectory of the compiled dictionaries holding the companion modules that
/// re-export a dictionary with its `nest()` targets attached. Mirrors
/// `NESTED_DICTIONARIES_SUBDIR` in `@intlayer/engine`.
pub const NESTED_DICTIONARIES_SUBDIR: &str = "nested";

/// Packages whose named imports (`useIntlayer` / `getIntlayer` /
/// `getIntlayerAsync`) are rewritten.
pub const PACKAGE_LIST: &[&str] = &[
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
    "lit-intlayer",
    "vanilla-intlayer",
];

/// Subset of [`PACKAGE_LIST`] that exports a `useDictionaryDynamic` helper.
pub const PACKAGE_LIST_DYNAMIC: &[&str] = &[
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
    "lit-intlayer",
    "vanilla-intlayer",
];

/// Native intlayer callers whose first argument is a dictionary key.
pub const NATIVE_CALLER_NAMES: &[&str] = &["useIntlayer", "getIntlayer", "getIntlayerAsync"];

/// Caller reading a single locale chunk whatever the file's import mode is —
/// loading one locale instead of the merged dictionary is what it exists for.
pub const GET_INTLAYER_ASYNC: &str = "getIntlayerAsync";
