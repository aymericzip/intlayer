---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: Документация функции t | express-intlayer
description: Узнайте, как использовать функцию t в пакете express-intlayer
keywords:
  - t
  - перевод
  - Intlayer
  - Интернационализация
  - Документация
  - Express
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Инициализация истории
---

# Документация: функция `t` в `express-intlayer`

Функция `t` в пакете `express-intlayer` является основным инструментом для предоставления локализованных ответов в вашем приложении Express. Она упрощает интернационализацию (i18n), динамически выбирая контент на основе предпочтительного языка пользователя.

---

## Обзор

Функция `t` используется для определения и получения переводов для заданного набора языков. Она автоматически определяет подходящий язык для возврата на основе настроек запроса клиента, таких как заголовок `Accept-Language`. Если предпочтительный язык недоступен, функция плавно переключается на язык по умолчанию, указанный в вашей конфигурации.

---

## Основные возможности

- **Динамическая локализация**: Автоматически выбирает наиболее подходящий перевод для клиента.
- **Переход к языку по умолчанию**: Переходит к языку по умолчанию, если предпочтительный язык клиента недоступен, обеспечивая непрерывность пользовательского опыта.
- **Легковесность и высокая скорость**: Разработано для высокопроизводительных приложений с минимальными накладными расходами.
- **Поддержка строгого режима**: Обеспечивает строгое соблюдение объявленных локалей для надежного поведения.

---

## Сигнатура функции

```typescript
t(translations: Record<string, string>): string;
```

### Параметры

- `translations`: Объект, где ключами являются коды локалей (например, `en`, `fr`, `es-MX`), а значениями - соответствующие переведённые строки.

### Возвращает

- Строку, представляющую содержимое на предпочтительном языке клиента.

---

## Загрузка обработчика запросов интернационализации

Чтобы обеспечить корректную работу функционала интернационализации, предоставляемого `express-intlayer`, вы **должны** загрузить промежуточное ПО интернационализации в начале вашего Express-приложения. Это активирует функцию `t` и гарантирует правильную обработку определения локали и перевода.

Разместите промежуточное ПО `app.use(intlayer())` **до определения любых маршрутов** в вашем приложении, чтобы все маршруты могли использовать интернационализацию:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Загрузка обработчика запросов интернационализации
app.use(intlayer());

// Определяйте маршруты после загрузки промежуточного ПО
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Загрузка обработчика запросов интернационализации
app.use(intlayer());

// Определяйте маршруты после загрузки промежуточного ПО
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// Загрузка обработчика запросов интернационализации
app.use(intlayer());

// Определяйте маршруты после загрузки промежуточного ПО
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### Почему это необходимо

- **Определение локали**: Промежуточное ПО `intlayer` обрабатывает входящие запросы для определения предпочтительной локали пользователя на основе заголовков, куки или других настроенных методов.
- **Контекст перевода**: Устанавливает необходимый контекст для корректной работы функции `t`, обеспечивая возврат переводов на нужном языке.
- **Предотвращение ошибок**: Без этого промежуточного ПО использование функции `t` приведет к ошибкам во время выполнения, так как необходимая информация о локали будет недоступна.

---

## Примеры использования

### Простой пример

Обслуживание локализованного контента на разных языках:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**Запросы клиентов:**

- Клиент с заголовком `Accept-Language: fr` получит `Bienvenue!`.
- Клиент с `Accept-Language: es` получит `¡Bienvenido!`.
- Клиент с `Accept-Language: de` получит `Welcome!` (язык по умолчанию).

### Обработка ошибок

Предоставляйте сообщения об ошибках на нескольких языках:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "Произошла непредвиденная ошибка.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### Использование вариантов локалей

Укажите переводы для локальных вариантов:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## Продвинутые темы

### Механизм резервного варианта

Если предпочитаемая локаль недоступна, функция `t` переключится на локаль по умолчанию, определённую в конфигурации:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {5-6} fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript {5-6} fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Например:

- Если `defaultLocale` установлен в `Locales.CHINESE`, а клиент запрашивает `Locales.DUTCH`, возвращаемый перевод будет по умолчанию из `Locales.CHINESE`.
- Если `defaultLocale` не определён, функция `t` будет использовать значение по умолчанию из `Locales.ENGLISH`.

---

### Принудительное соблюдение строгого режима

Настройте функцию `t` для строгого соблюдения объявленных локалей:

| Режим       | Поведение                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------- |
| `strict`    | Для всех объявленных локалей должны быть предоставлены переводы. Отсутствие перевода вызовет ошибку.    |
| `inclusive` | Объявленные локали должны иметь переводы. Отсутствующие локали вызывают предупреждения, но принимаются. |
| `loose`     | Принимается любая существующая локаль, даже если она не объявлена.                                      |

Пример конфигурации:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Ваша существующая конфигурация
  internationalization: {
    // ... Ваша существующая конфигурация интернационализации
    strictMode: "strict", // Включить строгий режим
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Ваша существующая конфигурация
  internationalization: {
    // ... Ваша существующая конфигурация интернационализации
    strictMode: "strict", // Включить строгий режим
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Ваша существующая конфигурация
  internationalization: {
    // ... Ваша существующая конфигурация интернационализации
    strictMode: "strict", // Включить строгий режим
  },
};

module.exports = config;
```

---

### Интеграция с TypeScript

Функция `t` является типобезопасной при использовании с TypeScript. Определите типобезопасный объект переводов:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { type LanguageContent } from "express-intlayer";

/** @type {import('express-intlayer').LanguageContent<string>} */
// Объект переводов с типизацией
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { type LanguageContent } = require("express-intlayer");

/** @type {import('express-intlayer').LanguageContent<string>} */
// Объект переводов с типизацией
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### Распространённые ошибки и их устранение

| Проблема                       | Причина                                | Решение                                                     |
| ------------------------------ | -------------------------------------- | ----------------------------------------------------------- |
| Функция `t` не работает        | Middleware не подключен                | Убедитесь, что `app.use(intlayer())` добавлен до маршрутов. |
| Ошибка отсутствующих переводов | Включён строгий режим без всех локалей | Предоставьте все необходимые переводы.                      |

---

## Советы по эффективному использованию

1. **Централизуйте переводы**: Используйте централизованный модуль или JSON-файлы для управления переводами, чтобы повысить удобство сопровождения.
2. **Проверяйте переводы**: Убедитесь, что для каждого языкового варианта существует соответствующий перевод, чтобы избежать ненужного возврата к запасному языку.
3. **Интегрируйте с фронтенд i18n**: Синхронизируйте с системой интернационализации на фронтенде для обеспечения бесшовного пользовательского опыта во всём приложении.
4. **Оценивайте производительность**: Тестируйте время отклика вашего приложения при добавлении переводов, чтобы гарантировать минимальное влияние на производительность.

---

## Заключение

Функция `t` является мощным инструментом для интернационализации на стороне сервера. Эффективно используя её, вы можете создать более инклюзивное и удобное для пользователя приложение для глобальной аудитории. Для продвинутого использования и подробных вариантов настройки обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).
