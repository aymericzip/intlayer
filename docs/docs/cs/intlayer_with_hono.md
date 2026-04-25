---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: i18n pro Hono - Jak přeložit aplikaci Hono v roce 2026
description: Zjistěte, jak vytvořit multilinguální backend pro Hono. Postupujte podle dokumentace pro internacionalizaci (i18n) a překlad.
keywords:
  - Internacionalizace
  - Dokumentace
  - Intlayer
  - Hono
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "Přidán příkaz init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Iniciace historie"
---

# Přeložte svůj backendový web Hono pomocí Intlayer | Internacionalizace (i18n)

`hono-intlayer` je výkonný middleware pro internacionalizaci (i18n) pro aplikace Hono, navržený tak, aby vaše backendové služby byly globálně dostupné poskytováním lokalizovaných odpovědí na základě preferencí klienta.

### Praktické případy použití

- **Zobrazování backendových chyb v jazyce uživatele**: V případě výskytu chyby zobrazení zpráv v rodném jazyce uživatele zlepšuje porozumění a snižuje frustraci. To je obzvláště užitečné pro dynamické chybové zprávy, které se mohou zobrazovat ve front-endových komponentách, jako jsou toasty nebo modální okna.

- **Získávání vícejazyčného obsahu**: Pro aplikace, které stahují obsah z databáze, internacionalizace zajišťuje, že můžete tento obsah podávat ve více jazycích. To je klíčové pro platformy, jako jsou e-commerce stránky nebo systémy pro správu obsahu, které potřebují zobrazovat popisy produktů, články a další obsah v jazyce preferovaném uživatelem.

- **Odesílání vícejazyčných e-mailů**: Ať už se jedná o transakční e-maily, marketingové kampaně nebo oznámení, odesílání e-mailů v jazyce příjemce může významně zvýšit zapojení a efektivitu.

- **Vícejazyčná oznámení Push**: Pro mobilní aplikace může odesílání push oznámení v preferovaném jazyce uživatele zlepšit interakci a udržení. Tento osobní přístup může způsobit, že oznámení budou působit relevantněji a akčněji.

- **Ostatní komunikace**: Jakákoli forma komunikace z backendu, jako jsou SMS zprávy, systémová varování nebo aktualizace uživatelského rozhraní, těží z toho, že je v jazyce uživatele, což zajišťuje srozumitelnost a celkově lepší uživatelský zážitek.

Backendovou internacionalizací vaše aplikace nejen respektuje kulturní rozdíly, ale také se lépe přizpůsobuje potřebám globálního trhu, což je klíčový krok při rozšiřování vašich služeb po celém světě.

## Začínáme

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-hono-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacionalizovat vaši aplikaci pomocí Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Viz [Šablona aplikace](https://github.com/aymericzip/intlayer-hono-template) na GitHubu.

### Instalace

Chcete-li začít používat `hono-intlayer`, nainstalujte balíček pomocí npm:

```bash packageManager="npm"
npm install intlayer hono-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
bun x intlayer init
```

### Nastavení

Nakonfigurujte nastavení internacionalizace vytvořením souboru `intlayer.config.ts` v rootu vašeho projektu:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Deklarujte svůj obsah

Vytvořte a spravujte své deklarace obsahu pro ukládání překladů:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenu devuelto en español (España)",
      "es-MX": "Ejemplo de contenu devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenu devuelto en español (España)",
      "es-MX": "Ejemplo de contenu devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenu devuelto en español (España)",
        "es-MX": "Ejemplo de contenu devuelto en español (México)"
      }
    }
  }
}
```

> Deklarace vašeho obsahu lze definovat kdekoli ve vaší aplikaci, pokud jsou zahrnuty do adresáře `contentDir` (ve výchozím nastavení `./src`) a odpovídají příponě souboru deklarace obsahu (ve výchozím nastavení `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Další podrobnosti naleznete v [dokumentaci deklarace obsahu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/content_file.md).

### Nastavení aplikace Hono

Nastavte aplikaci Hono tak, aby používala `hono-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// Načtení handleru požadavků pro internacionalizaci
app.use("*", intlayer());

// Cesty
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenu devuelto en español (España)",
      "es-MX": "Ejemplo de contenu devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

### Kompatibilita

`hono-intlayer` je plně kompatibilní s:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/react-intlayer/index.md) pro aplikace React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/next-intlayer/index.md) pro aplikace Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/vite-intlayer/index.md) pro aplikace Vite

Funguje také bezproblémově s jakýmkoli řešením internacionalizace v různých prostředích, včetně prohlížečů a požadavků API. Middleware můžete přizpůsobit tak, aby detekoval lokalitu prostřednictvím hlaviček nebo souborů cookie:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Další možnosti konfigurace
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

Ve výchozím nastavení bude `hono-intlayer` interpretovat hlavičku `Accept-Language` k určení preferovaného jazyka klienta.

> Další informace o konfiguraci a pokročilých tématech naleznete v naší [dokumentaci](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/configuration.md).

### Konfigurace TypeScriptu

`hono-intlayer` využívá robustní možnosti TypeScriptu ke zlepšení procesu internacionalizace. Statické typování TypeScriptu zajišťuje, že každý překladový klíč je zohledněn, čímž se snižuje riziko chybějících překladů a zlepšuje se udržovatelnost.

![Doplňování (Autocompletion)](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Chyba překladu](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Ujistěte se, že automaticky generované typy (ve výchozím nastavení v ./types/intlayer.d.ts) jsou zahrnuty ve vašem souboru tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Vaše stávající konfigurace TypeScriptu
  "include": [
    // ... Vaše stávající konfigurace TypeScriptu
    ".intlayer/**/*.ts", // Zahrnutí automaticky generovaných typů
  ],
}
```

### Rozšíření pro VS Code

Chcete-li zlepšit svůj zážitek z vývoje s Intlayerem, můžete si nainstalovat oficiální **Rozšíření Intlayer pro VS Code**.

[Nainstalovat z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Toto rozšíření poskytuje:

- **Doplňování (Autocompletion)** pro překladové klíče.
- **Detekce chyb v reálném čase** pro chybějící překlady.
- **Inline náhledy** přeloženého obsahu.
- **Rychlé akce** pro snadné vytváření a aktualizaci překladů.

Další podrobnosti o používání rozšíření naleznete v [dokumentaci Rozšíření Intlayer pro VS Code](https://intlayer.org/cs/doc/vs-code-extension).

### Konfigurace Gitu

Doporučuje se ignorovat soubory vygenerované Intlayerem. To vám umožní vyhnout se jejich odesílání do vašeho Git repozitáře.

Chcete-li to provést, můžete do souboru `.gitignore` přidat následující instrukce:

```plaintext fileName=".gitignore"
# Ignorovat soubory vygenerované Intlayerem
.intlayer
```
