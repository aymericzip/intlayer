---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Come personalizzare la lista delle localizzazioni?
description: Scopri come personalizzare la lista delle localizzazioni.
keywords:
  - localizzazioni
  - lista
  - intlayer
  - configurazione
  - availableLocales
  - defaultLocale
  - useLocale
  - hook
  - localizzazione
  - lista
slugs:
  - doc
  - faq
  - lista-localizzazioni-personalizzata
---

# È possibile bloccare un tipo di lingua, come l'inglese? Sto aggiungendo l'inglese nei miei dizionari ma non voglio che l'inglese sia ancora disponibile sul sito web

Sì, puoi bloccare un tipo di lingua, come l'inglese, utilizzando l'opzione `availableLocales` nella configurazione di Intlayer.

```ts
import { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  locales: [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH],
  availableLocales: [Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.FRENCH,
};
```

oppure

```ts
import { IntlayerConfig } from "intlayer";

const locales = [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH];

const config: IntlayerConfig = {
  locales,
  availableLocales: locales.filter((locale) => locale !== Locales.ENGLISH),
  defaultLocale: Locales.FRENCH,
};
```

Questa configurazione modificherà i tipi della tua funzione `t()` per includere solo le localizzazioni disponibili.

L'opzione availableLocales è facoltativa, se non la fornisci, tutte le localizzazioni saranno disponibili.

Fai attenzione, tutte le localizzazioni incluse nell'opzione `availableLocales` devono essere incluse anche nell'opzione `locales`.

Nota che se usi l'hook `useLocale`, l'opzione `availableLocales` sarà utilizzata per impostare l'accesso alla lista delle localizzazioni.

```ts
import { useLocale } from "intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // [Locales.FRENCH, Locales.SPANISH]
```
