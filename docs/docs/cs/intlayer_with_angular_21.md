---
createdAt: 2025-04-18
updatedAt: 2026-05-06
title: Angular i18n - Jak přeložit aplikaci Angular 21 (Vite) v roce 2026
description: Objevte, jak udělat váš web v Angularu vícejazyčným. Postupujte podle dokumentace, abyste jej internacionalizovali (i18n) a přeložili.
keywords:
  - Internacionalizace
  - Dokumentace
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
    changes: "Aktualizováno použití Solid useIntlayer API pro přímý přístup k vlastnostem"
  - version: 8.0.0
    date: 2026-01-26
    changes: "Vydání stabilní verze"
  - version: 8.0.0
    date: 2025-12-30
    changes: "Přidán příkaz init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Počáteční historie"
---

# Přeložte svůj web Angular 21 (Vite) pomocí Intlayer | Internacionalizace (i18n)

## Obsah

<TOC/>

## Co je Intlayer?

**Intlayer** je inovativní open-source knihovna pro internacionalizaci (i18n), navržená ke zjednodušení podpory více jazyků v moderních webových aplikacích.

S Intlayer můžete:

- **Snadno spravovat překlady** pomocí deklarativních slovníků na úrovni komponent.
- **Dynamicky lokalizovat metadata**, cesty a obsah.
- **Zajistit podporu TypeScriptu** s automaticky generovanými typy, což zlepšuje automatické doplňování a detekci chyb.
- **Využívat pokročilé funkce**, jako je dynamická detekce a přepínání jazyků.

---

## Průvodce krok za krokem k nastavení Intlayer v aplikaci Angular

<Tabs defaultTab="code">
  <Tab label="Kód" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacionalizovat vaši aplikaci pomocí Intlayer"
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

Podívejte se na [šablonu aplikace](https://github.com/aymericzip/intlayer-angular-template) na GitHubu.

### Krok 1: Instalace závislostí

Nainstalujte potřebné balíčky pomocí npm:

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

  Základní balíček poskytující nástroje i18n pro správu konfigurace, překlady, [deklaraci obsahu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/content_file.md), transpilaci a [příkazy CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/index.md).

- **angular-intlayer**
  Balíček, který integruje Intlayer s aplikací Angular. Poskytuje poskytovatele kontextu a hooky pro internacionalizaci Angularu.

- **@angular-builders/custom-esbuild**
  Požadováno k přizpůsobení konfigurace esbuild v Angular CLI.

### Krok 2: Konfigurace vašeho projektu

Vytvořte konfigurační soubor k nastavení jazyků vaší aplikace:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Prostřednictvím tohoto konfiguračního souboru můžete nastavit lokalizované adresy URL, přesměrování middleware, názvy souborů cookie, umístění a rozšíření vašich deklarací obsahu, zakázat logování Intlayer v konzoli a další. Pro úplný seznam dostupných parametrů se podívejte na [dokumentaci ke konfiguraci](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/configuration.md).

### Krok 3: Integrace Intlayer do vaší konfigurace Angular

K integraci Intlayer s Angular CLI je nutné použít vlastní builder. Tento průvodce předpokládá, že používáte Vite/esbuild (výchozí pro projekty Angular 21).

Nejprve upravte svůj `angular.json` tak, aby používal vlastní esbuild builder. Aktualizujte konfigurace pro `build` a `serve`:

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

> Nezapomeňte nahradit `your-app-name` skutečným názvem vašeho projektu v `angular.json`.

Dále vytvořte soubor `esbuild.plugins.ts` v kořenovém adresáři vašeho projektu:

```typescript fileName="esbuild.plugins.ts"
import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";

export default [intlayerEsbuildPlugin()];
```

> Funkce `intlayerEsbuildPlugin` nastavuje esbuild s Intlayer. Injikuje plugin k obsluze souborů deklarací obsahu a nastavuje konfigurace pro optimální výkon.

### Krok 4: Deklarace vašeho obsahu

Vytvářejte a spravujte své deklarace obsahu pro uložení překladů:

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

> Vaše deklarace obsahu mohou být definovány kdekoli ve vaší aplikaci, pokud jsou zahrnuty do adresáře `contentDir` (ve výchozím nastavení, `./src`). A musí se shodovat s příponou souboru deklarace obsahu (ve výchozím nastavení, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Další podrobnosti najdete v [dokumentaci k deklaraci obsahu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/content_file.md).

### Krok 5: Využití Intlayer ve vašem kódu

K využití funkcí internacionalizace Intlayer v celé vaší aplikaci Angular je třeba poskytnout Intlayer v konfiguraci aplikace.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // Přidejte poskytovatele Intlayer zde
  ],
};
```

Následně můžete použít funkci `useIntlayer` v libovolné komponentě.

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

A ve vaší šabloně:

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Obsah Intlayer je vrácen jako `Signal`, takže přístup k hodnotám získáte voláním signálu: `content().title`.

### (Volitelné) Krok 6: Změna jazyka vašeho obsahu

K přepínání jazyka obsahu můžete použít funkci `setLocale`, kterou poskytuje `useLocale`. Umožňuje vám nastavit lokalizaci aplikace a odpovídajícím způsobem aktualizovat obsah.

Vytvořte komponentu pro přepínání jazyků:

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

Tuto komponentu pak použijte v `app.component.ts`:

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

### Konfigurace TypeScriptu

Intlayer používá Module Augmentation, aby získal výhody TypeScriptu a vaše kódová základna byla silnější.

![Autodoplnění](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Chyba překladu](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Ujistěte se, že vaše konfigurace TypeScriptu obsahuje automaticky generované typy.

```json5 fileName="tsconfig.json"
{
  // ... Vaše existující konfigurace TypeScriptu
  "include": [
    // ... Vaše existující konfigurace TypeScriptu
    ".intlayer/**/*.ts", // Zahrnout automaticky generované typy
  ],
}
```

### Konfigurace Gitu

Doporučuje se ignorovat soubory generované Intlayerem. Zabrání to jejich potvrzení (commitování) do vašeho repozitáře Git.

K tomu můžete do svého souboru `.gitignore` přidat následující instrukce:

```bash
# Ignorovat soubory generované Intlayerem
.intlayer
```

### Rozšíření VS Code

Chcete-li zlepšit vývoj s Intlayerem, můžete nainstalovat oficiální **Intlayer VS Code Extension**.

[Nainstalovat z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Toto rozšíření nabízí:

- **Autodoplnění** překladových klíčů.
- **Detekci chyb v reálném čase** pro chybějící překlady.
- **Náhled přímo v kódu** pro přeložený obsah.
- **Rychlé akce** k snadnému vytváření a aktualizaci překladů.

Další informace o tom, jak používat rozšíření, najdete v [dokumentaci Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Další kroky

Abyste šli ještě dále, můžete implementovat [vizuální editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_visual_editor.md) nebo externalizovat obsah s využitím [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_CMS.md).

---
