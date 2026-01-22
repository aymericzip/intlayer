---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: react-native-intlayer Package Documentation
description: React Native support for Intlayer, providing providers and polyfills.
keywords:
  - react-native-intlayer
  - react-native
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# react-native-intlayer Package

The `react-native-intlayer` package provides the necessary tools to integrate Intlayer into React Native applications. It includes a provider and polyfills for locale support.

## Installation

```bash
npm install react-native-intlayer
```

## Exports

### Provider

| Component          | Description                                                                       |
| ------------------ | --------------------------------------------------------------------------------- |
| `IntlayerProvider` | Provider component that wraps your application and provides the Intlayer context. |

Import:

```tsx
import "react-native-intlayer";
```

### Polyfill

| Function           | Description                                                                     |
| ------------------ | ------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Function that applies necessary polyfills for React Native to support Intlayer. |

Import:

```tsx
import "react-native-intlayer";
```

### Metro Configuration

The `react-native-intlayer` package provides Metro configuration utilities to ensure that Intlayer works correctly with React Native.

| Function                  | Description                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Asynchronous function that prepares Intlayer and merges the Metro configuration.               |
| `configMetroIntlayerSync` | Synchronous function that merges the Metro configuration without preparing Intlayer resources. |
| `exclusionList`           | Creates a RegExp pattern for Metro's blockList to exclude content files from the bundle.       |

Import:

```tsx
import "react-native-intlayer/metro";
```
