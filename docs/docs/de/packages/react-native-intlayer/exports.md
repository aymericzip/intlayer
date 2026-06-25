---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: react-native-intlayer Paketdokumentation
description: React Native-Unterstützung für Intlayer, die Provider, Hooks, Polyfills und Metro-Konfiguration bereitstellt.
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
  - version: 9.0.0
    date: 2026-06-25
    changes: "Vollständige react-intlayer-API (Hooks, Utilities, format/html/markdown-Unterpfade) erneut exportieren, sodass eine React Native-App nur von react-native-intlayer abhängt"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Vereinheitlichte Dokumentation für alle Exporte"
author: aymericzip
---

# react-native-intlayer-Paket

Das Paket `react-native-intlayer` stellt die notwendigen Werkzeuge bereit, um Intlayer in React Native-Anwendungen zu integrieren. Es exportiert die vollständige `react-intlayer`-API (Hooks und Utilities) erneut mit einem React Native-fähigen `IntlayerProvider` sowie den von React Native benötigten Polyfills und der Metro-Konfiguration.

> In einer React Native-App importieren Sie **alles** aus `react-native-intlayer`. Sie müssen `react-intlayer` nicht direkt installieren oder importieren.

## Installation

```bash
npm install react-native-intlayer
```

## Exporte

### Provider

| Komponente         | Beschreibung                                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Provider-Komponente, die Ihre Anwendung umschließt und den Intlayer-Kontext bereitstellt. Wendet die erforderlichen Polyfills automatisch an. |

```tsx
import { IntlayerProvider } from "react-native-intlayer";
```

### Hooks und Utilities

Diese werden aus `react-intlayer` erneut exportiert, sodass Sie sie direkt aus `react-native-intlayer` importieren können:

| Export                                                                                                            | Beschreibung                                                      |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `useIntlayer`                                                                                                     | Auf lokalisierten Inhalt für einen Wörterbuchschlüssel zugreifen. |
| `useLocale`                                                                                                       | Die aktuelle Spracheinstellung lesen und ändern.                  |
| `useDictionary`, `useDictionaryAsync`, `useDictionaryDynamic`, `useLoadDynamic`                                   | Wörterbuchinhalte auf verschiedene Arten laden.                   |
| `useI18n`                                                                                                         | i18next-kompatibler Hook.                                         |
| `t`                                                                                                               | Inline-Übersetzungshelfer.                                        |
| `getIntlayer`, `getDictionary`                                                                                    | Imperative Inhalts-Getter.                                        |
| `localeCookie`, `localeInStorage`, `setLocaleCookie`, `setLocaleInStorage`, `useLocaleCookie`, `useLocaleStorage` | Hilfsfunktionen zur Sprachpersistenz.                             |

```tsx
import { useIntlayer, useLocale, t } from "react-native-intlayer";
```

### Polyfill

| Funktion           | Beschreibung                                                                                        |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Funktion, die die notwendigen Polyfills für React Native anwendet, damit Intlayer unterstützt wird. |

```tsx
import { intlayerPolyfill } from "react-native-intlayer";
```

> Der Polyfill wird automatisch angewendet, wenn Sie `IntlayerProvider` importieren. Rufen Sie `intlayerPolyfill` nur manuell auf, wenn Sie die Polyfills benötigen, bevor der Provider eingehängt wird.

### Formatierer

Hooks für die Zahlen-, Datums- und andere Intl-basierte Formatierung sind über den Unterpfad `/format` verfügbar:

```tsx
import { useNumber, useDate } from "react-native-intlayer/format";
```

### Markdown- und HTML-Rendering

```tsx
import { MarkdownProvider } from "react-native-intlayer/markdown";
import { HTMLProvider } from "react-native-intlayer/html";
```

### Metro-Konfiguration

Das Paket `react-native-intlayer` stellt Metro-Konfigurationshilfsfunktionen bereit, um sicherzustellen, dass Intlayer korrekt mit React Native funktioniert.

| Funktion                  | Beschreibung                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `configMetroIntlayer`     | Asynchrone Funktion, die Intlayer vorbereitet und die Metro-Konfiguration zusammenführt.               |
| `configMetroIntlayerSync` | Synchrone Funktion, die die Metro-Konfiguration zusammenführt, ohne Intlayer-Ressourcen vorzubereiten. |
| `exclusionList`           | Erstellt ein RegExp-Muster für Metros blockList, um Inhaltsdateien vom Bundle auszuschließen.          |

```tsx
import { configMetroIntlayer } from "react-native-intlayer/metro";
```
