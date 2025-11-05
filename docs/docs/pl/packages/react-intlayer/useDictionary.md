---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Hook useDictionary - Dokumentacja React Intlayer
description: Kompletny przewodnik po użyciu hooka useDictionary w aplikacjach React z Intlayer do efektywnego zarządzania lokalizowanymi treściami bez wizualnego edytora.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - lokalizacja
  - i18n
  - słownik
  - tłumaczenie
slugs:
  - doc
  - package
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Integracja z React: Dokumentacja hooka `useDictionary`

Ta sekcja zawiera szczegółowe wskazówki dotyczące użycia hooka `useDictionary` w aplikacjach React, umożliwiając efektywne zarządzanie lokalizowanymi treściami bez wizualnego edytora.

## Importowanie `useDictionary` w React

Hook `useDictionary` można zintegrować z aplikacjami React, importując go w zależności od kontekstu:

- **Komponent Klienta:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // Używane w komponentach React po stronie klienta
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // Używane w komponentach React po stronie klienta
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // Używane w komponentach React po stronie klienta
  ```

- **Komponent Serwera:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // Używane w komponentach React po stronie serwera
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // Używane w komponentach React po stronie serwera
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // Używane w komponentach React po stronie serwera
  ```

## Parametry

Hook przyjmuje dwa parametry:

1. **`dictionary`**: Zadeklarowany obiekt słownika zawierający zlokalizowane treści dla określonych kluczy.
2. **`locale`** (opcjonalny): Żądany locale. Domyślnie używany jest locale z bieżącego kontekstu, jeśli nie zostanie podany.

## Słownik

Wszystkie obiekty słowników powinny być deklarowane w uporządkowanych plikach zawartości, aby zapewnić bezpieczeństwo typów i zapobiec błędom w czasie wykonywania. Instrukcje konfiguracji można znaleźć [tutaj](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md). Oto przykład deklaracji zawartości:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
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

export default componentContent;
```

```javascript fileName="./component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Zawartość komponentu z tłumaczeniami
const componentContent = {
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

export default componentContent;
```

```javascript fileName="./component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Zawartość komponentu z tłumaczeniami
const componentContent = {
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

module.exports = componentContent;
```

```json fileName="./component.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente",
        "pl": "Przykład komponentu klienta"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente",
        "pl": "To jest zawartość przykładu komponentu klienta"
      }
    }
  }
}
```

## Przykład użycia w React

Poniżej znajduje się przykład, jak użyć hooka `useDictionary` w komponencie React:

```tsx fileName="./ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer");
const componentContent = require("./component.content");

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Integracja z serwerem

Jeśli używasz hooka `useDictionary` poza `IntlayerProvider`, locale musi być jawnie przekazane jako parametr podczas renderowania komponentu:

```tsx fileName="./ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer/server";
import componentContent from "./component.content";

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer/server");
const componentContent = require("./component.content");

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Uwagi dotyczące atrybutów

W przeciwieństwie do integracji wykorzystujących edytory wizualne, atrybuty takie jak `buttonTitle.value` nie mają tutaj zastosowania. Zamiast tego bezpośrednio odwołuj się do lokalizowanych ciągów znaków zadeklarowanych w Twojej zawartości.

```jsx
<button title={content.title}>{content.content}</button>
```

## Dodatkowe wskazówki

- **Bezpieczeństwo typów**: Zawsze używaj `Dictionary` do definiowania swoich słowników, aby zapewnić bezpieczeństwo typów.
- **Aktualizacje lokalizacji**: Podczas aktualizacji zawartości upewnij się, że wszystkie lokalizacje są spójne, aby uniknąć brakujących tłumaczeń.

Niniejsza dokumentacja koncentruje się na integracji hooka `useDictionary`, oferując uproszczone podejście do zarządzania lokalizowaną zawartością bez polegania na funkcjonalnościach edytora wizualnego.
