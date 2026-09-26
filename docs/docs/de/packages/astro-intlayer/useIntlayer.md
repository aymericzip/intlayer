---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: useIntlayer Hook Dokumentation | astro-intlayer
description: Erfahren Sie, wie Sie den useIntlayer Hook in Astro-Komponenten und Client-Skripten verwenden, um auf lokalisierte Inhalte zuzugreifen.
keywords:
  - useIntlayer
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
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Initiale Dokumentation"
author: aymericzip
---

# useIntlayer Hook Dokumentation

Mit dem Hook `useIntlayer` können Sie in Astro-Anwendungen lokalisierte Wörterbuchinhalte anhand eines Schlüssels abrufen.

Er kann in zwei verschiedenen Kontexten unter demselben Importpfad aufgerufen werden:

1. **Server / Frontmatter**: Innerhalb von `.astro`-Dateien löst er Inhalte automatisch unter Verwendung des in `Astro.locals.intlayer` gespeicherten Anfrage-Locales auf.
2. **Browser / Client-`<script>`**: In Client-Skripten oder UI-Framework-Komponenten greift er auf die clientseitige Store-Implementierung zu (`vanilla-intlayer`).

## Verwendung

### Im Frontmatter von Astro-Komponenten

```astro fileName="src/pages/index.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

### In Client-`<script>`-Blöcken

```astro fileName="src/components/InteractiveWidget.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<button id="alert-btn">{content.buttonText}</button>

<script>
  import { useIntlayer } from "astro-intlayer";

  const content = useIntlayer("home");

  document.getElementById("alert-btn")?.addEventListener("click", () => {
    alert(content.buttonText);
  });
</script>
```

## Parameter

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: Der eindeutige Schlüssel des Wörterbuchs (wie in Ihren `.content.ts`-Deklarationsdateien definiert).
2. **`localeOrSelector`** (optional): Ein bestimmtes Locale oder ein Selektorobjekt (`{ item }`, `{ variant }`, optional mit `locale`). Falls angegeben, überschreibt dies das aus dem Anforderungskontext oder Client-Store ermittelte Locale.

## Beschreibung

Der Hook führt folgende Aufgaben aus:

1. **Locale-Auflösung**:
   - Auf dem Server liest er das aktive Locale aus `Astro.locals.intlayer` über einen von `astro-intlayer/middleware` initialisierten `AsyncLocalStorage`-Bereich.
   - Im Browser liest er das aktive Locale aus dem Client-Speicher/Store.
2. **Wörterbuch-Abruf**: Injiziert den Wörterbuchinhalt, der dem angegebenen Schlüssel entspricht.
3. **Übersetzungsverarbeitung**: Löst Übersetzungen (`t()`), Aufzählungen, Bedingungen und Markdown in darstellungsfertigen Inhalt auf.

## Zugehörige Dokumentation

- [`intlayer` Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/intlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/useDictionary.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/useLocale.md)
