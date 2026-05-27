---
createdAt: 2025-04-18
updatedAt: 2026-05-06
title: Angular i18n - Jak przetłumaczyć aplikację Angular 21 (Vite) w 2026 r.
description: Dowiedz się, jak sprawić, by Twoja strona w Angular była wielojęzyczna. Postępuj zgodnie z dokumentacją, aby ją umiędzynarodowić (i18n) i przetłumaczyć.
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
applicationTemplate: https://github.com/aymericzip/intlayer-angular-21-template
applicationShowcase: https://intlayer-angular-21-template.vercel.app/
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Zaktualizowano użycie interfejsu API Solid useIntlayer do bezpośredniego dostępu do właściwości"
  - version: 8.0.0
    date: 2026-01-26
    changes: "Wydanie stabilnej wersji"
  - version: 8.0.0
    date: 2025-12-30
    changes: "Dodano polecenie init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historia początkowa"
---

# Przetłumacz swoją stronę Angular 21 (Vite) za pomocą Intlayer | Umiędzynarodowienie (i18n)

## Spis Treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna, darmowa biblioteka umiędzynarodowienia (i18n) zaprojektowana w celu uproszczenia wsparcia wielojęzycznego w nowoczesnych aplikacjach internetowych.

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** przy użyciu słowników deklaratywnych na poziomie komponentu.
- **Dynamicznie lokalizować metadane**, trasy i treść.
- **Zapewnić wsparcie TypeScript** z autogenerowanymi typami, poprawiającymi autouzupełnianie i wykrywanie błędów.
- **Korzystać z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i zmiana języka.

---

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji Angular

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-21-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak umiędzynarodowić swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-angular-21-template.vercel.app/"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-angular-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Zobacz [Szablon Aplikacji](https://github.com/aymericzip/intlayer-angular-21-template) na GitHubie.

### Krok 1: Zainstaluj Zależności

Zainstaluj niezbędne pakiety używając npm:

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

  Główny pakiet dostarczający narzędzia i18n do zarządzania konfiguracją, tłumaczenia, [deklarowania treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilacji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **angular-intlayer**
  Pakiet, który integruje Intlayer z aplikacją Angular. Dostarcza on dostawców kontekstu i hooki do umiędzynarodowienia Angular.

- **@angular-builders/custom-esbuild**
  Wymagane do dostosowania konfiguracji esbuild w Angular CLI.

### Krok 2: Konfiguracja twojego projektu

Utwórz plik konfiguracyjny, aby skonfigurować języki swojej aplikacji:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Twoje inne języki
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Poprzez ten plik konfiguracyjny możesz ustawić zlokalizowane adresy URL, przekierowania oprogramowania pośredniczącego (middleware), nazwy plików cookie, lokalizację i rozszerzenie deklaracji treści, wyłączyć logi Intlayer w konsoli i wiele więcej. Aby zapoznać się z pełną listą dostępnych parametrów, zapoznaj się z [dokumentacją konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Krok 3: Integracja Intlayer w Konfiguracji Angular

Aby zintegrować Intlayer z Angular CLI, musisz użyć niestandardowego buildera. Niniejszy przewodnik zakłada, że używasz Vite/esbuild (domyślnego w projektach Angular 21).

Najpierw zmodyfikuj plik `angular.json`, aby użyć niestandardowego buildera esbuild. Zaktualizuj konfiguracje `build` i `serve`:

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
              "exclude": [
                "intlayer",
                "angular-intlayer",
                "@intlayer/config/built",
                "@intlayer/core"
              ]
          },
        },
      },
    },
  },
}
```

> Pamiętaj, aby zastąpić `your-app-name` rzeczywistą nazwą swojego projektu w pliku `angular.json`.

Następnie utwórz plik `esbuild.plugins.ts` w głównym katalogu projektu:

```typescript fileName="esbuild.plugins.ts"
import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";

export default [intlayerEsbuildPlugin()];
```

> Funkcja `intlayerEsbuildPlugin` konfiguruje esbuild dla narzędzia Intlayer. Wprowadza plugin, aby obsłużyć pliki deklaracji treści oraz ustanawia optymalną konfigurację wydajnościową.

> **Użytkownicy NX**: Buildery Angular w NX ładują pliki wtyczek poprzez natywne rozpoznawanie ESM w Node i nie kompilują plików wtyczek TypeScript w locie. Użyj zamiast tego pliku `.mjs` i odpowiednio zaktualizuj odniesienie `plugins` w `angular.json`:
>
> ```javascript fileName="esbuild.plugins.mjs"
> import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";
>
> export default [intlayerEsbuildPlugin()];
> ```
>
> Następnie w `angular.json` wskaż `"./esbuild.plugins.mjs"` zamiast `"./esbuild.plugins.ts"`.

### Krok 4: Zadeklaruj swoją Treść

Twórz i zarządzaj swoimi deklaracjami treści, aby przechowywać tłumaczenia:

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

> Twoje deklaracje treści mogą być zdefiniowane w dowolnym miejscu aplikacji, jeśli są dołączone do katalogu `contentDir` (domyślnie `./src`). Zwróć też uwagę na to, by były zgodne z rozszerzeniami plików z deklaracją treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Po więcej szczegółów zapoznaj się z [dokumentacją deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Krok 5: Wykorzystaj Intlayer w Kodzie

Aby korzystać z funkcji umiędzynarodowienia w całej aplikacji Angular, musisz dostarczyć Intlayer w konfiguracji swojej aplikacji.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // Dodaj tutaj dostawcę Intlayer
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

A w twoim szablonie:

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Treść z Intlayer jest zwracana jako `Signal`, więc masz dostęp do jej wartości po wywołaniu sygnału: `content().title`.

### (Opcjonalnie) Krok 6: Zmień język treści

Aby zmienić język treści, możesz użyć funkcji `setLocale` udostępnianej przez `useLocale`. Dzięki temu możesz ustawić język aplikacji, a treść zostanie odpowiednio zaktualizowana.

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
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

Następnie użyj tego komponentu w pliku `app.component.ts`:

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

Intlayer używa wzbogacania modułów (Module Augmentation), aby zapewnić pełne korzyści z TypeScript i sprawić, by twój kod był bardziej odporny na błędy.

![Autouzupełnianie](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Błąd tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Upewnij się, że twoja konfiguracja TypeScript uwzględnia automatycznie wygenerowane typy.

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Dodaj automatycznie wygenerowane typy
  ],
}
```

### Konfiguracja Git

Zaleca się ignorowanie plików wygenerowanych przez Intlayer. To zapobiega dodaniu ich do twojego repozytorium Git.

Aby to zrobić, możesz dodać następujące polecenia do swojego pliku `.gitignore`:

```bash
# Ignoruj pliki wygenerowane przez Intlayer
.intlayer
```

### Rozszerzenie do VS Code

Aby poprawić jakość i szybkość pisania kodu z Intlayer, możesz zainstalować oficjalne **Rozszerzenie Intlayer VS Code**.

[Zainstaluj z Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Rozszerzenie to zapewnia:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Wbudowane podglądy** przetłumaczonych treści.
- **Szybkie akcje**, by sprawnie stworzyć nowe i zaktualizować istniejące tłumaczenia.

Więcej informacji na temat korzystania z rozszerzenia można znaleźć w [Dokumentacji Rozszerzenia Intlayer dla VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Idź Dalej

By osiągnąć jeszcze więcej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub uzewnętrznić swoje treści przy pomocy [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

---
