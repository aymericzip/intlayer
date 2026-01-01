---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: "Jak przetłumaczyć backend Fastify – przewodnik i18n 2026"
description: "Dowiedz się, jak uczynić backend Fastify wielojęzycznym. Postępuj zgodnie z dokumentacją, aby zinternacjonalizować (i18n) i przetłumaczyć go."
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Fastify
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: Dodano polecenie init
  - version: 7.6.0
    date: 2025-12-31
    changes: Inicjalizacja historii
---

# Przetłumacz backend Fastify przy użyciu Intlayer | Internacjonalizacja (i18n)

`fastify-intlayer` to potężny plugin do internacjonalizacji (i18n) dla aplikacji Fastify, zaprojektowany, aby uczynić twoje usługi backendowe globalnie dostępnymi poprzez dostarczanie zlokalizowanych odpowiedzi na podstawie preferencji klienta.

### Praktyczne przypadki użycia

- **Wyświetlanie błędów backendu w języku użytkownika**: Gdy wystąpi błąd, wyświetlanie komunikatów w ojczystym języku użytkownika poprawia zrozumienie i zmniejsza frustrację. Jest to szczególnie przydatne dla dynamicznych komunikatów o błędach, które mogą być pokazywane w komponentach front-endowych, takich jak toasty czy modalne okna.

`fastify-intlayer` to potężna wtyczka do internacjonalizacji (i18n) dla aplikacji Fastify, zaprojektowana, by uczynić Twoje serwisy backendowe globalnie dostępnymi, dostarczając zlokalizowane odpowiedzi zgodnie z preferencjami klienta.

### Praktyczne zastosowania

- **Wyświetlanie błędów backendu w języku użytkownika**: Gdy wystąpi błąd, wyświetlanie komunikatów w języku ojczystym użytkownika poprawia zrozumienie i zmniejsza frustrację. Jest to szczególnie przydatne w przypadku dynamicznych komunikatów o błędach, które mogą być pokazywane w komponentach front-endowych, takich jak toasty czy modale.
- **Pobieranie wielojęzycznych treści**: W aplikacjach pobierających treści z bazy danych internacjonalizacja zapewnia możliwość serwowania tych treści w wielu językach. Jest to kluczowe dla platform takich jak serwisy e-commerce czy systemy zarządzania treścią (CMS), które muszą wyświetlać opisy produktów, artykuły i inne treści w języku preferowanym przez użytkownika.
- **Pobieranie treści wielojęzycznych**: Dla aplikacji pobierających treści z bazy danych, internacjonalizacja zapewnia możliwość serwowania tych treści w wielu językach. Jest to kluczowe dla platform takich jak serwisy e-commerce czy systemy zarządzania treścią, które muszą wyświetlać opisy produktów, artykuły i inne treści w języku preferowanym przez użytkownika.
- **Wysyłanie wiadomości e-mail w wielu językach**: Niezależnie czy to wiadomości transakcyjne, kampanie marketingowe czy powiadomienia, wysyłanie e-maili w języku odbiorcy może znacząco zwiększyć zaangażowanie i skuteczność.
- **Wielojęzyczne powiadomienia push**: Dla aplikacji mobilnych wysyłanie powiadomień push w preferowanym języku użytkownika może zwiększyć zaangażowanie i retencję. Ten osobisty akcent sprawia, że powiadomienia wydają się bardziej istotne i skłaniają do działania.
- **Inne formy komunikacji**: Każda forma komunikacji ze strony backendu, taka jak wiadomości SMS, alerty systemowe czy aktualizacje interfejsu użytkownika, zyskuje na użyciu języka użytkownika, co zapewnia przejrzystość i poprawia ogólne doświadczenie użytkownika.

Dzięki internacjonalizacji backendu Twoja aplikacja nie tylko szanuje różnice kulturowe, ale także lepiej dopasowuje się do potrzeb rynków globalnych, co czyni to kluczowym krokiem w skalowaniu usług na cały świat.

## Pierwsze kroki

### Instalacja

Aby rozpocząć korzystanie z `fastify-intlayer`, zainstaluj pakiet za pomocą npm:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init

```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init

```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init

```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
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
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
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
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Deklarowanie treści

Twórz i zarządzaj deklaracjami treści, aby przechowywać tłumaczenia:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      pl: "Przykład zwracanej treści w języku angielskim",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      pl: "Przykład zwracanej treści w języku angielskim",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      pl: "Przykład zwracanej treści w języku angielskim",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "pl": "Przykład zwróconej zawartości w języku polskim",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "pl": "Przykład zwróconej zawartości w języku polskim",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Deklaracje zawartości mogą być zdefiniowane w dowolnym miejscu aplikacji, pod warunkiem że znajdują się w katalogu `contentDir` (domyślnie `./src`) i mają odpowiednie rozszerzenie pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Po więcej szczegółów odnieś się do [dokumentacji deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Konfiguracja aplikacji Fastify

Skonfiguruj swoją aplikację Fastify, aby korzystała z `fastify-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Załaduj wtyczkę internacjonalizacji
await fastify.register(intlayer);

// Trasy
fastify.get("/t_example", async (_req, reply) => {
  return t({
    pl: "Przykład zwróconej zawartości w języku polskim",
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Uruchom serwer
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Załaduj wtyczkę internacjonalizacji
await fastify.register(intlayer);

// Trasy
fastify.get("/t_example", async (_req, reply) => {
  return t({
    pl: "Przykład zwracanej treści w języku polskim",
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

javascript fileName="src/index.mjs" codeFormat="esm"
fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Uruchom serwer
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// Funkcja uruchamiająca serwer obsługująca async/await
const start = async () => {
  try {
    // Załaduj wtyczkę internacjonalizacji
    await fastify.register(intlayer);

    // Trasy
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        pl: "Przykład zwróconej treści w języku polskim",
        en: "Example of returned content in English",
        fr: "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)",
      });
    });

    fastify.get("/getIntlayer_example", async (_req, reply) => {
      return getIntlayer("index").exampleOfContent;
    });

    fastify.get("/getDictionary_example", async (_req, reply) => {
      return getDictionary(dictionaryExample).exampleOfContent;
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Zgodność

`fastify-intlayer` jest w pełni zgodny z:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/index.md) dla aplikacji React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/index.md) dla aplikacji Next.js

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/index.md)>) dla aplikacji React
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/index.md)>) dla aplikacji Next.js
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/index.md)>) dla aplikacji Vite

Działa również bezproblemowo z dowolnym rozwiązaniem do internacjonalizacji w różnych środowiskach, w tym w przeglądarkach i w żądaniach API. Możesz dostosować middleware, aby wykrywać lokalizę przez nagłówki lub ciasteczka:

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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Inne opcje konfiguracji
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Inne opcje konfiguracji
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

Domyślnie `fastify-intlayer` zinterpretuje nagłówek `Accept-Language`, aby określić preferowany język klienta.

> Więcej informacji na temat konfiguracji i zagadnień zaawansowanych znajdziesz w naszej [dokumentacji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Konfiguracja TypeScript

`fastify-intlayer` wykorzystuje rozbudowane możliwości TypeScript, aby usprawnić proces internacjonalizacji. Statyczne typowanie TypeScript zapewnia, że każdy klucz tłumaczenia jest uwzględniony, zmniejszając ryzyko brakujących tłumaczeń i poprawiając konserwowalność.

Upewnij się, że autogenerowane typy (domyślnie w ./types/intlayer.d.ts) są uwzględnione w pliku tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Uwzględnij autogenerowane typy
  ],
}
```

### Rozszerzenie VS Code

Aby poprawić doświadczenie deweloperskie z Intlayer, możesz zainstalować oficjalne rozszerzenie **Intlayer dla VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd przetłumaczonej zawartości bezpośrednio w edytorze**.
- **Szybkie akcje** umożliwiające łatwe tworzenie i aktualizowanie tłumaczeń.

Aby uzyskać więcej informacji o sposobie korzystania z rozszerzenia, zapoznaj się z dokumentacją [Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich zatwierdzania do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```
