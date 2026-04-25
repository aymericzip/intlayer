---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Tłumaczenie Astro i18n - Jak przetłumaczyć aplikację Astro w 2026 roku
description: Dowiedz się, jak dodać międzynarodowość (i18n) do swojej witryny Astro za pomocą Intlayer. Postępuj zgodnie z tym przewodnikiem, aby uczynić swoją witrynę wielojęzyczną.
keywords:
  - międzynarodowość
  - dokumentacja
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
  - version: 7.5.9
    date: 2025-12-30
    changes: "Dodano polecenie init"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Aktualizacja integracji z Astro, konfiguracji i użytkowania"
---

# Przetłumacz swoją witrynę Astro za pomocą Intlayer | Międzynarodowość (i18n)

## Czym jest Intlayer?

**Intlayer** to innowacyjna biblioteka międzynarodowości (i18n) o otwartym kodzie źródłowym, zaprojektowana w celu uproszczenia obsługi wielojęzyczności w nowoczesnych aplikacjach internetowych.

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami**: Korzystając z deklaratywnych słowników na poziomie komponentów.
- **Dynamicznie lokalizować metadane, trasy i treści**.
- **Zapewnić obsługę TypeScript**: Dzięki automatycznie generowanym typom dla lepszego autouzupełniania i wykrywania błędów.
- **Korzystać z zaawansowanych funkcji**: Takich jak dynamiczne wykrywanie języka i przełączanie języków.

---

## Przewodnik krok po kroku po konfiguracji Intlayer w Astro

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak umiędzynarodowić aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Sprawdź [szablon aplikacji](https://github.com/aymericzip/intlayer-astro-template) na GitHubie.

### Krok 1: Zainstaluj zależności

Zainstaluj niezbędne pakiety za pomocą preferowanego menedżera pakietów:

```bash packageManager="npm"
npm install intlayer astro-intlayer
# opcjonalnie: jeśli chcesz dodać obsługę islandów React
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# opcjonalnie: jeśli chcesz dodać obsługę islandów React
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# opcjonalnie: jeśli chcesz dodać obsługę islandów React
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Główny pakiet zapewniający narzędzia i18n do zarządzania konfiguracją, tłumaczeniami, [deklaracją treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilacją i [poleceniami CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **astro-intlayer**
  Wtyczka integracyjna Astro służąca do połączenia Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production); zawiera również oprogramowanie pośredniczące (middleware) do wykrywania preferowanego języka użytkownika, zarządzania plikami cookie i obsługi przekierowań URL.

### Krok 2: Skonfiguruj swój projekt

Utwórz plik konfiguracyjny, aby zdefiniować języki swojej aplikacji:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.POLISH,
      // Twoje inne języki
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Za pośrednictwem tego pliku konfiguracyjnego możesz ustawić zlokalizowane adresy URL, przekierowania oprogramowania pośredniczącego, nazwy plików cookie, lokalizację i rozszerzenia deklaracji treści, wyłączyć dzienniki Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Krok 3: Zintegruj Intlayer ze swoją konfiguracją Astro

Dodaj wtyczkę `intlayer` do konfiguracji Astro.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Wtyczka integracyjna `intlayer()` służy do integracji Intlayer z Astro. Zapewnia ona generowanie plików deklaracji treści i monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji Astro i udostępnia aliasy w celu optymalizacji wydajności.

### Krok 4: Zadeklaruj swoją treść

Twórz i zarządzaj swoimi deklaracjami treści, aby przechowywać tłumaczenia:

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
      pl: "Witaj świecie",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Deklaracje treści mogą być definiowane w dowolnym miejscu aplikacji, pod warunkiem, że są zawarte w `contentDir` (domyślnie `./src`) i pasują do rozszerzenia pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Więcej informacji znajdziesz w [dokumentacji deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Krok 5: Korzystanie z treści w Astro

Możesz konsumować słowniki bezpośrednio w swoich plikach `.astro`, używając podstawowych pomocników wyeksportowanych z `intlayer`.

```astro fileName="src/pages/index.astro"
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="pl">
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

### Krok 6: Zlokalizowany routing

Twórz dynamiczne segmenty tras (np. `src/pages/[locale]/index.astro`), aby serwować zlokalizowane strony:

```astro fileName="src/pages/[locale]/index.astro"
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Integracja z Astro dodaje oprogramowanie pośredniczące Vite, które pomaga w routingu uwzględniającym język i definiowaniu środowiska podczas programowania. Możesz również użyć własnej logiki lub narzędzi `intlayer`, takich jak `getLocalizedUrl`, aby tworzyć linki między językami.

### Krok 7: Kontynuuj korzystanie ze swojego ulubionego frameworka

Kontynuuj budowanie swojej aplikacji, korzystając z wybranego frameworka.

- Intlayer + React: [Intlayer z React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer z Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer z Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer z Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer z Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+preact.md)

### Konfiguracja TypeScript

Intlayer wykorzystuje rozszerzenie modułów (module augmentation), aby skorzystać z TypeScript, czyniąc bazę kodu bardziej solidną.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation Error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Upewnij się, że Twoja konfiguracja TypeScript zawiera automatycznie generowane typy.

```json5 fileName="tsconfig.json"
{
  // ... Twoja istniejąca konfiguracja TypeScript
  "include": [
    // ... Twoja istniejąca konfiguracja TypeScript
    ".intlayer/**/*.ts", // Uwzględnij automatycznie generowane typy
  ],
}
```

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Zapobiega to ich przesyłaniu do repozytorium Git.

Aby to zrobić, dodaj następujące instrukcje do pliku `.gitignore`:

```bash
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby poprawić wrażenia z programowania z Intlayer, możesz zainstalować **oficjalne rozszerzenie Intlayer dla VS Code**.

[Instalacja z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd inline** przetłumaczonej treści.
- **Szybkie akcje** do łatwego tworzenia i aktualizowania tłumaczeń.

Więcej informacji na temat korzystania z rozszerzenia znajdziesz w [dokumentacji rozszerzenia VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Pogłębiaj swoją wiedzę

Jeśli chcesz dowiedzieć się więcej, możesz również wdrożyć [Edytor Wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub użyć [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md), aby wyeksternalizować swoją treść.
