---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: IntlayerProvider Komponenten-Dokumentation | solid-intlayer
description: Siehe, wie die IntlayerProvider-Komponente für das solid-intlayer-Paket verwendet wird
keywords:
  - IntlayerProvider
  - Provider
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - IntlayerProvider
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Vereinheitlichte Dokumentation für alle Exporte
---

# IntlayerProvider Komponenten-Dokumentation

Der `IntlayerProvider` ist die Root-Komponente, die den Internationalisierungs-Kontext für Ihre Solid-Anwendung bereitstellt. Er verwaltet den aktuellen locale-Zustand und stellt sicher, dass alle Kindkomponenten auf Übersetzungen zugreifen können.

## Verwendung

```tsx
import { IntlayerProvider } from "solid-intlayer";

const App = () => (
  <IntlayerProvider>
    <MyComponent />
  </IntlayerProvider>
);
```

## Beschreibung

Der `IntlayerProvider` übernimmt die folgenden Aufgaben:

1. **State-Management**: Er initialisiert und speichert die aktuelle locale und verwendet dabei signals für Reaktivität.
2. **Locale-Auflösung**: Er bestimmt die anfängliche locale basierend auf Cookies, Browser-Präferenzen oder der Standardkonfiguration.
3. **Kontext-Injektion**: Er stellt die locale und die `setLocale`-Funktion jedem Component über Hooks wie `useIntlayer` oder `useLocale` zur Verfügung.
4. **Persistenz**: Er synchronisiert locale-Änderungen automatisch mit Cookies oder dem localStorage, um die Präferenz des Nutzers über Sessions hinweg beizubehalten.

## Props

- **locale** (optional): Setzt die aktuelle locale manuell.
- **defaultLocale** (optional): Überschreibt die Standard-Locale aus der Konfiguration.
- **setLocale** (optional): Stellt eine benutzerdefinierte Funktion zum Setzen der Locale bereit.
- **disableEditor** (optional): Deaktiviert die Integration des visuellen Editors.
- **isCookieEnabled** (optional): Aktiviert oder deaktiviert die Cookie-Persistenz.
