---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: Treści oparte na płci
description: Dowiedz się, jak używać treści opartych na płci w Intlayer, aby dynamicznie wyświetlać zawartość w zależności od płci. Postępuj zgodnie z tą dokumentacją, aby efektywnie wdrożyć treści specyficzne dla płci w swoim projekcie.
keywords:
  - Treści oparte na płci
  - Dynamiczne renderowanie
  - Dokumentacja
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - gender
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: Wprowadzenie treści opartych na płci
---

# Treści oparte na płci / Płeć w Intlayer

## Jak działa płeć

W Intlayer treści oparte na płci są realizowane za pomocą funkcji `gender`, która mapuje konkretne wartości płci ('male', 'female') na odpowiadające im treści. Takie podejście pozwala na dynamiczny wybór zawartości w zależności od podanej płci. Po integracji z React Intlayer lub Next Intlayer odpowiednia treść jest automatycznie wybierana zgodnie z płcią przekazaną w czasie wykonywania.

## Konfiguracja treści opartych na płci

Aby skonfigurować treści oparte na płci w swoim projekcie Intlayer, utwórz moduł zawartości, który będzie zawierał definicje specyficzne dla płci. Poniżej znajdują się przykłady w różnych formatach.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "moja treść dla użytkowników płci męskiej",
      female: "moja treść dla użytkowników płci żeńskiej",
      fallback: "moja treść, gdy płeć nie jest określona", // Opcjonalne
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { gender } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "moja treść dla użytkowników płci męskiej",
      female: "moja treść dla użytkowników płci żeńskiej",
      fallback: "moja treść, gdy płeć nie jest określona", // Opcjonalne
    }),
  },
};

export default myGenderContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { gender } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "moja treść dla użytkowników płci męskiej",
      female: "moja treść dla użytkowników płci żeńskiej",
      fallback: "moja treść, gdy płeć nie jest określona", // Opcjonalne
    }),
  },
};

module.exports = myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "moja treść dla użytkowników płci męskiej",
        "female": "moja treść dla użytkowników płci żeńskiej",
        "fallback": "moja treść, gdy płeć nie jest określona", // Opcjonalne
      },
    },
  },
}
```

> Jeśli nie zostanie zadeklarowany fallback, ostatni zadeklarowany klucz zostanie użyty jako fallback, jeśli płeć nie zostanie określona lub nie będzie pasować do żadnej zdefiniowanej płci.

## Używanie treści zależnych od płci z React Intlayer

Aby wykorzystać treści zależne od płci w komponencie React, zaimportuj i użyj hooka `useIntlayer` z pakietu `react-intlayer`. Ten hook pobiera treść dla określonego klucza i pozwala przekazać płeć, aby wybrać odpowiednią zawartość.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Wyjście: moja treść dla użytkowników płci męskiej */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Wyjście: moja treść dla użytkowniczek */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Wyjście: moja treść dla użytkowników */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Wyjście: moja treść dla użytkowniczek */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Wyjście: moja treść, gdy płeć nie jest określona */
          myGender("")
        }
      </p>
      <p>
        {
          /* Wyjście: moja treść, gdy płeć nie jest określona */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Wyjście: moja treść dla użytkowników płci męskiej */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Wyjście: moja treść dla użytkowniczek */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Wyjście: moja treść dla użytkowników płci męskiej */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Wyjście: moja treść dla użytkowniczek */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Wyjście: moja treść, gdy płeć nie jest określona */
          myGender("")
        }
      </p>
      <p>
        {
          /* Wyjście: moja treść, gdy płeć nie jest określona */
          /* Wyjście: moja treść, gdy płeć nie jest określona */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Wyjście: moja treść dla użytkowników płci męskiej */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Wyjście: moja treść dla użytkowniczek */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Wyjście: moja treść dla użytkowników płci męskiej */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Wyjście: moja treść dla użytkowniczek */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Wyjście: moja treść, gdy płeć nie jest określona */
          myGender("")
        }
      </p>
      <p>
        {
          /* Wyjście: moja treść, gdy płeć nie jest określona */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

module.exports = GenderComponent;
```

## Dodatkowe zasoby

Aby uzyskać bardziej szczegółowe informacje na temat konfiguracji i użytkowania, zapoznaj się z następującymi zasobami:

- [Dokumentacja Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md)
- [Dokumentacja React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md)
- [Dokumentacja Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)

Te zasoby oferują dodatkowe informacje na temat konfiguracji i użytkowania Intlayer w różnych środowiskach i frameworkach.

Te zasoby oferują dodatkowe informacje na temat konfiguracji i użytkowania Intlayer w różnych środowiskach i ramach pracy.
