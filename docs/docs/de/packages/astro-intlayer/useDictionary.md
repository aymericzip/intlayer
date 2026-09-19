---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useDictionary Hook Dokumentation | astro-intlayer
description: Erfahren Sie, wie Sie den useDictionary Hook in Astro-Komponenten und Skripten verwenden, um Wörterbuchobjekte aufzulösen.
keywords:
  - useDictionary
  - dictionary
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - astro-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Initiale Dokumentation"
author: aymericzip
---

# useDictionary Hook Dokumentation

Der `useDictionary`-Hook löst ein importiertes oder Inline-Wörterbuchobjekt auf und gibt seinen Inhalt für das aktuelle Locale in Astro-Anwendungen zurück.

Im Gegensatz zu `useIntlayer`, das Wörterbücher nach Schlüssel aus der globalen Wörterbuchregistrierung abruft, arbeitet `useDictionary` direkt mit einem Wörterbuchobjekt.

## Verwendung

```astro fileName="src/pages/index.astro"
---
import { useDictionary } from "astro-intlayer";
import homeContent from "../content/home.content";

const content = useDictionary(homeContent);
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

Sie können auch mit `t()` definierte Inline-Wörterbücher übergeben:

```astro fileName="src/components/Footer.astro"
---
import { useDictionary } from "astro-intlayer";
import { t } from "intlayer";

const footer = useDictionary({
  key: "footer",
  content: {
    copyright: t({
      de: "Alle Rechte vorbehalten.",
      en: "All rights reserved.",
      fr: "Tous droits réservés.",
      es: "Todos los derechos reservados.",
    }),
  },
});
---

<footer>
  <p>{footer.copyright}</p>
</footer>
```

## Parameter

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Ein Wörterbuchobjekt oder eine qualifizierte Wörterbuchgruppe.
2. **`localeOrSelector`** (optional): Ein bestimmtes Locale oder Selektorobjekt (`{ item }`, `{ variant }`, optional mit `locale`).

## Beschreibung

Der Hook führt folgende Aufgaben aus:

1. **Locale-Erkennung**: Auf dem Server bezieht er das Locale aus `Astro.locals.intlayer`. Im Browser verwendet er das Locale des Client-Stores.
2. **Inhaltsverarbeitung**: Löst Übersetzungen (`t()`), Aufzählungen, Bedingungen und verschachtelte Strukturen gemäß dem aufgelösten Locale auf.
3. **Selektoren**: Wendet alle in den Argumenten angegebenen Element- oder Variantenselektoren an.

## Zugehörige Dokumentation

- [`intlayer` Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/useLocale.md)
