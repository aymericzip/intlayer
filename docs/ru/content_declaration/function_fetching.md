# Функция извлечения

## Объявления функций

Intlayer позволяет вам объявлять функции контента в ваших модулях контента, которые могут быть как синхронными, так и асинхронными. Когда приложение строится, Intlayer выполняет эти функции, чтобы получить результат функции. Возвращаемое значение должно быть объектом JSON или простым значением, таким как строка или число.

Вот пример простой синхронной функции извлечения контента:

```typescript
import type { DeclarationContent } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "Это контент, отрендеренный функцией",
  },
} satisfies DeclarationContent;

export default functionContent;
```

В этом примере ключ `text` содержит функцию, которая возвращает строку. Этот контент может быть отрендерен в ваших компонентах React с использованием пакетов интерпретатора Intlayer, таких как `react-intlayer`.

## Асинхронное извлечение функций

В дополнение к синхронным функциям, Intlayer поддерживает асинхронные функции, позволяя вам извлекать данные из внешних источников или имитировать извлечение данных с помощью мок-данных.

Ниже приведен пример асинхронной функции, которая имитирует извлечение с сервера:

```typescript
import { setTimeout } from "node:timers/promises";
import type { DeclarationContent } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Ждать 200 мс, чтобы симулировать извлечение с сервера
  return await setTimeout(200).then(() => "Это контент, извлеченный с сервера");
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies DeclarationContent;

export default asyncFunctionContent;
```

В этом случае функция `fakeFetch` имитирует задержку, чтобы смоделировать время ответа сервера. Intlayer выполняет асинхронную функцию и использует результат в качестве контента для ключа `text`.

## Использование контента на основе функций в компонентах React

Чтобы использовать контент на основе функций в компоненте React, вам необходимо импортировать `useIntlayer` из `react-intlayer` и вызвать его с идентификатором контента для получения контента. Вот пример:

```javascript
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Вывод: Это контент, отрендеренный функцией */}
      <p>{asyncFunctionContent.text}</p>
      {/* Вывод: Это контент, извлеченный с сервера */}
    </div>
  );
};

export default MyComponent;
```
