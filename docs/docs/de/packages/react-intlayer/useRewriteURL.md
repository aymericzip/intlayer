---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL-Hook Dokumentation
description: React-spezifischer Hook zur Verwaltung lokalisierter URL-Umleitungen in Intlayer.
keywords:
  - useRewriteURL
  - react-intlayer
  - react
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - useRewriteURL
---

# useRewriteURL Hook

Der `useRewriteURL`-Hook dient zur Verwaltung lokalisierter URL-Umleitungen auf der Client-Seite. Er erkennt automatisch, ob die aktuelle URL basierend auf der Nutzer-Locale und den in `intlayer.config.ts` definierten Rewrite-Regeln auf eine "schönere" lokalisierte Version korrigiert werden sollte.

Im Gegensatz zur standardmäßigen Navigation verwendet dieser Hook `window.history.replaceState`, um die URL in der Adressleiste zu aktualisieren, ohne einen vollständigen Seitenreload oder einen Router-Navigationszyklus auszulösen.

## Verwendung

Rufen Sie den Hook einfach in einer clientseitigen Komponente auf.

```tsx
import { useRewriteURL } from "react.intlayer";

const MyComponent = () => {
  // Korrigiert automatisch /fr/tests zu /fr/essais in der Adressleiste, falls eine Rewrite-Regel existiert
  useRewriteURL();

  return <div>Meine Komponente</div>;
};
```

## Wie es funktioniert

1. **Erkennung**: Der Hook überwacht den aktuellen `window.location.pathname` und die `locale` des Benutzers.
2. **Abgleich**: Er verwendet die interne Intlayer-Engine, um zu prüfen, ob der aktuelle Pfad mit einer kanonischen Route übereinstimmt, die für die aktuelle Locale ein schöneres lokalisiertes Alias besitzt.
3. **URL-Korrektur**: Wenn ein besseres Alias gefunden wird (und es sich vom aktuellen Pfad unterscheidet), ruft der Hook `window.history.replaceState` auf, um die Browser-URL zu aktualisieren und dabei denselben kanonischen Inhalt und Zustand beizubehalten.

## Warum verwenden?

- **SEO**: Stellt sicher, dass Nutzer stets auf der einzigen, maßgeblichen „schönen“ URL für eine bestimmte Sprache landen.
- **Konsistenz**: Verhindert Inkonsistenzen, bei denen ein Nutzer manuell einen kanonischen Pfad eingibt (z. B. `/fr/privacy-notice`) statt der lokalisierten Version (`/fr/politique-de-confidentialite`).
- **Performance**: Aktualisiert die Adresszeile, ohne unerwünschte Router-Nebenwirkungen oder ein erneutes Mounten von Komponenten auszulösen.
