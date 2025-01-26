# Функция выборки

Intlayer позволяет вам объявлять функции контента в ваших модулях контента, которые могут быть как синхронными, так и асинхронными. Когда приложение собирается, Intlayer выполняет эти функции, чтобы получить результат функции. Возвращаемое значение должно быть объектом JSON или простым значением, таким как строка или число.

> Предупреждение: выборка функций в настоящее время недоступна в декларации контента JSON и удаленных файлах деклараций контента.

## Декларации функций

Вот пример простой синхронной функции, выбирающей контент:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { DeclarationContent } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "Это содержимое, обработанное функцией",
  },
} satisfies DeclarationContent;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').DeclarationContent} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Это содержимое, обработанное функцией",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').DeclarationContent} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Это содержимое, обработанное функцией",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "Это содержимое, обработанное функцией"
  }
}
```

В этом примере ключ `text` содержит функцию, которая возвращает строку. Этот контент может быть отображен в ваших компонентах React с использованием пакетов интерпретатора Intlayer, таких как `react-intlayer`.

## Асинхронная выборка функции

В дополнение к синхронным функциям, Intlayer поддерживает асинхронные функции, позволяя вам извлекать данные из внешних источников или имитировать получение данных с помощью фиктивных данных.

Ниже приведен пример асинхронной функции, которая имитирует получение данных с сервера:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { DeclarationContent } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Ждем 200мс, чтобы имитировать получение данных с сервера
  return await setTimeout(200).then(
    () => "Это содержимое, полученное с сервера"
  );
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies DeclarationContent;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').DeclarationContent} */
const fakeFetch = async () => {
  // Ждем 200мс, чтобы имитировать получение данных с сервера
  await setTimeout(200);
  return "Это содержимое, полученное с сервера";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').DeclarationContent} */
const fakeFetch = async () => {
  // Ждем 200мс, чтобы имитировать получение данных с сервера
  await setTimeout(200);
  return "Это содержимое, полученное с сервера";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
Нет возможности получить содержимое из файла JSON, используйте файл .ts или .js вместо этого
```

В этом случае функция `fakeFetch` имитирует задержку, чтобы симулировать время ответа сервера. Intlayer выполняет асинхронную функцию и использует результат как контент для ключа `text`.

## Использование контента на основе функций в компонентах React

Чтобы использовать контент на основе функций в компоненте React, вам нужно импортировать `useIntlayer` из `react-intlayer` и вызвать его с идентификатором контента, чтобы получить контент. Вот пример:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Вывод: Это содержимое, обработанное функцией */}
      <p>{asyncFunctionContent.text}</p>
      {/* Вывод: Это содержимое, полученное с сервера */}
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
      {/* Вывод: Это содержимое, обработанное функцией */}
      <p>{asyncFunctionContent.text}</p>
      {/* Вывод: Это содержимое, полученное с сервера */}
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
      {/* Вывод: Это содержимое, обработанное функцией */}
      <p>{asyncFunctionContent.text}</p>
      {/* Вывод: Это содержимое, полученное с сервера */}
    </div>
  );
};

module.exports = MyComponent;
```
