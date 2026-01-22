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
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# vue-intlayer Package

The `vue-intlayer` package provides the necessary tools to integrate Intlayer into Vue applications. It includes a Vue plugin and composables for handling multilingual content.

## Installation

```bash
npm install vue-intlayer
```

## Exports

### Plugin

Import:

```tsx
import "vue-intlayer";
```

| Function          | Description                                         |
| ----------------- | --------------------------------------------------- |
| `installIntlayer` | Vue plugin to install Intlayer in your application. |

### Composables

Import:

```tsx
import "vue-intlayer";
```

| Composable             | Description                                                                                                       | Related Doc |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------- |
| `useIntlayer`          | Based on `useDictionary`, but injects an optimized version of the dictionary from the generated declaration.      | -           |
| `useDictionary`        | Processes objects that look like dictionaries (key, content). It processes `t()` translations, enumerations, etc. | -           |
| `useDictionaryAsync`   | Same as `useDictionary`, but handles asynchronous dictionaries.                                                   | -           |
| `useDictionaryDynamic` | Same as `useDictionary`, but handles dynamic dictionaries.                                                        | -           |
| `useLocale`            | Returns the current locale and a function to set it.                                                              | -           |
| `useIntl`              | Returns the Intl object for the current locale.                                                                   | -           |
| `useLoadDynamic`       | Composable to load dynamic dictionaries.                                                                          | -           |

### Functions

Import:

```tsx
import "vue-intlayer";
```

| Function        | Description                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| `getDictionary` | Processes objects that look like dictionaries (key, content). It processes `t()` translations, enumerations, etc. |
| `getIntlayer`   | Based on `getDictionary`, but injects an optimized version of the dictionary from the generated declaration.      |

### Markdown

Import:

```tsx
import "vue-intlayer/markdown";
```

| Function                  | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| `installIntlayerMarkdown` | Vue plugin to install Intlayer Markdown in your application. |
