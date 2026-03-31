---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: Standalone Bundle
description: Learn how to create a standalone JavaScript bundle for app content.
keywords:
  - Standalone
  - Bundle
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "Init standalone command documentation"
---

# Standalone Bundle

The `standalone` command allows you to create a standalone JavaScript bundle containing Intlayer and any other specified packages. This is particularly useful for using Intlayer in environments without a package manager or a bundler, such as a simple HTML/JS app.

The bundle uses [esbuild](https://esbuild.github.io/) to combine the requested packages and their dependencies into a single file that can be easily imported into any web project.

## Usage

```bash
npx intlayer standalone --packages [packages...] [options]
```

## Options

- `-o, --outfile [outfile]` - Optional. The name of the output file. Default: `intlayer-bundle.js`.
- `--packages [packages...]` - Required. List of packages to include in the bundle (e.g. `intlayer`, `vanilla-intlayer`).
- `--version [version]` - Optional. The version of the packages to bundle. If not specified, the Intlayer CLI version is used by default.
- `--minify` - Optional. Whether to minify the output. Default: `true`.
- `--platform [platform]` - Optional. Target platform for the bundle (e.g. `browser`, `node`). Default: `browser`.
- `--format [format]` - Optional. Output format for the bundle (e.g. `esm`, `cjs`, `iife`). Default: `esm`.

## General Options

- `--env-file [envFile]` - Environment file.
- `-e, --env [env]` - Environment.
- `--base-dir [baseDir]` - Base directory.
- `--no-cache` - Disable cache.
- `--verbose` - Verbose output.

## Examples:

### Create a bundle for Vanilla JS:

```bash
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

This will create an `intlayer.js` file containing both `intlayer` and `vanilla-intlayer` packages, minified and in ESM format, ready to be used in the browser via a `<script>` tag.

### Bundle a specific version:

```bash
npx intlayer standalone --packages intlayer --version 8.6.4
```

### Bundle in a different format:

```bash
npx intlayer standalone --packages intlayer --format iife
```

## What it does:

1. **Creates a temporary environment** - Sets up a temporary directory to manage dependencies.
2. **Installs packages** - Uses `npm` or `bun` (if available) to install the requested packages and their dependencies.
3. **Generates an entry point** - Creates a temporary entry point file that exports all requested packages and exposes them as global variables when running in the browser.
4. **Bundles with esbuild** - Uses esbuild to combine everything into a single file, applying minification and formatting as requested.
5. **Generates the file** - Writes the resulting bundle to the specified output path.

## Global Variables

When the bundle is loaded in the browser, it exposes the requested packages as global variables on the `window` object. Variable names are derived from the package names (e.g. `intlayer` becomes `Intlayer`, and `vanilla-intlayer` becomes `VanillaIntlayer`).

```javascript
// Accessing Intlayer from the bundle
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```
