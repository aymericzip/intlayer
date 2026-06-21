---
createdAt: 2026-03-23
updatedAt: 2026-05-31
title: "Vite + Vanilla JS i18n - Volledige gids voor het vertalen van uw app"
description: "Geen i18next meer. De 2026-gids voor het bouwen van een meertalige (i18n) Vite + Vanilla JS-app. Vertaal met AI-agenten en optimaliseer bundelgrootte, SEO en prestaties."
keywords:
  - Internationalisering
  - Documentatie
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
    changes: "Update Solid useIntlayer API-gebruik naar directe toegang tot eigenschappen"
  - version: 8.4.10
    date: 2026-03-23
    changes: "Initiële geschiedenis"
author: aymericzip
---

# Vertaal uw Vite- en Vanilla JS-website met Intlayer | Internationalisering (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

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

## Inhoudsopgave

<TOC/>

## Wat is Intlayer?

**Intlayer** is een innovatieve, open-source internationaliseringsbibliotheek (i18n) die is ontworpen om meertalige ondersteuning in moderne webapplicaties te vereenvoudigen.

Met Intlayer kunt u:

- **Vertalingen eenvoudig beheren** met behulp van declaratieve woordenboeken op componentniveau.
- **Metadata, routes en inhoud dynamisch lokaliseren**.
- **TypeScript-ondersteuning garanderen** met automatisch gegenereerde typen, waardoor autocomplete en foutdetectie worden verbeterd.
- **Profiteren van geavanceerde functies**, zoals dynamische taaldetectie en -schakeling.

---

## Stap-voor-stap gids om Intlayer in te stellen in een Vite- en Vanilla JS-applicatie

<Steps>

<Step number={1} title="Afhankelijkheden installeren">

Installeer de benodigde pakketten met npm:

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

> Dit commando detecteert uw omgeving en installeert de benodigde pakketten. Bijvoorbeeld:

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
  Het kernpakket dat internationaliseringstools biedt voor configuratiebeheer, vertaling, [inhoudsverklaring](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/content_file.md), transpilatie en [CLI-opdrachten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/index.md).

- **vanilla-intlayer**
  Het pakket dat Intlayer integreert met pure JavaScript / TypeScript-applicaties. Het biedt een pub/sub singleton (`IntlayerClient`) en callback-gebaseerde helpers (`useIntlayer`, `useLocale`, enz.) zodat elk deel van uw app kan reageren op taalveranderingen zonder afhankelijk te zijn van een UI-framework.

- **vite-intlayer**
  Bevat de Vite-plugin voor het integreren van Intlayer met de [Vite-bundler](https://vite.dev/guide/why.html#why-bundle-for-production), evenals middleware voor het detecteren van de voorkeurstaal van de gebruiker, het beheren van cookies en het afhandelen van URL-omleidingen.

</Step>

<Step number={2} title="Configuratie van uw project">

Maak een configuratiebestand om de talen van uw applicatie te configureren:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Uw andere talen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Via dit configuratiebestand kunt u gelokaliseerde URL's, middleware-omleidingen, cookienamen, de locatie en extensie van uw inhoudsverklaringen instellen, Intlayer-logboeken in de console uitschakelen en meer. Raadpleeg de [configuratiedocumentatie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/configuration.md) voor een volledige lijst met beschikbare parameters.

</Step>

<Step number={3} title="Integreer Intlayer in uw Vite-configuratie">

Voeg de intlayer-plugin toe aan uw configuratie.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

> De `intlayer()` Vite-plugin wordt gebruikt om Intlayer met Vite te integreren. Het zorgt voor het bouwen van inhoudsverklaringsbestanden en bewaakt deze in ontwikkelingsmodus. Het definieert Intlayer-omgevingsvariabelen binnen de Vite-applicatie. Bovendien biedt het aliassen om de prestaties te optimaliseren.

</Step>

<Step number={4} title="Bootstrap Intlayer in uw toegangspunt">

Roep `installIntlayer()` aan **voordat** enige inhoud wordt gerenderd, zodat de globale taal-singleton gereed is.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "vanilla-intlayer";

// Moet worden aangeroepen voordat i18n-inhoud wordt gerenderd.
installIntlayer();

// Importeer en voer uw app-modules uit.
import "./app.js";
```

Als u ook `md()` inhoudsverklaringen (Markdown) gebruikt, installeer dan ook de markdown-renderer:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "vanilla-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./app.js";
```

</Step>

<Step number={5} title="Declareer uw inhoud">

Maak en beheer uw inhoudsverklaringen om vertalingen op te slaan:

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
      es: "Klik op het Vite-logo voor meer informatie",
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
        "es": "Klik op het Vite-logo voor meer informatie"
      }
    }
  }
}
```

> Uw inhoudsverklaringen kunnen overal in uw applicatie worden gedefinieerd zolang ze zijn opgenomen in de `contentDir`-map (standaard `./src`). En overeenkomen met de bestandsextensie voor inhoudsverklaringen (standaard `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Raadpleeg de [inhoudsverklaringsdocumentatie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/content_file.md) voor meer informatie.

</Step>

<Step number={6} title="Gebruik Intlayer in uw JavaScript">

`vanilla-intlayer` spiegelt de `react-intlayer` surface API: `useIntlayer(key, locale?)` retourneert de vertaalde inhoud rechtstreeks. Koppel `.onChange()` aan het resultaat om u te abonneren op taalveranderingen - het expliciete equivalent van een React re-render.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

// Haal de initiële inhoud op voor de huidige taal.
// Koppel .onChange() om op de hoogte te worden gesteld wanneer de taal verandert.
const content = useIntlayer("app").onChange((newContent) => {
  // Render of patch alleen de aangetaste DOM-knooppunten opnieuw
  document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
    newContent.title
  );
  document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
    String(newContent.readTheDocs);
});

// Initiële render
document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
  content.title
);
document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
  String(content.readTheDocs);
```

> Krijg toegang tot leaf-waarden als tekenreeksen door ze in `String()` te wikkelen, die de `toString()`-methode van het knooppunt aanroept en de vertaalde tekst retourneert.
>
> Wanneer u de waarde nodig hebt voor een native HTML-kenmerk (bijv. `alt`, `aria-label`), gebruik dan rechtstreeks `.value`:
>
> ```typescript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="De taal van uw inhoud wijzigen" isOptional={true}>

Gebruik de functie `setLocale` van `useLocale` om de taal van uw inhoud te wijzigen.

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

  // Houd de dropdown gesynchroniseerd wanneer de taal ergens anders verandert
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="Markdown- en HTML-inhoud renderen" isOptional={true}>

Intlayer ondersteunt `md()` en `html()` inhoudsverklaringen. In pure JS wordt gecompileerde uitvoer ingevoegd als onbewerkte HTML via `innerHTML`.

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

HTML compileren en invoegen:

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
> `String(content.editNote)` roept `toString()` aan op de `IntlayerNode` die de onbewerkte Markdown-tekenreeks retourneert. Geef deze door aan `compileMarkdown` om een HTML-tekenreeks te krijgen, en stel deze vervolgens in via `innerHTML`.

> [!WARNING]
> Gebruik `innerHTML` alleen met vertrouwde inhoud. Als de markdown afkomstig is van gebruikersinvoer, sanitize deze dan eerst (bijv. met DOMPurify). U kunt een sanitizing renderer dynamisch installeren:
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

<Step number={9} title="Gelokaliseerde Routering toevoegen aan uw applicatie" isOptional={true}>

Om unieke routes voor elke taal te maken (nuttig voor SEO), kunt u `intlayerProxy` gebruiken in uw Vite-configuratie voor taaldetectie aan de serverzijde.

Voeg eerst `intlayerProxy` toe aan uw Vite-configuratie:

> Merk op dat u om `intlayerProxy` in productie te gebruiken, `vite-intlayer` moet verplaatsen van `devDependencies` naar `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // moet als eerste worden geplaatst
    intlayer(),
  ],
});
```

</Step>

<Step number={10} title="De URL wijzigen wanneer de taal verandert" isOptional={true}>

Roep `useRewriteURL()` aan na het installeren van Intlayer om de browser-URL bij te werken wanneer de taal verandert:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useRewriteURL } from "vanilla-intlayer";

installIntlayer();

// Schrijft de URL onmiddellijk en bij elke volgende taalverandering opnieuw.
// Retourneert een uitschrijffunctie voor opschoning.
const stopRewriteURL = useRewriteURL();
```

</Step>

<Step number={11} title="De HTML-taal- en richtingskenmerken wisselen" isOptional={true}>

Werk de kenmerken `lang` en `dir` van de `<html>`-tag bij zodat deze overeenkomen met de huidige taal voor toegankelijkheid en SEO.

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

<Step number={12} title="Woordenboeken per taal lazyloaden" isOptional={true}>

Bij grote apps wilt u misschien het woordenboek van elke taal in een eigen chunk opsplitsen. Gebruik `useDictionaryDynamic` naast de dynamische `import()` van Vite:

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

> De bundel van elke taal wordt alleen opgehaald wanneer die taal actief wordt en het resultaat wordt in de cache opgeslagen - volgende overschakelingen naar dezelfde taal zijn onmiddellijk.

</Step>

<Step number={13} title="De inhoud van uw componenten extraheren" isOptional={true}>

Als u een bestaande codebase heeft, kan het transformeren van duizenden bestanden tijdrovend zijn.

Om dit proces te vergemakkelijken, stelt Intlayer een [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/extract.md) voor om uw componenten te transformeren en de inhoud te extraheren.

Om dit in te stellen, kunt u een `compiler`-sectie toevoegen in uw `intlayer.config.ts`-bestand:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest van uw configuratie
  compiler: {
    /**
     * Geeft aan of de compiler moet worden ingeschakeld.
     */
    enabled: true,

    /**
     * Definieert het pad voor uitvoerbestanden
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Geeft aan of de componenten moeten worden opgeslagen nadat ze zijn getransformeerd.
     * Op die manier kan de compiler slechts één keer worden uitgevoerd om de app te transformeren, en kan deze vervolgens worden verwijderd.
     */
    saveComponents: false,

    /**
     * Woordenboek sleutel prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract-opdracht'>

Voer de extractor uit om uw componenten te transformeren en de inhoud te extraheren

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
 <Tab value='Babel-compiler'>

Werk uw `vite.config.ts` bij om de `intlayerCompiler`-plugin op te nemen:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Voegt de compiler-plugin toe
  ],
});
```

```bash packageManager="npm"
npm run build # Of npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Of pnpm run dev
```

```bash packageManager="yarn"
yarn build # Of yarn dev
```

```bash packageManager="bun"
bun run build # Of bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### (Optioneel) Sitemap en robots.txt (buildtijdgeneratie)

Intlayer biedt `generateSitemap` en `getMultilingualUrls` om meertalige `sitemap.xml` en `robots.txt` voor crawlers te formatteren en automatisch naar `public/` te schrijven. Meestal draait u een klein Node-script **vóór** Vite (bijv. npm-hooks `predev` / `prebuild`).

#### Sitemap

De sitemapgenerator houdt rekening met je locales en voegt metadata voor crawlers toe.

> De sitemap ondersteunt de `xhtml:link`-naamruimte (hreflang). In plaats van platte URL-lijsten koppelt Intlayer alle taalversies van elke pagina bidirectioneel (bijv. `/about`, `/fr/about` of `/about?lang=fr` afhankelijk van je routing).

#### Robots.txt

Gebruik `getMultilingualUrls` zodat `Disallow`-regels alle gelokaliseerde varianten van gevoelige paden dekken.

#### 1. Voeg `generate-seo.mjs` toe in de projectroot

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

Het pakket `intlayer` moet geïnstalleerd zijn. Stel `SITE_URL` in voor productie (bijv. in CI).

> Gebruik bij voorkeur `generate-seo.mjs` voor Node ESM. Bij `generate-seo.js`: zet `"type": "module"` in `package.json` of schakel ESM anders in.

#### 2. Voer het script uit vóór Vite

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

Pas aan voor pnpm of yarn. Ook aanroepen vanuit CI is mogelijk.

### TypeScript configureren

Zorg ervoor dat uw TypeScript-configuratie de automatisch gegenereerde typen bevat.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Git-configuratie

Het wordt aangeraden om de door Intlayer gegenereerde bestanden te negeren. Hiermee kunt u voorkomen dat u ze commit naar uw Git-repository.

Om dit te doen, kunt u de volgende instructies toevoegen aan uw `.gitignore`-bestand:

```bash
# Negeer de door Intlayer gegenereerde bestanden
.intlayer
```

### VS Code-extensie

Om uw ontwikkelingservaring met Intlayer te verbeteren, kunt u de officiële **Intlayer VS Code-extensie** installeren.

[Installeren vanuit de VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Deze extensie biedt:

- **Autocomplete** voor vertaalsleutels.
- **Real-time foutdetectie** voor ontbrekende vertalingen.
- **Inline voorbeelden** van vertaalde inhoud.
- **Snelle acties** om eenvoudig vertalingen te maken en bij te werken.

Raadpleeg de [documentatie van de Intlayer VS Code-extensie](https://intlayer.org/doc/vs-code-extension) voor meer informatie over het gebruik van de extensie.

---

### Ga verder

Om verder te gaan, kunt u de [visuele editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_visual_editor.md) implementeren of uw inhoud externaliseren met behulp van het [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_CMS.md).
