---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentacja hooka useDictionary | next-intlayer
description: Zobacz, jak używać hooka useDictionary w pakiecie next-intlayer
keywords:
  - useDictionary
  - słownik
  - klucz
  - Intlayer
  - Internacjonalizacja
  - Dokumentacja
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Integracja z React: Dokumentacja hooka `useDictionary`

Ta sekcja zawiera szczegółowe wskazówki dotyczące używania hooka `useDictionary` w aplikacjach React, umożliwiając efektywne zarządzanie lokalizowanymi treściami bez wizualnego edytora.

## Importowanie `useDictionary` w React

Hook `useDictionary` można zintegrować z aplikacjami React, importując go w zależności od kontekstu:

- **Komponent Klienta:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // Używane w komponentach React po stronie klienta
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // Używane w komponentach React po stronie klienta
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // Używane w komponentach React po stronie klienta
  ```

- **Komponent Serwera:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // Używane w komponentach React po stronie serwera
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // Używane w komponentach React po stronie serwera
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // Używane w komponentach React po stronie serwera
  ```

## Parametry

Hook przyjmuje dwa parametry:

1. **`dictionary`**: Zadeklarowany obiekt słownika zawierający zlokalizowane treści dla określonych kluczy.
2. **`locale`** (opcjonalny): Żądany locale. Domyślnie używany jest locale z bieżącego kontekstu, jeśli nie zostanie określony.

## Słownik

Wszystkie obiekty słownika powinny być deklarowane w uporządkowanych plikach zawartości, aby zapewnić bezpieczeństwo typów i zapobiec błędom w czasie wykonywania. Instrukcje konfiguracji można znaleźć [tutaj](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md). Oto przykład deklaracji zawartości:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies Dictionary;

export default exampleContent;
```

```javascript fileName="component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Przykładowa zawartość słownika
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

export default exampleContent;
```

```javascript fileName="component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Przykładowa zawartość słownika
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = exampleContent;
```

## Przykład użycia w komponencie klienta React

Poniżej znajduje się przykład, jak użyć hooka `useDictionary` w komponencie React:

```tsx fileName="ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.mjs" codeFormat="esm"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import exampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.cjs" codeFormat="commonjs"
"use client";

const { useDictionary } = require("next-intlayer");
const exampleContent = require("./component.content");

const ClientComponentExample = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Przykład użycia w komponencie React Server

Jeśli używasz hooka `useDictionary` poza `IntlayerServerProvider`, locale musi być jawnie przekazane jako parametr podczas renderowania komponentu:

```tsx fileName="ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.mjs" codeFormat="esm"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.cjs" codeFormat="commonjs"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Uwagi dotyczące atrybutów

W przeciwieństwie do integracji wykorzystujących edytory wizualne, atrybuty takie jak `buttonTitle.value` nie mają tutaj zastosowania. Zamiast tego bezpośrednio odwołuj się do zlokalizowanych łańcuchów znaków zadeklarowanych w Twojej zawartości.

```jsx
<button title={content.title}>{content.content}</button>
```

## Dodatkowe wskazówki

- **Bezpieczeństwo typów**: Zawsze używaj `Dictionary` do definiowania swoich słowników, aby zapewnić bezpieczeństwo typów.
- **Aktualizacje lokalizacji**: Podczas aktualizacji treści upewnij się, że wszystkie lokalizacje są spójne, aby uniknąć brakujących tłumaczeń.

Niniejsza dokumentacja koncentruje się na integracji hooka `useDictionary`, oferując uproszczone podejście do zarządzania zlokalizowaną zawartością bez polegania na funkcjonalnościach edytora wizualnego.
