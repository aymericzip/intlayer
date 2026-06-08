---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL Hook Dokumentation
description: Solid-spezifischer Hook zur Verwaltung lokalisierter URL-Umschreibungen in Intlayer.
keywords:
  - useRewriteURL
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - useRewriteURL
---

# useRewriteURL-Hook

Der `useRewriteURL`-Hook für SolidJS ist dafür vorgesehen, lokalisierte URL-Umschreibungen auf der Client-Seite zu verwalten. Er korrigiert automatisch die URL im Browser auf ihre „schöne“ lokalisierte Version basierend auf der aktuellen Locale und der Konfiguration in `intlayer.config.ts`.

Durch die Verwendung von `window.history.replaceState` werden redundante Navigationsvorgänge des Solid Router vermieden.

## Verwendung

Rufen Sie den Hook innerhalb einer Komponente auf, die Teil Ihrer Anwendung ist.

```tsx
import { useRewriteURL } from "solid-intlayer";

const Layout = (props) => {
  // Korrigiert automatisch /fr/tests zu /fr/essais in der Adressleiste, falls eine Rewrite-Regel existiert
  useRewriteURL();

  return <>{props.children}</>;
};
```

## Wie es funktioniert

1. **Erkennung**: Der Hook verwendet `createEffect`, um Änderungen des reaktiven `locale()` zu überwachen.
2. **Abgleich**: Er prüft, ob der aktuelle `window.location.pathname` einer kanonischen Route entspricht, die für die aktuelle Sprache ein ansprechenderes lokales Alias besitzt.
3. **URL-Korrektur**: Wenn ein ansprechenderes Alias gefunden wird, ruft der Hook `window.history.replaceState` auf, um die Adressleiste zu aktualisieren, ohne den internen Navigationszustand zu beeinflussen oder Neurenderings von Komponenten auszulösen.

## Warum es verwenden?

/// **Kanonische URLs**: Erzwingt eine einzige URL für jede lokalisierte Version Ihrer Inhalte, was für SEO entscheidend ist.

- **Entwicklerkomfort**: Ermöglicht es Ihnen, Ihre internen Routendefinitionen kanonisch zu halten, während Sie nach außen benutzerfreundliche, lokalisierte Pfade bereitstellen.
- **Konsistenz**: Korrigiert URLs, wenn Benutzer manuell einen Pfad eingeben, der nicht Ihren bevorzugten Lokalisierungsregeln entspricht.

---
