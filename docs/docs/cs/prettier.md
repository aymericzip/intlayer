---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Prettier x Oxfmt Plugin | Řazení překladů Intlayer
description: "Řaďte locales v t(), kategorie plural(), podmínky enu(), případy select() a klíče svých deklarací obsahu pomocí prettier-plugin-intlayer. Funguje s Prettier i oxfmt."
keywords:
  - Intlayer
  - Prettier
  - oxfmt
  - Formátování
  - Řazení překladů
  - Řazení locales
  - i18n
  - Internacionalizace
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "Výchozí historie"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Přidáno použití s oxfmt"
author: aymericzip
---

# Prettier x Oxfmt Plugin

`prettier-plugin-intlayer` uspořádá klíče vašich překladů v pevném pořadí pokaždé, když Prettier formátuje soubor. Rozdíly (diffs) zůstávají malé, konflikty při slučování (merge conflicts) jsou méně časté a chybějící locale lze snadno odhalit.

```ts
// před
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// po
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Instalace

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

Vyžaduje Prettier verze 3 nebo novější.

Pokud váš projekt již Prettier používá, příkaz `intlayer init prettier` plugin nainstaluje a přidá jej do vaší konfigurace automaticky.

## Použití

Plugin funguje s Prettier i s [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

Přidejte plugin do své konfigurace Prettier:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

Chcete-li jej použít pouze na deklarace obsahu, použijte override:

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

oxfmt nenačítá pluginy Prettier. Nechte Prettier použít plugin pouze na deklarace obsahu a poté nechte oxfmt naformátovat celý projekt:

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

Dodržte toto pořadí. oxfmt přepíše formátování ve vlastním stylu, ale nikdy nemění pořadí klíčů objektů, takže seřazené pořadí zůstane zachováno.

  </Tab>
</Tabs>

## Co se řadí

### `t()`: locales

Připnuté locales jsou uvedeny jako první (ve výchozím nastavení `en`). Ostatní locales následují v abecedním pořadí.

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

### `plural()`: pořadí CLDR

Kategorie jdou od nejmenšího množství po záložní variantu (fallback): `zero`, `one`, `two`, `few`, `many`, `other`.

```ts
plural({
  one: "{{count}} вакансия",
  few: "{{count}} вакансии",
  many: "{{count}} вакансий",
  other: "{{count}} вакансий",
});
```

### `enu()`: vzestupné prahové hodnoty

Podmínky jsou seřazeny podle čísla a poté podle operátoru (`<1`, `<=1`, `1`, `>=1`, `>1`). Hodnota `fallback` se nachází na konci.

```ts
enu({
  "<-1": "Less than minus one car",
  "0": "No cars",
  "2": "Two cars",
  ">=3": "Many cars",
  fallback: "Some cars",
});
```

Za běhu vítězí první odpovídající podmínka. Plugin použije nové pořadí pouze tehdy, když každé množství stále odpovídá stejnému obsahu. Pokud pořadí rozhoduje o výsledku, objekt zůstává beze změny. Například v `{ '<1': …, '<=-2.3': … }` klíč `'<1'` zachytí jakékoli záporné číslo.

### `select()`: abecedně

Případy jsou seřazeny abecedně a `fallback` je umístěn na konci.

```ts
select({
  draft: "This post is a draft",
  published: "This post is live",
  scheduled: "This post is scheduled",
  fallback: "Unknown status",
});
```

Bez klíče `fallback` nebo `other` se jako záložní použije poslední případ. Tento případ zůstává na konci a řadí se pouze případy před ním.

### Soubory `.content.json`

Serializovaná forma je řazena stejným způsobem: `{ "nodeType": "translation", "translation": { … } }`, stejně jako uzly `plural`, `enumeration` a `select`.

### Klíče obsahu (volitelné)

S `intlayerSortContentKeys: true` plugin také řadí klíče `content` slovníku abecedně na každé úrovni vnoření. To platí pouze pro soubory `*.content.*`.

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

Řazení prochází všemi pomocnými funkcemi (`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…), aby dosáhlo k objektům uvnitř. Vnitřní mapa klíčů každého pomocníka zachovává své pořadí. Klíče předávané funkcím `cond()` a `gender()` se nikdy nepřeskupují, protože jejich poslední klíč funguje jako fallback. Pole na stejné úrovni jako `content` (`key`, `title`, `locale`…) zůstávají beze změny.

## Možnosti

| Možnost                   | Výchozí  | Popis                                                                                           |
| ------------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`   | `["en"]` | Locales zachované na začátku v `t()`, v tomto pořadí. Předejte `[]` pro seřazení všech locales. |
| `intlayerSortContentKeys` | `false`  | V souborech `*.content.*` seřadí také klíče obsahu slovníku a vnořené objekty.                  |

## Co zůstává beze změny

- Objekty obsahující spread (`...base`), vypočítaný klíč (`[key]`), metodu nebo duplicitní klíč.
- Mapy `plural()` s klíčem, který není kategorií CLDR.
- Mapy `enu()`, jejichž nové pořadí by změnilo výsledný obsah.
- Volání jakékoli jiné funkce pojmenované podobně jako pomocník, ale s argumentem jiným než objekt.

Komentáře se přesouvají spolu s klíčem, ke kterému patří.

## Podporované parsery

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` a `jsonc`. Bloky `<script>` v souborech Vue, Svelte a Astro jsou formátovány pomocí těchto parserů.

> **Známé omezení.** Prettier spouští pouze jeden plugin na parser. Pokud jiný plugin také nahrazuje parsery JavaScriptu/TypeScriptu (například `prettier-plugin-tailwindcss`), na tyto soubory se použije pouze poslední uvedený. Omezte rozsah `prettier-plugin-intlayer` na soubory `*.content.*` pomocí override, abyste se vyhnuli konfliktům. S oxfmt řadí třídy Tailwind jeho vestavěná volba `sortTailwindcss`, takže tento konflikt nenastává.
