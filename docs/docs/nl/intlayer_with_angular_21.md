---
createdAt: 2025-04-18
updatedAt: 2026-05-06
title: Angular i18n - Hoe een Angular 21 app (Vite) te vertalen in 2026
description: Ontdek hoe u uw Angular website meertalig kunt maken. Volg de documentatie om het te internationaliseren (i18n) en te vertalen.
keywords:
  - Internationalisatie
  - Documentatie
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
applicationShowcase: https://intlayer-angular-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API-gebruik geüpdatet naar directe eigenschaptoegang"
  - version: 8.0.0
    date: 2026-01-26
    changes: "Stabiele versie vrijgegeven"
  - version: 8.0.0
    date: 2025-12-30
    changes: "init-commando toegevoegd"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initiële geschiedenis"
---

# Vertaal uw Angular 21 (Vite) website met Intlayer | Internationalisatie (i18n)

## Inhoudsopgave

<TOC/>

## Wat is Intlayer?

**Intlayer** is een innovatieve, open-source internationalisatie (i18n) bibliotheek ontworpen om meertalige ondersteuning te vereenvoudigen in moderne webapplicaties.

Met Intlayer kunt u:

- **Eenvoudig vertalingen beheren** met behulp van declaratieve woordenboeken op componentniveau.
- **Metagegevens**, routes en inhoud **dynamisch lokaliseren**.
- **TypeScript-ondersteuning garanderen** met automatisch gegenereerde types, wat de automatische aanvulling en foutdetectie verbetert.
- **Profiteren van geavanceerde functies**, zoals dynamische taaldetectie en -wisseling.

---

## Stapsgewijze handleiding om Intlayer in te stellen in een Angular-applicatie

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Hoe u uw applicatie kunt internationaliseren met Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-angular-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-angular-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Zie de [Applicatiesjabloon](https://github.com/aymericzip/intlayer-angular-template) op GitHub.

### Stap 1: Afhankelijkheden installeren

Installeer de benodigde pakketten via npm:

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-esbuild --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-esbuild --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-esbuild --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-esbuild --dev
bun x intlayer init
```

- **intlayer**

  Het kernpakket dat internationalisatietools biedt voor configuratiebeheer, vertaling, [inhoudsdeclaratie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/content_file.md), transpilatie en [CLI-commando's](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/index.md).

- **angular-intlayer**
  Het pakket dat Intlayer integreert met de Angular-applicatie. Het biedt contextproviders en hooks voor Angular-internationalisatie.

- **@angular-builders/custom-esbuild**
  Vereist om de esbuild-configuratie van Angular CLI aan te passen.

### Stap 2: Configuratie van uw project

Maak een configuratiebestand aan om de talen van uw applicatie te configureren:

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

> Via dit configuratiebestand kunt u gelokaliseerde URL's instellen, middleware-omleidingen, cookienamen, de locatie en extensie van uw inhoudsdeclaraties instellen, Intlayer-logs in de console uitschakelen, en nog veel meer. Zie de [configuratiedocumentatie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/configuration.md) voor een volledige lijst met beschikbare parameters.

### Stap 3: Intlayer integreren in uw Angular-configuratie

Om Intlayer met de Angular CLI te integreren, moet u een aangepaste builder gebruiken. Deze handleiding gaat ervan uit dat u Vite/esbuild gebruikt (standaard voor Angular 21-projecten).

Pas eerst uw `angular.json` aan om de aangepaste esbuild-builder te gebruiken. Werk de `build`- en `serve`-configuraties bij:

```json5 fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application", // replace "@angular/build:application"
          "options": {
            "define": {
              "process.env": "{}",
            },
            "plugins": ["./esbuild.plugins.ts"],
            "browser": "src/main.ts",
            // ...
          },
        },
        "serve": {
          "builder": "@angular-builders/custom-esbuild:dev-server", // replace "@angular/build:dev-server"
          "options": {
            "prebundle": {
              "exclude": ["@intlayer/config/built"],
            },
          },
        },
      },
    },
  },
}
```

> Zorg ervoor dat u `your-app-name` vervangt door de daadwerkelijke naam van uw project in `angular.json`.

Maak vervolgens een `esbuild.plugins.ts`-bestand aan in de root van uw project:

```typescript fileName="esbuild.plugins.ts"
import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";

export default [intlayerEsbuildPlugin()];
```

> De functie `intlayerEsbuildPlugin` configureert esbuild met Intlayer. Deze injecteert de plug-in om inhoudsdeclaratiebestanden te verwerken en stelt configuraties in voor optimale prestaties.

### Stap 4: Verklaar uw Inhoud

Maak en beheer uw inhoudsdeclaraties om vertalingen op te slaan:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
    exploreDocs: t({
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      en: "Learn with Tutorials",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "CLI Docs",
    angularLanguageService: t({
      en: "Angular Language Service",
      fr: "Service de Langage Angular",
      es: "Servicio de Lenguaje Angular",
    }),
    angularDevTools: "Angular DevTools",
    github: "Github",
    twitter: "Twitter",
    youtube: "Youtube",
  },
} satisfies Dictionary;

export default appContent;
```

> Uw inhoudsdeclaraties kunnen overal in uw applicatie worden gedefinieerd, zolang ze maar worden opgenomen in de directory `contentDir` (standaard `./src`). En zolang ze overeenkomen met de bestandsextensie voor inhoudsdeclaraties (standaard `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Zie voor meer informatie de [documentatie over inhoudsdeclaratie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/content_file.md).

### Stap 5: Gebruik Intlayer in uw Code

Om de internationalisatiefuncties van Intlayer in uw hele Angular-applicatie te gebruiken, moet u Intlayer toevoegen aan de applicatieconfiguratie.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // Voeg hier de Intlayer-provider toe
  ],
};
```

Vervolgens kunt u de functie `useIntlayer` in een component gebruiken.

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

En in uw template:

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Intlayer-inhoud wordt geretourneerd als een `Signal`, dus u hebt toegang tot de waarden door de signaal aan te roepen: `content().title`.

### (Optioneel) Stap 6: Verander de taal van uw inhoud

Om de taal van uw inhoud te wijzigen, kunt u de functie `setLocale` gebruiken die wordt aangeboden door de functie `useLocale`. Hiermee kunt u de taal van de applicatie instellen en de inhoud dienovereenkomstig bijwerken.

Maak een component om tussen de talen te wisselen:

```typescript fileName="src/app/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { useLocale } from "angular-intlayer";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="locale-switcher">
      <select
        [value]="locale()"
        (change)="setLocale($any($event.target).value)"
      >
        @for (loc of availableLocales; track loc) {
          <option [value]="loc">{{ loc }}</option>
        }
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

Gebruik deze component vervolgens in uw `app.component.ts`:

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "./locale-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LocaleSwitcherComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

### TypeScript configureren

Intlayer maakt gebruik van module augmentation om de voordelen van TypeScript te benutten en uw codebase steviger te maken.

![Automatische aanvulling](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Vertaalfout](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Zorg ervoor dat uw TypeScript-configuratie de automatisch gegenereerde types bevat.

```json5 fileName="tsconfig.json"
{
  // ... Uw bestaande TypeScript-configuraties
  "include": [
    // ... Uw bestaande TypeScript-configuraties
    ".intlayer/**/*.ts", // Automatisch gegenereerde types toevoegen
  ],
}
```

### Git Configuratie

Het wordt aanbevolen om de bestanden die door Intlayer worden gegenereerd, te negeren. Dit voorkomt dat u deze vastlegt in uw Git-repository.

Om dit te doen, kunt u de volgende instructies toevoegen aan uw `.gitignore`-bestand:

```bash
# Negeer bestanden gegenereerd door Intlayer
.intlayer
```

### VS Code Extensie

Om uw ontwikkelingservaring met Intlayer te verbeteren, kunt u de officiële **Intlayer VS Code Extensie** installeren.

[Installeren vanuit de VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Deze extensie biedt:

- **Automatische aanvulling** voor vertaalsleutels.
- **Foutdetectie in realtime** voor ontbrekende vertalingen.
- **Inline previews** van vertaalde inhoud.
- **Snelle acties** om gemakkelijk vertalingen te maken en bij te werken.

Voor meer informatie over hoe u de extensie kunt gebruiken, zie de [Intlayer VS Code Extensie documentatie](https://intlayer.org/doc/vs-code-extension).

---

### Verder Gaan

Om nog verder te gaan, kunt u de [visuele editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_visual_editor.md) implementeren of uw inhoud externaliseren met behulp van de [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_CMS.md).

---
