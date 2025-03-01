# Документация: Функции `getPathWithoutLocale` в `intlayer`

## Описание

Удаляет сегмент локали из указанного URL или пути, если он присутствует. Работает как с абсолютными URL, так и с относительными путями.

## Параметры

- `inputUrl: string`

  - **Описание**: Полная строка URL или путь для обработки.
  - **Тип**: `string`

- `locales: Locales[]`
  - **Описание**: Необязательный массив поддерживаемых локалей. По умолчанию используются настроенные локали в проекте.
  - **Тип**: `Locales[]`

## Возвращает

- **Тип**: `string`
- **Описание**: Строка URL или путь без сегмента локали.

## Пример использования

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Вывод: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Вывод: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Вывод: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Вывод: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Вывод: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Вывод: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Вывод: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Вывод: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Вывод: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Вывод: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Вывод: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Вывод: "https://example.com/dashboard"
```
