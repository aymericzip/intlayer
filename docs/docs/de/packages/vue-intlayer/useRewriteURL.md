---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL Composable Dokumentation
description: Vue-spezifisches Composable zur Verwaltung lokalisierter URL-Umschreibungen in Intlayer.
keywords:
  - useRewriteURL
  - vue-intlayer
  - vue
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - useRewriteURL
---

# useRewriteURL Composable

Das `useRewriteURL`-Composable für Vue 3 ist dafür konzipiert, lokalisierte URL-Umschreibungen auf der Client-Seite zu verwalten. Es korrigiert automatisch die Browser-URL auf ihre „schöne“ lokalisierte Version basierend auf der aktuellen Locale des Benutzers und der Konfiguration in `intlayer.config.ts`.

Es funktioniert, indem `window.history.replaceState` verwendet wird, wodurch unerwünschte Navigationsvorgänge des Vue Router vermieden werden.

## Verwendung

Rufen Sie das Composable innerhalb Ihrer `setup()`-Funktion oder in `<script setup>` auf.

```vue
<script setup>
import { useRewriteURL } from "vue-intlayer";

// Korrigiert automatisch /fr/tests zu /fr/essais in der Adresszeile, falls eine Umschreibungsregel existiert
useRewriteURL();
</script>

<template>
  <router-view />
</template>
```

## Funktionsweise

1. **Reaktives Monitoring**: Das Composable richtet einen `watch` auf die Benutzer-`locale` ein.
2. **Rewrite-Matching**: Wann immer sich die `locale` ändert (oder beim Mount), prüft es, ob das aktuelle `window.location.pathname` mit einer kanonischen Route übereinstimmt, die einen schöneren lokalisierten Alias hat.
3. **URL-Korrektur**: Wird ein schönerer Alias gefunden, ruft das Composable `window.history.replaceState` auf, um die Adresszeile zu aktualisieren, ohne die Seite neu zu laden oder den Router-Zustand zu verlieren.

## Warum verwenden?

- **SEO-Optimierung**: Stellt sicher, dass Suchmaschinen die autoritative lokalisierte Version Ihrer URLs indexieren.
- **Verbessertes UX**: Korrigiert manuell eingegebene URLs, sodass sie Ihrer bevorzugten Benennung entsprechen (z. B. `/fr/a-propos` statt `/fr/about`).
- **Geringer Overhead**: Aktualisiert die URL stillschweigend, ohne Komponenten-Lifecycles oder Navigation Guards erneut auszulösen.

---
