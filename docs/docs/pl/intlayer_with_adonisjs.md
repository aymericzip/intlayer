---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: AdonisJS i18n - Jak przetłumaczyć aplikację AdonisJS – przewodnik 2026
description: Dowiedz się, jak uczynić swój backend AdonisJS wielojęzycznym. Postępuj zgodnie z dokumentacją, aby go umiędzynarodowić (i18n) i przetłumaczyć.
keywords:
  - Międzynarodowienie
  - Dokumentacja
  - Intlayer
  - AdonisJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonisjs-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: Inicjalizacja historii
---

# Przetłumacz swój backend AdonisJS za pomocą Intlayer | Międzynarodowienie (i18n)

`adonis-intlayer` to potężny pakiet do międzynarodowienia (i18n) dla aplikacji AdonisJS, zaprojektowany, aby uczynić Twoje usługi backendowe dostępnymi globalnie poprzez dostarczanie zlokalizowanych odpowiedzi na podstawie preferencji klienta.

### Praktyczne przypadki użycia

- **Wyświetlanie błędów backendu w języku użytkownika**: Gdy wystąpi błąd, wyświetlanie komunikatów w ojczystym języku użytkownika poprawia zrozumienie i zmniejsza frustrację. Jest to szczególnie przydatne w przypadku dynamicznych komunikatów o błędach, które mogą być wyświetlane w komponentach front-endowych, takich jak toasty czy modale.

- **Pobieranie wielojęzycznej treści**: W przypadku aplikacji pobierających treści z bazy danych, międzynarodowienie zapewnia, że możesz serwować te treści w wielu językach. Jest to kluczowe dla platform takich jak strony e-commerce czy systemy zarządzania treścią, które muszą wyświetlać opisy produktów, artykuły i inne treści w języku preferowanym przez użytkownika.

- **Wysyłanie wielojęzycznych wiadomości e-mail**: Niezależnie od tego, czy są to e-maile transakcyjne, kampanie marketingowe czy powiadomienia, wysyłanie e-maili w języku odbiorcy może znacznie zwiększyć zaangażowanie i skuteczność.

- **Wielojęzyczne powiadomienia push**: W przypadku aplikacji mobilnych wysyłanie powiadomień push w preferowanym języku użytkownika może zwiększyć interakcję i retencję. Ten osobisty akcent sprawia, że powiadomienia wydają się bardziej istotne i zachęcające do działania.

- **Inne formy komunikacji**: Każda forma komunikacji z backendu, taka jak wiadomości SMS, alerty systemowe czy aktualizacje interfejsu użytkownika, zyskuje na byciu w języku użytkownika, zapewniając jasność i poprawiając ogólne wrażenia użytkownika.

Umiędzynarodawiając backend, Twoja aplikacja nie tylko szanuje różnice kulturowe, ale także lepiej dopasowuje się do potrzeb globalnego rynku, co jest kluczowym krokiem w skalowaniu usług na całym świecie.

## Pierwsze kroki

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-adonisjs-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Zobacz [Application Template](https://github.com/aymericzip/intlayer-adonisjs-template) na GitHub.

### Instalacja

Aby zacząć korzystać z `adonis-intlayer`, zainstaluj pakiet za pomocą npm:

```bash packageManager="npm"
npm install intlayer adonis-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
bunx intlayer init
```

### Konfiguracja

Skonfiguruj ustawienia międzynarodowienia, tworząc plik `intlayer.config.ts` w głównym katalogu projektu:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Deklarowanie treści

Twórz deklaracje treści i zarządzaj nimi, aby przechowywać tłumaczenia:

```typescript fileName="app/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      pl: "Przykład treści zwróconej w języku polskim",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="app/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      pl: "Przykład treści zwróconej w języku polskim",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="app/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      pl: "Przykład treści zwróconej w języku polskim",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "pl": "Przykład treści zwróconej w języku polskim",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Twoje deklaracje treści mogą być zdefiniowane w dowolnym miejscu w aplikacji, o ile są zawarte w katalogu `contentDir` (domyślnie `./src` lub `./app`) i pasują do rozszerzenia pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Aby uzyskać więcej szczegółów, zapoznaj się z [dokumentacją deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Konfiguracja aplikacji AdonisJS

Skonfiguruj aplikację AdonisJS tak, aby korzystała z `adonis-intlayer`.

#### Rejestracja middleware

Najpierw musisz zarejestrować middleware `intlayer` w swojej aplikacji.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### Definiowanie tras

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    pl: "Przykład treści zwróconej w języku polskim",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### Funkcje

`adonis-intlayer` eksportuje kilka funkcji do obsługi międzynarodowienia w aplikacji:

- `t(content, locale?)`: Podstawowa funkcja tłumaczenia.
- `getIntlayer(key, locale?)`: Pobiera treść według klucza z Twoich słowników.
- `getDictionary(dictionary, locale?)`: Pobiera treść z określonego obiektu słownika.
- `getLocale()`: Pobiera bieżącą lokalizację z kontekstu żądania.

#### Użycie w kontrolerach

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
        pl: "Witaj z kontrolera",
      })
    );
  }
}
```

### Kompatybilność

`adonis-intlayer` jest w pełni kompatybilny z:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/index.md) dla aplikacji React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/index.md) dla aplikacji Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/index.md) dla aplikacji Vite

Działa również bezproblemowo z dowolnym rozwiązaniem do międzynarodowienia w różnych środowiskach, w tym w przeglądarkach i żądaniach API. Możesz dostosować middleware tak, aby wykrywał lokalizację poprzez nagłówki lub pliki cookie:

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

Domyślnie `adonis-intlayer` będzie interpretować nagłówek `Accept-Language` w celu określenia preferowanego języka klienta.

> Aby uzyskać więcej informacji na temat konfiguracji i zaawansowanych zagadnień, odwiedź naszą [dokumentację](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Konfiguracja TypeScript

`adonis-intlayer` wykorzystuje potężne możliwości TypeScript, aby usprawnić proces międzynarodowienia. Statyczne typowanie TypeScript zapewnia, że każdy klucz tłumaczenia jest uwzględniony, zmniejszając ryzyko brakujących tłumaczeń i poprawiając łatwość konserwacji.

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

Aby poprawić wrażenia z programowania z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** dla kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd wewnątrz wiersza** przetłumaczonej treści.
- **Szybkie akcje**, aby łatwo tworzyć i aktualizować tłumaczenia.

Więcej szczegółów na temat korzystania z rozszerzenia znajdziesz w [dokumentacji rozszerzenia Intlayer dla VS Code](https://intlayer.org/pl/doc/vs-code-extension).

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć zatwierdzania ich w repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```
