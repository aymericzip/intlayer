---
createdAt: 2026-03-31
updatedAt: 2026-03-31
title: Vanilla JS i18n - Hoe vertaal je een Vanilla JS app in 2026
description: Ontdek hoe je je Vanilla JS-website meertalig maakt. Volg de documentatie om deze te internationaliseren (i18n) en te vertalen.
keywords:
  - Internationalisering
  - Documentatie
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
    changes: "Geschiedenis geïnitialiseerd"
---

# Vertaal je Vanilla JS website met Intlayer | Internationalisering (i18n)

## Inhoudsopgave

<TOC/>

## Wat is Intlayer?

**Intlayer** is een innovatieve, open-source internationaliseringsbibliotheek (i18n) die is ontworpen om meertalige ondersteuning in moderne webapplicaties te vereenvoudigen.

Met Intlayer kun je:

- **Eenvoudig vertalingen beheren** met declaratieve woordenboeken op componentniveau.
- **Dynamisch metadata, routes en inhoud lokaliseren.**
- **TypeScript-ondersteuning garanderen** met automatisch gegenereerde types, wat autocompletion en foutdetectie verbetert.
- **Profiteren van geavanceerde functies**, zoals dynamische taaldetectie en -schakeling.

Deze gids laat zien hoe je Intlayer gebruikt in een Vanilla JavaScript-applicatie **zonder een pakketbeheerder of een bundler** (zoals Vite, Webpack, etc.) te gebruiken.

Als je applicatie een bundler gebruikt (zoals Vite), raden we aan om in plaats daarvan de [Vite + Vanilla JS Gids](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+vanilla.md) te volgen.

Met behulp van de standalone bundel kun je Intlayer direct in je HTML-bestanden importeren via een enkel JavaScript-bestand, waardoor het perfect is voor legacy-projecten of eenvoudige statische sites.

---

## Stap-voor-stap handleiding om Intlayer in te stellen in een Vanilla JS-applicatie

### Stap 1: Afhankelijkheden installeren

Installeer de benodigde pakketten met npm:

```bash packageManager="npm"
# Genereer een standalone bundel van intlayer en vanilla-intlayer
# Dit bestand wordt geïmporteerd in je HTML-bestand
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Initialiseer intlayer met configuratiebestand
npx intlayer init --no-gitignore

# Bouw de woordenboeken
npx intlayer build
```

```bash packageManager="pnpm"
# Genereer een standalone bundel van intlayer en vanilla-intlayer
# Dit bestand wordt geïmporteerd in je HTML-bestand
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Initialiseer intlayer met configuratiebestand
pnpm intlayer init --no-gitignore

# Bouw de woordenboeken
pnpm intlayer build
```

```bash packageManager="yarn"
# Genereer een standalone bundel van intlayer en vanilla-intlayer
# Dit bestand wordt geïmporteerd in je HTML-bestand
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Initialiseer intlayer-configuratiebestand, TypeScript indien ingesteld, env var
yarn intlayer init --no-gitignore

# Bouw de woordenboeken
yarn intlayer build
```

```bash packageManager="bun"
# Genereer een standalone bundel van intlayer en vanilla-intlayer
# Dit bestand wordt geïmporteerd in je HTML-bestand
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Initialiseer intlayer met configuratiebestand
bun x intlayer init --no-gitignore

# Bouw de woordenboeken
bun x intlayer build
```

- **intlayer**
  Het kernpakket dat internationaliseringstools biedt voor configuratiebeheer, vertaling, [inhoudsdeclaratie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/content_file.md), transpilatie en [CLI-commando's](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/index.md).

- **vanilla-intlayer**
  Het pakket dat Intlayer integreert met pure JavaScript / TypeScript-applicaties. Het biedt een pub/sub-singleton (`IntlayerClient`) and callback-gebaseerde helpers (`useIntlayer`, `useLocale`, etc.) zodat elk deel van je app kan reageren op taalveranderingen zonder afhankelijk te zijn van een UI-framework.

> De bundling-export van de `intlayer standalone` CLI produceert een geoptimaliseerde build door middel van tree-shaking van ongebruikte pakketten, locales en niet-essentiële logica (zoals redirects of prefixes) die specifiek zijn voor uw configuratie.

### Stap 2: Configuratie van je project

Maak een configuratiebestand om de talen van je applicatie in te stellen:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> Via dit configuratiebestand kun je gelokaliseerde URL's, middleware-redirection, cookienamen, de locatie en extensie van je inhoudsdeclaraties instellen, Intlayer-logs in de console uitschakelen en meer. Raadpleeg de [configuratie-documentatie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/configuration.md) voor een volledige lijst van beschikbare parameters.

### Stap 3: Importeer de bundel in je HTML

Zodra je de `intlayer.js`-bundel hebt gegeneerd, kun je deze in je HTML-bestand importeren:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />

    <!-- Importeer de bundel -->
    <script src="./intlayer.js" defer></script>
    <!-- Importeer je hoofdscript -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

De bundel stelt `Intlayer` en `VanillaIntlayer` bloot als globale objecten op `window`.

### Stap 4: Bootstrap Intlayer in je toegangspunt

In je `src/main.js`, roep `installIntlayer()` aan **voordat** er inhoud wordt gerenderd, zodat de globale taal-singleton gereed is.

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// Moet worden aangeroepen voordat i18n-inhoud wordt gerenderd.
installIntlayer();
```

Als je ook de markdown-renderer wilt gebruiken, roep dan `installIntlayerMarkdown()` aan:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

### Stap 5: Declareer je inhoud

Maak en beheer je inhoudsdeclaraties om vertalingen op te slaan:

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
      es: "Haga clic en el logotipo de Vite para obtener más información",
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
      es: "Haga clic en el logotipo de Vite para obtener más información",
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
      es: "Haga clic en het logo van Vite voor meer informatie",
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

> Je inhoudsdeclaraties kunnen overal in je applicatie worden gedefinieerd, zolang ze maar zijn opgenomen in de `contentDir` directory (standaard `./src`). En overeenkomen met de bestandsextensie van de inhoudsdeclaratie (standaard `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> Raadpleeg de [inhoudsdeclaratie-documentatie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/content_file.md) voor meer details.

### Stap 6: Gebruik Intlayer in je JavaScript

Het `window.VanillaIntlayer` object biedt API-helpers: `useIntlayer(key, locale?)` retourneert de vertaalde inhoud voor een gegeven sleutel.

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// Haal de initiële inhoud op voor de huidige taal.
// Koppel .onChange() om op de hoogte te worden gesteld wanneer de taal verandert.
const content = useIntlayer("app").onChange((newContent) => {
  // Re-render of patch alleen de aangetaste DOM-nodes
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// Initiële render
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> Benader eindwaarden als strings door ze in `String()` te wikkelen, wat de `toString()`-methode van de node aanroept en de vertaalde tekst retourneert.
>
> Wanneer je de waarde nodig hebt voor een eigen HTML-attribuut (bijv. `alt`, `aria-label`), gebruik dan direct `.value`:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

### (Optioneel) Stap 7: Verander de taal van je inhoud

Om de taal van je inhoud te veranderen, gebruik je de `setLocale` functie die wordt blootgesteld door `useLocale`.

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Taal");

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

  // Houd de dropdown in sync wanneer de taal elders verandert
  return subscribe((newLocale) => render(newLocale));
}
```

### (Optioneel) Stap 8: Schakel de HTML taal- en richtingsattributen

Update de `lang` en `dir` attributen van de `<html>`-tag zodat ze overeenkomen met de huidige taal voor toegankelijkheid en SEO.

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

### (Optioneel) Stap 9: Laad woordenboeken lui per taal

Als je woordenboeken lui wilt laden per taal, kun je `useDictionaryDynamic` gebruiken. Dit is handig als je niet alle vertalingen in het initiële `intlayer.js`-bestand wilt bundelen.

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

> Opmerking: `useDictionaryDynamic` vereist dat de woordenboeken beschikbaar zijn als afzonderlijke ESM-bestanden. Deze aanpak wordt doorgaans gebruikt als je een webserver hebt die de woordenboeken serveert.

### TypeScript configureren

Zorg ervoor dat je TypeScript-configuratie de automatisch gegenereerde types bevat.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### VS Code-extensie

Om je ontwikkelervaring met Intlayer te verbeteren, kun je de officiële **Intlayer VS Code-extensie** installeren.

[Installeren vanuit de VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Deze extensie biedt:

- **Autocompletion** voor vertaalsleutels.
- **Real-time foutdetectie** voor ontbrekende vertalingen.
- **Inline voorvertoningen** van vertaalde inhoud.
- **Sneltoetsen** om eenvoudig vertalingen aan te maken en bij te werken.

Raadpleeg de [Intlayer VS Code-extensie documentatie](https://intlayer.org/doc/vs-code-extension) voor meer details over het gebruik van de extensie.

---

### Ga verder

Om verder te gaan, kun je de [visuele editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_visual_editor.md) implementeren of je inhoud externaliseren met behulp van de [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_CMS.md).
