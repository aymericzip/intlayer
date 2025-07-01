---
docName: package__express-intlayer
url: https://intlayer.org/doc/packages/express-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/express-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация пакета | express-intlayer
description: Узнайте, как использовать пакет express-intlayer
keywords:
  - Intlayer
  - express-intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
---

# express-intlayer: JavaScript-пакет для интернационализации (i18n) приложения на Express.js

**Intlayer** — это набор пакетов, разработанных специально для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, Next.js и Express.js.

**Пакет `express-intlayer`** позволяет интернационализировать ваше приложение на Express.js. Он предоставляет middleware для определения предпочтительной локали пользователя и возвращает соответствующий словарь для этого пользователя.

## Зачем интернационализировать бэкенд?

Интернационализация бэкенда необходима для эффективного обслуживания глобальной аудитории. Она позволяет вашему приложению предоставлять контент и сообщения на предпочитаемом языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет охват вашего приложения, делая его более доступным и релевантным для людей с разным языковым фоном.

### Практические случаи использования

- **Отображение ошибок бэкенда на языке пользователя**: Когда происходит ошибка, отображение сообщений на родном языке пользователя улучшает понимание и снижает уровень фрустрации. Это особенно полезно для динамических сообщений об ошибках, которые могут отображаться во фронтенд-компонентах, таких как тосты или модальные окна.

- **Получение многоязычного контента**: Для приложений, которые извлекают контент из базы данных, интернационализация обеспечивает возможность предоставления этого контента на нескольких языках. Это критично для платформ, таких как сайты электронной коммерции или системы управления контентом, которым необходимо отображать описания продуктов, статьи и другой контент на языке, предпочитаемом пользователем.

- **Отправка многоязычных электронных писем**: Будь то транзакционные письма, маркетинговые кампании или уведомления, отправка писем на языке получателя может значительно повысить вовлеченность и эффективность.

- **Многоязычные push-уведомления**: Для мобильных приложений отправка push-уведомлений на предпочитаемом пользователем языке может улучшить взаимодействие и удержание. Этот персональный подход делает уведомления более релевантными и действенными.

- **Другие виды коммуникаций**: Любая форма коммуникации с бэкенда, такая как SMS-сообщения, системные оповещения или обновления пользовательского интерфейса, выигрывает от использования языка пользователя, обеспечивая ясность и улучшая общий пользовательский опыт.

Интернационализируя бэкенд, ваше приложение не только уважает культурные различия, но и лучше соответствует потребностям глобального рынка, что делает этот шаг ключевым для масштабирования ваших сервисов по всему миру.

## Почему стоит интегрировать Intlayer?

- **Типобезопасная среда**: Используйте TypeScript, чтобы все определения контента были точными и безошибочными.

## Установка

Установите необходимый пакет с помощью предпочитаемого менеджера пакетов:

```bash
npm install express-intlayer
```

```bash
yarn add express-intlayer
```

```bash
pnpm add express-intlayer
```

### Настройка Intlayer

Intlayer предоставляет файл конфигурации для настройки вашего проекта. Поместите этот файл в корень вашего проекта.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
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

> Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

## Пример использования

Настройте ваше приложение Express для использования `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Загрузка обработчика запросов интернационализации
app.use(intlayer());

// Маршруты
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Пример возвращаемого содержимого на французском",
      "es-ES": "Пример возвращаемого содержимого на испанском (Испания)",
      "es-MX": "Пример возвращаемого содержимого на испанском (Мексика)",
    })
  );
});

// Запуск сервера
app.listen(3000, () => console.log(`Слушаем порт 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// Загрузка обработчика интернационализации запросов
app.use(intlayer());

// Маршруты
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Пример возвращаемого содержимого на французском",
      "es-MX": "Пример возвращаемого содержимого на испанском (Мексика)",
      "es-ES": "Пример возвращаемого содержимого на испанском (Испания)",
    })
  );
});

// Запуск сервера
app.listen(3000, () => console.log(`Слушаем порт 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// Загрузка обработчика интернационализации запросов
app.use(intlayer());

// Маршруты
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Запуск сервера
app.listen(3000, () => console.log(`Слушаем порт 3000`));
```

### Совместимость

`express-intlayer` полностью совместим с:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md) для приложений на React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/index.md) для приложений на Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/index.md) для приложений на Vite

Он также без проблем работает с любыми решениями для интернационализации в различных средах, включая браузеры и API-запросы. Вы можете настроить middleware для определения локали через заголовки или куки:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Другие параметры конфигурации
  middleware: {
    headerName: "my-locale-header", // имя заголовка для определения локали
    cookieName: "my-locale-cookie", // имя cookie для определения локали
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Другие параметры конфигурации
  middleware: {
    headerName: "my-locale-header", // имя заголовка для определения локали
    cookieName: "my-locale-cookie", // имя cookie для определения локали
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Другие параметры конфигурации
  middleware: {
    headerName: "my-locale-header", // имя заголовка для определения локали
    cookieName: "my-locale-cookie", // имя cookie для определения локали
  },
};

module.exports = config;
```

По умолчанию `express-intlayer` будет интерпретировать заголовок `Accept-Language` для определения предпочтительного языка клиента.

## Функции, предоставляемые пакетом `express-intlayer`

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/express-intlayer/t.md)

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
