---
docName: package__intlayer__getConfiguration
url: https://intlayer.org/doc/packages/intlayer/getConfiguration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getConfiguration.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация функции getConfiguration | intlayer
description: Узнайте, как использовать функцию getConfiguration для пакета intlayer
keywords:
  - getConfiguration
  - перевод
  - Intlayer
  - intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
---

# Документация: функция `getConfiguration` в `intlayer`

## Описание

Функция `getConfiguration` извлекает всю конфигурацию для приложения `intlayer`, используя переменные окружения. Эта функция обеспечивает возможность использовать одну и ту же конфигурацию как на клиентской, так и на серверной стороне, гарантируя согласованность во всем приложении.

---

## Параметры

Функция не принимает никаких параметров. Вместо этого она использует переменные окружения для настройки.

### Возвращаемое значение

- **Тип**: `IntlayerConfig`
- **Описание**: Объект, содержащий полную конфигурацию для `intlayer`. Конфигурация включает следующие разделы:

  - `internationalization`: настройки, связанные с локалями и строгим режимом.
  - `middleware`: настройки, связанные с управлением URL и cookie.
  - `content`: Настройки, связанные с файлами контента, директориями и шаблонами.
  - `editor`: Конфигурации, специфичные для редактора.

См. [документацию по конфигурации Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md) для получения дополнительной информации.

---

## Пример использования

### Получение полной конфигурации

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

Раздел `internationalization` в конфигурации содержит настройки, связанные с локалями, такие как `locales` (доступные локали) и `defaultLocale` (язык по умолчанию).

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

- Убедитесь, что все необходимые переменные окружения корректно установлены перед вызовом этой функции. Отсутствие переменных приведет к ошибкам во время инициализации.
- Эта функция может использоваться как на клиентской, так и на серверной стороне, что делает её универсальным инструментом для управления конфигурациями в едином формате.

## Использование в приложениях

Функция `getConfiguration` является ключевым инструментом для инициализации и управления конфигурацией приложения `intlayer`. Предоставляя доступ к настройкам, таким как локали, промежуточное программное обеспечение и каталоги контента, она обеспечивает согласованность и масштабируемость в многоязычных и контентно-ориентированных приложениях.

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
