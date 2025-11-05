---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Jak przetłumaczyć swoją aplikację Angular – przewodnik i18n 2025
description: Dowiedz się, jak uczynić swoją stronę Angular wielojęzyczną. Postępuj zgodnie z dokumentacją, aby internacjonalizować (i18n) i tłumaczyć ją.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
# applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Tłumacz swoją stronę Angular za pomocą Intlayer | Internacjonalizacja (i18n)

> Ten pakiet jest w trakcie rozwoju. Zobacz [zgłoszenie](https://github.com/aymericzip/intlayer/issues/116) po więcej informacji. Pokaż swoje zainteresowanie Intlayer dla Angular, lajkując to zgłoszenie

<!-- Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-angular-template) na GitHub. -->

## Czym jest Intlayer?

**Intlayer** to innowacyjna, open-source'owa biblioteka do internacjonalizacji (i18n), zaprojektowana, aby uprościć wsparcie wielojęzyczne w nowoczesnych aplikacjach webowych.

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentu.
- **Dynamicznie lokalizować metadane**, trasy i zawartość.
- **Zapewnić wsparcie dla TypeScript** dzięki automatycznie generowanym typom, co poprawia autouzupełnianie i wykrywanie błędów.
- **Skorzystaj z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i przełączanie lokalizacji.

---

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji Angular

### Krok 1: Instalacja zależności

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
npm install intlayer angular-intlayer @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/webpack
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/webpack
```

- **intlayer**

  Główny pakiet, który dostarcza narzędzia do internacjonalizacji do zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilecji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md).

- **angular-intlayer**
  Pakiet integrujący Intlayer z aplikacją Angular. Zapewnia dostawców kontekstu oraz hooki do internacjonalizacji w Angularze.

- **@intlayer/webpack**

  Pakiet integrujący Intlayer z Webpackiem. Jest używany przez Angular CLI do budowania plików deklaracji treści oraz monitorowania ich w trybie deweloperskim.

### Krok 2: Konfiguracja projektu

Utwórz plik konfiguracyjny, aby skonfigurować języki swojej aplikacji:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Twoje inne lokalizacje
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
      // Twoje inne lokalizacje
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
      // Twoje inne lokalizacje
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Dzięki temu plikowi konfiguracyjnemu możesz ustawić lokalizowane adresy URL, przekierowania w middleware, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji zawartości, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Krok 3: Integracja Intlayer z konfiguracją Angular

Aby zintegrować Intlayer z Angular CLI, masz dwie opcje w zależności od używanego buildera: `esbuild` lub `webpack`.

#### Opcja 1: Użycie esbuild (zalecane)

Najpierw zmodyfikuj swój plik `angular.json`, aby użyć niestandardowego buildera esbuild. Zaktualizuj konfigurację `build`:

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application",
          "options": {
            "plugins": ["./esbuild/intlayer-plugin.ts"]
          }
        }
      }
    }
  }
}
```

> Upewnij się, że zastąpiłeś `your-app-name` rzeczywistą nazwą swojego projektu w pliku `angular.json`.

Następnie utwórz plik `esbuild/intlayer-plugin.ts` w katalogu głównym swojego projektu:

```typescript fileName="esbuild/intlayer-plugin.ts"
import { prepareIntlayer, watch } from "@intlayer/chokidar";
import { getConfiguration, logger } from "@intlayer/config";
import type { Plugin } from "esbuild";

const intlayer: Plugin = {
  name: "intlayer-esbuild-plugin",
  setup(build) {
    const configuration = getConfiguration();
    let isWatching = false;

    build.onStart(async () => {
      logger("Wtyczka Intlayer esbuild uruchomiona", {
        level: "info",
      });

      if (build.initialOptions.watch && !isWatching) {
        logger("Tryb obserwacji włączony. Uruchamianie obserwatora...", {
          level: "info",
        });
        watch(configuration);
        isWatching = true;
      }

      try {
        await prepareIntlayer(configuration);
      } catch (error) {
        logger(`Błąd we wtyczce Intlayer esbuild: ${error}`, {
          level: "error",
        });
      }
    });
  },
};

export default intlayer;
```

> `intlayer` dla esbuild zapewnia przygotowanie Intlayer przed rozpoczęciem budowania oraz monitoruje zmiany w trybie deweloperskim.

#### Opcja 2: Użycie Webpack

Najpierw zmodyfikuj swój plik `angular.json`, aby użyć niestandardowego buildera Webpack. Zaktualizuj konfiguracje `build` i `serve`:

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.js"
            }
          }
        },
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server"
        }
      }
    }
  }
}
```

> Upewnij się, że zastąpiłeś `your-app-name` rzeczywistą nazwą swojego projektu w pliku `angular.json`.

Następnie utwórz plik `webpack.config.js` w katalogu głównym swojego projektu:

```javascript fileName="webpack.config.js"
const { IntlayerWebpackPlugin } = require("@intlayer/webpack");

module.exports = {
  plugins: [new IntlayerWebpackPlugin()],
};
```

> `IntlayerWebpackPlugin` służy do integracji Intlayer z Webpack. Zapewnia budowanie plików deklaracji treści oraz monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji. Dodatkowo dostarcza aliasy w celu optymalizacji wydajności.

### Krok 4: Zadeklaruj swoją zawartość

Utwórz i zarządzaj swoimi deklaracjami zawartości, aby przechowywać tłumaczenia:

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
    cliDocs: "Dokumentacja CLI",
    angularLanguageService: t({
      en: "Angular Language Service",
      fr: "Service de Langage Angular",
      es: "Servicio de Lenguaje Angular",
    }),
    angularDevTools: "Narzędzia deweloperskie Angular",
    github: "Github",
    twitter: "Twitter",
    youtube: "Youtube",
  },
} satisfies Dictionary;

export default appContent;
```

> Twoje deklaracje zawartości mogą być definiowane w dowolnym miejscu w aplikacji, pod warunkiem, że zostaną umieszczone w katalogu `contentDir` (domyślnie `./src`). I będą miały rozszerzenie pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Aby uzyskać więcej szczegółów, zapoznaj się z [dokumentacją deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Krok 5: Wykorzystaj Intlayer w swoim kodzie

Aby wykorzystać funkcje internacjonalizacji Intlayer w całej aplikacji Angular, musisz użyć funkcji `useIntlayer` w komponencie. Funkcja ta, dostępna z pakietu `angular-intlayer`, zapewnia dostęp do tłumaczeń jako reaktywnych sygnałów.

`IntlayerProvider` jest zarejestrowany w głównym module aplikacji, więc nie musisz dodawać go do providerów modułu.

Uzyskaj dostęp do słowników zawartości w klasie komponentu:

```typescript fileName="src/app/hello-world.component.ts"
import { Component, signal } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-hello-world",
  standalone: true,
  template: `
    <h1>{{ content().title }}</h1>

    <div class="card">
      <button type="button" (click)="increment()">
        {{ content().count }} {{ count() }}
      </button>
      <p [innerHTML]="content().edit"></p>
    </div>

    <p class="read-the-docs">{{ content().readTheDocs }}</p>
  `,
})
export class HelloWorldComponent {
  content = useIntlayer("helloworld");
  count = signal(0);

  increment() {
    this.count.update((value) => value + 1);
  }
}
```

Zawartość Intlayer jest zwracana jako `Signal`, więc dostęp do wartości uzyskujesz wywołując sygnał w szablonie: `content().title`.

### (Opcjonalnie) Krok 6: Zmień język swojej zawartości

Aby zmienić język zawartości, możesz użyć funkcji `setLocale` dostarczonej przez funkcję `useLocale`. Pozwala to ustawić lokalizację aplikacji i odpowiednio zaktualizować zawartość.

Utwórz komponent do przełączania między językami:

```typescript fileName="src/app/components/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { getLocaleName } from "intlayer";
import { useLocale } from "angular-intlayer";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="locale-switcher">
      <select [ngModel]="locale()" (ngModelChange)="changeLocale($event)">
        <option *ngFor="let loc of availableLocales" [value]="loc">
          {{ getLocaleName(loc) }}
        </option>
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  localeInfo = useLocale();
  locale = this.localeInfo.locale;
  availableLocales = this.localeInfo.availableLocales;

  // Udostępnij getLocaleName w szablonie
  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
```

Następnie użyj tego komponentu w swoim `app.component.ts`:

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { HelloWorldComponent } from "./hello-world.component";
import { LocaleSwitcherComponent } from "./components/locale-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HelloWorldComponent, LocaleSwitcherComponent],
  template: `
    <div>
      <app-locale-switcher />
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Logo Vite" />
      </a>
      <a href="https://angular.dev/" target="_blank">
        <img
          src="/assets/angular.svg"
          class="logo angular"
          alt="Logo Angular"
        />
      </a>
    </div>
    <app-hello-world />
  `,
})
export class AppComponent {}
```

### (Opcjonalny) Krok 7: Dodaj lokalizowane routowanie do swojej aplikacji

Dodanie lokalizowanego routingu w aplikacji Angular polega na użyciu Angular Router z prefiksami lokalizacji. Tworzy to unikalne ścieżki dla każdego języka, co jest przydatne dla SEO.

Przykład:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Najpierw upewnij się, że masz zainstalowany pakiet `@angular/router`.

Następnie utwórz konfigurację routera, która obsługuje routing oparty na lokalizacji w pliku `app.routes.ts`.

```typescript fileName="src/app/app.routes.ts"
import { Routes } from "@angular/router";
import { configuration, localeFlatMap } from "intlayer";
import { HomeComponent } from "./home/home.component";
import { RootComponent } from "./root/root.component";

const { defaultLocale } = configuration.internationalization;

export const routes: Routes = [
  localeFlatMap((localizedData) => [
    {
      path: `${localizedData.urlPrefix}`,
      component: RootComponent,
      data: { locale: localizedData.locale },
    },
    {
      path: `${localizedData.urlPrefix}/home`,
      component: HomeComponent,
      data: { locale: localizedData.locale },
    },
  ]),
  { path: "**", redirectTo: `/${defaultLocale}/home` },
];
```

Następnie musisz udostępnić router w swoim pliku `app.config.ts`.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

### (Opcjonalnie) Krok 8: Zmiana URL po zmianie lokalizacji

Aby automatycznie aktualizować URL, gdy użytkownik zmieni język, możesz zmodyfikować komponent `LocaleSwitcher`, aby korzystał z routera Angular:

```typescript fileName="src/app/components/locale-switcher.component.ts"
import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "angular-intlayer";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="locale-switcher">
      <select [ngModel]="locale()" (ngModelChange)="changeLocale($event)">
        <option *ngFor="let loc of availableLocales" [value]="loc">
          {{ getLocaleName(loc) }}
        </option>
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  private router = inject(Router);

  localeInfo = useLocale({
    onLocaleChange: (newLocale) => {
      const currentPath = this.router.url;
      const localizedPath = getLocalizedUrl(currentPath, newLocale);
      this.router.navigateByUrl(localizedPath);
    },
  });

  locale = this.localeInfo.locale;
  availableLocales = this.localeInfo.availableLocales;

  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
```

### (Opcjonalny) Krok 9: Zmiana atrybutów języka i kierunku w tagu HTML

Gdy Twoja aplikacja obsługuje wiele języków, kluczowe jest zaktualizowanie atrybutów `lang` i `dir` w tagu `<html>`, aby odpowiadały aktualnej lokalizacji.

Możesz utworzyć serwis, który zajmie się tym automatycznie.

```typescript fileName="src/app/services/i18n-html-attributes.service.ts"
import { Injectable, effect } from "@angular/core";
import { useLocale } from "angular-intlayer";
import { getHTMLTextDir } from "intlayer";

@Injectable({
  providedIn: "root",
})
export class I18nHtmlAttributesService {
  private localeInfo = useLocale();

  constructor() {
    effect(() => {
      const newLocale = this.localeInfo.locale();
      if (newLocale) {
        document.documentElement.lang = newLocale;
        document.documentElement.dir = getHTMLTextDir(newLocale);
      }
    });
  }

  // Ta metoda może być wywołana w głównym komponencie aplikacji, aby zapewnić inicjalizację serwisu.
  init() {}
}
```

Następnie wstrzyknij i zainicjalizuj ten serwis w swoim głównym komponencie `AppComponent`:

```typescript fileName="src/app/app.component.ts"
import { Component, inject } from "@angular/core";
// ... inne importy
import { I18nHtmlAttributesService } from "./services/i18n-html-attributes.service";

@Component({
  // ...
})
export class AppComponent {
  constructor() {
    inject(I18nHtmlAttributesService).init();
  }
}
```

### (Opcjonalny) Krok 10: Tworzenie dyrektywy zlokalizowanego linku

Aby zapewnić, że nawigacja w Twojej aplikacji respektuje aktualną lokalizację, możesz stworzyć niestandardową dyrektywę. Dyrektywa ta automatycznie dodaje prefiks języka do wewnętrznych adresów URL.

```typescript fileName="src/app/directives/localized-link.directive.ts"
import { Directive, Input, HostBinding, inject } from "@angular/core";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "angular-intlayer";

@Directive({
  selector: "a[appLocalizedLink]",
  standalone: true,
})
export class LocalizedLinkDirective {
  @Input("href") originalHref: string = "";

  private localeInfo = useLocale();

  @HostBinding("href")
  get localizedHref(): string {
    const locale = this.localeInfo.locale();
    const isExternalLink = /^https?:\/\//.test(this.originalHref);

    if (isExternalLink || !this.originalHref) {
      return this.originalHref;
    }

    return getLocalizedUrl(this.originalHref, locale);
  }
}
```

Aby z niego skorzystać, dodaj dyrektywę `appLocalizedLink` do swoich tagów anchor i upewnij się, że zaimportowałeś ją w swoim komponencie.

```typescript fileName="src/app/app.component.ts"
// ...
import { LocalizedLinkDirective } from "./directives/localized-link.directive";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [/*...,*/ LocalizedLinkDirective],
  template: ` <a href="/home" appLocalizedLink>Strona główna</a> `,
})
export class AppComponent {}
```

### (Opcjonalny) Krok 11: Renderowanie Markdown

Intlayer obsługuje renderowanie zawartości Markdown. Aby przekształcić Markdown w bogaty HTML, możesz zintegrować [markdown-it](https://github.com/markdown-it/markdown-it).

Najpierw zainstaluj `markdown-it`:

```bash
npm install markdown-it
# oraz jego typy
npm install -D @types/markdown-it
```

Następnie skonfiguruj `INTLAYER_MARKDOWN_TOKEN` w swoim pliku `app.config.ts`.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { createIntlayerMarkdownProvider } from "angular-intlayer/markdown";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    createIntlayerMarkdownProvider((markdown) => md.render(markdown)),
  ],
};
```

Domyślnie Intlayer zwraca renderowany HTML jako ciąg znaków. Jeśli używasz `[innerHTML]` do powiązania, pamiętaj o zagrożeniach bezpieczeństwa (XSS). Zawsze upewnij się, że Twoje treści pochodzą z zaufanego źródła.

W bardziej złożonych scenariuszach możesz utworzyć pipe do bezpiecznego renderowania HTML.

### Konfiguracja TypeScript

Intlayer używa rozszerzenia modułów, aby korzystać z zalet TypeScript i uczynić Twoją bazę kodu bardziej solidną.

![Autouzupełnianie](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Błąd tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Upewnij się, że Twoja konfiguracja TypeScript zawiera automatycznie generowane typy.

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Dołącz automatycznie generowane typy
  ],
}
```

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich zatwierdzania do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do swojego pliku `.gitignore`:

```plaintext
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby poprawić swoje doświadczenie programistyczne z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie oferuje:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podglądy w linii** przetłumaczonej zawartości.
- **Szybkie akcje** do łatwego tworzenia i aktualizowania tłumaczeń.

Aby uzyskać więcej informacji o korzystaniu z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer dla VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Idź dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyeksportować swoją zawartość, korzystając z [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).
