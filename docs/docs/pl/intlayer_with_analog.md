---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Analog i18n - Jak przetłumaczyć swoją aplikację Analog – przewodnik 2026
description: Dowiedz się, jak uczynić swoją aplikację Analog wielojęzyczną. Postępuj zgodnie z dokumentacją, aby przeprowadzić internacjonalizację (i18n) i tłumaczenie.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Analog
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - analog
applicationTemplate: https://github.com/aymericzip/intlayer/tree/main/examples/analog-app-template
history:
  - version: 8.0.4
    date: 2026-01-26
    changes: Inicjalizacja historii
---

# Przetłumacz swoją aplikację Analog (Angular) za pomocą Intlayer | Internacjonalizacja (i18n)

## Spis treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna biblioteka internacjonalizacji (i18n) typu open-source, zaprojektowana w celu uproszczenia obsługi wielojęzyczności w nowoczesnych aplikacjach internetowych.

Z Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentów.
- **Dynamicznie lokalizować metadane**, trasy i treści.
- **Zapewnić wsparcie TypeScript** dzięki automatycznie generowanym typom, poprawiając autouzupełnianie i wykrywanie błędów.
- **Korzystać z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i przełączanie języka (locale).

---

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji Analog

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer/tree/main/examples/vite-analog-app?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak przeprowadzić internacjonalizację aplikacji za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer/tree/main/examples/analog-app-template) na GitHubie.

### Krok 1: Instalacja zależności

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
npm install intlayer angular-intlayer vite-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer vite-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer vite-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer vite-intlayer
bunx intlayer init
```

- **intlayer**

  Główny pakiet dostarczający narzędzia i18n do zarządzania konfiguracją, tłumaczenia, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilacji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **angular-intlayer**
  Pakiet integrujący Intlayer z aplikacją Angular. Dostarcza dostawców kontekstu (context providers) i hooki dla internacjonalizacji Angulara.

- **vite-intlayer**
  Pakiet integrujący Intlayer z Vite. Dostarcza wtyczkę (plugin) do obsługi plików deklaracji treści i ustawia aliasy dla optymalnej wydajności.

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
      // Twoje inne języki
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
      // Twoje inne języki
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
      // Twoje inne języki
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Za pomocą tego pliku konfiguracyjnego możesz ustawić zlokalizowane adresy URL, przekierowania middleware, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji treści, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Krok 3: Zintegruj Intlayer w konfiguracji Vite

Aby zintegrować Intlayer z Analog, musisz użyć wtyczki `vite-intlayer`.

Zmodyfikuj plik `vite.config.ts`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import analog from "@analogjs/platform";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    analog(),
    intlayer(), // Dodaj wtyczkę Intlayer
  ],
}));
```

> Wtyczka `intlayer()` konfiguruje Vite do pracy z Intlayer. Obsługuje pliki deklaracji treści i ustawia aliasy dla optymalnej wydajności.

### Krok 4: Zadeklaruj swoją treść

Twórz i zarządzaj deklaracjami treści, aby przechowywać tłumaczenia:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
      pl: "Witaj",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
      pl: "Gratulacje! Twoja aplikacja działa. 🎉",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Deklaracje treści mogą być definiowane w dowolnym miejscu aplikacji, o ile znajdują się w katalogu `contentDir` (domyślnie `./src`) i pasują do rozszerzenia pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Więcej szczegółów znajdziesz w [dokumentacji deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Krok 5: Użyj Intlayer w kodzie

Aby korzystać z funkcji internacjonalizacji Intlayer w całej aplikacji Analog, musisz dodać Intlayer do konfiguracji aplikacji.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideIntlayer } from "angular-intlayer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideIntlayer(), // Dodaj tutaj dostawcę Intlayer
  ],
};
```

Następnie możesz użyć funkcji `useIntlayer` w dowolnym komponencie.

```typescript fileName="src/app/pages/index.page.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  standalone: true,
  template: `
    <div class="content">
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>
    </div>
  `,
})
export default class HomeComponent {
  content = useIntlayer("app");
}
```

Treść Intlayer jest zwracana jako `Signal`, więc dostęp do wartości uzyskujesz wywołując sygnał: `content().title`.

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

Następnie użyj tego komponentu na swoich stronach:

```typescript fileName="src/app/pages/index.page.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "../locale-switcher.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [LocaleSwitcherComponent],
  template: `
    <app-locale-switcher></app-locale-switcher>
    <div class="content">
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>
    </div>
  `,
})
export default class HomeComponent {
  content = useIntlayer("app");
}
```

### Konfiguracja TypeScript

Intlayer wykorzystuje rozszerzanie modułów (module augmentation), aby czerpać korzyści z TypeScript i wzmocnić bazę kodu.

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

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich zatwierdzania w repozytorium Git.

Aby to zrobić, dodaj następujące instrukcje do pliku `.gitignore`:

```plaintext
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby usprawnić proces programowania z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd inline** przetłumaczonej treści.
- **Szybkie akcje** ułatwiające tworzenie i aktualizację tłumaczeń.

Więcej szczegółów na temat korzystania z rozszerzenia znajdziesz w [dokumentacji rozszerzenia Intlayer dla VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Dowiedz się więcej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyeksportować treść do zewnętrznego systemu za pomocą [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).
