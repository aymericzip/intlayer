---
createdAt: 2024-03-07
updatedAt: 2025-10-03
title: Jak przetłumaczyć swoją aplikację Astro – przewodnik i18n 2025
description: Dowiedz się, jak dodać internacjonalizację (i18n) do swojej strony Astro za pomocą Intlayer. Postępuj zgodnie z tym przewodnikiem, aby uczynić swoją stronę wielojęzyczną.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 6.2.0
    date: 2025-10-03
    changes: Odświeżenie integracji z Astro, konfiguracji, użytkowania
---

### Idź dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyodrębnić swoją zawartość, korzystając z [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).---
createdAt: 2024-03-07
updatedAt: 2025-10-03
title: Jak przetłumaczyć swoją aplikację Astro – przewodnik i18n 2025
description: Dowiedz się, jak dodać internacjonalizację (i18n) do swojej strony Astro za pomocą Intlayer. Postępuj zgodnie z tym przewodnikiem, aby uczynić swoją stronę wielojęzyczną.
keywords:

- Internacjonalizacja
- Dokumentacja
- Intlayer
- Vite
- React
- i18n
- JavaScript
  slugs:
- doc
- environment
- astro
  applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
  history:
- version: 6.2.0
  date: 2025-10-03
  changes: Odświeżenie integracji z Astro, konfiguracji, użytkowania

---

# Tłumacz swoją stronę Astro za pomocą Intlayer | Internacjonalizacja (i18n)

## Czym jest Intlayer?

**Intlayer** to innowacyjna, open-source'owa biblioteka do internacjonalizacji (i18n), zaprojektowana, aby uprościć wsparcie wielojęzyczne w nowoczesnych aplikacjach webowych.

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentów.
- **Dynamicznie lokalizować metadane**, ścieżki i treści.
- **Zapewnić wsparcie dla TypeScript** dzięki automatycznie generowanym typom, co poprawia autouzupełnianie i wykrywanie błędów.
- **Korzystać z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i przełączanie lokalizacji.

---

## Przewodnik krok po kroku: konfiguracja Intlayer w Astro

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-astro-template) na GitHub.

### Krok 1: Instalacja zależności

Zainstaluj niezbędne pakiety za pomocą swojego menedżera pakietów:

```bash packageManager="npm"
npm install intlayer astro-intlayer
# Opcjonalnie: dodaj wsparcie dla React island
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# Opcjonalnie: dodaj wsparcie dla React island
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
 # Opcjonalnie: dodaj wsparcie dla React island
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Główny pakiet, który dostarcza narzędzia do internacjonalizacji do zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilecji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md).

- **astro-intlayer**
  Zawiera wtyczkę integracyjną Astro do integracji Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production), a także middleware do wykrywania preferowanego języka użytkownika, zarządzania ciasteczkami i obsługi przekierowań URL.

### Krok 2: Konfiguracja Twojego projektu

Utwórz plik konfiguracyjny, aby skonfigurować języki swojej aplikacji:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Twoje pozostałe lokalizacje
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Dzięki temu plikowi konfiguracyjnemu możesz ustawić lokalizowane adresy URL, przekierowania w middleware, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji treści, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracyjnej](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Krok 3: Zintegruj Intlayer w konfiguracji Astro

Dodaj wtyczkę intlayer do swojej konfiguracji.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Wtyczka integracyjna `intlayer()` dla Astro służy do integracji Intlayer z Astro. Zapewnia budowanie plików deklaracji treści oraz monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji Astro. Dodatkowo dostarcza aliasy w celu optymalizacji wydajności.

### Krok 4: Zadeklaruj swoją treść

Twórz i zarządzaj deklaracjami treści, aby przechowywać tłumaczenia:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Twoje deklaracje treści mogą być definiowane w dowolnym miejscu w aplikacji, pod warunkiem, że zostaną umieszczone w katalogu `contentDir` (domyślnie `./src`). Muszą również odpowiadać rozszerzeniu pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Po więcej szczegółów odsyłamy do [dokumentacji dotyczącej deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Krok 5: Użyj swojej treści w Astro

Możesz korzystać ze słowników bezpośrednio w plikach `.astro` za pomocą podstawowych helperów eksportowanych przez `intlayer`.

```astro fileName="src/pages/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
  </body>
</html>
```

### Krok 6: Lokalizowane routowanie

Utwórz dynamiczny segment ścieżki, aby obsługiwać lokalizowane strony, na przykład `src/pages/[locale]/index.astro`:

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Integracja Astro dodaje middleware Vite podczas developmentu, który pomaga w routingu uwzględniającym lokalizację oraz definicjach środowiska. Nadal możesz tworzyć linki między lokalizacjami używając własnej logiki lub funkcji pomocniczych, takich jak `getLocalizedUrl` z `intlayer`.

### Krok 7: Kontynuuj korzystanie z ulubionego frameworka

Kontynuuj korzystanie z ulubionego frameworka do budowy swojej aplikacji.

- Intlayer + React: [Intlayer z React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer z Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer z Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer z Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer z Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+preact.md)

### Konfiguracja TypeScript

Intlayer używa rozszerzenia modułów, aby korzystać z zalet TypeScript i wzmocnić Twoją bazę kodu.

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

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich zatwierdzania do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby poprawić doświadczenie programistyczne z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie oferuje:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podglądy w linii** przetłumaczonej zawartości.
- **Szybkie akcje** umożliwiające łatwe tworzenie i aktualizowanie tłumaczeń.

Aby uzyskać więcej informacji na temat korzystania z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Idź dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyodrębnić swoją zawartość, korzystając z [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

---
