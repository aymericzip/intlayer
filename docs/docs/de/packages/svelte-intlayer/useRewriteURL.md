---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL Hook Dokumentation
description: Svelte-spezifischer Hook zur Verwaltung lokalisierter URL-Umschreibungen in Intlayer.
keywords:
  - useRewriteURL
  - svelte-intlayer
  - svelte
  - sveltekit
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - useRewriteURL
---

# useRewriteURL-Hook

Der `useRewriteURL`-Hook für Svelte ist dafür ausgelegt, lokalisierte URL-Umschreibungen auf der Client-Seite zu verwalten. Er korrigiert automatisch die Browser-URL zur "schönen" lokalisierten Version basierend auf der aktuellen Locale und der Konfiguration in `intlayer.config.ts`.

Er aktualisiert die URL stillschweigend mittels `window.history.replaceState`, wodurch vollständige SvelteKit-Navigationsvorgänge vermieden werden.

## Verwendung

Rufe den Hook innerhalb einer Svelte-Komponente auf.

```svelte
<script>
  import { useRewriteURL } from 'svelte-intlayer';

  // Korrigiert automatisch /fr/tests zu /fr/essais in der Adressleiste, falls eine Rewrite-Regel existiert
  useRewriteURL();
</script>

<slot />
```

## Wie es funktioniert

1. **Reaktive Aktualisierungen**: Der Hook abonniert den Intlayer `locale` Store.
2. **Erkennung**: Immer wenn sich die `locale` ändert (oder beim Mount), prüft er, ob das aktuelle `window.location.pathname` einen schöneren lokalisierten Alias hat, der in deinen Rewrite-Regeln definiert ist.
3. **URL-Korrektur**: Wird ein schönerer Pfad gefunden, ruft der Hook `window.history.replaceState` auf, um die Adressleiste zu aktualisieren, ohne einen vollständigen Seitenneuladen oder die SvelteKit-Navigationslogik auszulösen.

## Warum verwenden?

- **SEO Best Practices**: Stellt sicher, dass Suchmaschinen nur die schöne, lokalisierte Version deiner URLs indexieren.
- **Verbesserte UX**: Korrigiert manuell eingegebene URLs, damit sie Ihre bevorzugte Namensstruktur widerspiegeln.
- **Stille Aktualisierungen**: Ändert die Adressleiste, ohne den Komponentenbaum oder die Navigationshistorie zu beeinflussen.
