---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: vue-intlayer Package Documentation
description: Vue-specific integration for Intlayer, providing plugins and composables for Vue applications.
keywords:
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# vue-intlayer Package

The `vue-intlayer` package provides the necessary tools to integrate Intlayer into Vue applications. It provides a Vue plugin and composables for managing multilingual content.

## Installation

```bash
npm install vue-intlayer
```

## Exports

### Plugin

| Function          | Description                                         |
| ----------------- | --------------------------------------------------- |
| `installIntlayer` | Vue plugin to install Intlayer in your application. |

### Composables

| Composable      | Description                                              |
| --------------- | -------------------------------------------------------- |
| `useIntlayer`   | Selects a dictionary by its key and returns its content. |
| `useDictionary` | Selects a dictionary by its key and returns its content. |
| `useLocale`     | Returns the current locale and a function to set it.     |
| `useIntl`       | Returns the Intl object for the current locale.          |

### Functions

| Function        | Description                          |
| --------------- | ------------------------------------ |
| `getDictionary` | Retrieves a dictionary.              |
| `getIntlayer`   | Retrieves content from a dictionary. |

### Markdown

| Function                  | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| `installIntlayerMarkdown` | Vue plugin to install Intlayer Markdown in your application. |
