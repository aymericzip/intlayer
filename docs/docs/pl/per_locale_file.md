---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Deklaracja zawartości `Per-Locale` w Intlayer
description: Dowiedz się, jak deklarować zawartość per locale w Intlayer. Postępuj zgodnie z dokumentacją, aby zrozumieć różne formaty i przypadki użycia.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Per-Locale
  - TypeScript
  - JavaScript
slugs:
  - doc
  - concept
  - per-locale-file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Deklaracja zawartości `Per-Locale` w Intlayer

Intlayer obsługuje dwa sposoby deklarowania wielojęzycznej zawartości:

- Jeden plik ze wszystkimi tłumaczeniami
- Jeden plik na locale (format per-locale)

Ta elastyczność umożliwia:

- Łatwą migrację z innych narzędzi i18n
- Wsparcie dla zautomatyzowanych procesów tłumaczeniowych
- Jasna organizacja tłumaczeń w oddzielnych plikach specyficznych dla locale

## Jeden plik z wieloma tłumaczeniami

Ten format jest idealny dla:

- Szybkiej iteracji w kodzie.
- Bezproblemowej integracji z CMS.

Jest to zalecane podejście dla większości przypadków użycia. Centralizuje tłumaczenia, co ułatwia iterację i integrację z CMS.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="hello-world.content.ts" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> Zalecane: Ten format jest najlepszy podczas korzystania z wizualnego edytora Intlayer lub zarządzania tłumaczeniami bezpośrednio w kodzie.

## Format per-locale

Ten format jest przydatny, gdy:

- Chcesz wersjonować lub nadpisywać tłumaczenia niezależnie.
- Integrujesz procesy tłumaczeń maszynowych lub ludzkich.

Możesz również podzielić tłumaczenia na indywidualne pliki dla poszczególnych lokalizacji, określając pole locale:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Ważne
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Ważne
  content: { multilingualContent: "Título de mi componente" },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Definicja słownika treści dla komponentu "hello-world"
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Ważne
  content: { multilingualContent: "Title of my component" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Definicja słownika treści dla komponentu "hello-world" w języku hiszpańskim
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Ważne
  content: { multilingualContent: "Título de mi componente" },
};

export default helloWorldContent;
```

```js fileName="hello-world.en.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Ważne
  content: {
    multilingualContent: "Title of my component",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Ważne
  content: {
    multilingualContent: "Título de mi componente",
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="hello-world.en.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en", // Ważne
  "content": {
    "multilingualContent": "Tytuł mojego komponentu",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // Ważne
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> Ważne: Upewnij się, że pole locale jest zdefiniowane. Informuje Intlayer, jakiego języka dotyczy plik.

> Uwaga: W obu przypadkach plik deklaracji zawartości musi mieć nazwę zgodną z wzorcem `*.content.{ts,tsx,js,jsx,mjs,cjs,json}`, aby został rozpoznany przez Intlayer. Sufiks `.[locale]` jest opcjonalny i służy tylko jako konwencja nazewnicza.

## Mieszanie formatów

Możesz łączyć oba podejścia deklaracji dla tego samego klucza zawartości. Na przykład:

- Zadeklaruj swoją bazową zawartość statycznie w pliku takim jak index.content.ts.
- Dodaj lub nadpisz konkretne tłumaczenia w osobnych plikach, takich jak index.fr.content.ts lub index.content.json.

To rozwiązanie jest szczególnie przydatne, gdy:

- Chcesz zdefiniować początkową strukturę zawartości w kodzie.
- Planujesz wzbogacić lub uzupełnić tłumaczenia później, korzystając z CMS lub narzędzi automatycznych.

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### Przykład

Oto plik deklaracji zawartości wielojęzycznej:

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "Tytuł mojego komponentu",
    projectName: "Mój projekt",
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="Components/MyComponent/index.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer automatycznie łączy pliki wielojęzyczne i per-locale.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // Domyślny język to ENGLISH, więc zwróci zawartość w języku angielskim

console.log(JSON.stringify(intlayer, null, 2));
// Wynik:
// {
//  "multilingualContent": "Tytuł mojego komponentu",
//  "projectName": "Mój projekt"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// Wynik:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "Mój projekt"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// Wynik:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "Mój projekt"
// }
```

### Automatyczne generowanie tłumaczeń

Użyj [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md), aby automatycznie uzupełnić brakujące tłumaczenia na podstawie wybranych usług.
