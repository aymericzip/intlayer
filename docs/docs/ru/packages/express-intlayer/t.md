---
docName: package__express-intlayer__t
url: https://intlayer.org/doc/packages/express-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/express-intlayer/t.md
createdAt: 2024-12-02
updatedAt: 2024-12-02
title: Документация функции t | express-intlayer
description: Смотрите, как использовать функцию t для пакета express-intlayer
keywords:
  - t
  - перевод
  - Intlayer
  - Интернационализация
  - Документация
  - Express
  - JavaScript
  - React
---

# Документация: Функция `t` в `express-intlayer`

Функция `t` в пакете `express-intlayer` является основным инструментом для предоставления локализованных ответов в вашем приложении Express. Она упрощает интернационализацию (i18n), динамически выбирая контент на основе предпочтительного языка пользователя.

---

## Обзор

Функция `t` используется для определения и получения переводов для заданного набора языков. Она автоматически определяет подходящий язык для возврата на основе настроек запроса клиента, таких как заголовок `Accept-Language`. Если предпочтительный язык недоступен, функция плавно возвращается к языку по умолчанию, указанному в вашей конфигурации.

---

## Основные функции

- **Динамическая локализация**: Автоматически выбирает наиболее подходящий перевод для клиента.
- **Резервный язык по умолчанию**: Возвращается к языку по умолчанию, если предпочтительный язык клиента недоступен, обеспечивая непрерывность пользовательского опыта.
- **Легковесность и высокая скорость**: Разработана для высокопроизводительных приложений, обеспечивая минимальную нагрузку.
- **Поддержка строгого режима**: Обеспечивает строгое соблюдение объявленных локалей для надежного поведения.

---

## Сигнатура функции

```typescript
t(translations: Record<string, string>): string;
```

### Параметры

- `translations`: Объект, где ключи , это коды локалей (например, `en`, `fr`, `es-MX`), а значения , соответствующие переведенные строки.

### Возвращаемое значение

- Строка, представляющая контент на предпочтительном языке клиента.

---

## Загрузка обработчика запросов интернационализации

Чтобы функциональность интернационализации, предоставляемая `express-intlayer`, работала корректно, вы **должны** загрузить middleware интернационализации в начале вашего приложения Express. Это активирует функцию `t` и обеспечивает корректную обработку определения локали и перевода.

Разместите middleware `app.use(intlayer())` **перед любыми маршрутами** в вашем приложении, чтобы все маршруты могли использовать интернационализацию:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Загрузка обработчика запросов интернационализации
app.use(intlayer());

// Определите маршруты после загрузки middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      ru: "Привет, мир!",
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

// Определите маршруты после загрузки middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      ru: "Привет, мир!",
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

// Определите маршруты после загрузки middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      ru: "Привет, мир!",
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### Почему это необходимо

- **Определение локали**: Middleware `intlayer` обрабатывает входящие запросы для определения предпочтительной локали пользователя на основе заголовков, cookies или других настроенных методов.
- **Контекст перевода**: Настраивает необходимый контекст для работы функции `t`, обеспечивая возврат переводов на правильном языке.
- **Предотвращение ошибок**: Без этого middleware использование функции `t` приведет к ошибкам выполнения, так как необходимая информация о локали будет недоступна.

---

## Примеры использования

### Базовый пример

Предоставление локализованного контента на разных языках:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      ru: "Добро пожаловать!",
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
      ru: "Добро пожаловать!",
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
      ru: "Добро пожаловать!",
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**Запросы клиента:**

- Клиент с `Accept-Language: fr` получит `Bienvenue!`.
- Клиент с `Accept-Language: es` получит `¡Bienvenido!`.
- Клиент с `Accept-Language: de` получит `Welcome!` (язык по умолчанию).

### Обработка ошибок

Предоставление сообщений об ошибках на нескольких языках:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      ru: "Произошла неожиданная ошибка.",
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
      ru: "Произошла неожиданная ошибка.",
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
      ru: "Произошла неожиданная ошибка.",
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### Использование вариантов локалей

Укажите переводы для специфических вариантов локалей:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      ru: "Привет!",
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
      ru: "Привет!",
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
      ru: "Привет!",
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

### Механизм резервного языка

Если предпочтительная локаль недоступна, функция `t` вернется к языку по умолчанию, определенному в конфигурации:

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

- Если `defaultLocale` установлен как `Locales.CHINESE`, а клиент запрашивает `Locales.DUTCH`, возвращаемый перевод будет соответствовать значению `Locales.CHINESE`.

---

---

### Принудительное соблюдение строгого режима

Настройте функцию `t` для строгого соблюдения объявленных локалей:

| Режим       | Поведение                                                                                             |
| ----------- | ----------------------------------------------------------------------------------------------------- |
| `strict`    | Все объявленные локали должны иметь предоставленные переводы. Отсутствие локалей вызовет ошибки.      |
| `inclusive` | Объявленные локали должны иметь переводы. Отсутствие локалей вызывает предупреждения, но принимается. |
| `loose`     | Любая существующая локаль принимается, даже если она не объявлена.                                    |

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

Функция `t` является типобезопасной при использовании с TypeScript. Определите объект переводов с типобезопасностью:

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

### Частые ошибки и их устранение

| Проблема                    | Причина                                | Решение                                                         |
| --------------------------- | -------------------------------------- | --------------------------------------------------------------- |
| Функция `t` не работает     | Middleware не загружен                 | Убедитесь, что `app.use(intlayer())` добавлен перед маршрутами. |
| Ошибка отсутствия переводов | Включен строгий режим без всех локалей | Предоставьте все необходимые переводы.                          |

---

## Советы по эффективному использованию

1. **Централизуйте переводы**: Используйте централизованный модуль или JSON-файлы для управления переводами, чтобы улучшить их поддержку.
2. **Проверяйте переводы**: Убедитесь, что каждая языковая версия имеет соответствующий перевод, чтобы избежать ненужного использования значений по умолчанию.
3. **Синхронизация с фронтендом**: Синхронизируйте с интернационализацией фронтенда для создания бесшовного пользовательского опыта в приложении.
4. **Тестируйте производительность**: Проверьте время отклика вашего приложения при добавлении переводов, чтобы минимизировать влияние на производительность.

---

## Заключение

Функция `t` , это мощный инструмент для интернационализации на стороне сервера. Эффективное использование этой функции позволяет создать более инклюзивное и удобное приложение для глобальной аудитории. Для расширенного использования и подробных вариантов конфигурации обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).
