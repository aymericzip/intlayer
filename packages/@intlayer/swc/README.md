<p align="center">
  <a href="https://intlayer.org" rel="">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Intlayer Logo" />
  </a>
</p>

<h1 align="center">intlayer-swc-plugin</h1>

<p align="center">
  <a href="https://intlayer.org/doc/concept/content" rel="">Docs</a> •
  <a href="https://intlayer.org/doc/environment/nextjs" rel="">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react" rel="">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms" rel="">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk" rel="noopener noreferrer nofollow">Discord</a>
</p>

<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/@intlayer/swc" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/v/@intlayer/swc?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="npm version" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="GitHub Stars" height="24"/></a>
  <a href="https://www.npmjs.org/package/@intlayer/swc" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/dm/@intlayer/swc?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="monthly downloads" height="24"/></a>
</p>

An [SWC](https://swc.rs) transform plugin for [Intlayer](https://intlayer.org) — the open-source i18n framework for React, Next.js, Vue, Svelte, and more.

**Intlayer** is a **modern i18n solution** for web and mobile apps. It’s framework-agnostic, **AI-powered**, and includes a free **CMS & visual editor**. With **per-locale content files**, **TypeScript autocompletion**, **tree-shakable dictionaries**, and **CI/CD integration**, Intlayer makes internationalization **faster, cleaner, and smarter**.

---

## 🚀 Key Features

Intlayer provides a variety of features to help you scale your internationalization efforts.

- **Cross-Framework Support**: Compatible with all major frameworks and libraries, including Next.js, React, Vite, Vue.js, Nuxt, Preact, Express, and more.
- **JavaScript-Powered Content Management**: Harness the flexibility of JavaScript to define and manage your content efficiently.
- **Per-Locale Content Declaration File**: Speed up your development by declaring your content once, before auto generation.
- **Compiler**: The Intlayer Compiler extracts automatically the content from the components and generates the dictionary files.
- **Type-Safe Environment**: Leverage TypeScript to ensure your content definitions and code are error-free, while also benefiting from IDE autocompletion.
- **Simplified Setup**: Get up and running quickly with minimal configuration. Adjust settings for internationalization, routing, AI, build, and content handling with ease.
- **Simplified Content Retrieval**: No need to call your `t` function for each piece of content. Retrieve all your content directly using a single hook.
- **Consistent Server Component Implementation**: Perfectly suited for Next.js server components, use the same implementation for both client and server components.
- **Organized Codebase**: Keep your codebase more organized: 1 component = 1 dictionary in the same folder.
- **Enhanced Routing**: Full support of app routing, adapting seamlessly to complex application structures, for Next.js, React, Vite, Vue.js, etc.
- **Markdown Support**: Import and interpret locale files and remote Markdown for multilingual content like privacy policies, documentation, etc.
- **Free Visual Editor & CMS**: A free visual editor and CMS are available for content writers, removing the need for a localization platform.
- **Tree-shakable Content**: Tree-shakable content, reducing the size of the final bundle. Loads content per component, excluding any unused content from your bundle.
- **Static Rendering**: Doesn't block Static Rendering in Next.js.
- **AI-Powered Translation**: Transform your website into 231 languages with just one click using Intlayer's advanced AI-powered translation tools.
- **MCP Server Integration**: Provides an MCP server for IDE automation, enabling seamless content management and i18n workflows.
- **VSCode Extension**: Intlayer provides a VSCode extension to help you manage your content and translations.
- **Interoperability**: Allow interoperability with react-i18next, next-i18next, next-intl, react-intl, vue-i18n.
- **Performances & Benchmark**: Uses advanced tree-shaking and dynamic loading to boost performances and keep the solution as light as possible.

---

## 🛠️ How the plugin works

The plugin rewrites `useIntlayer` / `getIntlayer` / `useTranslations` call arguments at compile time, replacing string dictionary keys with pre-loaded dictionary imports. This eliminates runtime registry lookups and enables tree-shaking for per-locale bundles.

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

The Wasm binary is distributed via npm as [`@intlayer/swc`](https://www.npmjs.com/package/@intlayer/swc).
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

In practice you should use the [`@intlayer/webpack`](https://www.npmjs.com/package/@intlayer/webpack) or [`@intlayer/vite`](https://www.npmjs.com/package/@intlayer/vite) plugin, which configures the SWC plugin automatically based on your `intlayer.config.*` file.

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

The `plugin` Cargo feature enables the `#[plugin_transform]` Wasm entry point. Without it the crate compiles as a standard native Rust library.

```bash
# Uses the alias defined in .cargo/config.toml
cargo build-wasip1 --release
# equivalent to:
cargo build --target wasm32-wasip1 --features plugin --release
```

---

## Plugin configuration reference

All fields correspond to the JSON object passed as the second element of each `swcPlugins` tuple.

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
- **`process_transform(program, cfg, filename) -> Program`** – core transform function; accepts and returns an SWC `Program` AST.
- **`normalize_path(path: &str) -> String`** – normalises Windows-style backslash paths to forward slashes for cross-platform path diffing.

---

## Documentation

Explore our comprehensive documentation to get started with Intlayer and learn how to integrate it into your projects.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Get Started</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why" rel=''>Why Intlayer?</a></li>
  <li><a href="https://intlayer.org/doc" rel=''>Introduction</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Concept</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer" rel=''>How Intlayer Works</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration" rel=''>Configuration</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli" rel=''>Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/compiler" rel=''>Compiler</a></li>
  <li><a href="https://intlayer.org/doc/concept/editor" rel=''>Intlayer Editor</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms" rel=''>Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/concept/content" rel=''>Dictionary</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file" rel=''>Per-Locale Content Declaration File</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation" rel=''>Translation</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration" rel=''>Enumeration</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition" rel=''>Condition</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting" rel=''>Nesting</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown" rel=''>Markdown</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching" rel=''>Function Fetching</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion" rel=''>Insertion</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file" rel=''>File</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Environment</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs" rel=''>Intlayer with Next.js 16</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/15" rel=''>Next.js 15</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14" rel=''>Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router" rel=''>Next.js Page Router</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/compiler" rel=''>Next.js using Compiler</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app" rel=''>React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react" rel=''>Vite + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react" rel=''>Vite + React using Compiler</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react/compiler" rel=''>React-router-v7</a></li>
  <li><a href="https://intlayer.org/doc/environment/tanstack-start" rel=''>Tanstack start</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/tanstack-start/solid" rel=''>Solid</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/astro" rel=''>Astro</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/astro/react" rel=''>React</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/vue" rel=''>Vue</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/svelte" rel=''>Svelte</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/solid" rel=''>Solid</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/vanilla" rel=''>Vanilla JS</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/lit" rel=''>Lit</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/react-native-and-expo" rel=''>React Native</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte" rel=''>Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/environment/sveltekit" rel=''>SvelteKit</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact" rel=''>Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue" rel=''>Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt" rel=''>Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid" rel=''>Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular" rel=''>Angular</a></li>
  <li>
     <a href="https://intlayer.org/doc/environment/express" rel=''>Backend</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/express" rel=''>Express</a></li>
      <li><a href="https://intlayer.org/doc/environment/nest" rel=''>NestJS</a></li>
      <li><a href="https://intlayer.org/doc/environment/fastify" rel=''>Fastify</a></li>
      <li><a href="https://intlayer.org/doc/environment/adonisjs" rel=''>AdonisJS</a></li>
      <li><a href="https://intlayer.org/doc/environment/hono" rel=''>Hono</a></li>
    </ul>
  </li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📊 Benchmark</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/nextjs.md" rel=''>Next.js</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/tanstack.md" rel=''>TanStack Start</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/vue.md" rel=''>Vue</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/solid.md" rel=''>Solid</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/svelte.md" rel=''>Svelte</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 Blog</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/what_is_internationalization.md" rel=''>What is i18n</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n" rel=''>i18n and SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next" rel=''>Intlayer and i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next" rel=''>Intlayer and react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl" rel=''>Intlayer and next-intl</a></li>
</ul>
</details>

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
