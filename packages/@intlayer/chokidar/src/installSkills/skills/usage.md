---
name: intlayer-usage
description: Provides general guidelines for using Intlayer in any project. Use when the user asks to "get started with Intlayer", "declare content files", or understand the "project structure" for internationalization.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: "@intlayer/mcp"
  category: productivity
  tags: [i18n]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
---

# Intlayer Usage

To use Intlayer effectively:

1.  **Retrieve Locales**: Check `intlayer.config.{ts,js,json,json5,jsonc,cjs,mjs}`, `.intlayerrc` to see the configured locales.

2.  **Declare Content**:
    We recommend creating one content declaration file per component, located alongside the component file. This keeps translations close to the code.

3.  **Consume Content**: Use the provided hooks and functions to access your content.
    - [Intlayer Exports](https://intlayer.org/doc/packages/intlayer/exports.md)
    - [React Intlayer Exports](https://intlayer.org/doc/packages/react-intlayer/exports.md)

    **Common Packages:**
    - `intlayer`: Core package for content declaration and utility functions.
    - `react-intlayer`: React components and hooks (e.g., `useIntlayer`).
    - `vite-intlayer`: Vite plugin for integration.

4.  **CLI Commands**:
    Useful commands for managing your content:
    - `npx intlayer build`: Build the dictionaries from your content declarations.

## References

- [Get Started](https://intlayer.org/doc/get-started.md)
- [How Intlayer Works](https://intlayer.org/doc/concept/how-works-intlayer.md)
- [Why Intlayer](https://intlayer.org/doc/why.md)
- [Per-locale File](https://intlayer.org/doc/concept/per-locale-file.md)
