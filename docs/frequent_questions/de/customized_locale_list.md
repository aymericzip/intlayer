---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Wie kann man die Liste der Sprachen anpassen?
description: Erfahren Sie, wie Sie die Liste der Sprachen anpassen können.
keywords:
  - locales
  - liste
  - intlayer
  - konfiguration
  - availableLocales
  - defaultLocale
  - useLocale
  - hook
  - sprache
  - liste
slugs:
  - doc
  - faq
  - customized-locale-list
---

# Ist es möglich, einen Sprachtyp wie Englisch zu blockieren? Ich füge Englisch in meine Wörterbücher ein, möchte Englisch aber noch nicht auf der Webseite verfügbar machen

Ja, Sie können einen Sprachtyp wie Englisch blockieren, indem Sie die Option `availableLocales` in der Intlayer-Konfiguration verwenden.

```ts
import { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  locales: [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH],
  availableLocales: [Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.FRENCH,
};
```

oder

```ts
import { IntlayerConfig } from "intlayer";

const locales = [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH];

const config: IntlayerConfig = {
  locales,
  availableLocales: locales.filter((locale) => locale !== Locales.ENGLISH),
  defaultLocale: Locales.FRENCH,
};
```

Diese Konfiguration ändert die Typen Ihrer `t()`-Funktion so, dass nur die verfügbaren Sprachen eingeschlossen werden.

Die Option `availableLocales` ist optional; wenn Sie sie nicht angeben, sind alle Sprachen verfügbar.

Seien Sie vorsichtig, alle in der Option `availableLocales` enthaltenen Sprachen sollten auch in der Option `locales` enthalten sein.

Beachten Sie, dass wenn Sie den `useLocale` Hook verwenden, die Option `availableLocales` verwendet wird, um den Zugriff auf die Sprachliste festzulegen.

```ts
import { useLocale } from "intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // [Locales.FRENCH, Locales.SPANISH]
```
