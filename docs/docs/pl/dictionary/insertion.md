---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Wstawianie
description: Dowiedz się, jak deklarować i używać miejsc na wstawki w swojej treści. Ta dokumentacja przeprowadzi Cię przez kroki umożliwiające dynamiczne wstawianie wartości w zdefiniowanych strukturach treści.
keywords:
  - Wstawianie
  - Dynamiczna Treść
  - Miejsca na wstawki
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - insertion
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Treść Wstawiania / Wstawianie w Intlayer

## Jak działa wstawianie

W Intlayer treść wstawiania jest realizowana za pomocą funkcji `insertion`, która identyfikuje pola zastępcze w ciągu znaków (takie jak `{{name}}` lub `{{age}}`), które mogą być dynamicznie zastępowane w czasie wykonywania. To podejście pozwala tworzyć elastyczne, szablonowe ciągi znaków, w których konkretne części treści są określane przez dane przekazywane z Twojej aplikacji.

Po integracji z React Intlayer lub Next Intlayer możesz po prostu dostarczyć obiekt danych zawierający wartości dla każdego pola zastępczego, a Intlayer automatycznie wyrenderuje treść z zastąpionymi polami.

## Konfiguracja treści wstawiania

Aby skonfigurować treść wstawiania w swoim projekcie Intlayer, utwórz moduł treści, który zawiera definicje wstawek. Poniżej znajdują się przykłady w różnych formatach.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Cześć, mam na imię {{name}} i mam {{age}} lat!"),
  },
} satisfies Dictionary;

export default myInsertionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { insert } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Cześć, mam na imię {{name}} i mam {{age}} lat!"),
  },
};

export default myInsertionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { insert } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "Cześć, mam na imię {{name}} i mam {{age}} lat!"
    ),
  },
};

module.exports = myInsertionContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myInsertion": {
      "nodeType": "insertion",
      "insertion": "Cześć, mam na imię {{name}} i mam {{age}} lat!",
    },
  },
}
```

## Używanie treści wstawianej z React Intlayer

Aby wykorzystać zawartość wstawki w komponencie React, zaimportuj i użyj hooka `useIntlayer` z pakietu `react-intlayer`. Ten hook pobiera zawartość dla określonego klucza i pozwala przekazać obiekt, który mapuje każde miejsce na wartość, którą chcesz wyświetlić.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Wynik: "Cześć, mam na imię John i mam 30 lat!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Możesz ponownie użyć tej samej wstawki z różnymi wartościami */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Wynik: "Cześć, mam na imię John i mam 30 lat!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Możesz ponownie użyć tej samej wstawki z różnymi wartościami */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Wynik: "Cześć, mam na imię John i mam 30 lat!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Możesz ponownie użyć tej samej wstawki z różnymi wartościami */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## Dodatkowe zasoby

Aby uzyskać bardziej szczegółowe informacje na temat konfiguracji i użytkowania, zapoznaj się z następującymi zasobami:

- [Dokumentacja Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md)
- [Dokumentacja React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md)
- [Dokumentacja Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)

Te zasoby oferują dodatkowe informacje na temat konfiguracji i użytkowania Intlayer w różnych środowiskach i frameworkach.
