---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Умовний вміст
description: Дізнайтеся, як використовувати умовний вміст в Intlayer для динамічного відображення контенту на основі певних умов. Дотримуйтесь цієї документації, щоб ефективно реалізувати умови у вашому проєкті.
keywords:
  - Умовний вміст
  - Динамічне відображення
  - Документація
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
    changes: Ініціалізація історії
---

# Умовний вміст / Умова в Intlayer

## Як працює умова

В Intlayer умовний контент реалізується за допомогою функції `cond`, яка відображає конкретні умови (зазвичай булеві значення) на відповідний контент. Такий підхід дозволяє динамічно вибирати контент залежно від заданої умови. Під час інтеграції з React Intlayer або Next Intlayer відповідний контент автоматично обирається відповідно до умови, переданої під час виконання.

## Налаштування умовного контенту

Щоб налаштувати умовний контент у вашому проекті Intlayer, створіть модуль контенту, який містить ваші умовні визначення. Нижче наведено приклади в різних форматах.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "мій контент, коли це true",
      false: "мій контент, коли це false",
      fallback: "мій контент, коли перевірка умови не спрацювала", // Необов'язково
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
      true: "мій контент, коли це true",
      false: "мій контент, коли це false",
      fallback: "мій контент, коли перевірка умови не спрацювала", // Необов'язково
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
      true: "мій контент, коли це true",
      false: "мій контент, коли це false",
      fallback: "мій контент, коли умова не виконується", // Необов'язково
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
        "true": "мій контент, коли це true",
        "false": "мій контент, коли це false",
        "fallback": "мій контент, коли умова не виконується", // Необов'язково
      },
    },
  },
}
```

> Якщо не вказано fallback, останній заданий ключ буде використано як fallback, якщо умова не проходить.

## Використання умовного контенту в React Intlayer

Щоб використовувати умовний контент у React-компоненті, імпортуйте та використовуйте хук `useIntlayer` з пакета `react-intlayer`. Цей хук отримує контент для зазначеного ключа і дозволяє передати умову для вибору відповідного виводу.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Вивід: мій контент, коли це true */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Вивід: мій контент, коли це false */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Вивід: мій контент, коли умова не виконується */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Вивід: мій контент, коли умова не виконується */
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
          /* Вивід: мій контент, коли це true */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Вивід: мій вміст, коли це false */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Вивід: мій вміст, коли умова не виконується */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Вивід: мій вміст, коли умова не виконується */
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
          /* Вивід: мій вміст, коли це true */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Вивід: мій контент, коли це false */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Вивід: мій контент, коли умова не виконується */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Вивід: мій контент, коли умова не виконується */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

module.exports = ConditionalComponent;
```

## Додаткові ресурси

Для детальнішої інформації щодо конфігурації та використання зверніться до наведених ресурсів:

- [Документація Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- [Документація React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md)
- [Документація Intlayer для Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md)

Ці ресурси надають додаткову інформацію щодо налаштування та використання Intlayer у різних середовищах та фреймворках.
