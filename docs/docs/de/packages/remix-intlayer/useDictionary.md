---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useDictionary Hook Dokumentation | remix-intlayer
description: Erfahren Sie, wie Sie den useDictionary-Hook in Remix 3-Anwendungen verwenden, um Wörterbuchobjekte für die aktuelle Request-Locale aufzulösen.
keywords:
  - useDictionary
  - wörterbuch
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - remix-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# useDictionary Hook Dokumentation

Der `useDictionary`-Hook transformiert ein importiertes oder inline definiertes Wörterbuchobjekt und gibt dessen Inhalt für die Locale der aktuellen Anfrage in Remix 3-Anwendungen zurück.

Im Gegensatz zu `useIntlayer`, das Wörterbücher anhand ihres Zeichenfolgenschlüssels aus der globalen Wörterbuchregistrierung auflöst, akzeptiert `useDictionary` direkt ein Wörterbuchobjekt.

## Verwendung

```ts fileName="src/views/home.ts"
import { useDictionary } from "remix-intlayer";
import homeContent from "./home.content";

export const HomeView = () => {
  const content = useDictionary(homeContent);

  return `
    <div>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
  `;
};
```

Sie können auch Inline-Wörterbücher übergeben, die mit `t()` definiert sind:

```ts
import { useDictionary } from "remix-intlayer";
import { t } from "intlayer";

export const FooterView = () => {
  const content = useDictionary({
    key: "footer",
    content: {
      copyright: t({
        de: "Alle Rechte vorbehalten.",
        en: "All rights reserved.",
        fr: "Tous droits réservés.",
      }),
    },
  });

  return `<footer>${content.copyright}</footer>`;
};
```

## Parameter

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Ein Wörterbuchobjekt oder eine qualifizierte Wörterbuchgruppe.
2. **`localeOrSelector`** (optional): Eine spezifische Locale oder ein Selektorobjekt (`{ item }`, `{ variant }`, optional mit `locale`).

## Beschreibung

Der Hook führt folgende Aufgaben aus:

1. **Locale-Erkennung**: Liest die aktive Request-Locale aus dem vom `intlayer()`-Middleware erstellten `AsyncLocalStorage`-Speicher.
2. **Inhaltsauflösung**: Wertet Übersetzungen (`t()`), Aufzählungen, Bedingungen und verschachtelte Strukturen gemäß der aufgelösten Locale aus.
3. **Selektorverarbeitung**: Wendet alle in den Argumenten angegebenen Element- oder Variantenselektoren an.

## Zugehörige Dokumentation

- [`intlayer` Middleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/intlayerMiddleware.md)
- [`useIntlayer` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/useIntlayer.md)
- [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/useLocale.md)
