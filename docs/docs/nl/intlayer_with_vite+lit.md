---
createdAt: 2026-03-23
updatedAt: 2026-05-31
title: "Vite + Lit i18n - Volledige gids voor het vertalen van uw app"
description: "Geen i18next meer. De 2026-gids voor het bouwen van een meertalige (i18n) Vite + Lit-app. Vertaal met AI-agenten en optimaliseer bundelgrootte, SEO en prestaties."
keywords:
  - Internationalisering
  - Documentatie
  - Intlayer
  - Vite
  - Lit
  - Web Components
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-lit
applicationTemplate: https://github.com/aymericzip/intlayer-vite-lit-template
applicationShowcase: https://intlayer-vite-lit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API-gebruik naar directe toegang tot eigenschappen"
  - version: 8.4.10
    date: 2026-03-23
    changes: "Initiële geschiedenis"
author: aymericzip
---

# Vertaal je Vite- en Lit-website met Intlayer | Internationalisering (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-lit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-lit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-lit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Inhoudsopgave

<TOC/>

## Wat is Intlayer?

**Intlayer** is een innovatieve, open-source internationaliseringsbibliotheek (i18n) die is ontworpen om meertalige ondersteuning in moderne webapplicaties te vereenvoudigen.

Met Intlayer kun je:

- **Eenvoudig vertalingen beheren** met behulp van declaratieve woordenboeken op componentniveau.
- **Metadata, routes en inhoud dynamisch lokaliseren**.
- **TypeScript-ondersteuning garanderen** met automatisch gegenereerde typen, wat de automatische aanvulling en foutdetectie verbetert.
- **Profiteren van geavanceerde functies**, zoals dynamische taaldetectie en -omschakeling.

---

## Stap-voor-stap handleiding om Intlayer in te stellen in een Vite- en Lit-applicatie

<Steps>

<Step number={1} title="Afhankelijkheden installeren">

Installeer de benodigde pakketten met npm:

```bash packageManager="npm"
npm install intlayer lit-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer lit-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer lit-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer lit-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  Het kernpakket dat internationaliseringstools biedt voor configuratiebeheer, vertaling, [inhoudsdeclaratie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/content_file.md), transpilatie en [CLI-commando's](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/index.md).

- **lit-intlayer**
  Het pakket dat Intlayer integreert met Lit-applicaties. Het biedt op `ReactiveController` gebaseerde hooks (`useIntlayer`, `useLocale`, enz.) zodat LitElements automatisch opnieuw renderen wanneer de taal verandert.

- **vite-intlayer**
  Bevat de Vite-plugin voor het integreren van Intlayer met de [Vite-bundler](https://vite.dev/guide/why.html#why-bundle-for-production), evenals middleware voor het detecteren van de voorkeurstaal van de gebruiker, het beheren van cookies en het afhandelen van URL-omleidingen.

</Step>

<Step number={2} title="Configuratie van je project">

Maak een configuratiebestand om de talen van je applicatie te configureren:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Je andere talen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Via dit configuratiebestand kun je gelokaliseerde URL's, middleware-omleidingen, cookienamen, de locatie en extensie van je inhoudsdeclaraties instellen, Intlayer-logs in de console uitschakelen, en meer. Raadpleeg de [configuratiedocumentatie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/configuration.md) voor een volledige lijst van beschikbare parameters.

</Step>

<Step number={3} title="Intlayer integreren in je Vite-configuratie">

Voeg de intlayer-plugin toe aan je configuratie.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

> De `intlayer()` Vite-plugin wordt gebruikt om Intlayer met Vite te integreren. Het zorgt voor het bouwen van inhoudsdeclaratiebestanden en bewaakt deze in de ontwikkelmodus. Het definieert Intlayer-omgevingsvariabelen binnen de Vite-applicatie. Bovendien biedt het aliassen om de prestaties te optimaliseren.

</Step>

<Step number={4} title="Bootstrap Intlayer in je toegangspunt">

Roep `installIntlayer()` aan **vóórdat** er aangepaste elementen worden geregistreerd, zodat de globale locale singleton gereed is wanneer het eerste element verbinding maakt.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "lit-intlayer";

// Moet worden aangeroepen voordat een LitElement wordt verbonden met de DOM.
installIntlayer();

// Importeer en registreer je aangepaste elementen.
import "./my-element.js";
```

Als je ook `md()` inhoudsdeclaraties (Markdown) gebruikt, installeer dan ook de markdown-renderer:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "lit-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./my-element.js";
```

</Step>

<Step number={5} title="Declareer je inhoud">

Maak en beheer je inhoudsdeclaraties om vertalingen op te slaan:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
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
    "title": "Vite + Lit",
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "litLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Lit logo",
        "fr": "Logo Lit",
        "es": "Logo Lit"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is {{count}}",
        "fr": "le compte est {{count}}",
        "es": "el recuento es {{count}}"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Lit logos to learn more",
        "fr": "Cliquez sur les logos Vite et Lit pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Lit para obtener más informatie"
      }
    }
  }
}
```

> Je inhoudsdeclaraties kunnen overal in je applicatie worden gedefinieerd, zolang ze zijn opgenomen in de `contentDir` map (standaard `./src`) en voldoen aan de extensie voor inhoudsdeclaratiebestanden (standaard `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Raadpleeg de [inhoudsdeclaratiedocumentatie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/content_file.md) voor meer details.

</Step>

<Step number={6} title="Gebruik Intlayer in je LitElement">

Gebruik `useIntlayer` binnen een `LitElement`. Het retourneert een `ReactiveController`-proxy die automatisch herrenders activeert wanneer de actieve taal verandert - er is geen extra configuratie vereist.

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { useIntlayer } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;

  // useIntlayer registreert zichzelf als een ReactiveController.
  // Het element herrendert automatisch wanneer de taal verandert.
  private content = useIntlayer(this, "app");

  override render() {
    const { content } = this;

    return html`
      <h1>${content.title}</h1>

      <img src="/vite.svg" alt=${content.viteLogo.value} />
      <img src="/lit.svg" alt=${content.litLogo.value} />

      <button @click=${() => this.count++}>
        ${content.count({ count: this.count })}
      </button>

      <p>${content.readTheDocs}</p>
    `;
  }
}
```

> Wanneer je de vertaalde string nodig hebt in een systeemeigen HTML-attribuut (bijv. `alt`, `aria-label`, `title`), roep dan `.value` aan op het leaf-node:
>
> ```typescript
> html`<img alt=${content.viteLogo.value} />`;
> html`<img alt=${content.viteLogo.toString()} />`;
> html`<img alt=${String(content.viteLogo)} />`;
> ```

</Step>

<Step number={7} title="De taal van je inhoud wijzigen" isOptional={true}>

Gebruik de `setLocale`-methode van de `useLocale`-controller om de taal van je inhoud te wijzigen.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

</Step>

<Step number={8} title="Markdown- en HTML-inhoud renderen" isOptional={true}>

Intlayer ondersteunt `md()` en `html()` inhoudsdeclaraties. In Lit wordt de gecompileerde output geïnjecteerd als ruwe HTML via de `unsafeHTML`-richtlijn.

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/my-element.ts` and save to test **HMR**",
        fr: "Modifiez `src/my-element.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/my-element.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

Render de gecompileerde HTML in je element:

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { useIntlayer } from "lit-intlayer";
import { compileMarkdown } from "lit-intlayer/markdown";

@customElement("my-element")
export class MyElement extends LitElement {
  private content = useIntlayer(this, "app");

  override render() {
    return html`
      <div class="edit-note">
        ${unsafeHTML(compileMarkdown(String(this.content.editNote)))}
      </div>
    `;
  }
}
```

> [!TIP]
> `String(content.editNote)` roept `toString()` aan op de `IntlayerNode`, wat de ruwe Markdown-string retourneert. Geef deze door aan `compileMarkdown` om een HTML-string te krijgen, en render deze vervolgens met de `unsafeHTML`-richtlijn van Lit.

</Step>

<Step number={9} title="Gelokaliseerde routing toevoegen aan je applicatie" isOptional={true}>

Om unieke routes voor elke taal te maken (nuttig voor SEO), kun je een client-side router gebruiken samen met Intlayer's `localeMap` / `localeFlatMap` helpers, en de `intlayerProxy` Vite-plugin voor taaldetectie aan de serverzijde.

Voeg eerst `intlayerProxy` toe aan je Vite-configuratie:

> Let op: om `intlayerProxy` in productie te gebruiken, moet je `vite-intlayer` verplaatsen van `devDependencies` naar `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerProxy()],
});
```

</Step>

<Step number={10} title="De URL wijzigen wanneer de taal verandert" isOptional={true}>

Gebruik `useRewriteURL` samen met de taalschakelaar om de browser-URL bij te werken wanneer de taal verandert:

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale, useRewriteURL } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  // Schrijft de huidige URL automatisch opnieuw wanneer de taal verandert.
  private _rewriteURL = useRewriteURL(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

</Step>

<Step number={11} title="De HTML taal- en richtingsattributen omschakelen" isOptional={true}>

Werk de `lang`- en `dir`-attributen van de `<html>`-tag bij zodat deze overeenkomen met de huidige taal voor toegankelijkheid en SEO.

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  private locale = useLocale(this, {
    onLocaleChange: (loc) => {
      document.documentElement.lang = loc;
      document.documentElement.dir = getHTMLTextDir(loc);
    },
  });

  override render() {
    return html`<!-- je inhoud -->`;
  }
}
```

</Step>

<Step number={12} title="De inhoud van je componenten extraheren" isOptional={true}>

Als je een bestaande codebase hebt, kan het transformeren van duizenden bestanden tijdrovend zijn.

Om dit proces te vergemakkelijken, stelt Intlayer een [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/extract.md) voor om je componenten te transformeren en de inhoud te extraheren.

Om dit in te stellen, kun je een `compiler`-sectie toevoegen aan je `intlayer.config.ts`-bestand:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... De rest van je configuratie
  compiler: {
    /**
     * Geeft aan of de compiler moet worden ingeschakeld.
     */
    enabled: true,

    /**
     * Definieert het pad voor de outputbestanden
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Geeft aan of de componenten moeten worden opgeslagen nadat ze zijn getransformeerd.
     * Op die manier hoeft de compiler slechts één keer te worden uitgevoerd om de app te transformeren, en kan deze daarna worden verwijderd.
     */
    saveComponents: false,

    /**
     * Voorvoegsel voor woordenboektoetsen
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

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

Zorg ervoor dat je TypeScript-configuratie de automatisch gegenereerde typen bevat.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

> `experimentalDecorators` en `useDefineForClassFields: false` zijn vereist door Lit voor decoratorondersteuning.

### Git-configuratie

Het wordt aanbevolen om de door Intlayer gegenereerde bestanden te negeren. Hierdoor voorkom je dat je ze naar je Git-repository commit.

Om dit te doen, kun je de volgende instructies toevoegen aan je `.gitignore`-bestand:

```bash
# De door Intlayer gegenereerde bestanden negeren
.intlayer
```

### VS Code-extensie

Om je ontwikkelervaring met Intlayer te verbeteren, kun je de officiële **Intlayer VS Code Extension** installeren.

[Installeren vanuit de VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Deze extensie biedt:

- **Automatische aanvulling** voor vertaalsleutels.
- **Real-time foutdetectie** voor ontbrekende vertalingen.
- **Inline voorvertoningen** van vertaalde inhoud.
- **Snelle acties** om eenvoudig vertalingen te maken en bij te werken.

Raadpleeg de [documentatie van de Intlayer VS Code-extensie](https://intlayer.org/doc/vs-code-extension) voor meer details over het gebruik van de extensie.

---

### Verder gaan

Om verder te gaan, kun je de [visuele editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_visual_editor.md) implementeren of je inhoud externaliseren met behulp van het [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_CMS.md).
