---
createdAt: 2026-08-12
updatedAt: 2026-08-13
title: Plugin ESLint | Pravidla lintování pro Intlayer
description: Odhalujte natvrdo zapsané řetězce, dynamická volání, která kompilátor Intlayer nedokáže optimalizovat, a nepoužitý obsah slovníků pomocí eslint-plugin-intlayer. Funguje s ESLint a oxlint v Reactu, Vue, Svelte, Angularu a Astru.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Linting
  - i18n
  - Internacionalizace
  - no-raw-text
  - Hardcoded řetězce
  - Nepoužité překlady
  - Mrtvý obsah
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "Počáteční historie"
author: aymericzip
---

# Plugin ESLint x OXLint

`eslint-plugin-intlayer` zachycuje typy chyb i18n, které TypeScript nedokáže odhalit:

1. **Natvrdo zapsaný text (hardcoded text)**, který nebyl vložen do slovníku.
2. **Dynamická volání**, která projdou typovou kontrolou a fungují, ale kompilátor Intlayer je nedokáže optimalizovat.
3. **Mrtvý obsah (Dead content)** — slovníky a pole, které v projektu nic nečte (volitelné / opt-in).

Neznámé klíče slovníků, neznámé cesty polí a chybějící lokality jsou již chybami kompilace, takže je plugin neopakuje.

## Instalace

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

Vyžaduje ESLint 9 nebo novější (flat config). ESLint 10 je podporován.

## Použití

Plugin funguje jak v ESLint, tak v [oxlint](https://oxc.rs) — se stejnými pravidly a možnostmi.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Nebo rozbalte konfiguraci a závažnosti si nastavte sami:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  ...intlayer.configs.recommended,
  {
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
      "intlayer/no-unused-content": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

Dvě upozornění: podpora JS pluginů v oxlint je stále ve fázi alfa a oxlint nepodporuje vlastní parsery — proto zde soubory `.vue`, `.svelte`, `.astro` a šablony Angularu nejsou kontrolovány. Spusťte oxlint na souborech JS/TS/JSX a pro zbytek použijte ESLint.

Pravidlo `no-unused-content` je výše záměrně vynecháno: vyžaduje pracovní adresář a cestu ke kontrolovanému souboru z kontextu pravidla, což alfa můstek JS pluginů nezaručuje. Spusťte jej pod ESLintem.

  </Tab>
</Tabs>

### Konfigurace (Configs)

| Konfigurace     | `no-raw-text`               | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | --------------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                        | error                   | error                     | off                      | off                 |
| `strict`        | error (+ literály mimo JSX) | error                   | error                     | error                    | off                 |
| `contract-only` | off                         | error                   | error                     | off                      | off                 |

Předvolba `recommended` záměrně ponechává `no-raw-text` na úrovni `warn`: její spuštění nad existující kódovou bází zobrazí všechny nepřeložené řetězce najednou, což by nemělo rozbít váš build hned první den.

`enforce-adapter-import` je ve výchozím nastavení vypnuto — pokud jej chcete, explicitně jej zapněte.

`no-unused-content` je vypnuto ve všech konfiguracích včetně `strict`. Je to jediné pravidlo, které čte vaši konfiguraci Intlayer a prochází zdrojové soubory z disku, takže jeho zapnutí by mělo být záměrnou volbou, nikoli automatickou předvolbou.

## Pravidla

### `no-raw-text`

Hlásí text určený pro uživatele, který není deklarován ve slovníku. Používá stejnou detekci jako `intlayer extract`, takže názvy značek, třídy CSS a technické identifikátory jsou ignorovány.

```jsx
// ✗ Nahlášeno
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ V pořádku
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Soubory deklarace obsahu (`*.content.ts`, …) jsou přeskočeny.

Chcete-li opravit celý soubor najednou, spusťte `npx intlayer extract` a nechte kompilátor přesunout řetězce do slovníku za vás.

**Možnosti**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Atributy, jejichž hodnotou je text pro uživatele.
      // Výchozí: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Elementy, jejichž obsah nikdy není textem pro uživatele.
      // Výchozí: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Regulární výrazy pro text, který se nemá nikdy hlásit.
      ignorePatterns: ["^Powered by"],

      // Hlásit také řetězcové literály mimo značky. Výchozí: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Vyžaduje, aby klíč slovníku byl řetězcový literál.

Kompilátor může přednačíst slovník pouze tehdy, když dokáže přečíst klíč přímo v místě volání. Při použití vypočteného klíče optimalizaci tiše přeskočí a místo toho přibalí každý slovník.

```typescript
// ✗ Nahlášeno
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Proměnná stále není literál
const key = "home";
useIntlayer(key);

// ✓ V pořádku
useIntlayer("home");
getTranslations({ namespace: "home" });
```

To platí pro `useIntlayer`, `getIntlayer` a všechny kompatibilní adaptéry (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Vyžaduje, aby pole, které čtete ze slovníku, bylo staticky známé.

Kompilátor odstraňuje pole, u kterých nevidí využití. Dynamický přístup je pro něj neviditelný, takže čtení může za běhu vrátit `undefined`.

```typescript
// ✗ Nahlášeno
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ V pořádku
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Dává přednost kompatibilnímu adaptéru `@intlayer/*` před původním balíčkem. Původní balíček se na Intlayer překládá pouze při nakonfigurovaném aliasu bundleru; adaptér funguje vždy. Automaticky opravitelné pomocí `--fix`.

```typescript
// ✗ Nahlášeno
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ V pořádku
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**Ve výchozím nastavení vypnuto.** Hlásí obsah, který v projektu nic nečte, a navíc klíče slovníků deklarované na více než jednom místě.

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ Nahlášeno, pokud žádný volající v projektu nežádá "home"
  content: {
    title: t({ cs: "Název", en: "Title" }),

    // ✗ Nahlášeno, pokud nic nečte `hero`
    hero: {
      subtitle: t({ cs: "Podnázev", en: "Subtitle" }),
    },
  },
};
```

Na rozdíl od jiných pravidel toto pravidlo nemůže rozhodnout pouze na základě otevřeného souboru — pole je nepoužité pouze ve vztahu k celému projektu. Při první deklaraci obsahu v běhu lintu načte vaši konfiguraci Intlayer, prohledá zdrojové soubory podle konfigurace (`build.traversePattern`, `compiler.transformPattern`) a spustí stejný analyzátor využití, který pohání `@intlayer/lsp` a přeškrtnutí „nepoužitého“ v rozšíření VS Code. Výsledek se ukládá do mezipaměti na `cacheTtl` milisekund, takže skenování proběhne jednou za běh a nikoli pro každý soubor.

**Možnosti**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // Hlásit klíče slovníků, na které nic neodkazuje. Výchozí: true
      reportUnusedDictionaries: true,

      // Hlásit pole obsahu, která nic nečte. Výchozí: true
      reportUnusedFields: true,

      // Hlásit duplicitní klíče deklarované na více místech. Výchozí: true
      reportDuplicateKeys: true,

      // Regulární výrazy pro cesty polí, které se nemají nikdy hlásit.
      ignoreFields: ["^meta"],

      // Kořen projektu, od kterého skenování začíná. Výchozí: pracovní adresář ESLint
      baseDir: process.cwd(),

      // Doba opětovného použití skenu projektu (v ms). Výchozí: 30000
      cacheTtl: 30000,
    },
  ],
}
```

Snižte `cacheTtl`, pokud lintujete z dlouhotrvajícího serveru editoru a chcete, aby se úpravy projevily dříve; nastavte `baseDir`, když jeden běh lintu zahrnuje několik projektů Intlayer v monorepu.

> **Přiklání se k tichu.** Falešně pozitivní výsledek by zde smazal překlad, proto se nic nehlásí, pokud je slovník konzumován způsobem, který analýza nedokáže sledovat: objekt obsahu předaný jako celek, překladatelská funkce vázaná z něj (`const t = useTranslations("home")`), deklarace dosažená přímým importem (`useDictionary(myDictionary)`), volání `nest()` z jiného slovníku nebo seznam polí neúplný kvůli operátoru spread. Jednosouborové komponenty (`.vue`, `.svelte`, `.astro`) se počítají jako využívající každé pole zmíněných slovníků, protože jejich bloky skriptů se zde neparsují.

`reportDuplicateKeys` čte nesloučené slovníky, které build zapisuje do `.intlayer/`, takže zůstává neaktivní, dokud projekt nebyl alespoň jednou sestaven. Dvě deklarace sdílející klíč se sloučí, což je legitimní vzor — hlášení existuje proto, že pole definované na obou stranách tiše zachová pouze jednu ze dvou hodnot.

Analyzátor se načítá z `@intlayer/lsp`, který je distribuován jako ESM. Pravidlo proto vyžaduje verzi Node schopnou provést `require()` modulu ES — Node 20.19+ nebo 22.12+. Na starších verzích raději nehlásí nic, než aby způsobilo selhání lintu.

## Frameworky

Každé pravidlo funguje ve všech integracích Intlayer, včetně šablon Vue, Svelte a Angularu. Stačí pouze určit ESLintu, který parser má číst daný typ souboru.

| Framework                 | Soubory           | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Šablony Angularu          | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

Nainstalujte pouze ty parsery, které váš projekt vyžaduje.

> **Známé omezení.** V šablonách Vue a Angularu výraz jako `{{ content[key] }}` není kontrolován pravidlem `no-dynamic-field-access`. Dynamická čtení zapsaná ve skriptovém bloku jsou zachycena normálně.
