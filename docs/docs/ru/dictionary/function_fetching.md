---
docName: dictionary__function_fetching
url: https://intlayer.org/doc/concept/content/function-fetching
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/function_fetching.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Получение функции
description: Узнайте, как объявить и использовать получение функции на вашем многоязычном сайте. Следуйте шагам в этой онлайн-документации, чтобы настроить ваш проект всего за несколько минут.
keywords:
  - Получение функции
  - Интернационализация
  - Документация
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Функция Извлечения

Intlayer позволяет вам объявлять функции контента в ваших модулях контента, которые могут быть синхронными или асинхронными. Когда приложение строится, Intlayer выполняет эти функции, чтобы получить результат функции. Возвращаемое значение должно быть объектом JSON или простым значением, таким как строка или число.

> Предупреждение: извлечение функции в настоящее время недоступно в JSON-декларации контента и файлах удаленной декларации контента.

## Объявления Функций

Вот пример простой синхронной функции, извлекающей контент:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "Это контент, отображаемый функцией",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Это контент, отображаемый функцией",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Это контент, отображаемый функцией",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "Это контент, отображаемый функцией"
  }
}
```

В этом примере ключ `text` содержит функцию, которая возвращает строку. Этот контент может быть отображен в ваших React-компонентах с использованием интерпретаторов Intlayer, таких как `react-intlayer`.

## Асинхронное Извлечение Функции

Помимо синхронных функций, Intlayer поддерживает асинхронные функции, позволяя вам извлекать данные из внешних источников или имитировать получение данных с помощью тестовых данных.

Ниже приведен пример асинхронной функции, имитирующей извлечение с сервера:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Ожидание 200 мс для имитации извлечения с сервера
  return await setTimeout(200).then(() => "Это контент, извлеченный с сервера");
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies Dictionary;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // Ожидание 200 мс для имитации извлечения с сервера
  await setTimeout(200);
  return "Это контент, извлеченный с сервера";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // Ожидание 200 мс для имитации извлечения с сервера
  await setTimeout(200);
  return "Это контент, извлеченный с сервера";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
Нет возможности извлечь контент из JSON-файла, используйте файл .ts или .js вместо этого
```

В данном случае функция `fakeFetch` имитирует задержку для симуляции времени ответа сервера. Intlayer выполняет асинхронную функцию и использует результат в качестве контента для ключа `text`.

## Использование Контента на Основе Функций в React Компонентах

Чтобы использовать контент на основе функций в React-компоненте, вам нужно импортировать `useIntlayer` из `react-intlayer` и вызвать его с ID контента для получения контента. Вот пример:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Вывод: Это контент, отображаемый функцией */}
      <p>{asyncFunctionContent.text}</p>
      {/* Вывод: Это контент, извлеченный с сервера */}
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
      {/* Вывод: Это контент, отображаемый функцией */}
      <p>{asyncFunctionContent.text}</p>
      {/* Вывод: Это контент, извлеченный с сервера */}
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
      {/* Вывод: Это контент, отображаемый функцией */}
      <p>{asyncFunctionContent.text}</p>
      {/* Вывод: Это контент, извлеченный с сервера */}
    </div>
  );
};

module.exports = MyComponent;
```
