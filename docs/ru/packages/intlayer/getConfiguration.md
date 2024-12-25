# Документация: Функция `getConfiguration` в `intlayer`

## Описание:

Функция `getConfiguration` извлекает всю конфигурацию для приложения `intlayer`, извлекая переменные окружения. Эта функция предоставляет гибкость использования одной и той же конфигурации как на клиентской, так и на серверной стороне, обеспечивая согласованность по всему приложению.

---

## Параметры:

Функция не принимает никаких параметров. Вместо этого она использует переменные окружения для конфигурации.

### Возвращает:

- **Тип**: `IntlayerConfig`
- **Описание**: Объект, содержащий полную конфигурацию для `intlayer`. Конфигурация включает следующие разделы:

  - `internationalization`: Настройки, связанные с локалями и строгим режимом.
  - `middleware`: Настройки, связанные с управлением URL и cookie.
  - `content`: Настройки, связанные с файлами контента, директориями и шаблонами.
  - `editor`: Специфические конфигурации для редактора.

Смотрите [документацию по конфигурации Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md) для получения дополнительной информации.

---

## Пример использования:

### Получение полной конфигурации:

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

### Извлечение `availableLocales` и `defaultLocale`:

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

## Примечания:

- Убедитесь, что все необходимые переменные окружения правильно установлены перед вызовом этой функции. Отсутствующие переменные вызовут ошибки во время инициализации.
- Эта функция может использоваться как на клиентской, так и на серверной сторонах, что делает ее универсальным инструментом для управления конфигурациями единым образом.

## Использование в приложениях:

Функция `getConfiguration` является основной утилитой для инициализации и управления конфигурацией приложения `intlayer`. Предоставляя доступ к настройкам, таким как локали, middleware и директории контента, она обеспечивает согласованность и масштабируемость для многоязычных и контентно-ориентированных приложений.
