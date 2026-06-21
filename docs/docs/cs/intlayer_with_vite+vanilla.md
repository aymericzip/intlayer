---
createdAt: 2026-03-23
updatedAt: 2026-05-31
title: "Vite + Vanilla JS i18n - Kompletní průvodce překladem vaší aplikace"
description: "Žádný i18next. Průvodce 2026 pro vytváření vícejazyčné (i18n) aplikace Vite + Vanilla JS. Překládejte pomocí agentů AI a optimalizujte velikost bundlu, SEO a výkon."
keywords:
  - Internacionalizace
  - Dokumentace
  - Intlayer
  - Vite
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vite-and-vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vanilla-template
applicationShowcase: https://intlayer-vite-vanilla.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualizace použití API useIntlayer v Solid na přímý přístup k vlastnostem"
  - version: 8.4.10
    date: 2026-03-23
    changes: "Počáteční historie"
author: aymericzip
---

# Přeložte svůj web s Vite a Vanilla JS pomocí Intlayer | Internacionalizace (i18n)

<Tabs defaultTab="code">
  <Tab label="Kód" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-vanilla.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Obsah

<TOC/>

## Co je Intlayer?

**Intlayer** je inovativní open-source knihovna pro internacionalizaci (i18n) navržená pro zjednodušení vícejazyčné podpory v moderních webových aplikacích.

S Intlayer můžete:

- **Snadno spravovat překlady** pomocí deklarativních slovníků na úrovni komponent.
- **Dynamicky lokalizovat metadata**, trasy a obsah.
- **Zajistit podporu TypeScriptu** s automaticky generovanými typy, což zlepšuje automatické doplňování a detekci chyb.
- **Využívat pokročilé funkce**, jako je dynamická detekce lokality a přepínání.

---

## Průvodce krok za krokem pro nastavení Intlayer v aplikaci Vite a Vanilla JS

<Steps>

<Step number={1} title="Instalace závislostí">

Nainstalujte potřebné balíčky pomocí npm:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> Tento příkaz detekuje vaše prostředí a nainstaluje potřebné balíčky. Například:

```bash packageManager="npm"
npm install intlayer vanilla-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer vanilla-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer vanilla-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer vanilla-intlayer
bun add vite-intlayer --dev
```

- **intlayer**
  Základní balíček, který poskytuje nástroje pro internacionalizaci pro správu konfigurace, překlad, [deklaraci obsahu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/content_file.md), transpilaci a [CLI příkazy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/index.md).

- **vanilla-intlayer**
  Balíček, který integruje Intlayer do čistých JavaScript / TypeScript aplikací. Poskytuje pub/sub singleton (`IntlayerClient`) a pomocníky založené na callbacku (`useIntlayer`, `useLocale` atd.), aby jakákoliv část vaší aplikace mohla reagovat na změny lokality bez závislosti na UI frameworku.

- **vite-intlayer**
  Zahrnuje Vite plugin pro integraci Intlayer do [Vite bundleru](https://vite.dev/guide/why.html#why-bundle-for-production), stejně jako middleware pro detekci preferované lokality uživatele, správu cookies a zpracování přesměrování URL.

</Step>

<Step number={2} title="Konfigurace vašeho projektu">

Vytvořte konfigurační soubor pro nastavení jazyků vaší aplikace:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vaše další lokality
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Prostřednictvím tohoto konfiguračního souboru můžete nastavit lokalizované URL, přesměrování middleware, názvy cookies, umístění a příponu vašich deklarací obsahu, zakázat logy Intlayer v konzoli a další. Kompletní seznam dostupných parametrů naleznete v [dokumentaci ke konfiguraci](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/configuration.md).

</Step>

<Step number={3} title="Integrace Intlayer do vaší konfigurace Vite">

Přidejte plugin intlayer do své konfigurace.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

> Vite plugin `intlayer()` se používá k integraci Intlayer do Vite. Zajišťuje sestavení souborů deklarace obsahu a monitoruje je v režimu vývoje. Definuje proměnné prostředí Intlayer v aplikaci Vite. Navíc poskytuje aliasy pro optimalizaci výkonu.

</Step>

<Step number={4} title="Bootstrap Intlayer ve vašem vstupním bodě">

Zavolejte `installIntlayer()` **před** vykreslením jakéhokoli obsahu, aby byl globální lokální singleton připraven.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "vanilla-intlayer";

// Musí být voláno před vykreslením jakéhokoli i18n obsahu.
installIntlayer();

// Importujte a spusťte své moduly aplikace.
import "./app.js";
```

Pokud používáte také deklarace obsahu `md()` (Markdown), nainstalujte také markdown renderer:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "vanilla-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./app.js";
```

</Step>

<Step number={5} title="Deklarace vašeho obsahu">

Vytvářejte a spravujte své deklarace obsahu pro uložení překladů:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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
      es: "Kliknutím na logo Vite se dozvíte více",
    }),
  },
} satisfies Dictionary;

export default appContent;
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
        "es": "Kliknutím na logo Vite se dozvíte více"
      }
    }
  }
}
```

> Vaše deklarace obsahu mohou být definovány kdekoli ve vaší aplikaci, pokud jsou zahrnuty v adresáři `contentDir` (ve výchozím nastavení `./src`). A odpovídají příponě souboru deklarace obsahu (ve výchozím nastavení `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Více podrobností naleznete v [dokumentaci k deklaraci obsahu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/content_file.md).

</Step>

<Step number={6} title="Použití Intlayer v JavaScriptu">

`vanilla-intlayer` zrcadlí povrchové API `react-intlayer`: `useIntlayer(key, locale?)` vrací přeložený obsah přímo. Na výsledek připojte `.onChange()`, abyste se přihlásili k odběru změn lokality - explicitní ekvivalent re-renderu v Reactu.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

// Získejte počáteční obsah pro aktuální lokalitu.
// Připojte .onChange(), abyste byli informováni o každé změně lokality.
const content = useIntlayer("app").onChange((newContent) => {
  // Překreslete nebo upravte pouze dotčené uzly DOM
  document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
    newContent.title
  );
  document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
    String(newContent.readTheDocs);
});

// Počáteční vykreslení
document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
  content.title
);
document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
  String(content.readTheDocs);
```

> K listovým hodnotám přistupujte jako k řetězcům tak, že je zabalíte do `String()`, což zavolá metodu `toString()` uzlu a vrátí přeložený text.
>
> Pokud potřebujete hodnotu pro nativní atribut HTML (např. `alt`, `aria-label`), použijte přímo `.value`:
>
> ```typescript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="Změna jazyka vašeho obsahu" isOptional={true}>

Chcete-li změnit jazyk svého obsahu, použijte funkci `setLocale` vystavenou funkcí `useLocale`.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { getLocaleName } from "intlayer";
import { useLocale } from "vanilla-intlayer";

export function setupLocaleSwitcher(container: HTMLElement): () => void {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Language");

  const render = (currentLocale: string) => {
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

  select.addEventListener("change", () => setLocale(select.value as any));

  // Udržujte rozbalovací seznam v synchronizaci, když se lokalita změní odjinud
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="Vykreslení obsahu Markdown a HTML" isOptional={true}>

Intlayer podporuje deklarace obsahu `md()` a `html()`. V čistém JS je kompilovaný výstup vložen jako surové HTML přes `innerHTML`.

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/main.ts` and save to test **HMR**",
        fr: "Modifiez `src/main.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/main.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

Kompilace a vložení HTML:

```typescript fileName="src/main.ts" codeFormat="typescript"
import {
  compileMarkdown,
  installIntlayerMarkdown,
  useIntlayer,
} from "vanilla-intlayer";

installIntlayerMarkdown();

const content = useIntlayer("app").onChange((newContent) => {
  const el = document.querySelector<HTMLDivElement>(".edit-note")!;
  el.innerHTML = compileMarkdown(String(newContent.editNote));
});

document.querySelector<HTMLDivElement>(".edit-note")!.innerHTML =
  compileMarkdown(String(content.editNote));
```

> [!TIP]
> `String(content.editNote)` volá `toString()` na `IntlayerNode`, který vrací surový Markdown řetězec. Předejte ho do `compileMarkdown`, abyste získali HTML řetězec, a poté jej nastavte přes `innerHTML`.

> [!WARNING]
> Používejte `innerHTML` pouze s důvěryhodným obsahem. Pokud markdown pochází od uživatele, nejprve jej ošetřete (např. pomocí DOMPurify). Sanitizační renderer můžete nainstalovat dynamicky:
>
> ```typescript
> import { installIntlayerMarkdownDynamic } from "vanilla-intlayer";
>
> await installIntlayerMarkdownDynamic(async () => {
>   const DOMPurify = await import("dompurify");
>   return (markdown) => DOMPurify.sanitize(compileMarkdown(markdown));
> });
> ```

</Step>

<Step number={9} title="Přidání lokalizovaného směrování do aplikace" isOptional={true}>

Chcete-li vytvořit jedinečné trasy pro každý jazyk (užitečné pro SEO), můžete použít `intlayerProxy` ve vaší konfiguraci Vite pro detekci lokality na straně serveru.

Nejprve přidejte `intlayerProxy` do konfigurace Vite:

> Všimněte si, že pro použití `intlayerProxy` v produkci musíte přesunout `vite-intlayer` z `devDependencies` do `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // mělo by být umístěno jako první
    intlayer(),
  ],
});
```

</Step>

<Step number={10} title="Změna URL při změně lokality" isOptional={true}>

Chcete-li aktualizovat URL prohlížeče při změně lokality, zavolejte `useRewriteURL()` po instalaci Intlayer:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useRewriteURL } from "vanilla-intlayer";

installIntlayer();

// Přepisuje URL okamžitě a při každé následné změně lokality.
// Vrací funkci pro zrušení odběru pro vyčištění.
const stopRewriteURL = useRewriteURL();
```

</Step>

<Step number={11} title="Přepínání atributů HTML Language a Direction" isOptional={true}>

Aktualizujte atributy `lang` a `dir` tagu `<html>` tak, aby odpovídaly aktuální lokalitě pro usnadnění přístupu a SEO.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";
import { installIntlayer, useLocale } from "vanilla-intlayer";

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

</Step>

<Step number={12} title="Líné načítání (Lazy-load) slovníků podle lokality" isOptional={true}>

U velkých aplikací můžete chtít rozdělit slovník každé lokality do vlastního bloku. Použijte `useDictionaryDynamic` spolu s dynamickým `import()` z Vite:

```typescript fileName="src/app.ts" codeFormat="typescript"
import { installIntlayer, useDictionaryDynamic } from "vanilla-intlayer";

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1")!.textContent = String(content.title);
});
```

> Balíček každé lokality se načte pouze tehdy, když se daná lokalita stane aktivní, a výsledek se uloží do mezipaměti - následné přepnutí na stejnou lokalitu je okamžité.

</Step>

<Step number={13} title="Extrakce obsahu vašich komponent" isOptional={true}>

Pokud máte existující kódovou základnu, transformace tisíců souborů může být časově náročná.

Aby se tento proces usnadnil, Intlayer navrhuje [kompilátor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/compiler.md) / [extraktor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/extract.md) pro transformaci vašich komponent a extrakci obsahu.

Chcete-li jej nastavit, můžete do souboru `intlayer.config.ts` přidat sekci `compiler`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Zbytek vaší konfigurace
  compiler: {
    /**
     * Označuje, zda má být kompilátor povolen.
     */
    enabled: true,

    /**
     * Definuje cestu k výstupním souborům
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Označuje, zda mají být komponenty po transformaci uloženy.
     * Tímto způsobem lze kompilátor spustit pouze jednou pro transformaci aplikace a poté jej lze odstranit.
     */
    saveComponents: false,

    /**
     * Předpona klíče slovníku
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Příkaz Extract'>

Spusťte extraktor pro transformaci vašich komponent a extrakci obsahu

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babel kompilátor'>

Aktualizujte svůj `vite.config.ts` a zahrňte plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Přidá kompilátor plugin
  ],
});
```

```bash packageManager="npm"
npm run build # Nebo npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Nebo pnpm run dev
```

```bash packageManager="yarn"
yarn build # Nebo yarn dev
```

```bash packageManager="bun"
bun run build # Nebo bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### (Volitelné) Sitemap a robots.txt (generování při buildu)

Intlayer poskytuje `generateSitemap` a `getMultilingualUrls` - nástroje pro formátování vícejazyčných souborů `sitemap.xml` a `robots.txt` pro crawlery a jejich automatický zápis do `public/`. Obvykle se spouští malý Node skript **před** Vitem (např. npm hooky `predev` / `prebuild`).

#### Sitemap

Generátor sitemap respektuje locale a přidává metadata pro crawlery.

> Sitemap podporuje jmenný prostor `xhtml:link` (hreflang). Místo plochého seznamu URL Intlayer obousměrně propojuje všechny jazykové verze stránky (např. `/about`, `/fr/about` nebo `/about?lang=fr` podle režimu routování).

#### Robots.txt

Použijte `getMultilingualUrls`, aby pravidla `Disallow` pokrývala všechny lokalizované varianty citlivých cest.

#### 1. Soubor `generate-seo.mjs` v kořeni projektu

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

Balíček `intlayer` musí být nainstalován. V produkci nastavte `SITE_URL` v prostředí (např. v CI).

> Pro Node ESM preferujte `generate-seo.mjs`. U `generate-seo.js` nastavte v `package.json` `"type": "module"` nebo ESM jinak.

#### 2. Spusťte skript před Vite

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Upravte příkazy pro pnpm nebo yarn. Skript lze volat i z CI.

### Konfigurace TypeScriptu

Ujistěte se, že vaše konfigurace TypeScriptu zahrnuje automaticky generované typy.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Konfigurace Git

Doporučuje se ignorovat soubory generované Intlayerem. To vám umožní vyhnout se jejich odesílání do vašeho Git repozitáře.

Chcete-li to provést, můžete do souboru `.gitignore` přidat následující pokyny:

```bash
# Ignorovat soubory generované Intlayerem
.intlayer
```

### Rozšíření pro VS Code

Chcete-li zlepšit své zkušenosti s vývojem s Intlayerem, můžete si nainstalovat oficiální **rozšíření Intlayer VS Code**.

[Instalovat z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Toto rozšíření poskytuje:

- **Automatické doplňování** pro klíče překladu.
- **Detekci chyb v reálném čase** pro chybějící překlady.
- **Inline náhledy** přeloženého obsahu.
- **Rychlé akce** pro snadné vytváření a aktualizaci překladů.

Další podrobnosti o tom, jak rozšíření používat, naleznete v [dokumentaci k rozšíření Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Jděte dál

Chcete-li jít dál, můžete implementovat [vizuální editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_visual_editor.md) nebo externalizovat svůj obsah pomocí [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_CMS.md).
