---
docName: dictionary__condition
url: https://intlayer.org/doc/concept/content/condition
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/condition.md
createdAt: 2025-02-7
updatedAt: 2025-02-7
title: Условный контент
description: Узнайте, как использовать условный контент в Intlayer для динамического отображения контента на основе определенных условий. Следуйте этой документации, чтобы эффективно реализовать условия в вашем проекте.
keywords:
  - Условный контент
  - Динамическое отображение
  - Документация
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Условный Контент / Условие в Intlayer

## Как Работает Условие

В Intlayer условный контент достигается с помощью функции `cond`, которая сопоставляет определенные условия (обычно булевы значения) с соответствующим контентом. Этот подход позволяет динамически выбирать контент на основе заданного условия. При интеграции с React Intlayer или Next Intlayer соответствующий контент автоматически выбирается в зависимости от условия, предоставленного во время выполнения.

## Настройка Условного Контента

Чтобы настроить условный контент в вашем проекте Intlayer, создайте модуль контента, который включает ваши условные определения. Ниже приведены примеры в различных форматах.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "мой контент, когда условие истинно",
      false: "мой контент, когда условие ложно",
      fallback: "мой контент, когда условие не выполнено", // Необязательно
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
      true: "мой контент, когда условие истинно",
      false: "мой контент, когда условие ложно",
      fallback: "мой контент, когда условие не выполнено", // Необязательно
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
      true: "мой контент, когда условие истинно",
      false: "мой контент, когда условие ложно",
      fallback: "мой контент, когда условие не выполнено", // Необязательно
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
        "true": "мой контент, когда условие истинно",
        "false": "мой контент, когда условие ложно",
        "fallback": "мой контент, когда условие не выполнено", // Необязательно
      },
    },
  },
}
```

> Если fallback не указан, последняя объявленная ключевая запись будет использоваться в качестве fallback, если условие не выполнено.

## Использование Условного Контента с React Intlayer

Чтобы использовать условный контент в React-компоненте, импортируйте и используйте хук `useIntlayer` из пакета `react-intlayer`. Этот хук извлекает контент для указанного ключа и позволяет передавать условие для выбора соответствующего результата.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Вывод: мой контент, когда условие истинно */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Вывод: мой контент, когда условие ложно */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Вывод: мой контент, когда условие не выполнено */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Вывод: мой контент, когда условие не выполнено */
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
          /* Вывод: мой контент, когда условие истинно */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Вывод: мой контент, когда условие ложно */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Вывод: мой контент, когда условие не выполнено */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Вывод: мой контент, когда условие не выполнено */
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
          /* Вывод: мой контент, когда условие истинно */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Вывод: мой контент, когда условие ложно */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Вывод: мой контент, когда условие не выполнено */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Вывод: мой контент, когда условие не выполнено */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

module.exports = ConditionalComponent;
```

## Дополнительные Ресурсы

Для получения более подробной информации о настройке и использовании обратитесь к следующим ресурсам:

- [Документация Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md)
- [Документация React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md)
- [Документация Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md)

Эти ресурсы предоставляют дополнительные сведения о настройке и использовании Intlayer в различных средах и фреймворках.
