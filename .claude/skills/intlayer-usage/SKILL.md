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
    - [Intlayer Exports](references/packages_intlayer_exports.md)
    - [React Intlayer Exports](references/packages_react-intlayer_exports.md)

    **Common Packages:**
    - `intlayer`: Core package for content declaration and utility functions.
    - `react-intlayer`: React components and hooks (e.g., `useIntlayer`).
    - `vite-intlayer`: Vite plugin for integration.

4.  **CLI Commands**:
    Useful commands for managing your content:
    - `npx intlayer build`: Build the dictionaries from your content declarations.

## References

- [Get Started](references/get-started.md)
- [How Intlayer Works](references/concept_how-works-intlayer.md)
- [Why Intlayer](references/why.md)
- [Per-locale File](references/concept_per-locale-file.md)
- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Packages

- [intlayer comparePaths](references/packages_intlayer_comparePaths.md)
- [intlayer getCanonicalPath](references/packages_intlayer_getCanonicalPath.md)
- [intlayer getConfiguration](references/packages_intlayer_getConfiguration.md)
- [intlayer getDictionary](references/packages_intlayer_getDictionary.md)
- [intlayer getDictionaryAsync](references/packages_intlayer_getDictionaryAsync.md)
- [intlayer getEnumeration](references/packages_intlayer_getEnumeration.md)
- [intlayer getHTMLTextDir](references/packages_intlayer_getHTMLTextDir.md)
- [intlayer getIntlayer](references/packages_intlayer_getIntlayer.md)
- [intlayer getIntlayerAsync](references/packages_intlayer_getIntlayerAsync.md)
- [intlayer getLocale](references/packages_intlayer_getLocale.md)
- [intlayer getLocaleLang](references/packages_intlayer_getLocaleLang.md)
- [intlayer getLocaleName](references/packages_intlayer_getLocaleName.md)
- [intlayer getLocalizedPath](references/packages_intlayer_getLocalizedPath.md)
- [intlayer getLocalizedUrl](references/packages_intlayer_getLocalizedUrl.md)
- [intlayer getMultilingualUrls](references/packages_intlayer_getMultilingualUrls.md)
- [intlayer getPathWithoutLocale](references/packages_intlayer_getPathWithoutLocale.md)
- [intlayer getPrefix](references/packages_intlayer_getPrefix.md)
- [intlayer getTranslation](references/packages_intlayer_getTranslation.md)
- [intlayer validatePrefix](references/packages_intlayer_validatePrefix.md)
- [vite-intlayer Exports](references/packages_vite-intlayer_exports.md)
- [vite-intlayer intlayer](references/packages_vite-intlayer_intlayer.md)
- [vite-intlayer intlayerCompiler](references/packages_vite-intlayer_intlayerCompiler.md)
- [vite-intlayer intlayerMinify](references/packages_vite-intlayer_intlayerMinify.md)
- [vite-intlayer intlayerProxy](references/packages_vite-intlayer_intlayerProxy.md)
- [vite-intlayer intlayerPrune](references/packages_vite-intlayer_intlayerPrune.md)
