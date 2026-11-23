---
createdAt: 2026-11-03
updatedAt: 2026-11-22
priority: 6
title: Plugin Prettier x Oxfmt | Ordinare le traduzioni Intlayer e correggere .value
description: "Ordina i locale di t(), plural(), enu() e select() nelle tue dichiarazioni di contenuto e aggiungi .value dove il contenuto è usato come stringa, per mantenere i tipi con l'editor visuale. Funziona con Prettier e oxfmt."
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
  - Editor visuale
  - IntlayerNode
slugs:
  - doc
  - prettier
history:
  - version: 9.8.5
    date: 2026-11-22
    changes: "Aggiunta la riscrittura .value per il contenuto usato come stringa"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Cronologia iniziale"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Aggiunto l'uso con oxfmt"
author: aymericzip
---

# Plugin Prettier x Oxfmt

`prettier-plugin-intlayer` fa due cose ogni volta che Prettier formatta un file:

1. **Ordina le tue traduzioni** in un ordine fisso. I diff restano piccoli, i conflitti di merge diventano più rari e un locale mancante si individua subito.
2. **Aggiunge `.value`** dove il contenuto è usato come stringa, così i tuoi tipi restano validi quando l'editor visuale è attivo.

```ts
// prima
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// dopo
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Installazione

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

```bash packageManager="npm"
npm install --save-dev prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier-plugin-intlayer
```

Richiede Prettier 3 o versioni successive.

Se il tuo progetto utilizza già Prettier, `intlayer init prettier` installa il plugin e lo aggiunge automaticamente alla tua configurazione.

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt non può caricare plugin di terze parti, quindi l'ordinamento passa da Prettier. Installa Prettier accanto a oxfmt. Serve solo a ordinare le tue dichiarazioni di contenuto, oxfmt continua a formattare il progetto.

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

Richiede Prettier 3 o versioni successive. `intlayer init` configura il plugin solo nei progetti che usano già Prettier, quindi configuralo a mano come mostrato qui sotto.

  </Tab>
</Tabs>

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

Per ordinare solo le dichiarazioni di contenuto, usa un override. La riscrittura `.value` non viene più applicata ai tuoi componenti:

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

Lo script di formattazione esegue due strumenti, ognuno con un solo compito:

1. **Prettier** esegue il plugin. Il primo glob ordina le tue dichiarazioni di contenuto, il secondo aggiunge `.value` nei tuoi componenti. Rimuovi il secondo glob se vuoi solo ordinare.
2. **oxfmt** formatta l'intero progetto, dichiarazioni di contenuto comprese.

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" \"src/**/*.{ts,tsx,js,jsx}\" && oxfmt"
  }
}
```

Mantieni questo ordine. oxfmt sostituisce la formattazione scritta da Prettier con la propria, ma non riordina mai le chiavi degli oggetti, quindi l'ordine viene mantenuto.

Questa configurazione ha alcuni limiti:

- **Formattazione al salvataggio.** Un editor che formatta con oxfmt non esegue il plugin. Esegui invece lo script `format`.
- **Modalità check.** Non usare `prettier --check` sui file formattati da oxfmt: la formattazione è diversa, quindi segnala ogni file. Per verificare l'ordine in CI, esegui lo script `format` e fai fallire il job se ci sono modifiche:

```bash
npm run format && git diff --exit-code
```

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
  zero: "No jobs",
  one: "{{count}} job",
  other: "{{count}} jobs",
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

### Traduzioni identiche

Nei file `*.content.*`, un `t()` le cui locale contengono tutte la stessa stringa viene sostituito da quella stringa. Una stringa semplice viene servita a ogni locale, quindi il risultato non cambia.

```ts
// prima
nextjs: t({ en: "Next.js", fr: "Next.js", es: "Next.js" }),

// dopo
nextjs: "Next.js",
```

Un `t()` con una sola locale, un argomento di tipo (`t<string>()`), un commento o valori non stringa viene mantenuto. Imposta `intlayerCollapseIdenticalTranslations: false` per disattivarlo.

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

## Contenuto usato come stringa

Con l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) attivo (`editor.enabled: true`), un campo restituito da `useIntlayer` o `getIntlayer` è un nodo renderizzabile, non una stringa. Passarlo a un attributo di un elemento nativo o chiamarci sopra un metodo di stringa non supera più il type-check. Template literal, concatenazione e `String()` accettano qualsiasi tipo e restano invariati. Il plugin aggiunge `.value`, che contiene la stringa con o senza editor.

```tsx
// prima
const content = useIntlayer("home");
const upper = content.name.toUpperCase();
<img alt={content.alt} />;
<h1>{content.title.value}</h1>;

// dopo
const upper = content.name.value.toUpperCase();
<img alt={content.alt.value} />;
<h1>{content.title}</h1>;
```

Riscritti:

- metodi di stringa: `content.name.toUpperCase()`
- attributi degli elementi nativi: `<img alt={content.alt} />`

Lasciati invariati, perché accettano un nodo:

- figli JSX: `<h1>{content.title}</h1>`
- props dei componenti: `<Card title={content.title} />`
- tagged template: `` html`<h1>${content.title}</h1>` `` (Lit)

Questo riguarda i componenti, non le dichiarazioni di contenuto, quindi il plugin deve essere eseguito sui file dei componenti. Una variabile il cui nome è dichiarato di nuovo altrove nel file viene ignorata. I template Vue e Svelte non vengono riscritti: usa per loro la [regola ESLint `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/eslint.md), che ha anche un autofix.

Rimuove anche `.value` da un figlio JSX: `<h1>{content.title.value}</h1>` diventa `<h1>{content.title}</h1>`, così l'editor visuale può selezionare il testo. Si applica a React, Next.js, Preact, Solid e React Native.

Disattivala con `intlayerNodeValueAccess: false`.

## Opzioni

| Opzione                                 | Predefinito | Descrizione                                                                                                       |
| --------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`                 | `["en"]`    | Lingue mantenute in testa in `t()`, in questo ordine. Passa `[]` per ordinare ogni lingua.                        |
| `intlayerSortContentKeys`               | `false`     | Nei file `*.content.*`, ordina anche le chiavi di contenuto del dizionario e gli oggetti annidati.                |
| `intlayerCollapseIdenticalTranslations` | `true`      | Nei file `*.content.*`, sostituisce un `t()` le cui locale contengono tutte la stessa stringa con quella stringa. |
| `intlayerNodeValueAccess`               | `true`      | Aggiunge `.value` dove il contenuto è usato come stringa (`alt={content.alt}`, `content.name.toUpperCase()`).     |

## Cosa rimane invariato

- Oggetti contenenti spread (`...base`), chiavi calcolate (`[key]`), metodi o chiavi duplicate.
- Mappe `plural()` aventi una chiave che non corrisponde a una categoria CLDR.
- Mappe `enu()` il cui nuovo ordine modificherebbe il contenuto risolto.
- Chiamate ad altre funzioni con nome analogo a un helper a cui viene passato un argomento diverso da un oggetto.

I commenti si spostano insieme alla chiave a cui appartengono.

## Parser supportati

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` e `jsonc`. I blocchi `<script>` dei file Vue, Svelte e Astro vengono formattati con questi parser.

> **Limitazione nota.** Prettier esegue un solo plugin per parser. Se un altro plugin sostituisce a sua volta i parser JavaScript/TypeScript (ad esempio `prettier-plugin-tailwindcss`), solo l'ultimo dell'elenco verrà applicato a tali file. Limita l'ambito di `prettier-plugin-intlayer` ai file `*.content.*` tramite un override per prevenire conflitti. Con oxfmt, le classi Tailwind sono ordinate dalla sua opzione integrata `sortTailwindcss`, quindi questo conflitto non si presenta. In questo caso, affidati alla [regola ESLint `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/eslint.md) per `.value` nei componenti.
