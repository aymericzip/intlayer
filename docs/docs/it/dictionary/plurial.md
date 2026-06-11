---
createdAt: 2026-05-04
updatedAt: 2026-05-04
title: Plurale
description: Scopri come dichiarare e utilizzare contenuti plurali basati sulla localizzazione (basati su CLDR) nel tuo sito web multilingue. Segui i passaggi in questa documentazione online per configurare il tuo progetto in pochi minuti.
keywords:
  - Plurale
  - Pluralizzazione
  - CLDR
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - plural
history:
  - version: 8.8.0
    date: 2026-05-04
    changes: "Init history"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Contenuto Plurale / Il plurale in Intlayer

## Come funziona il plurale

In Intlayer, il contenuto plurale viene ottenuto tramite la funzione `plural`, che mappa le categorie plurali CLDR, `zero`, `one`, `two`, `few`, `many`, `other`, al loro contenuto corrispondente. La categoria corretta viene selezionata automaticamente in base alla locale attiva e a un valore di conteggio, utilizzando l'API integrata nella piattaforma [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules).

A differenza di [`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/enumeration.md), che seleziona il contenuto in base a intervalli numerici definiti da te, `plural` delega la selezione alle regole CLDR. Questo è ciò che lo rende scalabile per lingue con regole di pluralizzazione complesse, come il russo, il polacco, l'arabo o il gallese, senza dover scrivere manualmente la logica del modulo.

## Quando usare `plural` vs `enu`

| Caso d'uso                                                                    | Helper   |
| ----------------------------------------------------------------------------- | -------- |
| Forme plurali grammaticali basate sulla locale (una mela / due mele / 5 mele) | `plural` |
| Intervalli numerici personalizzati (`<5`, `>=10`) o bucket non CLDR           | `enu`    |

Se ti rivolgi solo all'inglese o all'italiano (che hanno solo `one` / `other`), entrambi funzionano. Per qualsiasi lingua con distinzioni `few` / `many` / `two`, preferisci `plural`.

## Configurazione del contenuto plurale

Per configurare il contenuto plurale nel tuo progetto Intlayer, crea un modulo di contenuto che utilizzi l'helper `plural`. La categoria `other` è obbligatoria e viene utilizzata come fallback quando una locale non definisce una categoria più specifica.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      it: plural({
        one: "{{count}} posizione aperta",
        other: "{{count}} posizioni aperte",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "total_openings",
  "content": {
    "totalOpenings": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} opening",
            "other": "{{count}} openings"
          }
        },
        "it": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} posizione aperta",
            "other": "{{count}} posizioni aperte"
          }
        }
      }
    }
  }
}
```

> Le categorie supportate sono `zero`, `one`, `two`, `few`, `many`, `other`. Devi solo dichiarare le categorie utilizzate dalla tua lingua di destinazione, Intlayer torna a `other` quando nessuna categoria specifica corrisponde.
>
> Il segnaposto `{{count}}` viene sostituito automaticamente con il conteggio passato in fase di esecuzione. Puoi includere anche altri segnaposto (vedi [Segnaposto personalizzati](#custom-placeholders) sotto).

## Utilizzo del contenuto plurale con React Intlayer

Per utilizzare il contenuto plurale all'interno di un componente React, recuperalo tramite l'hook `useIntlayer` e chiamalo con un conteggio. La locale attiva e il conteggio vengono combinati per scegliere la categoria CLDR corrispondente.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      {/* In inglese:                                   */}
      {/*  count=0  → "0 openings"   (other)           */}
      {/*  count=1  → "1 opening"    (one)             */}
      {/*  count=2  → "2 openings"   (other)           */}
      {/*  count=21 → "21 openings"  (other)           */}
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

Puoi chiamare la funzione restituita in due modi equivalenti:

```tsx
totalOpenings(21); // abbreviato: solo conteggio
totalOpenings({ count: 21 }); // forma esplicita
```

## Segnaposto personalizzati

Le stringhe plurali possono includere segnaposto diversi da `{{count}}`. Passali sotto forma di oggetto insieme a `count`:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      one: "{{name}}, hai {{count}} nuovo messaggio",
      other: "{{name}}, hai {{count}} nuovi messaggi",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice, hai 1 nuovo messaggio"

summary({ count: 7, name: "Alice" });
// → "Alice, hai 7 nuovi messaggi"
```

## Categorie CLDR a colpo d'occhio

Lingue diverse utilizzano diversi sottoinsiemi delle categorie CLDR. Alcuni casi comuni:

| Lingua              | Categorie utilizzate                         |
| ------------------- | -------------------------------------------- |
| Inglese (`en`)      | `one`, `other`                               |
| Francese (`fr`)     | `one`, `many`, `other`                       |
| Russo (`ru`)        | `one`, `few`, `many`, `other`                |
| Polacco (`pl`)      | `one`, `few`, `many`, `other`                |
| Arabo (`ar`)        | `zero`, `one`, `two`, `few`, `many`, `other` |
| Giapponese / Cinese | solo `other`                                 |

Non è necessario memorizzarlo, dichiara le categorie per le quali hai traduzioni e Intlayer tornerà a `other` quando necessario.

## Limitazione

A differenza di altri nodi, il nodo `plural` non può ancora essere nidificato con nodi figli.

Esempio:

Valido:

```ts
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      fr: plural({
        one: "{{count}} offre",
        other: "{{count}} offres",
      }),
    }),
```

Non valido:

```ts
totalOpenings: plural({
  one: t({
    en: "{{count}} opening",
    fr: "{{count}} offre",
  }),
  other: t({
    en: "{{count}} openings",
    fr: "{{count}} offres",
  }),
}),
```

## Risorse aggiuntive

Per informazioni più dettagliate sulla configurazione e l'utilizzo, fare riferimento alle seguenti risorse:

- [Documentazione sull'enumerazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/enumeration.md)
- [Documentazione sull'inserimento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/insertion.md)
- [Documentazione della CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md)
- [Documentazione React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_create_react_app.md)
- [Documentazione Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_15.md)

Queste risorse offrono ulteriori approfondimenti sulla configurazione e l'utilizzo di Intlayer in vari ambienti e framework.
