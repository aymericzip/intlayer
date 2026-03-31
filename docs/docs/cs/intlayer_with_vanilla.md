---
createdAt: 2026-03-31
updatedAt: 2026-03-31
title: Vanilla JS i18n - Jak přeložit aplikaci Vanilla JS v roce 2026
description: Objevte, jak učinit svůj web Vanilla JS vícejazyčným. Postupujte podle dokumentace pro internacionalizaci (i18n) a překlad.
keywords:
  - Internacionalizace
  - Dokumentace
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
history:
  - version: 8.4.10
    date: 2026-03-31
    changes: "Inicializace historie"
---

# Přeložte svůj web Vanilla JS pomocí Intlayer | Internacionalizace (i18n)

## Obsah

<TOC/>

## Co je Intlayer?

**Intlayer** je inovativní open-source knihovna pro internacionalizaci (i18n) navržená pro zjednodušení vícejazyčné podpory v moderních webových aplikacích.

S Intlayer můžete:

- **Snadno spravovat překlady** pomocí deklarativních slovníků na úrovni komponent.
- **Dynamicky lokalizovat metadata**, trasy a obsah.
- **Zajistit podporu TypeScriptu** s autogenerovanými typy, což zlepšuje automatické doplňování a detekci chyb.
- **Využívat pokročilé funkce**, jako je dynamická detekce a přepínání jazyků.

Tato příručka ukazuje, jak používat Intlayer v aplikaci Vanilla JavaScript **bez použití správce balíčků nebo bundleru** (jako je Vite, Webpack atd.).

Pokud vaše aplikace používá bundler (například Vite), doporučujeme místo toho postupovat podle [Příručky Vite + Vanilla JS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_vite+vanilla.md).

Pomocí samostatného balíčku (standalone bundle) můžete Intlayer importovat přímo do svých souborů HTML prostřednictvím jediného souboru JavaScript, což je ideální pro starší projekty nebo jednoduché statické stránky.

---

## Průvodce krok za krokem nastavením Intlayeru v aplikaci Vanilla JS

### Krok 1: Instalace závislostí

Nainstalujte potřebné balíčky pomocí npm:

```bash packageManager="npm"
# Vygenerujte samostatný balíček intlayer a vanilla-intlayer
# Tento soubor bude importován do vašeho souboru HTML
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inicializujte intlayer s konfiguračním souborem
npx intlayer init --no-gitignore

# Sestavte slovníky
npx intlayer build
```

```bash packageManager="pnpm"
# Vygenerujte samostatný balíček intlayer a vanilla-intlayer
# Tento soubor bude importován do vašeho souboru HTML
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inicializujte intlayer s konfiguračním souborem
pnpm intlayer init --no-gitignore

# Sestavte slovníky
pnpm intlayer build
```

```bash packageManager="yarn"
# Vygenerujte samostatný balíček intlayer a vanilla-intlayer
# Tento soubor bude importován do vašeho souboru HTML
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inicializujte konfigurační soubor intlayer, TypeScript pokud je nastaven, proměnné prostředí
yarn intlayer init --no-gitignore

# Sestavte slovníky
yarn intlayer build
```

```bash packageManager="bun"
# Vygenerujte samostatný balíček intlayer a vanilla-intlayer
# Tento soubor bude importován do vašeho souboru HTML
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inicializujte intlayer s konfiguračním souborem
bun x intlayer init --no-gitignore

# Sestavte slovníky
bun x intlayer build
```

- **intlayer**
  Základní balíček, který poskytuje nástroje pro internacionalizaci pro správu konfigurace, překlad, [deklaraci obsahu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/content_file.md), transpilaci a [příkazy CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/index.md).

- **vanilla-intlayer**
  Balíček, který integruje Intlayer s čistými aplikacemi JavaScript / TypeScript. Poskytuje pub/sub singleton (`IntlayerClient`) a pomocné funkce založené na callbacku (`useIntlayer`, `useLocale` atd.), takže jakákoli část vaší aplikace může reagovat na změny jazyka bez závislosti na UI frameworku.

> Export bundlingu z CLI `intlayer standalone` vytváří optimalizované sestavení prostřednictvím tree-shakingu pro nepoužité balíčky, lokality a nepodstatnou logiku (jako jsou přesměrování nebo předpony) specifickou pro vaši konfiguraci.

### Krok 2: Konfigurace vašeho projektu

Vytvořte konfigurační soubor pro nastavení jazyků vaší aplikace:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vaše další jazyky
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
      Locales.SPANISH,
      // Vaše další jazyky
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
      Locales.SPANISH,
      // Vaše další jazyky
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Prostřednictvím tohoto konfiguračního souboru můžete nastavit lokalizované adresy URL, přesměrování middleware, názvy souborů cookie, umístění a rozšíření vašich deklarací obsahu, zakázat protokoly Intlayer v konzole a další. Kompletní seznam dostupných parametrů naleznete v [dokumentaci ke konfiguraci](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/configuration.md).

### Krok 3: Import balíčku do HTML

Jakmile vygenerujete balíček `intlayer.js`, můžete jej importovat do svého souboru HTML:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="cs">
  <head>
    <meta charset="UTF-8" />

    <!-- Import balíčku -->
    <script src="./intlayer.js" defer></script>
    <!-- Import vašeho hlavního skriptu -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

Balíček vystavuje `Intlayer` a `VanillaIntlayer` jako globální objekty na `window`.

### Krok 4: Inicializace Intlayeru ve vstupním bodě

Ve svém `src/main.js` zavolejte `installIntlayer()` **před** vykreslením jakéhokoli obsahu, aby byl globální jazykový singleton připraven.

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// Musí být voláno před vykreslením jakéhokoli i18n obsahu.
installIntlayer();
```

Pokud chcete také použít renderer markdownu, zavolejte `installIntlayerMarkdown()`:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

### Krok 5: Deklarujte svůj obsah

Vytvářejte a spravujte své deklarace obsahu pro ukládání překladů:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Více se dozvíte po kliknutí na logo Vite",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { insert, t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Více se dozvíte po kliknutí na logo Vite",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { insert, t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Více se dozvíte po kliknutí na logo Vite",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> Deklarace obsahu mohou být definovány kdekoli ve vaší aplikaci, pokud jsou zahrnuty v adresáři `contentDir` (ve výchozím nastavení `./src`). A odpovídají příponě souboru s deklarací obsahu (ve výchozím nastavení `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> Další podrobnosti naleznete v [dokumentaci k deklaraci obsahu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/content_file.md).

### Krok 6: Použití Intlayeru ve vašem JavaScriptu

Objekt `window.VanillaIntlayer` poskytuje pomocné funkce API: `useIntlayer(key, locale?)` vrací přeložený obsah pro daný klíč.

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// Získání počátečního obsahu pro aktuální jazyk.
// Zřetězte .onChange() pro upozornění při každé změně jazyka.
const content = useIntlayer("app").onChange((newContent) => {
  // Překreslete nebo opravte pouze dotčené uzly DOM
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// Počáteční vykreslení
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> Přistupujte k hodnotám listů jako k řetězcům tak, že je zabalíte do `String()`, což zavolá metodu `toString()` uzlu a vrátí přeložený text.
>
> Pokud potřebujete hodnotu pro nativní atribut HTML (např. `alt`, `aria-label`), použijte přímo `.value`:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

### (Volitelné) Krok 7: Změna jazyka vašeho obsahu

Chcete-li změnit jazyk svého obsahu, použijte funkci `setLocale` vystavenou funkcí `useLocale`.

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Jazyk");

  const render = (currentLocale) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value));

  // Udržujte rozbalovací nabídku synchronizovanou, když se jazyk změní odjinud
  return subscribe((newLocale) => render(newLocale));
}
```

### (Volitelné) Krok 8: Přepínání atributů jazyka a směru HTML

Aktualizujte atributy `lang` a `dir` tagu `<html>`, aby odpovídaly aktuálnímu národnímu prostředí pro usnadnění přístupu a SEO.

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

### (Volitelné) Krok 9: Líné načítání slovníků podle jazyka

Pokud chcete líně načítat slovníky podle jazyka, můžete použít `useDictionaryDynamic`. To je užitečné, pokud nechcete sbalit všechny překlady do počátečního souboru `intlayer.js`.

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> Poznámka: `useDictionaryDynamic` vyžaduje, aby slovníky byly dostupné jako samostatné soubory ESM. Tento přístup se obvykle používá, pokud máte webový server obsluhující slovníky.

### Konfigurace TypeScriptu

Ujistěte se, že vaše konfigurace TypeScriptu obsahuje autogenerované typy.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Rozšíření VS Code

Chcete-li zlepšit své zkušenosti s vývojem s Intlayerem, můžete si nainstalovat oficiální **rozšíření Intlayer VS Code**.

[Instalovat z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Toto rozšíření poskytuje:

- **Automatické doplňování** pro překladové klíče.
- **Detekci chyb v reálném čase** pro chybějící překlady.
- **Inline náhledy** přeloženého obsahu.
- **Rychlé akce** pro snadné vytváření a aktualizaci překladů.

Další podrobnosti o tom, jak rozšíření používat, naleznete v [dokumentaci k rozšíření Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Jděte dále

Chcete-li jít dále, můžete implementovat [vizuální editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_visual_editor.md) nebo externalizovat svůj obsah pomocí [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_CMS.md).
