---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Plugin Prettier x Oxfmt | Ordinare le traduzioni di Intlayer
description: "Ordina le chiavi di localizzazione di t(), le categorie di plural(), le condizioni di enu(), i casi di select() e le chiavi delle tue dichiarazioni di contenuto con prettier-plugin-intlayer. Funziona con Prettier e oxfmt."
keywords:
  - Intlayer
  - Prettier
  - oxfmt
  - Formattazione
  - Ordinare traduzioni
  - Ordinare lingue
  - i18n
  - Internazionalizzazione
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "Cronologia iniziale"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Aggiunto l'uso con oxfmt"
author: aymericzip
---

# Plugin Prettier x Oxfmt

`prettier-plugin-intlayer` organizza le chiavi delle tue traduzioni in un ordine fisso ogni volta che Prettier formatta un file. I diff restano ridotti, i conflitti di merge diventano più rari e individuare una lingua mancante diventa immediato.

```ts
// prima
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// dopo
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Installazione

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

Richiede Prettier 3 o versioni successive.

Se il tuo progetto utilizza già Prettier, `intlayer init prettier` installa il plugin e lo aggiunge automaticamente alla tua configurazione.

## Utilizzo

Il plugin funziona con Prettier e con [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

Aggiungi il plugin alla tua configurazione di Prettier:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

Per applicarlo unicamente alle dichiarazioni di contenuto, usa un override:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt non carica i plugin di Prettier. Lascia che Prettier applichi il plugin solo alle tue dichiarazioni di contenuto, poi lascia che oxfmt formatti l'intero progetto:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"]
      }
    }
  ]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" && oxfmt"
  }
}
```

Mantieni questo ordine. oxfmt riscrive la formattazione nel proprio stile ma non riordina mai le chiavi degli oggetti, quindi l'ordinamento resta.

  </Tab>
</Tabs>

## Cosa viene ordinato

### `t()`: lingue (locales)

Le lingue fissate compaiono per prime (`en` per impostazione predefinita). Le altre lingue seguono in ordine alfabetico.

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()`: ordine CLDR

Le categorie vanno dalla quantità più piccola fino al fallback: `zero`, `one`, `two`, `few`, `many`, `other`.

```ts
plural({
  one: "{{count}} вакансия",
  few: "{{count}} вакансии",
  many: "{{count}} вакансий",
  other: "{{count}} вакансий",
});
```

### `enu()`: soglie crescenti

Le condizioni sono ordinate in base al valore numerico e successivamente per operatore (`<1`, `<=1`, `1`, `>=1`, `>1`). `fallback` va posizionato per ultimo.

```ts
enu({
  "<-1": "Meno di meno un'auto",
  "0": "Nessuna auto",
  "2": "Due auto",
  ">=3": "Molte auto",
  fallback: "Alcune auto",
});
```

Durante l'esecuzione prevale la prima condizione corrispondente. Il plugin applica il nuovo ordine solo quando ogni quantità restituisce comunque lo stesso contenuto. Nel caso in cui l'ordine determini il risultato, l'oggetto non viene modificato. Ad esempio, in `{ '<1': …, '<=-2.3': … }` la chiave `'<1'` intercetta qualsiasi numero negativo.

### `select()`: alfabetico

I casi sono ordinati alfabeticamente e `fallback` viene posto per ultimo.

```ts
select({
  draft: "Questo post è una bozza",
  published: "Questo post è pubblicato",
  scheduled: "Questo post è programmato",
  fallback: "Stato sconosciuto",
});
```

Senza una chiave `fallback` o `other`, l'ultimo caso funge da fallback. Tale caso rimane in fondo e vengono ordinati unicamente i casi precedenti.

### File `.content.json`

La forma serializzata viene ordinata allo stesso modo: `{ "nodeType": "translation", "translation": { … } }`, così come i nodi `plural`, `enumeration` e `select`.

### Chiavi di contenuto (opzionale)

Con `intlayerSortContentKeys: true`, il plugin ordina inoltre alfabeticamente le chiavi di `content` del dizionario a ogni livello di annidamento. Questa opzione ha effetto solo sui file `*.content.*`.

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

L'ordinamento continua all'interno di ciascun helper (`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…) per raggiungere gli oggetti in essi contenuti. La struttura interna di ciascun helper mantiene il proprio ordinamento. Le chiavi passate a `cond()` e `gender()` non vengono mai riordinate poiché l'ultima chiave funge da fallback. I campi adiacenti a `content` (`key`, `title`, `locale`…) rimangono inalterati.

## Opzioni

| Opzione                   | Predefinito | Descrizione                                                                                        |
| ------------------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`   | `["en"]`    | Lingue mantenute in testa in `t()`, in questo ordine. Passa `[]` per ordinare ogni lingua.         |
| `intlayerSortContentKeys` | `false`     | Nei file `*.content.*`, ordina anche le chiavi di contenuto del dizionario e gli oggetti annidati. |

## Cosa rimane invariato

- Oggetti contenenti spread (`...base`), chiavi calcolate (`[key]`), metodi o chiavi duplicate.
- Mappe `plural()` aventi una chiave che non corrisponde a una categoria CLDR.
- Mappe `enu()` il cui nuovo ordine modificherebbe il contenuto risolto.
- Chiamate ad altre funzioni con nome analogo a un helper a cui viene passato un argomento diverso da un oggetto.

I commenti si spostano insieme alla chiave a cui appartengono.

## Parser supportati

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` e `jsonc`. I blocchi `<script>` dei file Vue, Svelte e Astro vengono formattati con questi parser.

> **Limitazione nota.** Prettier esegue un solo plugin per parser. Se un altro plugin sostituisce a sua volta i parser JavaScript/TypeScript (ad esempio `prettier-plugin-tailwindcss`), solo l'ultimo dell'elenco verrà applicato a tali file. Limita l'ambito di `prettier-plugin-intlayer` ai file `*.content.*` tramite un override per prevenire conflitti. Con oxfmt, le classi Tailwind sono ordinate dalla sua opzione integrata `sortTailwindcss`, quindi questo conflitto non si presenta.
