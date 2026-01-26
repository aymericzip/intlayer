---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Dokumentation des useRewriteURL-Hooks
description: Next.js-spezifischer Hook zur Verwaltung lokalisierter URL-Rewrites in Intlayer.
keywords:
  - useRewriteURL
  - next-intlayer
  - nextjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - useRewriteURL
---

# useRewriteURL-Hook

Der `useRewriteURL`-Hook für Next.js ist ein clientseitiger Hook, der lokalisierte URL-Rewrites automatisch verwaltet. Er stellt sicher, dass die Browser-URL stets den "schöneren" lokalisierten Pfad widerspiegelt, der in deiner `intlayer.config.ts` definiert ist, selbst wenn der Benutzer manuell einen kanonischen Pfad mit einem Locale-Präfix eingibt.

Dieser Hook arbeitet unauffällig mittels `window.history.replaceState` und vermeidet so redundante Next.js-Router-Navigationen oder Seitenneuladungen.

## Verwendung

Rufe einfach den Hook in einer Client-Komponente auf, die Teil deines Layouts ist.

```tsx
"use client";

import { useRewriteURL } from "next-intlayer";

const MyClientComponent = () => {
  // Korrigiert automatisch /fr/privacy-notice zu /fr/politique-de-confidentialite in der Adressleiste
  useRewriteURL();

  return null;
};
```

## Wie es funktioniert

1. **Pfadüberwachung**: Der Hook hört auf Änderungen der `locale` des Nutzers.
2. **Rewrite-Erkennung**: Er prüft den aktuellen `window.location.pathname` anhand der Rewrite-Regeln in deiner Konfiguration.
3. **URL-Korrektur**: Wenn für den aktuellen Pfad ein schöneres lokalisiertes Alias gefunden wird, führt der Hook ein `window.history.replaceState` aus, um die Adressleiste zu aktualisieren, während der Nutzer auf derselben internen Seite verbleibt.

## Warum in Next.js verwenden?

Während das `intlayerMiddleware` serverseitige Rewrites und anfängliche Redirects behandelt, stellt der Hook `useRewriteURL` sicher, dass die Browser-URL auch nach clientseitigen Übergängen mit Ihrer bevorzugten SEO-Struktur übereinstimmt.

- **Saubere URLs**: Erzwingt die Verwendung lokalisierter Segmente wie `/fr/essais` statt `/fr/tests`.
- **Performance**: Aktualisiert die Adressleiste, ohne einen vollständigen Router-Zyklus auszulösen oder Daten erneut abzurufen.
- **SEO-Ausrichtung**: Verhindert Probleme mit doppeltem Inhalt, indem sichergestellt wird, dass nur eine URL-Version für Benutzer und Suchmaschinen-Bots sichtbar ist.
