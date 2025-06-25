---
docName: package__intlayer__getConfiguration
url: https://intlayer.org/doc/packages/intlayer/getConfiguration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getConfiguration.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Документация функции getConfiguration | intlayer
description: Узнайте, как использовать функцию getConfiguration для пакета intlayer
keywords:
  - getConfiguration
  - перевод
  - Intlayer
  - intlayer
  - интернационализация
  - документация
  - Next.js
  - JavaScript
  - React
---

# Документация: Функция `getConfiguration` в `intlayer`

## Описание

Функция `getConfiguration` извлекает всю конфигурацию для приложения `intlayer`, извлекая переменные окружения. Эта функция обеспечивает гибкость использования одной и той же конфигурации как на стороне клиента, так и на стороне сервера, гарантируя согласованность в приложении.

---

## Параметры

Функция не принимает никаких параметров. Вместо этого она использует переменные окружения для конфигурации.

### Возвращает

- **Тип**: `IntlayerConfig`
- **Описание**: Объект, содержащий полную конфигурацию для `intlayer`. Конфигурация включает следующие разделы:

  - `internationalization`: Настройки, связанные с локалями и строгим режимом.
  - `middleware`: Настройки, связанные с управлением URL и cookie.
  - `content`: Настройки, связанные с файлами контента, директориями и шаблонами.
  - `editor`: Конфигурации, специфичные для редактора.

См. [Документацию по конфигурации Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md) для получения дополнительных сведений.

---

## Пример использования

### Извлечение полной конфигурации

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Вывод:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Вывод:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const config = getConfiguration();
console.log(config);
// Вывод:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### Извлечение `availableLocales` и `defaultLocale`

Раздел `internationalization` конфигурации предоставляет настройки, связанные с локалями, такие как `locales` (доступные локали) и `defaultLocale` (язык по умолчанию).

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Пример вывода: ["en", "fr", "es"]
console.log(defaultLocale); // Пример вывода: "en"
console.log(cookieName); // Вывод: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Пример вывода: ["en", "fr", "es"]
console.log(defaultLocale); // Пример вывода: "en"
console.log(cookieName); // Вывод: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Пример вывода: ["en", "fr", "es"]
console.log(defaultLocale); // Пример вывода: "en"
console.log(cookieName); // Вывод: "INTLAYER_LOCALE"
```

## Примечания

- Убедитесь, что все необходимые переменные окружения корректно установлены перед вызовом этой функции. Отсутствие переменных вызовет ошибки при инициализации.
- Эта функция может быть использована как на стороне клиента, так и на стороне сервера, что делает её универсальным инструментом для управления конфигурациями.

## Использование в приложениях

Функция `getConfiguration` является ключевой утилитой для инициализации и управления конфигурацией приложения `intlayer`. Предоставляя доступ к настройкам, таким как локали, middleware и директории контента, она обеспечивает согласованность и масштабируемость в многоязычных и контент-ориентированных приложениях.
