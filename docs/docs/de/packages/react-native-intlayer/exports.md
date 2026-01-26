---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: react-native-intlayer Paketdokumentation
description: React Native-Unterstützung für Intlayer, die Provider und Polyfills bereitstellt.
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
    changes: Vereinheitlichte Dokumentation für alle Exporte
---

# react-native-intlayer-Paket

Das Paket `react-native-intlayer` stellt die notwendigen Werkzeuge bereit, um Intlayer in React Native-Anwendungen zu integrieren. Es enthält einen Provider und Polyfills zur Unterstützung von Locales.

## Installation

```bash
npm install react-native-intlayer
```

## Exporte

### Provider

| Komponente         | Beschreibung                                                                              |
| ------------------ | ----------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Provider-Komponente, die Ihre Anwendung umschließt und den Intlayer-Kontext bereitstellt. |

Import:

```tsx
import "react-native-intlayer";
```

### Polyfill

| Funktion           | Beschreibung                                                                                        |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Funktion, die die notwendigen Polyfills für React Native anwendet, damit Intlayer unterstützt wird. |

Import:

```tsx
import "react-native-intlayer";
```

### Metro-Konfiguration

Das Paket `react-native-intlayer` stellt Metro-Konfigurationshilfsfunktionen bereit, um sicherzustellen, dass Intlayer korrekt mit React Native funktioniert.

| Funktion                  | Beschreibung                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `configMetroIntlayer`     | Asynchrone Funktion, die Intlayer vorbereitet und die Metro-Konfiguration zusammenführt.               |
| `configMetroIntlayerSync` | Synchrone Funktion, die die Metro-Konfiguration zusammenführt, ohne Intlayer-Ressourcen vorzubereiten. |
| `exclusionList`           | Erstellt ein RegExp-Muster für Metros blockList, um Inhaltsdateien vom Bundle auszuschließen.          |

Import:

```tsx
import "react-native-intlayer/metro";
```
