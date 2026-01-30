---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: i18n Hono - Jak przetłumaczyć aplikację Hono – przewodnik 2026
description: Dowiedz się, jak sprawić, by Twój backend Hono był wielojęzyczny. Postępuj zgodnie z dokumentacją, aby go zainternacjonalizować (i18n) i przetłumaczyć.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Hono
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Dodaj polecenie init
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Przetłumacz swój backend Hono używając Intlayer | Internacjonalizacja (i18n)

`hono-intlayer` to potężne oprogramowanie pośredniczące (middleware) do internacjonalizacji (i18n) dla aplikacji Hono, zaprojektowane w celu udostępnienia usług backendowych globalnie poprzez dostarczanie zlokalizowanych odpowiedzi opartych na preferencjach klienta.

### Praktyczne Przypadki Użycia

- **Wyświetlanie Błędów Backendowych w Języku Użytkownika**: Gdy wystąpi błąd, wyświetlanie komunikatów w ojczystym języku użytkownika poprawia zrozumienie i zmniejsza frustrację. Jest to szczególnie przydatne w przypadku dynamicznych komunikatów o błędach, które mogą być wyświetlane w komponentach front-endowych, takich jak toasty czy modale.

- **Pobieranie Wielojęzycznej Treści**: W przypadku aplikacji pobierających treść z bazy danych, internacjonalizacja zapewnia możliwość serwowania tej treści w wielu językach. Jest to kluczowe dla platform takich jak witryny e-commerce czy systemy zarządzania treścią, które muszą wyświetlać opisy produktów, artykuły i inne treści w języku preferowanym przez użytkownika.

- **Wysyłanie Wielojęzycznych Wiadomości E-mail**: Niezależnie od tego, czy są to wiadomości transakcyjne, kampanie marketingowe czy powiadomienia, wysyłanie e-maili w języku odbiorcy może znacznie zwiększyć zaangażowanie i skuteczność.

- **Wielojęzyczne Powiadomienia Push**: W przypadku aplikacji mobilnych wysyłanie powiadomień push w preferowanym języku użytkownika może poprawić interakcję i retencję. Ten osobisty akcent sprawia, że powiadomienia wydają się bardziej istotne i skłaniające do działania.

- **Inna Komunikacja**: Każda forma komunikacji z backendu, taka jak wiadomości SMS, alerty systemowe czy aktualizacje interfejsu użytkownika, zyskuje na byciu w języku użytkownika, zapewniając jasność i poprawiając ogólne wrażenia użytkownika.

Poprzez internacjonalizację backendu, Twoja aplikacja nie tylko szanuje różnice kulturowe, ale także lepiej dopasowuje się do potrzeb rynku globalnego, co jest kluczowym krokiem w skalowaniu usług na całym świecie.

## Pierwsze Kroki

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-hono-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Zobacz [Application Template](https://github.com/aymericzip/intlayer-hono-template) na GitHub.

### Instalacja

Aby zacząć korzystać z `hono-intlayer`, zainstaluj pakiet za pomocą npm:

```bash packageManager="npm"
npm install intlayer hono-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
bunx intlayer init
```

### Konfiguracja

Skonfiguruj ustawienia internacjonalizacji, tworząc plik `intlayer.config.ts` w katalogu głównym projektu:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
      Locales.POLISH,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Deklarowanie Treści

Twórz i zarządzaj deklaracjami treści, aby przechowywać tłumaczenia:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      pl: "Przykład zwróconej treści w języku polskim",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

> Deklaracje treści mogą być definiowane w dowolnym miejscu w aplikacji, o ile są zawarte w katalogu `contentDir` (domyślnie `./src`) i pasują do rozszerzenia pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Więcej szczegółów znajdziesz w [dokumentacji deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Konfiguracja Aplikacji Hono

Skonfiguruj aplikację Hono do korzystania z `hono-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// Załaduj obsługę żądań internacjonalizacji
app.use("*", intlayer());

// Trasy
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      pl: "Przykład zwróconej treści w języku polskim",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

### Kompatybilność

`hono-intlayer` jest w pełni kompatybilny z:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/index.md) dla aplikacji React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/index.md) dla aplikacji Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/index.md) dla aplikacji Vite

Działa również bezproblemowo z dowolnym rozwiązaniem do internacjonalizacji w różnych środowiskach, w tym w przeglądarkach i żądaniach API. Możesz dostosować middleware, aby wykrywał język poprzez nagłówki lub pliki cookie:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Inne opcje konfiguracji
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

Domyślnie `hono-intlayer` będzie interpretować nagłówek `Accept-Language` w celu określenia preferowanego języka klienta.

> Więcej informacji na temat konfiguracji i zaawansowanych tematów znajdziesz w naszej [dokumentacji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Konfiguracja TypeScript

`hono-intlayer` wykorzystuje potężne możliwości TypeScript, aby usprawnić proces internacjonalizacji. Statyczne typowanie TypeScript zapewnia uwzględnienie każdego klucza tłumaczenia, zmniejszając ryzyko brakujących tłumaczeń i poprawiając łatwość utrzymania.

![Autouzupełnianie](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Błąd tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Upewnij się, że automatycznie wygenerowane typy (domyślnie w ./types/intlayer.d.ts) są uwzględnione w pliku tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Uwzględnij automatycznie wygenerowane typy
  ],
}
```

### Rozszerzenie VS Code

Aby poprawić wrażenia z programowania z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** dla kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podglądy inline** przetłumaczonej treści.
- **Szybkie akcje** ułatwiające tworzenie i aktualizowanie tłumaczeń.

Więcej szczegółów na temat korzystania z rozszerzenia znajdziesz w [dokumentacji rozszerzenia Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć zatwierdzania ich do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```
