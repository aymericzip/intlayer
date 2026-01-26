---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: IntlayerProvider-Komponentendokumentation | react-intlayer
description: Anleitung zur Verwendung der IntlayerProvider-Komponente im react-intlayer-Paket
keywords:
  - IntlayerProvider
  - react
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - react-intlayer
  - IntlayerProvider
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Init doc
---

# IntlayerProvider-Komponentendokumentation

Die `IntlayerProvider`-Komponente ist der Haupt-Provider für Intlayer in React-Anwendungen. Sie stellt den Intlayer-Kontext allen untergeordneten Komponenten zur Verfügung.

## Verwendung

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ children }) => <IntlayerProvider>{children}</IntlayerProvider>;
```

## Props

| Prop              | Typ                               | Beschreibung                                                   |
| ----------------- | --------------------------------- | -------------------------------------------------------------- |
| `locale`          | `LocalesValues`                   | Die anfängliche Locale, die verwendet werden soll.             |
| `defaultLocale`   | `LocalesValues`                   | Die Standard-Locale als Fallback.                              |
| `setLocale`       | `(locale: LocalesValues) => void` | Eine benutzerdefinierte Funktion zum Setzen der Locale.        |
| `disableEditor`   | `boolean`                         | Ob der Editor deaktiviert werden soll.                         |
| `isCookieEnabled` | `boolean`                         | Ob Cookies zur Speicherung der Locale aktiviert werden sollen. |
