---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Zawartość warunkowa
description: Dowiedz się, jak używać zawartości warunkowej w Intlayer, aby dynamicznie wyświetlać treści na podstawie określonych warunków. Postępuj zgodnie z tą dokumentacją, aby efektywnie wdrażać warunki w swoim projekcie.
keywords:
  - Zawartość warunkowa
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
  - condition
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Zawartość warunkowa / Warunek w Intlayer

## Jak działa warunek

W Intlayer zawartość warunkowa jest realizowana za pomocą funkcji `cond`, która mapuje określone warunki (zazwyczaj wartości boolean) na odpowiadającą im zawartość. To podejście pozwala dynamicznie wybierać zawartość na podstawie podanego warunku. Po integracji z React Intlayer lub Next Intlayer odpowiednia zawartość jest automatycznie wybierana zgodnie z warunkiem podanym w czasie wykonywania.

## Konfiguracja zawartości warunkowej

Aby skonfigurować zawartość warunkową w swoim projekcie Intlayer, utwórz moduł zawartości, który zawiera definicje warunkowe. Poniżej znajdują się przykłady w różnych formatach.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "moja zawartość, gdy jest prawda",
      false: "moja zawartość, gdy jest fałsz",
      fallback: "moja zawartość, gdy warunek zawodzi", // Opcjonalne
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { cond } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "moja zawartość, gdy jest prawda",
      false: "moja zawartość, gdy jest fałsz",
      fallback: "moja zawartość, gdy warunek zawodzi", // Opcjonalne
    }),
  },
};

export default myConditionalContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { cond } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "moja zawartość, gdy jest prawda",
      false: "moja zawartość, gdy jest fałsz",
      fallback: "moja zawartość, gdy warunek zawodzi", // Opcjonalne
    }),
  },
};

module.exports = myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "moja zawartość, gdy jest prawda",
        "false": "moja zawartość, gdy jest fałsz",
        "fallback": "moja zawartość, gdy warunek zawodzi", // Opcjonalne
      },
    },
  },
}
```

> Jeśli nie zostanie zadeklarowany fallback, ostatni zadeklarowany klucz zostanie użyty jako fallback, jeśli warunek nie zostanie spełniony.

## Używanie zawartości warunkowej z React Intlayer

Aby wykorzystać zawartość warunkową w komponencie React, zaimportuj i użyj hooka `useIntlayer` z pakietu `react-intlayer`. Hook ten pobiera zawartość dla określonego klucza i pozwala przekazać warunek, aby wybrać odpowiedni wynik.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Wyjście: moja zawartość, gdy jest prawda */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Wyjście: moja zawartość, gdy jest fałsz */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Wyjście: moja zawartość, gdy warunek nie jest spełniony */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Wyjście: moja zawartość, gdy warunek nie jest spełniony */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Wyjście: moja zawartość, gdy jest prawda */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Wyjście: moja zawartość, gdy jest fałsz */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Wyjście: moja zawartość, gdy warunek nie jest spełniony */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Wyjście: moja zawartość, gdy warunek nie jest spełniony */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Wyjście: moja zawartość, gdy jest prawda */
          myCondition(true)
        }
      </p>
      <p>/* Wyjście: moja zawartość, gdy jest fałsz */ myCondition(false) }</p>
      <p>
        {
          /* Wyjście: moja zawartość, gdy warunek nie jest spełniony */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Wyjście: moja zawartość, gdy warunek nie jest spełniony */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

module.exports = ConditionalComponent;
```

## Dodatkowe zasoby

Aby uzyskać bardziej szczegółowe informacje na temat konfiguracji i użytkowania, zapoznaj się z następującymi zasobami:

- [Dokumentacja Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md)
- [Dokumentacja React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md)
- [Dokumentacja Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)

Te zasoby oferują dodatkowe informacje na temat konfiguracji i użytkowania Intlayer w różnych środowiskach i frameworkach.
