# Условный Контент / Условие в Intlayer

## Как Работает Условие

В Intlayer условный контент достигается с использованием функции `cond`, которая отображает определенные условия (обычно булевы значения) на соответствующий контент. Такой подход позволяет динамически выбирать контент на основе заданного условия. При интеграции с React Intlayer или Next Intlayer подходящий контент автоматически выбирается в зависимости от условия, переданного во время выполнения.

## Настройка Условного Контента

Чтобы настроить условный контент в вашем проекте Intlayer, создайте модуль контента, который включает в себя ваши условные определения. Ниже приведены примеры в различных форматах.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "мой контент, когда условие истинное",
      false: "мой контент, когда условие ложное",
      fallback: "мой контент, когда условие не выполняется", // Необязательно
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
      true: "мой контент, когда условие истинное",
      false: "мой контент, когда условие ложное",
      fallback: "мой контент, когда условие не выполняется", // Необязательно
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
      true: "мой контент, когда условие истинное",
      false: "мой контент, когда условие ложное",
      fallback: "мой контент, когда условие не выполняется", // Необязательно
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
        "true": "мой контент, когда условие истинное",
        "false": "мой контент, когда условие ложное",
        "fallback": "мой контент, когда условие не выполняется", // Необязательно
      },
    },
  },
}
```

> Если fallback не определен, последняя объявленная ключевая точка будет взята в качестве fallback, если условие не выполняется.

## Использование Условного Контента с React Intlayer

Чтобы использовать условный контент в React-компоненте, импортируйте и используйте хук `useIntlayer` из пакета `react-intlayer`. Этот хук извлекает контент для заданного ключа и позволяет передать условие для выбора соответствующего результата.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Результат: мой контент, когда условие истинное */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Результат: мой контент, когда условие ложное */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Результат: мой контент, когда условие не выполняется */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Результат: мой контент, когда условие не выполняется */
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
          /* Результат: мой контент, когда условие истинное */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Результат: мой контент, когда условие ложное */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Результат: мой контент, когда условие не выполняется */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Результат: мой контент, когда условие не выполняется */
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
          /* Результат: мой контент, когда условие истинное */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Результат: мой контент, когда условие ложное */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Результат: мой контент, когда условие не выполняется */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Результат: мой контент, когда условие не выполняется */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

module.exports = ConditionalComponent;
```

## Дополнительные Ресурсы

Для получения более подробной информации о конфигурации и использовании, обратитесь к следующим ресурсам:

- [Документация CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md)
- [Документация React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md)
- [Документация Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md)

Эти ресурсы предоставляют дополнительные сведения о настройке и использовании Intlayer в различных средах и фреймворках.
