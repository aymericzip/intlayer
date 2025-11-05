---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Zagnieżdżanie słowników
description: Dowiedz się, jak korzystać z zagnieżdżania treści w Intlayer, aby efektywnie ponownie wykorzystywać i strukturyzować wielojęzyczne treści. Postępuj zgodnie z tą dokumentacją, aby bezproblemowo wdrożyć zagnieżdżanie w swoim projekcie.
keywords:
  - Zagnieżdżanie
  - Ponowne wykorzystywanie treści
  - Dokumentacja
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - nesting
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Zagnieżdżanie / Odwołania do podtreści

## Jak działa zagnieżdżanie

W Intlayer zagnieżdżanie realizowane jest za pomocą funkcji `nest`, która pozwala na odwoływanie się do treści z innego słownika i jej ponowne wykorzystanie. Zamiast duplikować treść, możesz wskazać istniejący moduł treści za pomocą jego klucza.

## Konfiguracja zagnieżdżania

Aby skonfigurować zagnieżdżanie w swoim projekcie Intlayer, najpierw definiujesz bazową treść, którą chcesz ponownie wykorzystać. Następnie, w osobnym module treści, używasz funkcji `nest`, aby zaimportować tę treść.

### Bazowy słownik

Poniżej znajduje się przykład bazowego słownika do zagnieżdżenia w innym słowniku:

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary } from "intlayer";

const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
} satisfies Dictionary;

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

module.exports = firstDictionary;
```

```json fileName="firstDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_first_dictionary",
  "content": {
    "content": "content",
    "subContent": {
      "contentNumber": 0,
      "contentString": "string"
    }
  }
}
```

### Odwołania za pomocą Nest

Teraz utwórz inny moduł zawartości, który używa funkcji `nest` do odwołania się do powyższej zawartości. Możesz odwołać się do całej zawartości lub do konkretnej zagnieżdżonej wartości:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat="typescript"
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // Odwołuje się do całego słownika:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // Odwołuje się do konkretnej zagnieżdżonej wartości:
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.mjs" contentDeclarationFormat="esm"
import { nest } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { nest } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

module.exports = myNestingContent;
```

```json fileName="secondDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_second_dictionary",
  "content": {
    "fullNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary"
      }
    },
    "partialNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary",
        "path": "subContent.contentNumber"
      }
    }
  }
}
```

Jako drugi parametr możesz określić ścieżkę do zagnieżdżonej wartości w ramach tej zawartości. Jeśli ścieżka nie zostanie podana, zwracana jest cała zawartość odwołującego się słownika.

## Używanie zagnieżdżenia z React Intlayer

Aby użyć zagnieżdżonej zawartości w komponencie React, skorzystaj z hooka `useIntlayer` z pakietu `react-intlayer`. Ten hook pobiera odpowiednią zawartość na podstawie podanego klucza. Oto przykład, jak go użyć:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Full Nested Content: {JSON.stringify(fullNestedContent)}
        {/* Wynik: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Częściowa wartość zagnieżdżona: {partialNestedContent}
        {/* Wynik: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Pełna zawartość zagnieżdżona: {JSON.stringify(fullNestedContent)}
        {/* Wynik: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Częściowa wartość zagnieżdżona: {partialNestedContent}
        {/* Wynik: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.cjx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Pełna zawartość zagnieżdżona: {JSON.stringify(fullNestedContent)}
        {/* Wynik: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Częściowa wartość zagnieżdżona: {partialNestedContent}
        {/* Wynik: 0 */}
      </p>
    </div>
  );
};

module.exports = NestComponent;
```

## Dodatkowe zasoby

Aby uzyskać bardziej szczegółowe informacje na temat konfiguracji i użytkowania, zapoznaj się z następującymi zasobami:

- [Dokumentacja Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md)
- [Dokumentacja React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md)
- [Dokumentacja Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)

Te zasoby dostarczają dodatkowych informacji na temat konfiguracji i użytkowania Intlayer w różnych środowiskach oraz z różnymi frameworkami.
