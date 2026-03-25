---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Fastify i18n - Jak přeložit aplikaci Fastify v roce 2026
description: Objevte, jak učinit váš backend ve Fastify vícejazyčným. Postupujte podle dokumentace pro internacionalizaci (i18n) a překlad.
keywords:
  - Internacionalizace
  - Dokumentace
  - Intlayer
  - Fastify
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: "Přidán příkaz init"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Inicializována historie"
---

# Přeložte svůj backendový web ve Fastify pomocí Intlayer | Internacionalizace (i18n)

`fastify-intlayer` je výkonný plugin pro internacionalizaci (i18n) pro aplikace Fastify, navržený tak, aby zpřístupnil vaše backendové služby globálně poskytováním lokalizovaných odpovědí na základě preferencí klienta.

> Podívejte se na implementaci balíčku na GitHubu: https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer

### Praktické případy použití

- **Zobrazení chyb backendu v jazyce uživatele**: Když dojde k chybě, zobrazení zpráv v rodném jazyce uživatele zlepšuje porozumění a snižuje frustraci. To je užitečné zejména pro dynamické chybové zprávy, které se mohou zobrazovat v komponentách front-endu, jako jsou toasty nebo modální okna.
- **Načítání vícejazyčného obsahu**: U aplikací, které načítají obsah z databáze, internacionalizace zajišťuje, že můžete tento obsah podávat ve více jazycích. To je klíčové pro platformy, jako jsou e-shopy nebo systémy pro správu obsahu, které potřebují zobrazovat popisy produktů, články a další obsah v preferovaném jazyce uživatele.
- **Odesílání vícejazyčných e-mailů**: Ať už jde o transakční e-maily, marketingové kampaně nebo oznámení, odesílání e-mailů v jazyce příjemce může výrazně zvýšit zapojení a efektivitu.
- **Vícejazyčná push oznámení**: U mobilních aplikací může odesílání push oznámení v preferovaném jazyce uživatele zlepšit interakci a retenci. Tento osobní dotek může způsobit, že oznámení budou působit relevantněji a akčněji.
- **Další komunikace**: Jakákoli forma komunikace z backendu, jako jsou SMS zprávy, systémová upozornění nebo aktualizace uživatelského rozhraní, těží z toho, že je v jazyce uživatele, což zajišťuje srozumitelnost a zlepšuje celkový uživatelský dojem.

Internacionalizací backendu vaše aplikace nejen respektuje kulturní rozdíly, ale také se lépe přizpůsobuje potřebám globálního trhu, což je klíčový krok pro celosvětové škálování vašich služeb.

## Začínáme

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-fastify-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacionalizovat vaši aplikaci pomocí Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Podívejte se na [šablonu aplikace](https://github.com/aymericzip/intlayer-fastify-template) na GitHubu.

### Instalace

Chcete-li začít používat `fastify-intlayer`, nainstalujte balíček pomocí npm:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init

```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init

```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init

```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
bun x intlayer init

```

### Nastavení

Nakonfigurujte nastavení internacionalizace vytvořením souboru `intlayer.config.ts` v kořenovém adresáři projektu:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

### Deklarujte svůj obsah

Vytvářejte a spravujte své deklarace obsahu pro ukládání překladů:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de obsah devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de obsah devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de obsah devuelto en español (España)",
      "es-MX": "Ejemplo de obsah devuelto en español (México)",
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
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de obsah devuelto en español (México)"
      }
    }
  }
}
```

> Deklarace obsahu lze definovat kdekoli ve vaší aplikaci, pokud jsou zahrnuty v adresáři `contentDir` (ve výchozím nastavení `./src`). A musí odpovídat příponě souboru deklarace obsahu (ve výchozím nastavení `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Další podrobnosti naleznete v [dokumentaci k deklaraci obsahu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/content_file.md).

### Nastavení aplikace Fastify

Nastavte svou aplikaci Fastify tak, aby používala `fastify-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Načíst plugin pro internacionalizaci
await fastify.register(intlayer);

// Cesty
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de obsah devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Spustit server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Načíst plugin pro internacionalizaci
await fastify.register(intlayer);

// Cesty
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de obsah renvoyé en français",
    "es-ES": "Ejemplo de obsah devuelto en español (España)",
    "es-MX": "Ejemplo de obsah devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Spustit server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// Wrapper pro spuštění serveru pro async/await
const start = async () => {
  try {
    // Načíst plugin pro internacionalizaci
    await fastify.register(intlayer);

    // Cesty
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        en: "Example of returned content in English",
        fr: "Exemple de obsah renvoyé en français",
        "es-ES": "Ejemplo de obsah devuelto en español (España)",
        "es-MX": "Ejemplo de obsah devuelto en español (México)",
      });
    });

    fastify.get("/getIntlayer_example", async (_req, reply) => {
      return getIntlayer("index").exampleOfContent;
    });

    fastify.get("/getDictionary_example", async (_req, reply) => {
      return getDictionary(dictionaryExample).exampleOfContent;
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Kompatibilita

`fastify-intlayer` je plně kompatibilní s:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/react-intlayer/index.md) pro React aplikace
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/next-intlayer/index.md) pro Next.js aplikace
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/vite-intlayer/index.md) pro Vite aplikace

Bezproblémově funguje také s jakýmkoli řešením internacionalizace v různých prostředích, včetně prohlížečů a požadavků API. Middleware můžete přizpůsobit tak, aby detekoval lokalizaci prostřednictvím hlaviček nebo souborů cookie:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Další možnosti konfigurace
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Další možnosti konfigurace
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

Ve výchozím nastavení bude `fastify-intlayer` interpretovat hlavičku `Accept-Language` k určení preferovaného jazyka klienta.

> Další informace o konfiguraci a pokročilých tématech naleznete v naší [dokumentaci](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/configuration.md).

### Konfigurace TypeScriptu

`fastify-intlayer` využívá robustní funkce TypeScriptu ke zlepšení procesu internacionalizace. Statické typování TypeScriptu zajišťuje, že každý překladový klíč je zohledněn, což snižuje riziko chybějících překladů a zlepšuje udržovatelnost.

Ujistěte se, že automaticky generované typy (ve výchozím nastavení v ./types/intlayer.d.ts) jsou zahrnuty ve vašem souboru tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Vaše stávající konfigurace TypeScriptu
  "include": [
    // ... Vaše stávající konfigurace TypeScriptu
    ".intlayer/**/*.ts", // Zahrnout automaticky generované typy
  ],
}
```

### Rozšíření pro VS Code

Chcete-li zlepšit svůj zážitek z vývoje s Intlayer, můžete si nainstalovat oficiální **Intlayer VS Code Extension**.

[Instalovat z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Toto rozšíření poskytuje:

- **Automatické doplňování** pro překladové klíče.
- **Detekci chyb v reálném čase** pro chybějící překlady.
- **Inline náhledy** přeloženého obsahu.
- **Rychlé akce** pro snadné vytváření a aktualizaci překladů.

Další podrobnosti o používání rozšíření naleznete v [dokumentaci k rozšíření Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Konfigurace Gitu

Doporučuje se ignorovat soubory generované Intlayerem. To vám umožní vyhnout se jejich verzování v Gitu.

Chcete-li tak učinit, můžete do souboru `.gitignore` přidat následující pokyny:

```plaintext fileName=".gitignore"
# Ignorovat soubory generované Intlayerem
.intlayer

```
