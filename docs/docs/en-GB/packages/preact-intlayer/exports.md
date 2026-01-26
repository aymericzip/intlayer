---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: preact-intlayer package documentation
description: Preact-specific integration for Intlayer, providing providers and hooks for Preact applications.
keywords:
  - preact-intlayer
  - preact
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - preact-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# preact-intlayer package

The `preact-intlayer` package provides the necessary tools to integrate Intlayer into Preact applications. It includes providers and hooks for handling multilingual content.

## Installation

```bash
npm install preact-intlayer
```

## Exports

### Provider

| Component          | Description                                                                      |
| ------------------ | -------------------------------------------------------------------------------- |
| `IntlayerProvider` | The main provider that wraps your application and supplies the Intlayer context. |

### Hooks

| Hook            | Description                                                                                                    | Related documentation                                                                                     |
| --------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Based on `useDictionary`, but injects an optimised version of the dictionary from the generated declaration.   | -                                                                                                         |
| `useDictionary` | Processes objects that resemble dictionaries (key, content). It handles `t()` translations, enumerations, etc. | -                                                                                                         |
| `useLocale`     | Returns the current locale and a function to set it.                                                           | -                                                                                                         |
| `t`             | Picks content based on the current locale.                                                                     | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/translation.md) |

### Components

| Component          | Description                                      |
| ------------------ | ------------------------------------------------ |
| `MarkdownProvider` | Provider for markdown rendering context.         |
| `MarkdownRenderer` | Renders markdown content with custom components. |
