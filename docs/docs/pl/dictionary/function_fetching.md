---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Pobieranie funkcji
description: Dowiedz się, jak deklarować i używać pobierania funkcji na swojej wielojęzycznej stronie internetowej. Postępuj zgodnie z krokami w tej dokumentacji online, aby skonfigurować swój projekt w kilka minut.
keywords:
  - Pobieranie funkcji
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - function-fetching
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Pobieranie funkcji

Intlayer pozwala na deklarowanie funkcji zawartości w Twoich modułach zawartości, które mogą być zarówno synchroniczne, jak i asynchroniczne. Podczas budowania aplikacji Intlayer wykonuje te funkcje, aby uzyskać wynik funkcji. Wartość zwracana musi być obiektem JSON lub prostą wartością, taką jak string lub liczba.

> Uwaga: pobieranie funkcji jest obecnie niedostępne w deklaracjach zawartości JSON oraz w plikach zdalnych deklaracji zawartości.

## Deklaracje funkcji

Oto przykład prostej synchronicznej funkcji pobierającej zawartość:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "To jest zawartość renderowana przez funkcję",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "To jest zawartość renderowana przez funkcję",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "To jest zawartość renderowana przez funkcję",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "To jest zawartość renderowana przez funkcję"
  }
}
```

W tym przykładzie klucz `text` zawiera funkcję, która zwraca łańcuch znaków. Ta zawartość może być renderowana w Twoich komponentach React za pomocą pakietów interpretera Intlayer, takich jak `react-intlayer`.

## Asynchroniczne pobieranie funkcji

Oprócz funkcji synchronicznych, Intlayer obsługuje funkcje asynchroniczne, co pozwala na pobieranie danych z zewnętrznych źródeł lub symulowanie pobierania danych za pomocą danych testowych (mock).

Poniżej znajduje się przykład funkcji asynchronicznej, która symuluje pobieranie z serwera:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Poczekaj 200ms, aby zasymulować pobieranie z serwera
  return await setTimeout(200).then(
    () => "To jest zawartość pobrana z serwera"
  );
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies Dictionary;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // Poczekaj 200ms, aby zasymulować pobieranie z serwera
  await setTimeout(200);
  return "To jest zawartość pobrana z serwera";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // Poczekaj 200ms, aby zasymulować pobieranie z serwera
  await setTimeout(200);
  return "To jest zawartość pobrana z serwera";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
Brak możliwości pobrania zawartości z pliku JSON, użyj zamiast tego pliku .ts lub .js
```

W tym przypadku funkcja `fakeFetch` naśladuje opóźnienie, aby zasymulować czas odpowiedzi serwera. Intlayer wykonuje funkcję asynchroniczną i używa wyniku jako zawartości dla klucza `text`.

## Używanie zawartości opartej na funkcjach w komponentach React

Aby użyć zawartości opartej na funkcjach w komponencie React, musisz zaimportować `useIntlayer` z `react-intlayer` i wywołać ją z identyfikatorem zawartości, aby pobrać zawartość. Oto przykład:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Wyjście: To jest zawartość renderowana przez funkcję */}
      <p>{asyncFunctionContent.text}</p>
      {/* Wyjście: To jest zawartość pobrana z serwera */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Wyjście: To jest zawartość renderowana przez funkcję */}
      <p>{asyncFunctionContent.text}</p>
      {/* Wyjście: To jest zawartość pobrana z serwera */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Wyjście: To jest zawartość renderowana przez funkcję */}
      <p>{asyncFunctionContent.text}</p>
      {/* Wyjście: To jest zawartość pobrana z serwera */}
    </div>
  );
};

module.exports = MyComponent;
```
