# intlayer-swc-plugin

An [SWC](https://swc.rs) transform plugin for [Intlayer](https://intlayer.org) —
the open-source i18n framework for React, Next.js, Vue, Svelte, and more.

The plugin rewrites `useIntlayer` / `getIntlayer` / `useTranslations` call
arguments at compile time, replacing string dictionary keys with pre-loaded
dictionary imports. This eliminates runtime registry lookups and enables
tree-shaking for per-locale bundles.

## How it works

**Before** (source code):

```ts
import { useIntlayer } from "react-intlayer";
const t = useIntlayer("locale-switcher");
```

**After** (transformed output):

```ts
import _FsHhNfuhm85 from "../../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };
import { useDictionary as useIntlayer } from "react-intlayer";
const t = useIntlayer(_FsHhNfuhm85);
```

Three import modes are supported:

| Mode      | Helper function        | Import type           |
| --------- | ---------------------- | --------------------- |
| `static`  | `useDictionary`        | JSON import assertion |
| `dynamic` | `useDictionaryDynamic` | Dynamic `.mjs` import |
| `fetch`   | `useDictionaryDynamic` | Fetch `.mjs` import   |

---

## Usage: Next.js / SWC Wasm plugin (recommended)

The Wasm binary is distributed via npm as
[`@intlayer/swc`](https://www.npmjs.com/package/@intlayer/swc).
You do not need to add this Rust crate as a dependency for that use-case.

```bash
npm install @intlayer/swc
# or
bun add @intlayer/swc
```

Configure in `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [
      [
        "@intlayer/swc",
        {
          dictionariesDir: "/absolute/path/.intlayer/dictionaries",
          dictionariesEntryPath: "/absolute/path/.intlayer/dictionaries.mjs",
          dynamicDictionariesDir:
            "/absolute/path/.intlayer/dynamic_dictionaries",
          fetchDictionariesDir: "/absolute/path/.intlayer/fetch_dictionaries",
          importMode: "static", // "static" | "dynamic" | "fetch"
          replaceDictionaryEntry: false,
          filesList: [], // empty = transform all files
          dictionaryModeMap: {}, // per-key overrides, e.g. { "heavy-dict": "dynamic" }
        },
      ],
    ],
  },
};

export default nextConfig;
```

In practice you should use the
[`@intlayer/webpack`](https://www.npmjs.com/package/@intlayer/webpack) or
[`@intlayer/vite`](https://www.npmjs.com/package/@intlayer/vite) plugin, which
configures the SWC plugin automatically based on your `intlayer.config.*` file.

---

## Usage: native Rust library

Add to `Cargo.toml`:

```toml
[dependencies]
intlayer-swc-plugin = "7"
```

Then call [`process_transform`] directly from your own SWC pipeline:

```rust
use intlayer_swc_plugin::{PluginConfig, process_transform};
use swc_core::ecma::ast::Program;

fn my_transform(program: Program, file_path: &str) -> Program {
    let config = PluginConfig {
        dictionaries_dir: "/project/.intlayer/dictionaries".into(),
        dictionaries_entry_path: "/project/.intlayer/dictionaries.mjs".into(),
        dynamic_dictionaries_dir: "/project/.intlayer/dynamic_dictionaries".into(),
        fetch_dictionaries_dir: "/project/.intlayer/fetch_dictionaries".into(),
        import_mode: Some("static".into()),
        replace_dictionary_entry: Some(false),
        files_list: vec![],
        dictionary_mode_map: None,
    };
    process_transform(program, config, file_path.into())
}
```

### Building the Wasm plugin yourself

The `plugin` Cargo feature enables the `#[plugin_transform]` Wasm entry point.
Without it the crate compiles as a standard native Rust library.

```bash
# Uses the alias defined in .cargo/config.toml
cargo build-wasip1 --release
# equivalent to:
cargo build --target wasm32-wasip1 --features plugin --release
```

---

## Plugin configuration reference

All fields correspond to the JSON object passed as the second element of each
`swcPlugins` tuple.

| Field                    | Type                               | Default    | Description                                         |
| ------------------------ | ---------------------------------- | ---------- | --------------------------------------------------- |
| `dictionariesDir`        | `string`                           | required   | Absolute path to compiled `.json` dictionaries      |
| `dictionariesEntryPath`  | `string`                           | required   | Absolute path to the generated entry `.mjs` file    |
| `dynamicDictionariesDir` | `string`                           | required   | Absolute path for dynamic `.mjs` modules            |
| `fetchDictionariesDir`   | `string`                           | required   | Absolute path for fetch `.mjs` modules              |
| `importMode`             | `"static" \| "dynamic" \| "fetch"` | `"static"` | Global import strategy                              |
| `replaceDictionaryEntry` | `boolean`                          | `false`    | Replace entry file with empty stubs                 |
| `filesList`              | `string[]`                         | `[]`       | Allowlist of absolute file paths; empty = all files |
| `dictionaryModeMap`      | `Record<string, string>`           | `{}`       | Per-dictionary import mode overrides                |

---

## Public Rust API

The following symbols are exported by this crate:

- **`PluginConfig`** – configuration struct (mirrors the JSON options above).
- **`process_transform(program, cfg, filename) -> Program`** – core transform
  function; accepts and returns an SWC `Program` AST.
- **`normalize_path(path: &str) -> String`** – normalises Windows-style
  backslash paths to forward slashes for cross-platform path diffing.

---

## Related packages

| Package                                                                | Description                            |
| ---------------------------------------------------------------------- | -------------------------------------- |
| [`@intlayer/webpack`](https://www.npmjs.com/package/@intlayer/webpack) | Webpack plugin (Babel-based transform) |
| [`@intlayer/vite`](https://www.npmjs.com/package/@intlayer/vite)       | Vite plugin                            |
| [`react-intlayer`](https://www.npmjs.com/package/react-intlayer)       | React hooks                            |
| [`next-intlayer`](https://www.npmjs.com/package/next-intlayer)         | Next.js integration                    |

---

## License

Apache-2.0 © [Aymeric Pineau](https://github.com/aymericzip)
