---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Angular i18n - Jak przetłumaczyć aplikację Angular – przewodnik 2026
description: Dowiedz się, jak uczynić swoją stronę Angular wielojęzyczną. Postępuj zgodnie z dokumentacją, aby ją umiędzynarodowić (i18n) i przetłumaczyć.
keywords:
  - Umiędzynarodowienie
  - Dokumentacja
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: Dodaj komendę init
  - version: 5.5.10
    date: 2025-06-29
    changes: Zainicjuj historię
---

# Przetłumacz swoją stronę Angular za pomocą Intlayer | Umiędzynarodowienie (i18n)

## Spis treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna biblioteka umiędzynarodowienia (i18n) typu open-source, zaprojektowana w celu uproszczenia obsługi wielojęzyczności w nowoczesnych aplikacjach internetowych.

Z Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentów.
- **Dynamicznie lokalizować metadane**, trasy i treści.
- **Zapewnić wsparcie TypeScript** dzięki automatycznie generowanym typom, poprawiając autouzupełnianie i wykrywanie błędów.
- **Korzystać z zaawansowanych funkcji**, jak dynamiczne wykrywanie i przełączanie języka.

---

## Przewodnik krok po kroku po konfiguracji Intlayer w aplikacji Angular

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-angular-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak umiędzynarodowić swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-angular-template) na GitHubie.

### Krok 1: Instalacja zależności

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-webpack --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-webpack --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-webpack --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-webpack --dev
bunx intlayer init
```

- **intlayer**

  Podstawowy pakiet dostarczający narzędzia i18n do zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilacji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **angular-intlayer**
  Pakiet integrujący Intlayer z aplikacją Angular. Dostarcza dostawców kontekstu i hooki dla umiędzynarodowienia Angulara.

- **@angular-builders/custom-webpack**
  Wymagany do dostosowania konfiguracji Webpack w Angular CLI.

### Krok 2: Konfiguracja projektu

Utwórz plik konfiguracyjny, aby ustawić języki swojej aplikacji:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Twoje pozostałe języki
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
      // Twoje pozostałe języki
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
      // Twoje pozostałe języki
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Poprzez ten plik konfiguracyjny możesz ustawić zlokalizowane adresy URL, przekierowania middleware, nazwy ciasteczek, lokalizację i rozszerzenia deklaracji treści, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

### Krok 3: Integracja Intlayer w konfiguracji Angulara

Aby zintegrować Intlayer z Angular CLI, musisz użyć niestandardowego buildera. Ten przewodnik zakłada, że używasz Webpacka (domyślny dla wielu projektów Angular).

Najpierw zmodyfikuj plik `angular.json`, aby używał niestandardowego buildera Webpack. Zaktualizuj konfiguracje `build` i `serve`:

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.ts"
            }
          }
        },
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.ts"
            }
          }
        }
      }
    }
  }
}
```

> Pamiętaj, aby zastąpić `your-app-name` rzeczywistą nazwą swojego projektu w `angular.json`.

Następnie utwórz plik `webpack.config.ts` w katalogu głównym projektu:

```typescript fileName="webpack.config.ts"
import { mergeConfig } from "angular-intlayer/webpack";

export default mergeConfig({});
```

> Funkcja `mergeConfig` konfiguruje Webpacka pod kątem Intlayer. Wstrzykuje `IntlayerWebpackPlugin` (do obsługi plików deklaracji treści) i ustawia aliasy dla optymalnej wydajności.

### Krok 4: Deklarowanie treści

Twórz i zarządzaj swoimi deklaracjami treści, aby przechowywać tłumaczenia:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat="typescript"
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
      es: "Servicio di Lenguaje Angular",
    }),
    angularDevTools: "Angular DevTools",
    github: "Github",
    twitter: "Twitter",
    youtube: "Youtube",
  },
} satisfies Dictionary;

export default appContent;
```

> Twoje deklaracje treści mogą być zdefiniowane w dowolnym miejscu w aplikacji, o ile znajdują się w katalogu `contentDir` (domyślnie `./src`) i pasują do rozszerzenia pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Więcej szczegółów znajdziesz w [dokumentacji deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

### Krok 5: Wykorzystanie Intlayer w kodzie

Aby korzystać z funkcji umiędzynarodowienia Intlayer w całej aplikacji Angular, musisz dostarczyć Intlayer w konfiguracji aplikacji.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // Dodaj dostawcę Intlayer tutaj
  ],
};
```

Następnie możesz użyć funkcji `useIntlayer` w dowolnym komponencie.

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

I w swoim szablonie:

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Treść Intlayer jest zwracana jako `Signal`, więc dostęp do wartości uzyskujesz poprzez wywołanie sygnału: `content().title`.

### (Opcjonalnie) Krok 6: Zmiana języka treści

Aby zmienić język treści, możesz użyć funkcji `setLocale` dostarczonej przez funkcję `useLocale`. Pozwala to ustawić język aplikacji i odpowiednio zaktualizować treść.

Utwórz komponent do przełączania języków:

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
  styles: [
    `
      .locale-switcher {
        margin: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: fit-content;
      }
    `,
  ],
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

Następnie użyj tego komponentu w `app.component.ts`:

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

### Konfiguracja TypeScript

Intlayer używa rozszerzania modułów (module augmentation), aby czerpać korzyści z TypeScript i wzmacniać bazę kodu.

![Autouzupełnianie](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Błąd tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Upewnij się, że Twoja konfiguracja TypeScript zawiera automatycznie generowane typy.

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Uwzględnij automatycznie generowane typy
  ],
}
```

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich commitowania do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby poprawić wrażenia z programowania z Intlayer, możesz zainstalować oficjalne rozszerzenie **Intlayer VS Code Extension**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** dla kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd inline** przetłumaczonej treści.
- **Szybkie akcje** ułatwiające tworzenie i aktualizowanie tłumaczeń.

Więcej szczegółów na temat korzystania z rozszerzenia znajdziesz w [dokumentacji rozszerzenia Intlayer dla VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Dowiedz się więcej

Aby pójść dalej, możesz wdrożyć [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) lub wyeksportować swoje treści za pomocą [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

---
